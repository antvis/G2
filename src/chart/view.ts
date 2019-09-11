import EE from '@antv/event-emitter';
import { BBox, Canvas, Group } from '@antv/g';
import * as _ from '@antv/util';
import {
  AxisCfg,
  ComponentOption,
  CoordinateCfg,
  CoordinateOpt,
  Data,
  FilterCondition,
  Options,
  ScaleCfg,
  ViewCfg,
} from 'chart/interface';
import Component from 'component';
import Geometry from 'geometry/geometry';
import Interaction from 'interaction';
import { Padding, Point, Region } from 'interface';
import { parsePadding } from '../util';
import Chart from './chart';
import { DIRECTION, LAYER } from './constant';
import defaultLayout, { Layout } from './layout';

/**
 * View 对象
 */
export default class View extends EE {
  public canvas: Canvas;
  /** 所有的子 view */
  public views: View[] = [];
  /** 所有的组件配置 */
  public componentOptions: ComponentOption[] = [];
  /** 所有的 geometry 实例 */
  public geometries: Geometry[] = [];

  public parent: View;
  // 三层 Group 图层
  /** 背景层 */
  public backgroundGroup: Group;
  /** 中间层 */
  public middleGroup: Group;
  /** 前景层 */
  public foregroundGroup: Group;
  /** 标记 view 的大小位置范围，均是 0 ~ 1 范围，便于开发者使用 */
  public region: Region;

  public padding: Padding;

  // 配置信息存储
  public options: Options;

  // 计算信息
  /** view 实际的绘图区域，除去 padding */
  public viewBBox: BBox;

  // 布局函数
  protected _layout: Layout = defaultLayout;

  constructor(props: ViewCfg) {
    super();

    const {
      parent,
      canvas,
      backgroundGroup,
      middleGroup,
      foregroundGroup,
      region = { start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
      padding = 0,
    } = props;

    this.parent = parent;
    this.canvas = canvas;
    this.backgroundGroup = backgroundGroup;
    this.middleGroup = middleGroup;
    this.foregroundGroup = foregroundGroup;
    this.region = region;
    this.padding = padding;

    this.initial();
  }

  /**
   * 添加一个组件到画布
   * @param component
   * @param layer
   * @param direction
   */
  public addComponent(component: Component, layer: LAYER = LAYER.MID, direction: DIRECTION = DIRECTION.BOTTOM) {
    this.componentOptions.push({
      component,
      layer,
      direction,
    });
  }

  /**
   * 添加一个 geometry 到画布
   * @param geometry
   */
  public addGeometry(geometry: Geometry) {
    this.geometries.push(geometry);
  }

  /**
   * 设置 layout 函数
   * @param layout
   */
  public setLayout(layout: Layout) {
    this._layout = layout;
  }

  /**
   * 初始化
   */
  public initial() {
    // 将相对的 region 范围转化为实际的范围
    this._initialViewBBox();

    // 事件委托机制
    this._initialEvents();

    this._initialControllers();

    // 初始化数据
    this._initialData();

    // 初始化子 view
    this._initialViews();
  }

  /**
   * 渲染流程，渲染过程需要处理数据更新的情况
   */
  public render() {
    // 1. 递归 views，生成 UI
    this.renderUI();

    // 2.  递归 views，进行布局
    this.doLayout();

    // 3. 实际的绘制
    this._canvasDraw();
  }

  // /**
  //  * 更新函数
  //  */
  // public update() {
  //
  // }

  /**
   * 清空，之后可以再走 initial 流程，正常使用
   */
  public clear() {
    // 1. 清空 geometries
    _.each(this.geometries, (geometry: Geometry) => {
      geometry.clear();
    });
    this.geometries = [];

    // 2. 清空 components
    _.each(this.componentOptions, (co: ComponentOption) => {
      co.component.destroy();
    });
    this.componentOptions = [];

    // 3. 递归处理子 view
    _.each(this.views, (view: View) => {
      view.clear();
    });
  }

  /**
   * 销毁，完全无法使用
   */
  public destroy() {
    this.clear();
    // todo
  }
  /* end 生命周期函数 */

  /**
   * 装载数据。暂时将 data 和 changeData 合并成一个 API
   */
  public data(data: Data) {
    _.set(this.options, 'data', data);
  }

  /**
   * 数据筛选配置
   */
  public filter(field: string, condition: FilterCondition) {
    _.set(this.options, ['filters', field], condition);
  }

  /**
   * 坐标轴配置
   */
  public axis(field: string, axisCfg: AxisCfg) {
    _.set(this.options, ['axes', field], axisCfg);
  }

  /**
   * 图例配置
   */
  public legend(field: string, legendCfg) {
    _.set(this.options, ['legends', field], legendCfg);
  }

  /**
   * scale 配置
   */
  public scale(field: string, scaleCfg: ScaleCfg) {
    _.set(this.options, ['scales', field], scaleCfg);
  }

  /**
   * tooltip 配置
   */
  public tooltip(visible: boolean) {
    _.set(this.options, 'tooltip', visible);
  }

  /**
   * 辅助标记配置
   */
  public annotation() {
    // todo @hustcc
    // return this.annotationController;
  }

  /**
   * 坐标系配置
   */
  public coordinate(type: string, coordinateCfg?: CoordinateCfg) {
    _.set(this.options, 'coordinate', { type, cfg: coordinateCfg } as CoordinateOpt);
  }

  public animate() {}

  /* end 一系列传入配置的 API */

  /**
   * 加载自定义交互
   * @param name 交互的名称（唯一）
   * @param interaction 交互类，view 中会对他们进行实例化和销毁
   */
  public interaction(name: string, interaction: Interaction) {
    const path = ['interactions', name];

    const existInteraction = _.get(this.options, path) as Interaction;
    // 存在则先销毁已有的
    if (existInteraction) {
      existInteraction.destroy();
    }

    // 保存新的 interaction
    _.set(this.options, ['interactions', name], interaction);
  }

  /* View 管理相关的 API */
  /**
   * 创建子 view
   */
  public createView(): View {
    const v = new View({
      parent: this,
      canvas: this.canvas,
      // 子 view 共用三层 group
      backgroundGroup: this.backgroundGroup,
      middleGroup: this.middleGroup,
      foregroundGroup: this.foregroundGroup,
    });

    this.views.push(v);

    return v;
  }

  /**
   * 删除一个 view
   * @param view
   */
  public removeView(view: View): View {
    return _.remove(this.views, (v: View) => v === view)[0];
  }

  /* end View 管理相关的 API */

  public getCanvas(): Canvas {
    let v = this as View;
    do {
      v = this.parent;
    } while (v);

    return ((v as unknown) as Chart).canvas;
  }

  // 渲染流程

  /**
   * 渲染所有的 UI
   */
  public renderUI() {
    // 1. 渲染组件 component
    this._renderComponents();
    // 2. 渲染几何标记
    this._renderGeometries();
    // 3. 递归渲染子 view
    _.each(this.views, (view: View) => {
      view.renderUI();
    });

    // 3. 布局，更新位置等
    this.doLayout();
  }

  /**
   * 进行布局，同时对子 view 进行布局
   */
  public doLayout() {
    // 当前进行布局
    this._layout(this);

    // 子 view 进行布局
    _.each(this.views, (view: View) => {
      view.doLayout();
    });
  }

  // 生命周期子流程
  // 初始化流程
  /**
   * 初始化 region，计算实际的像素范围坐标，去除 padding 之后的
   * @private
   */
  private _initialViewBBox() {
    // 存在 parent， 那么就是通过父容器大小计算
    let width;
    let height;
    let start: Point;

    if (this.parent) {
      start = this.parent.viewBBox.tl;
      width = this.parent.viewBBox.width;
      height = this.parent.viewBBox.height;
    } else {
      // 顶层容器，从 canvas 中取值 宽高
      width = this.canvas.get('width');
      height = this.canvas.get('height');
      start = { x: 0, y: 0 };
    }

    const region = this.region;

    const [top, right, bottom, left] = parsePadding(this.padding);

    // 计算 bbox 除去 padding 之后的
    this.viewBBox = new BBox(
      start.x + width * region.start.x + left,
      start.y + height * region.start.y + top,
      width * (region.end.x - region.start.x) - left - right,
      height * (region.end.y - region.start.y) - top - bottom
    );
  }

  private _initialEvents() {
    // todo 依赖 G 的事件实现机制
  }

  /**
   * 生成 controller 实例，后续更新配置
   * @private
   */
  private _initialControllers() {
    // todo @hustcc
    // 可能暂时不需要，组件管理直接使用 components 管理，生成逻辑写成工具函数
  }

  /**
   * 将不同的数据源，处理成 Data 定义的结构
   * @private
   */
  private _initialData() {
    // 暂时只有一种数据结构，所以无需处理
  }

  /**
   * 遍历子 view，子 view 也进行初始化
   * @private
   */
  private _initialViews() {
    _.each(this.views, (view: View) => {
      view.initial();
    });
  }

  /**
   * 根据 options 配置自动渲染 components
   * @private
   */
  private _renderComponents() {
    // todo @hustcc
  }

  /**
   * 根据 options 配置自动渲染 geometry
   * @private
   */
  private _renderGeometries() {
    // todo @hustcc
  }

  /**
   * canvas.draw 实际的绘制
   * @private
   */
  private _canvasDraw() {
    this.getCanvas().draw();
  }
}
