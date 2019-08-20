import { Group } from '@antv/g';
import * as _ from '@antv/util';
import View from '../plot/view';
import { FacetData, Datum, Region } from './interface';

/**
 * facet 基类
 *  - 定义生命周期，方便自定义 facet
 *  - 提供基础的生命流程方法
 *
 * 生命周期：
 *
 * 初始化 init
 * 1. 初始化容器
 * 2. 数据分面，生成分面布局信息
 *
 * 渲染阶段 render
 * 1. view 创建
 * 2. title
 * 3. axis
 *
 * 清除阶段 clear
 * 1. 清除 view
 * 2. 清除事件
 * 3. 清除 group
 */
export abstract class Facet {
  view: View;
  cfg: any;
  container: Group;
  facets: FacetData[];
  destroyed: boolean;

  constructor(view: View, cfg: any) {
    this.view = view;
    this.cfg = cfg;

    this.init();
  }

  /**
   * 初始化过程
   */
  protected init() {
    // 初始化流程
    this.container = this._createContainer();

    // 生成分面布局信息
    const data = this.view.get('data');
    this.facets = this.generateFacets(data);
  }

  // 创建容器
  private _createContainer(): Group {
    const foregroundGroup = this.view.get('frontgroundGroup');
    return foregroundGroup.addGroup();
  }

  /**
   * 渲染分面，由上层 view 调用。包括：
   *  - 分面 view
   *  - 轴
   *  - title
   *
   *  子类可以复写，添加一些其他组件，比如滚动条等
   */
  public render() {
    this._renderViews();

    this.renderTitle();
    this.renderAxis();
  }

  /**
   * 初始化 view
   */
  private _renderViews() {
    // 先清空，再绘制
    this._clearFacetViews();
    this._createFacetViews();
  }

  /**
   * 创建 分面 view
   */
  private _createFacetViews(): View[] {
    // 使用分面数据 创建分面 view
    return this.facets.map((facet): View => {
      return this.facetToView(facet);
    });
  }

  /**
   * 从 view 中清除 facetView
   */
  private _clearFacetViews() {
    // 从 view 中移除分面 view
    _.each(this.facets, (facet) => {
      if (facet.view) {
        this.view.removeView(facet.view);
        facet.view = undefined;
      }
    });
  }

  /**
   * 根据 facet 生成 view，可以给上层自定义使用
   * @param facet
   */
  protected facetToView(facet: FacetData): View {
    const { region, data } = facet;

    const view = this.view.createView({
      start: region.start,
      end: region.end,
      padding: _.get(facet, 'padding', this.cfg.padding || 0),
    });
    // 设置分面的数据
    view.data(data || []);

    this.beforeProcessView(view, facet);

    const { eachView } = this.cfg;
    if (eachView) {
      eachView(view, facet);
    }

    this.afterProcessView(view, facet);

    // 挂载在 facet 中
    facet.view = view;

    return view;
  }

  /**
   * 清空，clear 之后如果还需要使用，需要重新调用 init 初始化过程
   * 一般在数据有变更的时候调用，重新进行数据的分面逻辑
   */
  public clear() {
    this._clearFacetViews();
  }

  /**
   * 销毁
   */
  public destroy() {
    this.clear();

    if (this.container) this.container.remove();

    this.view = undefined;
    this.facets = [];
    this.container = undefined;

    this.destroyed = true;
  }

  // override 开始处理 eachView
  protected beforeProcessView(view: View, facet: FacetData) {}

  // override 处理 eachView 之后
  protected afterProcessView(view: View, facet: FacetData) {}

  /* 生成分面数据，包含布局 */
  protected abstract generateFacets(data: Datum[]): FacetData[];

  /* 渲染 title */
  protected abstract renderTitle(): void;

  /* 渲染 axis */
  protected abstract renderAxis(): void;

  // 其他一些提供给子类使用的方法

  /**
   * 获取这个字段对应的所有值，数组
   * @protected
   * @param data 数据
   * @param field 字段名
   * @return 字段对应的值
   */
  protected getFieldValues(data: Datum[], field: string): string[] {
    const rst = [];
    const cache = {};

    // 去重、去除 Nil 值
    _.each(data, (d: Datum) => {
      const value = d[field];
      if (!_.isNil(value) && !cache[value]) {
        rst.push(value);
        cache[value] = true;
      }
    });

    return rst;
  }

  /**
   * 获得每个分面的 region，平分区域
   * @param rows
   * @param cols
   * @param xIndex
   * @param yIndex
   */
  protected getRegion(rows, cols, xIndex, yIndex): Region {
    const xWidth = 1 / (cols === 0 ? 1 : cols); // x轴方向的每个分面的偏移
    const yWidth = 1 / (rows === 0 ? 1 : rows); // y轴方向的每个分面的偏移

    const start = {
      x: xWidth * xIndex,
      y: yWidth * yIndex,
    };

    const end = {
      x: xWidth * (xIndex + 1),
      y: yWidth * (yIndex + 1),
    };

    return {
      start,
      end,
    };
  }
}
