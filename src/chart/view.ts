import EE from '@antv/event-emitter';
import { BBox, Canvas, Group } from '@antv/g';
import * as _ from '@antv/util';
import {
  AxisCfg,
  ComponentOption,
  CoordinateCfg,
  CoordinateOption,
  Data,
  Datum,
  FilterCondition,
  Options,
  ScaleCfg,
  ViewCfg,
} from 'chart/interface';
import Component from 'component';
import { Coordinate, Scale } from 'dependents';
import Geometry from 'geometry/geometry';
import Interaction from 'interaction';
import { Padding, Point, Region } from 'interface';
import { Attribute } from '../dependents';
import { isFullCircle } from '../util/coordinate';
import { parsePadding } from '../util/padding';
import { mergeTheme } from '../util/theme';
import Chart from './chart';
import { ComponentType, DIRECTION, LAYER } from './constant';
import { createAxes } from './controller/axis';
import { createCoordinate } from './controller/coordinate';
import { createLegends } from './controller/legend';
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
  /** view 的 padding 大小 */
  public padding: Padding;
  /** 主题配置 */
  public themeObject: object;

  // 配置信息存储
  // @ts-ignore
  public options: Options = {}; // 初始化为空

  // 计算信息
  /** view 实际的绘图区域，除去 padding，出去组件占用空间 */
  public viewBBox: BBox;
  public filteredData: Data;
  /** 坐标系的位置大小 */
  public coordinateBBox: BBox;
  /** 所有的 scales */
  public scales: Record<string, Scale> = {};

  // 布局函数
  protected layoutFunc: Layout = defaultLayout;
  // 生成的坐标系实例
  private coordinateInstance: Coordinate;

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
      theme,
    } = props;

    this.parent = parent;
    this.canvas = canvas;
    this.backgroundGroup = backgroundGroup;
    this.middleGroup = middleGroup;
    this.foregroundGroup = foregroundGroup;
    this.region = region;
    this.padding = padding;
    this.themeObject = mergeTheme({}, theme);

    this.initial();
  }

  /**
   * 添加一个组件到画布
   * @param component
   * @param layer
   * @param direction
   * @param type
   */
  public addComponent(
    component: Component,
    layer: LAYER = LAYER.MID,
    direction: DIRECTION = DIRECTION.BOTTOM,
    type: ComponentType = ComponentType.OTHER
  ) {
    this.componentOptions.push({
      component,
      layer,
      direction,
      type,
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
    this.layoutFunc = layout;
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
   * render 函数仅仅会处理 view 和子 view
   */
  public render() {
    // 递归渲染
    this.renderRecursive();
    // 实际的绘图
    this._canvasDraw();
  }

  /**
   * 递归 render views
   * 步骤非常繁琐，因为之间有一些数据依赖，所以执行流程上有先后关系
   */
  public renderRecursive() {
    // 1. 处理数据
    this._filterData();

    // 2. 初始化 Geometry
    this._initialGeometries();

    // 3. 创建 coordinate 实例
    this._createCoordinateInstance();

    // 4. 调整 scale 配置
    this._adjustScales();

    // 5. 渲染组件 component
    this._renderComponents();

    // 6.  递归 views，进行布局
    this._doLayout();

    // 7. 布局完之后，coordinate 的范围确定了，调整 coordinate 组件
    this._adjustCoordinate();

    // 8. 渲染几何标记
    this._paintGeometries();

    // 同样递归处理子 views
    _.each(this.views, (view: View) => {
      view.renderRecursive();
    });
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
  public annotation() {}

  /**
   * 坐标系配置
   */
  public coordinate(option: CoordinateOption);
  public coordinate(type: string, coordinateCfg?: CoordinateCfg);
  public coordinate(type: string | CoordinateOption, coordinateCfg?: CoordinateCfg) {
    // 提供语法糖，使用更简单
    if (_.isString(type)) {
      _.set(this.options, 'coordinate', { type, cfg: coordinateCfg } as CoordinateOption);
    } else {
      _.set(this.options, 'coordinate', type);
    }
  }

  public animate() {}

  /**
   * 设置主题
   */
  public theme(theme: string | object) {
    this.themeObject = mergeTheme(this.themeObject, theme);
  }

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

  /**
   * 创建坐标系
   * @private
   */
  public createCoordinate(bbox: BBox) {
    this.setCoordinate(createCoordinate(this.options.coordinate, bbox));
  }

  // 一些 get 方法

  /**
   * 获取坐标系
   */
  public getCoordinate() {
    return this.coordinateInstance;
  }

  /**
   * 设置新的坐标系
   * @param coordinate
   */
  public setCoordinate(coordinate: Coordinate) {
    this.coordinateInstance = coordinate;
  }

  public getTheme(): object {
    return this.themeObject;
  }

  /**
   * 获得 x 轴字段的 scale 实例
   */
  public getXScale(): Scale {
    // 拿第一个 Geometry 的 X scale
    // 隐藏逻辑：一个 view 中的 Geometry 必须 x 字段一致
    const g = this.geometries[0];
    return g ? g.getXScale() : null;
  }

  /**
   * 获取 y 轴字段的 scales 实例
   */
  public getYScales(): Scale[] {
    // 拿到所有的 Geometry 的 Y scale，然后去重
    return _.uniq(_.map(this.geometries, (g: Geometry) => g.getYScale()));
  }

  /**
   * 获得所有的 legend 对应的 attribute 实例
   */
  public getLegendAttributes(): Attribute[] {
    // FIXME util 中 flatten 的类型定义不正确
    return (_.flatten(_.map(this.geometries, (g: Geometry) => g.getLegendAttributes())) as unknown) as Attribute[];
  }

  /**
   * 获取所有的分组字段的 scales
   */
  public getGroupScales(): Scale[] {
    // 拿到所有的 Geometry 的 分组字段 scale，然后打平去重
    const scales = _.map(this.geometries, (g: Geometry) => g.getGroupScales());
    return _.uniq(_.flatten(scales));
  }

  public getCanvas(): Canvas {
    let v = this as View;

    while (true) {
      if (v.parent) {
        v = v.parent;
        continue;
      }
      break;
    }
    return ((v as unknown) as Chart).canvas;
  }
  // end Get 方法

  // 生命周期子流程——初始化流程
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

  // view 生命周期 —— 渲染流程
  /**
   * 处理筛选器，筛选数据
   * @private
   */
  private _filterData() {
    const { data, filters } = this.options;
    // 不存在 filters，则不需要进行数据过滤
    if (_.size(filters) === 0) {
      this.filteredData = data;
      return;
    }

    // 存在过滤器，则逐个执行过滤，过滤器之间是 与 的关系
    this.filteredData = _.filter(data, (datum: Datum) => {
      let filtered = true;

      _.each(filters, (filter: FilterCondition, field: string) => {
        // 只要一个不通过，就结束循环
        if (!filter(datum[field], datum)) {
          filtered = false;
          // return false === break loop
          return false;
        }
      });

      return filtered;
    });
  }

  /**
   * 初始化 Geometries
   * @private
   */
  private _initialGeometries() {
    // 实例化 Geometry，然后 view 将所有的 scale 管理起来
    _.each(this.geometries, (geometry: Geometry) => {
      geometry.scaleDefs = _.get(this.options, 'scales', {});
      geometry.data = this.filteredData;
      geometry.theme = this.themeObject;
      // 保持 scales 引用不要变化
      geometry.scales = this.scales;

      geometry.init();
    });
  }

  /**
   * 初始创建实例
   * @private
   */
  private _createCoordinateInstance() {
    // 创建实例使用 view 的大小来创建
    this.createCoordinate(this.viewBBox);
  }

  /**
   * 调整 scale 配置
   * @private
   */
  private _adjustScales() {
    // 调整目前包括：
    // 分类 scale，调整 range 范围
    this._adjustCategoryScaleRange();
  }

  /**
   * 调整分类 scale 的 range，防止超出坐标系外面
   * @private
   */
  private _adjustCategoryScaleRange() {
    const xyScales = [this.getXScale(), ...this.getYScales()].filter((e) => !!e);
    const coordinate = this.getCoordinate();
    const scaleOptions = this.options.scales;

    _.each(xyScales, (scale: Scale) => {
      // @ts-ignore
      const { field, values, isCategory, isIdentity } = scale;

      // 分类或者 identity 的 scale 才进行处理
      if (isCategory || isIdentity) {
        // 存在 value 值，且用户没有配置 range 配置
        if (values && !_.get(scaleOptions, [field, 'range'])) {
          const count = values.length;
          let range;

          if (count === 1) {
            range = [0.5, 1]; // 只有一个分类时,防止计算出现 [0.5,0.5] 的状态
          } else {
            let widthRatio = 1;
            let offset = 0;

            if (isFullCircle(coordinate)) {
              if (!coordinate.isTransposed) {
                range = [0, 1 - 1 / count];
              } else {
                widthRatio = _.get(this.theme, 'widthRatio.multiplePie', 1 / 1.3);
                offset = (1 / count) * widthRatio;
                range = [offset / 2, 1 - offset / 2];
              }
            } else {
              offset = 1 / count / 2; // 两边留下分类空间的一半
              range = [offset, 1 - offset]; // 坐标轴最前面和最后面留下空白防止绘制柱状图时
            }
          }
          // 更新 range
          scale.range = range;
        }
      }
    });
  }

  /**
   * 根据 options 配置、Geometry 字段配置，自动渲染 components
   * @private
   */
  private _renderComponents() {
    const { axes, legends } = this.options;

    this.componentOptions = [];

    // 1. axis
    this.backgroundGroup.clear();
    // 根据 Geometry 的字段来创建 axis
    _.each(createAxes(this.backgroundGroup, axes, this), (axis: ComponentOption) => {
      const { component, layer, direction, type } = axis;
      this.addComponent(component, layer, direction, type);
    });

    // 2. legend
    this.foregroundGroup.clear();
    _.each(createLegends(this.foregroundGroup, legends, this), (legend: ComponentOption) => {
      const { component, layer, direction, type } = legend;
      this.addComponent(component, layer, direction, type);
    });
  }

  private _doLayout() {
    this.layoutFunc(this);
  }

  /**
   * 调整 coordinate 的坐标范围
   * @private
   */
  private _adjustCoordinate() {
    this.coordinateInstance.update({
      start: this.coordinateBBox.bl,
      end: this.coordinateBBox.tr,
    });
  }

  /**
   * 根据 options 配置自动渲染 geometry
   * @private
   */
  private _paintGeometries() {
    // geometry 的 paint 阶段
    this.geometries.map((geometry: Geometry) => {
      // 设置布局之后的 coordinate
      geometry.coordinate = this.getCoordinate();

      geometry.paint();
    });
  }

  /**
   * canvas.draw 实际的绘制
   * @private
   */
  private _canvasDraw() {
    this.getCanvas().draw();
  }
}

/**
 * 注册 geometry 组件
 * @param name
 * @param Ctor
 */
export const registerGeometry = (name: string, Ctor: any) => {
  // 语法糖，在 view API 上增加原型方法
  View.prototype[name.toLowerCase()] = function(cfg: any = {}) {
    const props = {
      /** 图形容器 */
      container: this.middleGroup.addGroup(),
      // 其他信息，不知道需不需要
      canvas: this.canvas,
      ...cfg,
    };

    const geometry = new Ctor(props);
    this.addGeometry(geometry);

    return geometry;
  };
};
