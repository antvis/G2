import EE from '@antv/event-emitter';
import { Canvas, Group, BBox } from '@antv/g';
import * as _ from '@antv/util';
import Component from 'component';
import Geometry from 'geometry/geometry';
import { Padding, Point, Region } from 'interface';
import Chart from './chart';
import { DIRECTION, LAYER } from './constant';
import defaultLayout, { Layout } from './layout';
import {
  Options,
  AxisCfg,
  ComponentOption,
  CoordinateCfg,
  CoordinateOpt,
  Data,
  FilterCondition,
  ScaleCfg,
  ViewProps
} from 'chart/interface';
import Interaction from 'interaction';
import { parsePadding } from '../util';


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

  // 布局函数
  protected _layout: Layout = defaultLayout;

  // 配置信息存储
  public options: Options;

  // 计算信息
  /** view 实际的绘图区域，除去 padding */
  public viewBBox: BBox;

  constructor(props: ViewProps) {
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

  /* todo 下面为生命周期函数 */
  /**
   * 初始化
   */
  public initial() {
    // 将相对的 region 范围转化为实际的范围
    this._initialViewBBox();

    // 事件委托机制
    this._initialEvents();

    // 初始化配置，合并进入一些默认配置
    this._initialOptions();

    // 初始化数据
    this._initialData();

    // 初始化子 view
    this._initialViews();
  }

  /**
   * 渲染流程，渲染过程需要处理数据更新的情况
   */
  public render() {
    // 1. 生成 UI
    // 渲染组件 component
    this._renderComponents();
    // 渲染几何标记
    this._renderGeometries();
    // 渲染子 view
    this._renderViews();

    // 2. 布局，更新位置等
    this.doLayout();

    // 3. 实际的绘制
    this._canvasDraw();
  }

  /**
   * 清空，之后可以再走 initial 流程，正常使用
   */
  public clear() {}

  /**
   * 销毁，完全无法使用
   */
  public destroy() {
    this.clear();
  }
  /* end 生命周期函数 */

  /* todo 下面为一系列传入配置的 API */
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
    // todo
    // return this.annotationController;
  }

  /**
   * 坐标系配置
   */
  public coordinate(type: string, coordinateCfg?: CoordinateCfg) {
    _.set(this.options, 'coordinate', { type, cfg: coordinateCfg } as CoordinateOpt)
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

    return (v as unknown as Chart).canvas;
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

    const end = { x: start.x + width, y: start.y + height };
    const region = this.region;

    const [ top, right, bottom, left ] = parsePadding(this.padding);

    // 计算 bbox 除去 padding 之后的
    this.viewBBox = BBox.fromRange(
      start.x + width * region.start.x + left,
      start.y + height * region.start.y + top,
      end.x - width * region.end.x - right,
      end.y - height * region.end.y - bottom,
    );
  }

  private _initialEvents() {}
  private _initialOptions() {}
  private _initialData() {}
  private _initialViews() {
    _.each(this.views, (view: View) => {
      view.initial();
    });
  }

  // 渲染流程
  private _renderComponents() {}
  private _renderGeometries() {}
  private _renderViews() {
    _.each(this.views, (view: View) => {
      view.render();
    });
  }

  // tslint:disable-next-line
  public doLayout() {
    this._layout(this);
    _.each(this.views, (view: View) => {
      view.doLayout();
    });
  }

  private _canvasDraw() {
    this.getCanvas().draw();
  }
}
