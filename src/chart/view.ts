import EE from '@antv/event-emitter';
import { Canvas, Group } from '@antv/g';
import * as _ from '@antv/util';
import Component from '../component';
import Geometry from '../geometry/geometry';
import { Padding, Region } from '../interface';
import Chart from './chart';
import { DIRECTION, LAYER } from './constant';
import defaultLayout, { Layout } from './layout';

// view 构造参数
export interface ViewProps {
  readonly parent: View;
  /** 前景层 */
  readonly foregroundGroup: Group;
  /** 中间层 */
  readonly middleGroup: Group;
  /** 背景层 */
  readonly backgroundGroup: Group;
  /** 位置大小范围 */
  readonly region?: Region;
  readonly padding?: Padding;
}

// 组件及布局的信息
interface ComponentOption {
  readonly component: Component;
  readonly layer: LAYER;
  readonly direction: DIRECTION;
}

/**
 * View 对象
 */
export default class View extends EE {
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
  /** 标记 view 的大小位置范围 */
  public region: Region;

  public padding: Padding;

  // 布局函数
  private _layout: Layout = defaultLayout;

  constructor(props: ViewProps) {
    super();

    const {
      parent,
      backgroundGroup,
      middleGroup,
      foregroundGroup,
      region = { start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
      padding = 0,
    } = props;

    this.parent = parent;
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
    this._initialRegion();

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
   * 渲染流程
   */
  public render() {
    // 1. 生成 UI
    // 渲染组件 component
    this._renderComponents();
    // 渲染几何标记
    this._renderGeometries();
    // 渲染子 view
    this._renderViews();

    // 布局，更新位置等
    this.doLayout();

    // 实际的绘制
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
  public data() {}

  /**
   * 数据筛选配置
   */
  public filter() {}

  /**
   * 坐标轴配置
   */
  public axis() {}

  /**
   * 图例配置
   */
  public legend() {}

  /**
   * scale 配置
   */
  public scale() {}

  /**
   * tooltip 配置
   */
  public tooltip() {}

  /**
   * 辅助标记配置
   */
  public annotation() {}

  /**
   * 坐标系配置
   */
  public coordinate() {}

  public animate() {}

  /* end 一系列传入配置的 API */

  /**
   * 加载自定义交互
   */
  public interaction() {}

  /* View 管理相关的 API */
  /**
   * 创建子 view
   */
  public createView(): View {
    const v = new View({
      parent: this,
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

    return (v as Chart).canvas;
  }

  // 生命周期子流程
  // 初始化流程
  private _initialRegion() {}
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
