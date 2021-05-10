import EE from '@antv/event-emitter';
import { Facet } from 'src/facet';
import { BBox } from 'src/util/bbox';
import { Geometry } from '../geometry';
import { Data, PlainObject, Region, Options } from '../types';
import { ScalePool } from '../visual/scale/pool';

/**
 * 图表容器，可以嵌套迭代。容器中主要包含有三类组件：
 * 1. 组件
 * 2. 图形
 * 3. 子容器
 */
export class View extends EE {
  /**
   * 全局唯一的 id 标识
   */
  public id: string;

  /**
   * 父节点
   */
  public parent: View;

  /**
   * 所有的子 views
   */
  public views: View[];

  /**
   * 当前 view 包含的图形 Geometry 数组
   */
  public geometries: Geometry[];

  /**
   * 当前 view 包含的组件 Component 数组
   */
  public components: any[];

  /**
   * 所有组件对应的 controller 实例
   */
  public controllers: any[];

  /**
   * 加载的交互实例
   */
  public interactions: any[];

  /**
   * view 视图的矩形位置范围
   */
  public viewBBox: BBox;

  /**
   * view.coordinate 对饮的矩形位置范围
   */
  public coordinateBBox: BBox;

  /** 三层 Group 图形中的背景层 */
  public backgroundGroup: any;

  /** 三层 Group 图形中的中间层 */
  public middleGroup: any;

  /** 三层 Group 图形中的前景层 */
  public foregroundGroup: any;

  /** 是否对超出坐标系范围的 Geometry 进行剪切 */
  public limitInPlot: boolean = false;

  /**
   * 标记 view 的大小位置范围，均是 0 ~ 1 范围，便于开发者使用，起始点为左上角。
   */
  protected region: Region;

  /** 主题配置，存储当前主题配置。 */
  protected themeObject: PlainObject;

  // 配置信息存储
  protected options: Options = {
    data: [],
    animate: true, // 默认开启动画
  }; // 初始化为空

  /** 过滤之后的数据 */
  protected filteredData: Data;

  /** 所有的 scales */
  private scalePool = new ScalePool();

  /** 生成的坐标系实例，{@link https://github.com/antvis/coord/blob/master/src/coord/base.ts|Coordinate} */
  protected coordinateInstance: any;

  /** 分面类实例 */
  protected facetInstance: Facet;

  /** 背景色样式的 shape */
  private backgroundStyleRectShape;

  /** 是否同步子 view 的 padding */
  private syncViewPadding;

  /**
   * 加入的数据
   */
  private originalData: Data;

  constructor() {
    super();
  }

  /** 初始化 View 配置 API    **************************************************** */

  /**
   * 设置数据
   * @param data 明细数据数组
   */
  public data(data: Data) {
    this.originalData = data;

    return this;
  }

  /**
   * 设置字段 scale 配置
   */
  public scale() {}

  /**
   * 设置 coordinate 配置
   */
  public coordinate() {}

  /**
   * 设置分面配置
   */
  public facet() {}

  /**
   * 设置交互
   */
  public interaction() {}

  /**
   * 设置组件 tooltip 配置
   */
  public tooltip() {}

  /**
   * 设置组件 legend 配置
   */
  public legend() {}

  /**
   * 设置组件 axis 配置
   */
  public axis() {}

  /**
   * 设置组件 slider 配置
   */
  public slider() {}

  /**
   * 设置组件 scrollbar 配置
   */
  public scrollbar() {}

  /**
   * 设置组件 timeline 配置
   */
  public timeline() {}

  /**
   * 是否开启动画
   */
  public animation() {}

  /** 创建 Geometry 的 API       ********************************************** */

  public line() {}

  public point() {}

  public interval() {}

  public area() {}

  public polygon() {}

  public edge() {}

  /** 生命周期的 API 函数     ************************************** */

  /**
   * 初始化
   */
  public init() {}

  /**
   * 渲染（异步）
   */
  public async render() {
    // do render
  }

  /**
   * 销毁
   */
  public destroy() {}

  /** Get 数据的一些 API，做自定义的数据来源   ******************************************* */

  /**
   * 获得所有的 scale 数组信息
   */
  public getScales() {}

  /**
   * 获得某一个字段的 scale
   * @param field 字段 id
   */
  public getScale(field: string) {}

  /**
   * 获取实际展示在画布中的数据（经过过滤后的）
   */
  public getData() {}

  /**
   * 获取原始传入的数据
   */
  public getOriginalData() {}

  /** 数据操作的一些 API  **************************************** */

  /**
   * 进行数据的过滤（数据分析：筛选、过滤）
   */
  public filter() {}

  /**
   * 更新数据（数据分析：下钻）
   */
  public changeData() {}

  /**
   *  设置数据的状态（数据分析：联动）
   */
  public state() {}
}
