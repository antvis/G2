import { deepMix, each, every, get, isNil, isNumber } from '@antv/util';
import { LAYER } from '../constant';
import { IGroup } from '../dependents';
import { AxisCfg, Condition, Datum, FacetCfg, FacetData, FacetDataFilter, Region } from '../interface';

import View from '../chart/view';
import { getAxisOption } from '../util/axis';

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
 *
 * 销毁阶段 destroy
 * 1. clear
 * 2. 清除事件
 * 3. 清除 group
 */
export abstract class Facet<C extends FacetCfg<FacetData> = FacetCfg<FacetData>, F extends FacetData = FacetData> {
  /** 分面所在的 view */
  public view: View;
  /** 分面容器 */
  public container: IGroup;
  /** 是否销毁 */
  public destroyed: boolean = false;

  /** 分面的配置项 */
  protected cfg: C;
  /** 分面之后的所有分面数据结构 */
  protected facets: F[] = [];

  constructor(view: View, cfg: C) {
    this.view = view;
    this.cfg = deepMix({}, this.getDefaultCfg(), cfg);
  }

  /**
   * 初始化过程
   */
  public init() {
    // 初始化容器
    if (!this.container) {
      this.container = this.createContainer();
    }

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
    this.renderViews();
  }

  /**
   * 更新 facet
   */
  public update() {
    // 其实不用做任何事情，因为 facet 最终生成的 View 和 Geometry 都在父 view 的更新中处理了
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
    facet.view = view;

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
    this.createFacetViews();
  }

  /**
   * 创建 分面 view
   */
  private createFacetViews(): View[] {
    // 使用分面数据 创建分面 view
    return this.facets.map((facet): View => {
      return this.facetToView(facet);
    });
  }

  /**
   * 从 view 中清除 facetView
   */
  private clearFacetViews() {
    // 从 view 中移除分面 view
    each(this.facets, (facet) => {
      if (facet.view) {
        this.view.removeView(facet.view);
        facet.view = undefined;
      }
    });
  }

  /**
   * 解析 spacing
   */
  private parseSpacing() {
    /**
     * @example
     *
     * // 仅使用百分比或像素值
     * // 横向间隔为 10%，纵向间隔为 10%
     * ['10%', '10%']
     * // 横向间隔为 10px，纵向间隔为 10px
     * [10, 10]
     *
     * // 同时使用百分比和像素值
     * ['10%', 10]
     * // 横向间隔为 10%，纵向间隔为 10px
     */
    const { width, height } = this.view.viewBBox;
    const { spacing } = this.cfg;
    return spacing.map((s: number, idx: number) => {
      if (isNumber(s)) return s / (idx === 0 ? width : height);
      else return parseFloat(s) / 100;
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
    each(data, (d: Datum) => {
      const value = d[field];
      if (!isNil(value) && !cache[value]) {
        rst.push(value);
        cache[value] = true;
      }
    });

    return rst;
  }

  /**
   * 获得每个分面的 region，平分区域
   * @param rows row 总数
   * @param cols col 总数
   * @param xIndex x 方向 index
   * @param yIndex y 方向 index
   */
  protected getRegion(rows: number, cols: number, xIndex: number, yIndex: number): Region {
    const [xSpacing, ySpacing] = this.parseSpacing();
    // 每两个分面区域横向间隔xSPacing, 纵向间隔ySpacing
    // 每个分面区域的横纵占比
    /**
     * ratio * num + spacing * (num - 1) = 1
     * => ratio = (1 - (spacing * (num - 1))) / num
     *          = (1 + spacing) / num - spacing
     *
     * num 对应 cols/rows
     * spacing 对应 xSpacing/ySpacing
     */
    const xRatio = (1 + xSpacing) / (cols === 0 ? 1 : cols) - xSpacing;
    const yRatio = (1 + ySpacing) / (rows === 0 ? 1 : rows) - ySpacing;

    // 得到第 index 个分面区域百分比位置
    const start = {
      x: (xRatio + xSpacing) * xIndex,
      y: (yRatio + ySpacing) * yIndex,
    };
    const end = {
      x: start.x + xRatio,
      y: start.y + yRatio,
    };
    return { start, end };
  }

  protected getDefaultCfg() {
    return {
      eachView: undefined,
      showTitle: true,
      spacing: [0, 0],
      padding: 10,
      fields: [],
    };
  }

  /**
   * 默认的 title 样式，因为有的分面是 title，有的分面配置是 columnTitle、rowTitle
   */
  protected getDefaultTitleCfg() {
    // @ts-ignore
    const fontFamily = this.view.getTheme().fontFamily;
    return {
      style: {
        fontSize: 14,
        fill: '#666',
        fontFamily,
      },
    };
  }

  /**
   * 处理 axis 的默认配置
   * @param view
   * @param facet
   */
  protected processAxis(view: View, facet: F) {
    const options = view.getOptions();

    const coordinateOption = options.coordinate;
    const geometries = view.geometries;

    const coordinateType = get(coordinateOption, 'type', 'rect');

    if (coordinateType === 'rect' && geometries.length) {
      if (isNil(options.axes)) {
        // @ts-ignore
        options.axes = {};
      }
      const axes = options.axes;

      const [x, y] = geometries[0].getXYFields();

      const xOption = getAxisOption(axes, x);
      const yOption = getAxisOption(axes, y);

      if (xOption !== false) {
        options.axes[x] = this.getXAxisOption(x, axes, xOption, facet);
      }

      if (yOption !== false) {
        options.axes[y] = this.getYAxisOption(y, axes, yOption, facet);
      }
    }
  }

  /**
   * 获取分面数据
   * @param conditions
   */
  protected getFacetDataFilter(conditions: Condition[]): FacetDataFilter {
    return (datum: Datum) => {
      // 过滤出全部满足条件的数据
      return every(conditions, (condition) => {
        const { field, value } = condition;

        if (!isNil(value) && field) {
          return datum[field] === value;
        }
        return true;
      });
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
   * 获取 x 轴的配置
   * @param x
   * @param axes
   * @param option
   * @param facet
   */
  protected abstract getXAxisOption(x: string, axes: any, option: AxisCfg, facet: F): object;

  /**
   * 获取 y 轴的配置
   * @param y
   * @param axes
   * @param option
   * @param facet
   */
  protected abstract getYAxisOption(y: string, axes: any, option: AxisCfg, facet: F): object;
}
