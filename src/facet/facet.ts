import * as _ from '@antv/util';
import View from '../chart/view';
import { LAYER } from '../constant';
import { IGroup } from '../dependents';
import { Datum, Region } from '../interface';
import { FacetCfg, FacetComponent, FacetData } from './interface';

/**
 * facet 基类
 *  - 定义生命周期，方便自定义 facet
 *  - 提供基础的生命流程方法
 *
 * 生命周期：
 *
 * 初始化 initial
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
 *
 * 销毁阶段 destroy
 * 1. clear
 * 2. 清除事件
 * 3. 清除 group
 */
export default abstract class Facet<C extends FacetCfg = FacetCfg, F extends FacetData = FacetData> {
  /** 分面所在的 view */
  public view: View;
  /** 分面容器 */
  public container: IGroup;

  /** 分面的配置项 */
  protected cfg: C;
  /** 分面之后的所有分面数据结构 */
  protected facets: F[] = [];
  /** 存储四个方向的组件 */
  protected components: FacetComponent[] = [];
  /** 是否销毁 */
  protected destroyed: boolean = false;

  constructor(view: View, cfg: C) {
    this.view = view;
    this.cfg = cfg;
  }

  /**
   * 初始化过程
   */
  public initial() {
    // 初始化容器
    this.container = this.createContainer();

    // 生成分面布局信息
    const data = this.view.getData();
    this.facets = this.generateFacets(data);
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
    // 1. add facet component into parent view
    this.renderFacetComponents();
    // 2. layout facet components
    this.layoutFacetComponents();
    // 3. render facet children views
    this.renderViews();
  }

  /**
   * 清空，clear 之后如果还需要使用，需要重新调用 init 初始化过程
   * 一般在数据有变更的时候调用，重新进行数据的分面逻辑
   */
  public clear() {
    this.clearFacetViews();
  }

  /**
   * 销毁
   */
  public destroy() {
    this.clear();

    if (this.container) {
      this.container.remove(true);
      this.container = undefined;
    }

    this.destroyed = true;
    this.view = undefined;
    this.facets = [];
  }

  /**
   * 根据 facet 生成 view，可以给上层自定义使用
   * @param facet
   */
  protected facetToView(facet: F): View {
    const { region, data, padding = this.cfg.padding } = facet;

    const view = this.view.createView({
      region,
      padding,
    });

    // 设置分面的数据
    view.data(data || []);

    // 前置钩子
    this.beforeEachView(view, facet);

    const { eachView } = this.cfg;
    if (eachView) {
      eachView(view, facet);
    }
    // 后置钩子
    this.afterEachView(view, facet);

    return view;
  }

  // 创建容器
  private createContainer(): IGroup {
    const foregroundGroup = this.view.getLayer(LAYER.FORE);
    return foregroundGroup.addGroup();
  }

  /**
   * 初始化 view
   */
  private renderViews() {
    // 先清空，再绘制
    this.clearFacetViews();
    this.createFacetViews();
  }

  /**
   * 创建 分面 view
   */
  private createFacetViews(): View[] {
    // 使用分面数据 创建分面 view
    return this.facets.map(
      (facet): View => {
        return this.facetToView(facet);
      }
    );
  }

  /**
   * 从 view 中清除 facetView
   */
  private clearFacetViews() {
    // 从 view 中移除分面 view
    _.each(this.facets, (facet) => {
      if (facet.view) {
        this.view.removeView(facet.view);
        facet.view = undefined;
      }
    });
  }

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
    const cache: Record<string, boolean> = {};

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
  protected getRegion(rows: number, cols: number, xIndex: number, yIndex: number): Region {
    // x, y 方向均分 100% 宽高
    const xRatio = 1 / (cols === 0 ? 1 : cols);
    const yRatio = 1 / (rows === 0 ? 1 : rows);

    const start = {
      x: xRatio * xIndex,
      y: yRatio * yIndex,
    };

    const end = {
      x: xRatio * (xIndex + 1),
      y: yRatio * (yIndex + 1),
    };

    return {
      start,
      end,
    };
  }

  /**
   * @override 开始处理 eachView
   * @param view
   * @param facet
   */
  protected abstract beforeEachView(view: View, facet: F);

  /**
   * @override 处理 eachView 之后
   * @param view
   * @param facet
   */
  protected abstract afterEachView(view: View, facet: F);

  /**
   * @override 生成分面数据，包含布局
   * @param data
   */
  protected abstract generateFacets(data: Datum[]): F[];

  /**
   * 根据 facets 数据，生成 facet Component 内容
   */
  protected abstract renderFacetComponents(): void;

  /**
   * 布局 facets components 内容
   */
  protected abstract layoutFacetComponents(): void;
}
