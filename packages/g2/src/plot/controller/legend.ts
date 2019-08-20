/**
 * @description legend 的控制器
 */
import * as _ from '@antv/util';
import { Group, BBox } from '@antv/g';
import { Legend, Color, Size, CanvasCategory, HtmlCategory } from '@antv/component/lib/legend';
import { ContinuousItem, EventType } from '@antv/component/lib/interface';
import { Label } from '@antv/component';
import { Attribute, Scale } from '../../dependents';
import View from '../view';
import { Element } from '../../element';
import  { getShapeFactory }  from '../../element/shape/base';
import {
  LegendsOption,
  LegendOption,
  ThemeOption,
  SubRegion,
  Region,
} from '../interface';
import { ShapeMarkerCfg } from '../../interface';

const MARKER_SIZE = 4.5;
const STROKE_MARKERS = [
  'cross',
  'tick',
  'plus',
  'hyphen',
  'line',
  'hollowCircle',
  'hollowSquare',
  'hollowDiamond',
  'hollowTriangle',
  'hollowTriangleDown',
  'hollowHexagon',
  'hollowBowtie',
];
/**
 * legend 的 controller，需要承载：
 *  - 从 plot 配置中，生成 legend 实例的逻辑。
 *  - 响应 legend 的事件，做对应的响应
 *
 * 设计使用方法如下：
 *
 * const legendController = new LegendController({
 *   view: View,
 *   theme: {},
 * });
 *
 * // 在合适的时机，初始化，构造
 * legendController.render();
 *
 * // 清空，销毁 legends
 * legendController.clear();
 */

export interface LegendControllerCfg {
  readonly view: View;
}

export type Value = number | string;

const findTargetScale = (scales: Scale[], compareScale: Scale): Scale => {
  return _.find(scales, (scale: Scale) => {
    const scaleValues = [].concat(scale.values);
    const compareScaleValues = [].concat(compareScale.values);
    return scale.type === compareScale.type &&
      scale.field === compareScale.field &&
      _.isEqual(scaleValues.sort(), compareScaleValues.sort());
  });
};

export default class LegendController {

  private view: View;
  // plot 上的属性
  private options: LegendOption;
  private panelRange: BBox;
  private viewRange: BBox;
  private container: Group;
  private totalRegion: Region;

  private theme:ThemeOption | null;

  // 类内部属性
  // 生成的所有 legend 实例
  private legends: Legend[] = [];
  [key:string]:any;

  constructor(cfg: LegendControllerCfg) {
    const { view } = cfg;

    this.view = view;
    this.theme = view.get('theme');
    // 需要用到 plot 的属性，在这里先定义出来
  }

  /**
   * 初始化 legend 相关的属性
   */
  private init() {
    this.options = this.getLegendOptions();
    this.panelRange = this.view.get('panelRange') as BBox;
    this.viewRange = this.view.get('viewRange') as BBox;
    this.container = this.view.get('frontgroundGroup');
  }

  /**
   * 生成并渲染 legend
   */
  public render() {
    this.clear();

    const legendOptions = this.options;
    // 没有关闭实例
    if (_.isObject<LegendsOption>(legendOptions)) {
      // 用户自定义图例
      if (legendOptions.custom) {
        const legend = this.addCustomLegend();
        this.legends.push(legend);
      } else {
        const elements = this.view.getElements();
        const scales = [];
        _.each(elements, (element: Element) => {
          const view = element.get('view') as View;
          const attrs = element.getAttrsForLegend();
          _.each(attrs, (attr: Attribute) => {
            const type = attr.type;

            const scale = attr.getScale(type);
            if (scale && scale.field && scale.type !== 'identity' && !findTargetScale(scales, scale)) {
              scales.push(scale);
              const filteredValues = view.getFilteredOutValues(scale.field);
              const legend = this.addLegend(legendOptions as LegendsOption, scale, attr, element, filteredValues);
              // 创建成功，则放入到数组中
              if (legend) this.legends.push(legend);
            }
          });
        });
      }
      this.alignLegends();
    }
  }

  /**
   * todo 显示隐藏图例
   * @param visible
   */
  public changeVisible(visible: boolean) {
    _.each(this.legends, (legend) => {
      /* legend 暂不支持这个方法 */
      // legend.changeVisible(visible);
    });
  }

  /**
   * 清空，销毁生成的 legend
   */
  public clear() {
    // 1. 销毁 Legends 实例
    _.each(this.legends, (legend: Legend) => {
      legend.destroy();
    });
    this.legends = [];

    // 2. 重置配置
    this.reset();
  }

  /**
   * 重置配置项
   */
  public reset() {
    this.init();
  }

  /**
   * 根据相关的配置，添加一个图例
   * @param legendOptions
   * @param scale
   * @param attr
   * @param element
   * @param filteredValues
   */
  private addLegend(
    legendOptions: LegendsOption, scale: Scale, attr: Attribute, element: Element, filteredValues: Value[],
  ): Legend {
    const field = scale.field;
    const fieldOption = legendOptions.fields && legendOptions.fields[field];
    if (fieldOption === false) { // 用户关闭 field 对应的图例
      return;
    }

    // 自定义图例
    if (fieldOption && (<LegendOption>fieldOption).custom) {
      return this.addCustomLegend(field);
    }

    /**
     * 其他情况为连续或者分类图例的创建过程
     * 取 position 逻辑：
     * 1. 如果 field 上有，则取 field 上的
     * 2. 如果 field 上没有，则取全局的 legendOption.position
     * 3. 如果全局也没有配置，那么给一个默认值，从主题上取
     */
    let position = this.getFieldLegendConfig(field, 'position', this.theme.defaultLegendPosition);
    position = this.adjustPosition(position);
    const legend = scale.isLinear ?
      this.addContinuousLegend(scale, attr, position) :
      this.addCategoryLegend(scale, attr, element, filteredValues, position);
    if (legend) {
      this.bindHoverEvent(legend, field);
    }
    return legend;
  }

  /**
   * 添加连续图例
   * @param scale
   * @param attr
   * @param position
   */
  private addContinuousLegend(scale: Scale, attr: Attribute, position: string): Legend {
    const container = this.container.addGroup({ name: 'legend' });
    const field = scale.field;
    const ticks = scale.getTicks();

    // 构造图例的 items
    const items: ContinuousItem[] = _.map(ticks, (tick): ContinuousItem => {
      const value = tick.value; // scale 后的值
      const tickValue = tick.tickValue; // tick text value
      const originalValue = scale.invert(value); // original value
      const attrValue = attr.mapping(originalValue).join('');

      return {
        value: tickValue, // tick.text
        color: attrValue,
      };
    });

    const containsMinValue = !!_.find(ticks, (tick) => tick.value === 0);
    const containsMaxValue = !!_.find(ticks, (tick) => tick.value === 1);
    if (!containsMinValue) {
      const attrValue = attr.mapping(0).join('');
      items.push({
        value: scale.min,
        color: attrValue,
      });
    }

    if (!containsMaxValue) {
      const attrValue = attr.mapping(0).join('');
      items.push({
        value: scale.max,
        color: attrValue,
      });
    }

    const legendOptions = this.options;

    const positionArr = position.split('-');
    const defaultCfg = this.theme.legend[positionArr[0]]; // 获取默认的图例主题配置

    const legendCfg = _.deepMix({}, defaultCfg, this.getFieldLegendOption(field, legendOptions), {
      items,
      attr,
      formatter: scale.formatter,
      container,
      position,
    });

    if (legendCfg.showTitle) {
      _.mix(legendCfg, { title: scale.field });
    }

    let legend;
    if (attr.type === 'color') {
      legend = new Color(legendCfg);
    } else if (attr.type === 'size') {
      legend = new Size(legendCfg);
    } else {
      return;
    }

    this.bindFilterEvent(legend, scale);

    return legend;
  }

  /**
   * 添加分类图例
   * @param scale
   * @param attr
   * @param element
   * @param filteredValues
   * @param position
   */
  private addCategoryLegend(
    scale: Scale, attr: Attribute, element: Element, filteredValues: Value[], position: string,
  ): Legend {
    const legendOptions = this.options as LegendsOption;
    const field = scale.field;
    const fieldOption = legendOptions.fields ? legendOptions.fields[field] as LegendOption : null;
    const items = [];
    const ticks = scale.getTicks();
    let isByAttr = true;
    let shapeType = element.get('shapeType') || 'point';
    let shape = element.getDefaultValue('shape') || shapeType || 'point';
    if (legendOptions.marker) { // 用户全局自定义图例的marker
      shape = legendOptions.marker;
      shapeType = 'point';
      isByAttr = false;
    }
    if (fieldOption && fieldOption.marker) { // 用户自定义图例的marker
      shape = fieldOption.marker;
      shapeType = 'point';
      isByAttr = false;
    }
    const view = this.view;
    const viewTheme = this.theme;
    const canvas = view.get('canvas');
    const panelRange = this.panelRange;
    const viewRange = this.viewRange;
    const posArray = position.split('-');
    const maxLength = (posArray[0] === 'right' || posArray[0] === 'left')  // TODO
    ? panelRange.height : viewRange.width;
    _.each(ticks, (tick) => {
      const text = tick.text;
      const name = text;
      const scaleValue = tick.value;
      const value = scale.invert(scaleValue);
      const cfg: ShapeMarkerCfg = {
        isInCircle: element.isInCircle(),
      };
      const checked = filteredValues ? this.isFiltered(scale, filteredValues, value) : true;
      const colorAttr = element.getAttr('color');
      const shapeAttr = element.getAttr('shape');
      if (colorAttr) { // 存在颜色映射
        if (colorAttr.callback && colorAttr.callback.length > 1) { // 多参数映射，阻止程序报错
          const restArgs = Array(colorAttr.callback.length - 1).fill('');
          cfg.color = colorAttr.mapping(value, ...restArgs).join('') || viewTheme.defaultColor;
        } else {
          cfg.color = colorAttr.mapping(value).join('') || viewTheme.defaultColor;
        }
      }
      if (isByAttr && shapeAttr && shapeAttr.scales.length) { // 存在形状映射
        if (shapeAttr.callback && shapeAttr.callback.length > 1) { // 多参数映射，阻止程序报错
          const restArgs = Array(shapeAttr.callback.length - 1).fill('');
          shape = shapeAttr.mapping(value, ...restArgs).join('');
        } else {
          shape = shapeAttr.mapping(value).join('');
        }
      }
      const shapeObject  = getShapeFactory(shapeType);
      const marker = shapeObject.getMarkerStyle(shape, cfg);
      // 补充 marker 为自定义形状场景。
      if (_.isFunction(shape)) {
        marker.symbol = shape;
      }
      items.push({
        value: name, // 图例项显示文本的内容
        dataValue: value, // 图例项对应原始数据中的数值
        checked,
        marker,
      });
    });

    const useHtml = !!legendOptions.useHtml || !!(fieldOption && fieldOption.useHtml);
    let defaultLegendCfg;
    let layout;
    let maxWidth;
    let maxHeight;

    switch (posArray[0]) {
      case 'left':
          /*maxHeight = viewRange.height;
          maxWidth = panelRange.x - viewRange.x;*/
        maxHeight = panelRange.height;
        maxWidth = panelRange.x - viewRange.x;
        layout = 'vertical';
        break;
      case 'right':
          /*maxHeight = viewRange.height;
          maxWidth = viewRange.tr.x - panelRange.tr.x;*/
        maxHeight = panelRange.height;
        maxWidth = viewRange.tr.x - panelRange.tr.x;
        layout = 'vertical';
        break;
      case 'top':
          /*maxHeight = panelRange.tr.y - viewRange.tr.y;
          maxWidth = viewRange.width;*/
        maxHeight = panelRange.tr.y - viewRange.tr.y;
        maxWidth = viewRange.width;
        layout = 'horizontal';
        break;
      case 'bottom':
          /*maxHeight = viewRange.br.y - panelRange.br.y;
          maxWidth = viewRange.width;*/
        maxHeight = viewRange.br.y - panelRange.br.y;
        maxWidth = viewRange.width;
        layout = 'horizontal';
        break;
      default:
        break;
    }
    if (useHtml) {
      defaultLegendCfg = _.mix({}, viewTheme.legend.html, {
        maxHeight,
        maxWidth,
        layout,
      });
    } else {
      defaultLegendCfg = _.mix({}, viewTheme.legend[posArray[0]], {
        maxHeight,
        maxWidth,
        layout,
        container: this.container.addGroup({ name: 'legend' }),
      });
    }

    const legendCfg = _.deepMix({}, defaultLegendCfg, legendOptions, fieldOption, {
      maxLength,
      canvas,
      items,
      position,
    });
    if (legendCfg.showTitle) {
      _.mix(legendCfg, {
        title: scale.alias || scale.field,
      });
    }
    const legend = useHtml ?
     new HtmlCategory(legendCfg) :
      new CanvasCategory(legendCfg);

    this.bindClickEvent(legend, scale, filteredValues, legendCfg.onClick);
    return legend;
  }

  /**
   * 添加自定义图例
   * @param field
   */
  private addCustomLegend(field?: string): Legend {
    const viewTheme = this.theme;
    const view = this.view;
    const container = this.container.addGroup({ name: 'legend' });
    const canvas = container.get('canvas');
    const panelRange = this.panelRange;
    const legendOptions = this.options as LegendsOption;
    let fieldOption;
    if (_.isObject(legendOptions)) {
      fieldOption = legendOptions.fields ? legendOptions.fields[field] as LegendOption : {};
    }
    let position = fieldOption.position || legendOptions.position || viewTheme.defaultLegendPosition;
    position = this.adjustPosition(position);
    const items = fieldOption.items || legendOptions.items;
    if (!items) {
      return;
    }
    _.each(items, (item:any) => {
      if (!_.isPlainObject(item.marker)) { // 直接传入字符串或者回调函数时转换为对象，如 item.marker = 'circle'
        item.marker = {
          symbol: item.marker || 'circle',
          radius: MARKER_SIZE,
        };
        if (_.contains(STROKE_MARKERS, item.marker.symbol)) { // 支持描边 marker 的绘制
          item.marker.stroke = item.color;
        } else {
          item.marker.fill = item.color;
        }
      } else { // 用户传入对象 item.marker = { symbol: 'circle', fill: 'red', radius: 3 }
        item.marker.radius = item.marker.radius || MARKER_SIZE;
      }
      const symbol = item.marker.symbol;
      if (_.isString(symbol) && symbol.indexOf('hollow') !== -1) { // 支持 hollowCircle 等
        item.marker.symbol = _.lowerFirst(symbol.substr(6));
      }

      item.checked = _.isNil(item.checked) ? true : item.checked;
    });
    const posArray = position.split('-');
    const maxLength =
     (posArray[0] === 'right' || posArray[0] === 'left') ? panelRange.height : this.viewRange.width;
    const legendCfg = _.deepMix({}, viewTheme.legend[posArray[0]], legendOptions, fieldOption, {
      maxLength,
      viewTheme,
      items,
      container,
      canvas,
    });
    const useHtml = !!legendCfg.useHtml;

    const legend = useHtml ?
    new HtmlCategory(legendCfg) :
      new CanvasCategory(legendCfg);

    legend.on('itemclick', (ev: EventType) => {
      if (legendOptions.onClick) { // 用户自定义图例点击事件
        legendOptions.onClick(ev);
      }
    });
    this.bindHoverEvent(legend); // 用户自定义 hover 图例项的事件交互
    return legend;
  }

  /**
   * 根据 position 布局图例位置，将图例 moveTo 到对应的位置
   */
  private alignLegends() {
    const totalRegion = this.getRegion();
    this.totalRegion = totalRegion;
    const legendGroup = this.groupLegendByPosition();
    let i = 0;
    _.each(legendGroup, (legendItems:Legend[], position:string) => {
      const region = totalRegion.subs[i];
      _.each(legendItems, (legend:Legend, index:number) => {
        const pre = legendItems[index - 1];
        // if (!(legend.get('useHtml') && !legend.get('autoPosition'))) {
        this.alignLegend(legend, pre, region, position);
        // }
      });
      i++;
    });
  }

  /**
   * 布局某些方法需要根据view的方法来写
   * @param legend
   * @param pre
   * @param region
   * @param position
   */
  private alignLegend(legend: Legend, pre: Legend, region: SubRegion, position: string) {
    const viewTheme = this.theme;
    const width = this.viewRange.width;
    let height = this.viewRange.height;
    const totalRegion = this.totalRegion;
    const legendGroup = this.groupLegendByPosition();
    const backPlot = this.viewRange; // 背景 BBox
    const offsetX = legend.get('offsetX') || 0;
    const offsetY = legend.get('offsetY') || 0;
    const legendHeight = legend.getHeight();
    const legendWidth = legend.getWidth();
    const borderMargin = viewTheme.legend.margin;
    const innerMargin = viewTheme.legend.legendMargin;
    const legendNum = legendGroup[position].length;
    const posArray = position.split('-');
    let x = 0;
    let y = 0;
    const tempoRegion = (legendNum > 1) ? totalRegion : region;
    if (posArray[0] === 'left' || posArray[0] === 'right') {
      height = backPlot.maxY;
      x = this.getXAlign(posArray[0], width, region, backPlot, legendWidth, borderMargin);
      if (pre) {
        const preY =  pre.get('y');
        y = preY + pre.getHeight() + innerMargin;
      } else {
        y = this.getYAlignVertical(posArray[1], height, tempoRegion, backPlot, 0, borderMargin, this.viewRange.height);
      }
    } else if (posArray[0] === 'top' || posArray[0] === 'bottom') {
      y = this.getYAlignHorizontal(posArray[0], height, region, backPlot, legendHeight, borderMargin);
      if (pre) {
        const preWidth = pre.getWidth();
        const preX = pre.get('x');
        x = preX + preWidth + innerMargin;
      } else {
        x = this.getXAlign(posArray[1], width, tempoRegion, backPlot, 0, borderMargin);
        if (posArray[1] === 'right') x = backPlot.maxX - tempoRegion.totalWidth;
      }
    }

    legend.moveTo(x + offsetX, y + offsetY);
  }

  // @ts-ignore
  private getXAlign(
    pos:string, width:number, region:SubRegion | Region, backPlot: BBox, legendWidth:number, borderMargin:number) {
    let x = pos === 'left' ? backPlot.minX + borderMargin[3] : backPlot.maxX - borderMargin[1] - legendWidth;
    if (pos === 'center') {
      x = (width - region.totalWidth) / 2;
    }
    return x;
  }

  private getYAlignHorizontal(pos:string, height:number, region, backPlot, legendHeight, borderMargin) {
    const y = (pos === 'top') ? backPlot.minY + borderMargin[0] : backPlot.maxY - borderMargin[2] - legendHeight;
    return y;
  }

  private getYAlignVertical(pos, height, region, backPlot, legendHeight, borderMargin, canvasHeight) {
    let y = (pos === 'top') ? backPlot.minY + borderMargin[0] : backPlot.maxY - region.totalHeight - borderMargin[2];
    if (pos === 'center') {
      // y = (canvasHeight - region.totalHeight) / 2;
      y = backPlot.minY + (backPlot.height - region.totalHeight) / 2;
    }
    return y;
  }

  private adjustPosition(position: string) {
    const positionArr: string[] = position.split('-');

    if (positionArr.length === 1) {
      const pos = positionArr[0];

      return pos === 'left' ? 'left-bottom' :
        pos === 'right' ? 'right-bottom' :
          pos === 'top' ? 'top-center' :
            pos === 'bottom' ? 'bottom-center' : '';
    }
    return positionArr.slice(0, 2).join('-');
  }

  private bindClickEvent(legend:Legend, scale:Scale, filteredValues:Value[], onClick) {
    const view = this.view;
    const field = scale.field;

    legend.on('itemclick', (ev:EventType) => {
      if (onClick) { // 用户自定义图例点击交互行为
        onClick(ev);
      } else {
        const item = ev.item;
        const checked = ev.checked;
        const isSingeSelected = legend.get('selectedMode') === 'single'; // 图例的选中模式
        const clickedValue = item.dataValue; // import: 需要取该图例项原始的数值
        if (checked) {
          _.pull(filteredValues, clickedValue);
          if (this.isFieldInView(field, clickedValue)) {
            view.filter(field, (field:Value) => {
              return isSingeSelected ? field === clickedValue : !_.contains(filteredValues, field);
            });
          }
        } else if (!isSingeSelected) { // 未选中状态
          filteredValues.push(clickedValue);
          if (this.isFieldInView(field, clickedValue)) {
            view.filter(field, (field:Value) => {
              return !_.contains(filteredValues, field);
            });
          }
        }
        view.set('keepLegend', true); // 图例不重新渲染
        // view.set('keepPadding', true); // 边框不重新计算
        view.repaint(); // 在动画开启的状态下，图例过滤会触发更新动画，需要设置 view.set('isUpdate', true);
        // view.set('keepPadding', false);
        view.set('keepLegend', false);
      }
    });
  }

  /* 图例的 hover 事件 */
  private bindHoverEvent(legend: Legend, field?: string) {
    const onMouseover = legend.get('onMouseover');
    const onMouseleave = legend.get('onMouseleave');

    legend.on('itemmouseover', (ev) => {
      if (onMouseover) { // 由用户自定义 onHover 交互行为
        onMouseover(ev);
      }
    });

    legend.on('itemmouseleave', (ev) => {
      if (onMouseleave) {
        onMouseleave(ev);
      }
    });
  }

  private getRegion():Region {
    const theme = this.theme;
    const innerMargin = theme.legend.legendMargin;
    const subs = [];
    let totalWidth = 0;
    let totalHeight = 0;
    const legendGroup = this.groupLegendByPosition();
    _.each(legendGroup, (legendItems: Legend[]) => {
      const subRegion = this.getSubRegion(legendItems);
      subs.push(subRegion);
      totalWidth += (subRegion.totalWidth + innerMargin);
      totalHeight += (subRegion.totalHeight + innerMargin);
    });
    return {
      totalWidth,
      totalHeight,
      subs,
    };
  }

  private getSubRegion(legends: Legend[]):SubRegion {
    let maxWidth = 0;
    let maxHeight = 0;
    let totalWidth = 0;
    let totalHeight = 0;
    _.each(legends, (legend: Legend) => {
      const width = legend.getWidth();
      const height = legend.getHeight();
      if (maxWidth < width) {
        maxWidth = width;
      }
      totalWidth += width;
      if (maxHeight < height) {
        maxHeight = height;
      }
      totalHeight += height;
    });
    return {
      maxWidth,
      totalWidth,
      maxHeight,
      totalHeight,
    };
  }

  private isFiltered(scale:Scale, filterVals:Value[], scaleValue:number) {
    if (!scale.isCategory) {
      return true;
    }
    let rst = true;
    _.each(filterVals, (val:Value) => {
      if (scale.getText(val) === scale.getText(scaleValue)) {
        rst = false;
        return false;
      }
    });
    return rst;
  }
  private isFieldInView(field:string, value:Value) {
    let flag = false;

    const scales = this.view.get('scales');
    const fieldScale = scales[field];
    if (fieldScale && fieldScale.values) {
      flag = _.contains(fieldScale.values, value);
    }

    return flag;
  }

  private getLegendOptions(): LegendOption {
    return _.get(
      this.view.get('options'),
      'legends',
      {}, // 默认为空
    );
  }

  /**
   * 拿某一个字段上图例的配置，举例 position
   * 如果 field 上拿不到则使用 全局的，如果全局也没有，那么使用主题配置的默认
   * @param key
   * @param filed
   * @param defaultValue
   */
  private getFieldLegendConfig(filed: string, key: string, defaultValue: any): any {
    const legendOptions = this.options;
    const fieldOption = _.get(legendOptions, `fields.${filed}`, {}) as LegendOption;

    return fieldOption[key] ? fieldOption[key] :
      legendOptions[key] ? legendOptions[key] :
        defaultValue;
  }

  /**
   * 连续图例，监听 item filter 事件
   * @param legend
   * @param scale
   */
  private bindFilterEvent(legend: Legend, scale: Scale) {
    const field = scale.field;
    legend.on('itemfilter', ({ range }) => {
      const [ min, max ] = range;

      // 根据 legend 范围来
      this.filterShape(field, min, max);

      // todo heatmap 特殊逻辑
      // const elements = this.view.getElements();
      // _.each(elements, (element: Element) => {
      //   if (element.get('type') === 'heatmap') {
      //     _.requestAnimationFrame(() => {
      //       element.drawWithRange(range);
      //     });
      //   }
      // });
    });
  }

  /**
   * 过滤 view 中的 shape，超过范围的隐藏，范围内的显示
   * @param field 字段
   * @param min 最小值
   * @param max 最大值
   */
  private filterShape(field: string, min: number, max: number) {
    const callback = (record, shape, element, view) => {
      const v = record[field];
      if (_.isNil(v)) {
        shape.show();
      } else {
        const visible = (v >= min && v <= max);
        // shape 带 label，则还需要隐藏 label
        this.filterLabels(shape, element, visible);
        // 显示还是隐藏 shape
        visible ? shape.show() : shape.hide();
      }
    };

    // 针对 view 中的每一个 shape 执行 callback
    this.view.eachShape(callback);
  }

  /**
   * 根据位置进行图例分类
   * @param position 图例位置
   */
  private groupLegendByPosition() {

    return _.groupBy(this.legends, (legend: Legend) => legend.get('position'));
  }

  /**
   * 处理 shape 上的 label 显示还是隐藏
   * @param shape
   * @param element
   * @param visible
   */
  private filterLabels(shape, element: Element, visible: boolean) {
    if (shape.get('gLabel')) { // shape 中缓存了 gLabel Shape
      shape.get('gLabel').set('visible', visible);
    } else {
      /* 从 label 中获取 shape 对应的 label item */
      const labelOptions = element.get('labelOptions');
      if (!_.isEmpty(_.get(labelOptions, 'fields'))) {
        const { field: xField } = element.getXScale();
        const { field: yField } = element.getYScale();
        const shapeData = shape.get('origin')._origin;
        const labels = element.get('labels') as Label[];
        _.each(labels, (label) => {
          const labelData = label.get('origin') || [];
          if ((labelData[xField] === shapeData[xField]) && (labelData[yField] === shapeData[yField])) {
            label.set('visible', visible);
            shape.set('gLabel', label);
          }
        });
      }
    }
  }

  /**
   * 获取某一个字段的 legendOption；如果不存在字段配置，则使用全局配置
   * @param field
   * @param defaultValue
   */
  private getFieldLegendOption(field: string, defaultValue = {}): object {
    return _.get(this.getLegendOptions(), `fields.${field}`, defaultValue);
  }
}
