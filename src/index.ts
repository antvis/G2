import { GeometryCfg } from './geometry/base';
import { IInteractionContext } from './interface';

// 注册黑暗主题
import { registerTheme } from './core';
import { antvDark } from './theme/style-sheet/dark';
import { createThemeByStyleSheet } from './theme/util/create-by-style-sheet';
registerTheme('dark', createThemeByStyleSheet(antvDark));

// 注册 G 渲染引擎
import * as CanvasEngine from '@antv/g-canvas';
import * as SVGEngine from '@antv/g-svg';
import { registerEngine } from './core';

registerEngine('canvas', CanvasEngine);
registerEngine('svg', SVGEngine);

// 注册 G2 内置的 geometry
import { registerGeometry } from './core';
import Area, { AreaCfg } from './geometry/area';
import Edge from './geometry/edge';
import Heatmap from './geometry/heatmap';
import Interval, { IntervalCfg } from './geometry/interval';
import Line from './geometry/line';
import Path, { PathCfg } from './geometry/path';
import Point from './geometry/point';
import Polygon from './geometry/polygon';
import Schema from './geometry/schema';
import Violin from './geometry/violin';

registerGeometry('Polygon', Polygon);
registerGeometry('Interval', Interval);
registerGeometry('Schema', Schema);
registerGeometry('Path', Path);
registerGeometry('Point', Point);
registerGeometry('Line', Line);
registerGeometry('Area', Area);
registerGeometry('Edge', Edge);
registerGeometry('Heatmap', Heatmap);
registerGeometry('Violin', Violin);

// 引入所有内置的 shapes
import './geometry/shape/area/line';
import './geometry/shape/area/smooth';
import './geometry/shape/area/smooth-line';

import './geometry/shape/edge/arc';
import './geometry/shape/edge/smooth';
import './geometry/shape/edge/vhv';

import './geometry/shape/interval/funnel';
import './geometry/shape/interval/hollow-rect';
import './geometry/shape/interval/line';
import './geometry/shape/interval/pyramid';
import './geometry/shape/interval/tick';

import './geometry/shape/line/step';

import './geometry/shape/point/hollow';
import './geometry/shape/point/image';
import './geometry/shape/point/solid';

import './geometry/shape/schema/box';
import './geometry/shape/schema/candle';

import './geometry/shape/polygon/square';

import './geometry/shape/violin/smooth';
import './geometry/shape/violin/hollow';

// 注册 Geometry 内置的 label
import { registerGeometryLabel } from './core';
import GeometryLabel from './geometry/label/base';
import IntervalLabel from './geometry/label/interval';
import PieLabel from './geometry/label/pie';
import PolarLabel from './geometry/label/polar';

registerGeometryLabel('base', GeometryLabel);
registerGeometryLabel('interval', IntervalLabel);
registerGeometryLabel('pie', PieLabel);
registerGeometryLabel('polar', PolarLabel);

// 注册 Geometry label 内置的布局函数
import { registerGeometryLabelLayout } from './core';
import { distribute } from './geometry/label/layout/pie/distribute';
import { pieOuterLabelLayout } from './geometry/label/layout/pie/outer';
import { pieSpiderLabelLayout } from './geometry/label/layout/pie/spider';
import { limitInCanvas } from './geometry/label/layout/limit-in-canvas';
import { limitInShape } from './geometry/label/layout/limit-in-shape';
import { fixedOverlap, overlap } from './geometry/label/layout/overlap';
import { hideOverlap } from './geometry/label/layout/hide-overlap';
import { adjustColor } from './geometry/label/layout/adjust-color';
import { intervalAdjustPosition } from './geometry/label/layout/interval/adjust-position';
import { intervalHideOverlap } from './geometry/label/layout/interval/hide-overlap';
import { pointAdjustPosition } from './geometry/label/layout/point/adjust-position';
import { pathAdjustPosition } from './geometry/label/layout/path/adjust-position';
import { limitInPlot } from './geometry/label/layout/limit-in-plot';

registerGeometryLabelLayout('overlap', overlap);
registerGeometryLabelLayout('distribute', distribute);
registerGeometryLabelLayout('fixed-overlap', fixedOverlap);
registerGeometryLabelLayout('hide-overlap', hideOverlap);
registerGeometryLabelLayout('limit-in-shape', limitInShape);
registerGeometryLabelLayout('limit-in-canvas', limitInCanvas);
registerGeometryLabelLayout('limit-in-plot', limitInPlot);
registerGeometryLabelLayout('pie-outer', pieOuterLabelLayout);
registerGeometryLabelLayout('adjust-color', adjustColor);
registerGeometryLabelLayout('interval-adjust-position', intervalAdjustPosition);
registerGeometryLabelLayout('interval-hide-overlap', intervalHideOverlap);
registerGeometryLabelLayout('point-adjust-position', pointAdjustPosition);
registerGeometryLabelLayout('pie-spider', pieSpiderLabelLayout);
registerGeometryLabelLayout('path-adjust-position', pathAdjustPosition);

// 注册需要的动画执行函数
import { fadeIn, fadeOut } from './animate/animation/fade';
import { growInX, growInXY, growInY } from './animate/animation/grow-in';
import { pathIn } from './animate/animation/path-in';
import { positionUpdate } from './animate/animation/position-update';
import { scaleInX, scaleInY } from './animate/animation/scale-in';
import { sectorPathUpdate } from './animate/animation/sector-path-update';
import { waveIn } from './animate/animation/wave-in';
import { zoomIn, zoomOut } from './animate/animation/zoom';
import { registerAnimation } from './core';

registerAnimation('fade-in', fadeIn);
registerAnimation('fade-out', fadeOut);
registerAnimation('grow-in-x', growInX);
registerAnimation('grow-in-xy', growInXY);
registerAnimation('grow-in-y', growInY);
registerAnimation('scale-in-x', scaleInX);
registerAnimation('scale-in-y', scaleInY);
registerAnimation('wave-in', waveIn);
registerAnimation('zoom-in', zoomIn);
registerAnimation('zoom-out', zoomOut);
registerAnimation('position-update', positionUpdate);
registerAnimation('sector-path-update', sectorPathUpdate);
registerAnimation('path-in', pathIn);

// 注册内置的 Facet
import { registerFacet } from './core';
import Circle from './facet/circle';
import List from './facet/list';
import Matrix from './facet/matrix';
import Mirror from './facet/mirror';
import Rect from './facet/rect';
import Tree from './facet/tree';

registerFacet('rect', Rect);
registerFacet('mirror', Mirror);
registerFacet('list', List);
registerFacet('matrix', Matrix);
registerFacet('circle', Circle);
registerFacet('tree', Tree);

// 注册内置的 Component
import { registerComponentController } from './core';

import Annotation from './chart/controller/annotation';
import Axis from './chart/controller/axis';
import Legend from './chart/controller/legend';
import Slider from './chart/controller/slider';
import Tooltip from './chart/controller/tooltip';
import Scrollbar from './chart/controller/scrollbar';

// register build-in components
registerComponentController('axis', Axis);
registerComponentController('legend', Legend);
registerComponentController('tooltip', Tooltip);
registerComponentController('annotation', Annotation);
registerComponentController('slider', Slider);
registerComponentController('scrollbar', Scrollbar);

// 注册 Interaction Action
import { registerAction } from './core';
import ActiveRegion from './interaction/action/active-region';
import SiblingTooltip from './interaction/action/component/tooltip/sibling';
import TooltipAction from './interaction/action/component/tooltip/geometry';
import EllipsisTextAction from './interaction/action/component/tooltip/ellipsis-text';

import ElementActive from './interaction/action/element/active';
import ElementLinkByColor from './interaction/action/element/link-by-color';
import ElementRangeActive from './interaction/action/element/range-active';
import ElementSingleActive from './interaction/action/element/single-active';

import ElementHighlight from './interaction/action/element/highlight';
import ElementHighlightByColor from './interaction/action/element/highlight-by-color';
import ElementHighlightByX from './interaction/action/element/highlight-by-x';

import ElementRangeHighlight, { ELEMENT_RANGE_HIGHLIGHT_EVENTS } from './interaction/action/element/range-highlight';
import ElementSingleHighlight from './interaction/action/element/single-highlight';

import ElementRangeSelected from './interaction/action/element/range-selected';
import ElementSelected from './interaction/action/element/selected';
import ElementSingleSelected from './interaction/action/element/single-selected';

import ListActive from './interaction/action/component/list-active';
import ListHighlight from './interaction/action/component/list-highlight';
import ListSelected from './interaction/action/component/list-selected';
import ListUnchecked from './interaction/action/component/list-unchecked';
import ListChecked from './interaction/action/component/list-checked';
import ListFocus from './interaction/action/component/list-focus';
import ListRadio from './interaction/action/component/list-radio';

import CircleMask from './interaction/action/mask/circle';
import DimMask from './interaction/action/mask/dim-rect';
import PathMask from './interaction/action/mask/path';
import RectMask from './interaction/action/mask/rect';
import SmoothPathMask from './interaction/action/mask/smooth-path';

import CursorAction from './interaction/action/cursor';
import DataFilter from './interaction/action/data/filter';
import DataRangeFilter, { BRUSH_FILTER_EVENTS } from './interaction/action/data/range-filter';
import SiblingFilter from './interaction/action/data/sibling-filter';

import ElementFilter from './interaction/action/element/filter';
import ElementSiblingFilter from './interaction/action/element/sibling-filter';
import ButtonAction from './interaction/action/view/button';
import ViewDrag from './interaction/action/view/drag';
import ViewMove from './interaction/action/view/move';
import ScaleTranslate from './interaction/action/view/scale-translate';
import ScaleZoom from './interaction/action/view/scale-zoom';
import MousewheelScroll from './interaction/action/view/mousewheel-scroll';
import AxisDescription from './interaction/action/component/axis/axis-description'

registerAction('tooltip', TooltipAction);
registerAction('sibling-tooltip', SiblingTooltip);
registerAction('ellipsis-text', EllipsisTextAction);
registerAction('element-active', ElementActive);
registerAction('element-single-active', ElementSingleActive);
registerAction('element-range-active', ElementRangeActive);

registerAction('element-highlight', ElementHighlight);
registerAction('element-highlight-by-x', ElementHighlightByX);
registerAction('element-highlight-by-color', ElementHighlightByColor);

registerAction('element-single-highlight', ElementSingleHighlight);
registerAction('element-range-highlight', ElementRangeHighlight);
registerAction('element-sibling-highlight', ElementRangeHighlight, {
  effectSiblings: true,
  effectByRecord: true,
});

registerAction('element-selected', ElementSelected);
registerAction('element-single-selected', ElementSingleSelected);
registerAction('element-range-selected', ElementRangeSelected);
registerAction('element-link-by-color', ElementLinkByColor);

registerAction('active-region', ActiveRegion);
registerAction('list-active', ListActive);
registerAction('list-selected', ListSelected);
registerAction('list-highlight', ListHighlight);
registerAction('list-unchecked', ListUnchecked);
registerAction('list-checked', ListChecked);
registerAction('list-focus', ListFocus);
registerAction('list-radio', ListRadio);

registerAction('legend-item-highlight', ListHighlight, {
  componentNames: ['legend'],
});

registerAction('axis-label-highlight', ListHighlight, {
  componentNames: ['axis'],
});
registerAction('axis-description', AxisDescription)

registerAction('rect-mask', RectMask);
registerAction('x-rect-mask', DimMask, { dim: 'x' });
registerAction('y-rect-mask', DimMask, { dim: 'y' });
registerAction('circle-mask', CircleMask);
registerAction('path-mask', PathMask);
registerAction('smooth-path-mask', SmoothPathMask);

registerAction('cursor', CursorAction);
registerAction('data-filter', DataFilter);

registerAction('brush', DataRangeFilter);
registerAction('brush-x', DataRangeFilter, { dims: ['x'] });
registerAction('brush-y', DataRangeFilter, { dims: ['y'] });
registerAction('sibling-filter', SiblingFilter);
registerAction('sibling-x-filter', SiblingFilter);
registerAction('sibling-y-filter', SiblingFilter);

registerAction('element-filter', ElementFilter);
registerAction('element-sibling-filter', ElementSiblingFilter);
registerAction('element-sibling-filter-record', ElementSiblingFilter, { byRecord: true });

registerAction('view-drag', ViewDrag);
registerAction('view-move', ViewMove);

registerAction('scale-translate', ScaleTranslate);
registerAction('scale-zoom', ScaleZoom);
registerAction('reset-button', ButtonAction, {
  name: 'reset-button',
  text: 'reset',
});

registerAction('mousewheel-scroll', MousewheelScroll);

// 注册默认的 Interaction 交互行为
import { registerInteraction } from './core';

function isPointInView(context: IInteractionContext) {
  return context.isInPlot();
}

// 注册 tooltip 的 interaction
registerInteraction('tooltip', {
  start: [
    { trigger: 'plot:mousemove', action: 'tooltip:show', throttle: { wait: 50, leading: true, trailing: false } },
    { trigger: 'plot:touchmove', action: 'tooltip:show', throttle: { wait: 50, leading: true, trailing: false } },
  ],
  end: [
    { trigger: 'plot:mouseleave', action: 'tooltip:hide' },
    { trigger: 'plot:leave', action: 'tooltip:hide' },
    { trigger: 'plot:touchend', action: 'tooltip:hide' },
  ],
});

registerInteraction('ellipsis-text', {
  start: [
    {
      trigger: 'legend-item-name:mousemove',
      action: 'ellipsis-text:show',
      throttle: { wait: 50, leading: true, trailing: false },
    },
    {
      trigger: 'legend-item-name:touchstart',
      action: 'ellipsis-text:show',
      throttle: { wait: 50, leading: true, trailing: false },
    },
    {
      trigger: 'axis-label:mousemove',
      action: 'ellipsis-text:show',
      throttle: { wait: 50, leading: true, trailing: false },
    },
    {
      trigger: 'axis-label:touchstart',
      action: 'ellipsis-text:show',
      throttle: { wait: 50, leading: true, trailing: false },
    },
  ],
  end: [
    { trigger: 'legend-item-name:mouseleave', action: 'ellipsis-text:hide' },
    { trigger: 'legend-item-name:touchend', action: 'ellipsis-text:hide' },
    { trigger: 'axis-label:mouseleave', action: 'ellipsis-text:hide' },
    { trigger: 'axis-label:touchend', action: 'ellipsis-text:hide' },
  ],
});

// 移动到 element 上 active
registerInteraction('element-active', {
  start: [{ trigger: 'element:mouseenter', action: 'element-active:active' }],
  end: [{ trigger: 'element:mouseleave', action: 'element-active:reset' }],
});

// 点击选中，允许取消
registerInteraction('element-selected', {
  start: [{ trigger: 'element:click', action: 'element-selected:toggle' }],
});

// hover highlight，允许取消
registerInteraction('element-highlight', {
  start: [{ trigger: 'element:mouseenter', action: 'element-highlight:highlight' }],
  end: [{ trigger: 'element:mouseleave', action: 'element-highlight:reset' }],
});

// hover highlight by x，允许取消
registerInteraction('element-highlight-by-x', {
  start: [{ trigger: 'element:mouseenter', action: 'element-highlight-by-x:highlight' }],
  end: [{ trigger: 'element:mouseleave', action: 'element-highlight-by-x:reset' }],
});

// hover highlight by y，允许取消
registerInteraction('element-highlight-by-color', {
  start: [{ trigger: 'element:mouseenter', action: 'element-highlight-by-color:highlight' }],
  end: [{ trigger: 'element:mouseleave', action: 'element-highlight-by-color:reset' }],
});

// legend hover，element active
registerInteraction('legend-active', {
  start: [{ trigger: 'legend-item:mouseenter', action: ['list-active:active', 'element-active:active'] }],
  end: [{ trigger: 'legend-item:mouseleave', action: ['list-active:reset', 'element-active:reset'] }],
});

// legend hover，element active
registerInteraction('legend-highlight', {
  start: [
    { trigger: 'legend-item:mouseenter', action: ['legend-item-highlight:highlight', 'element-highlight:highlight'] },
  ],
  end: [{ trigger: 'legend-item:mouseleave', action: ['legend-item-highlight:reset', 'element-highlight:reset'] }],
});

// legend hover，element active
registerInteraction('axis-label-highlight', {
  start: [
    { trigger: 'axis-label:mouseenter', action: ['axis-label-highlight:highlight', 'element-highlight:highlight'] },
  ],
  end: [{ trigger: 'axis-label:mouseleave', action: ['axis-label-highlight:reset', 'element-highlight:reset'] }],
});

// legend hover，element active
registerInteraction('element-list-highlight', {
  start: [{ trigger: 'element:mouseenter', action: ['list-highlight:highlight', 'element-highlight:highlight'] }],
  end: [{ trigger: 'element:mouseleave', action: ['list-highlight:reset', 'element-highlight:reset'] }],
});

// 框选
registerInteraction('element-range-highlight', {
  showEnable: [
    { trigger: 'plot:mouseenter', action: 'cursor:crosshair' },
    { trigger: 'mask:mouseenter', action: 'cursor:move' },
    { trigger: 'plot:mouseleave', action: 'cursor:default' },
    { trigger: 'mask:mouseleave', action: 'cursor:crosshair' },
  ],
  start: [
    {
      trigger: 'plot:mousedown',
      isEnable(context) {
        // 不要点击在 mask 上重新开始
        return !context.isInShape('mask');
      },
      action: ['rect-mask:start', 'rect-mask:show'],
    },
    {
      trigger: 'mask:dragstart',
      action: ['rect-mask:moveStart'],
    },
  ],
  processing: [
    {
      trigger: 'plot:mousemove',
      action: ['rect-mask:resize'],
    },
    {
      trigger: 'mask:drag',
      action: ['rect-mask:move'],
    },
    {
      trigger: 'mask:change',
      action: ['element-range-highlight:highlight'],
    },
  ],
  end: [
    { trigger: 'plot:mouseup', action: ['rect-mask:end'] },
    { trigger: 'mask:dragend', action: ['rect-mask:moveEnd'] },
    {
      trigger: 'document:mouseup',
      isEnable(context) {
        return !context.isInPlot();
      },
      action: ['element-range-highlight:clear', 'rect-mask:end', 'rect-mask:hide'],
    },
  ],
  rollback: [{ trigger: 'dblclick', action: ['element-range-highlight:clear', 'rect-mask:hide'] }],
});

registerInteraction('brush', {
  showEnable: [
    { trigger: 'plot:mouseenter', action: 'cursor:crosshair' },
    { trigger: 'plot:mouseleave', action: 'cursor:default' },
  ],
  start: [
    {
      trigger: 'mousedown',
      isEnable: isPointInView,
      action: ['brush:start', 'rect-mask:start', 'rect-mask:show'],
    },
  ],
  processing: [
    {
      trigger: 'mousemove',
      isEnable: isPointInView,
      action: ['rect-mask:resize'],
    },
  ],
  end: [
    {
      trigger: 'mouseup',
      isEnable: isPointInView,
      action: ['brush:filter', 'brush:end', 'rect-mask:end', 'rect-mask:hide', 'reset-button:show'],
    },
  ],
  rollback: [{ trigger: 'reset-button:click', action: ['brush:reset', 'reset-button:hide', 'cursor:crosshair'] }],
});

registerInteraction('brush-visible', {
  showEnable: [
    { trigger: 'plot:mouseenter', action: 'cursor:crosshair' },
    { trigger: 'plot:mouseleave', action: 'cursor:default' },
  ],
  start: [
    {
      trigger: 'plot:mousedown',
      action: ['rect-mask:start', 'rect-mask:show'],
    },
  ],
  processing: [
    {
      trigger: 'plot:mousemove',
      action: ['rect-mask:resize'],
    },
    { trigger: 'mask:change', action: ['element-range-highlight:highlight'] },
  ],
  end: [
    {
      trigger: 'plot:mouseup',
      action: ['rect-mask:end', 'rect-mask:hide', 'element-filter:filter', 'element-range-highlight:clear'],
    },
  ],
  rollback: [
    {
      trigger: 'dblclick',
      action: ['element-filter:clear'],
    },
  ],
});

registerInteraction('brush-x', {
  showEnable: [
    { trigger: 'plot:mouseenter', action: 'cursor:crosshair' },
    { trigger: 'plot:mouseleave', action: 'cursor:default' },
  ],
  start: [
    {
      trigger: 'mousedown',
      isEnable: isPointInView,
      action: ['brush-x:start', 'x-rect-mask:start', 'x-rect-mask:show'],
    },
  ],
  processing: [
    {
      trigger: 'mousemove',
      isEnable: isPointInView,
      action: ['x-rect-mask:resize'],
    },
  ],
  end: [
    {
      trigger: 'mouseup',
      isEnable: isPointInView,
      action: ['brush-x:filter', 'brush-x:end', 'x-rect-mask:end', 'x-rect-mask:hide'],
    },
  ],
  rollback: [{ trigger: 'dblclick', action: ['brush-x:reset'] }],
});

registerInteraction('element-path-highlight', {
  showEnable: [
    { trigger: 'plot:mouseenter', action: 'cursor:crosshair' },
    { trigger: 'plot:mouseleave', action: 'cursor:default' },
  ],
  start: [
    { trigger: 'mousedown', isEnable: isPointInView, action: 'path-mask:start' },
    { trigger: 'mousedown', isEnable: isPointInView, action: 'path-mask:show' },
  ],
  processing: [{ trigger: 'mousemove', action: 'path-mask:addPoint' }],
  end: [{ trigger: 'mouseup', action: 'path-mask:end' }],
  rollback: [{ trigger: 'dblclick', action: 'path-mask:hide' }],
});

// 点击选中，允许取消
registerInteraction('element-single-selected', {
  start: [{ trigger: 'element:click', action: 'element-single-selected:toggle' }],
});

// 筛选数据
registerInteraction('legend-filter', {
  showEnable: [
    { trigger: 'legend-item:mouseenter', action: ['cursor:pointer', 'list-radio:show'] },
    { trigger: 'legend-item:mouseleave', action: ['cursor:default', 'list-radio:hide'] },
  ],
  start: [
    {
      trigger: 'legend-item:click',
      isEnable: (context) => {
        return !context.isInShape('legend-item-radio');
      },
      action: ['list-unchecked:toggle', 'data-filter:filter', 'list-radio:show'],
    },
    //  正反选数据: 只有当 radio === truthy 的时候才会有 legend-item-radio 这个元素
    {
      trigger: 'legend-item-radio:mouseenter',
      action: ['list-radio:showTip'],
    },
    {
      trigger: 'legend-item-radio:mouseleave',
      action: ['list-radio:hideTip'],
    },
    {
      trigger: 'legend-item-radio:click',
      action: ['list-focus:toggle', 'data-filter:filter', 'list-radio:show'],
    },
  ],
});

// 筛选数据
registerInteraction('continuous-filter', {
  start: [{ trigger: 'legend:valuechanged', action: 'data-filter:filter' }],
});
// 筛选数据
registerInteraction('continuous-visible-filter', {
  start: [{ trigger: 'legend:valuechanged', action: 'element-filter:filter' }],
});

// 筛选图形
registerInteraction('legend-visible-filter', {
  showEnable: [
    { trigger: 'legend-item:mouseenter', action: 'cursor:pointer' },
    { trigger: 'legend-item:mouseleave', action: 'cursor:default' },
  ],
  start: [{ trigger: 'legend-item:click', action: ['list-unchecked:toggle', 'element-filter:filter'] }],
});

// 出现背景框
registerInteraction('active-region', {
  start: [{ trigger: 'plot:mousemove', action: 'active-region:show' }],
  end: [{ trigger: 'plot:mouseleave', action: 'active-region:hide' }],
});

// 显示坐标轴标题详情信息
registerInteraction('axis-description', {
  start: [{ trigger: 'axis-description:mousemove', action: 'axis-description:show' }],
  end: [{ trigger: 'axis-description:mouseleave', action: 'axis-description:hide' }]
})

function isWheelDown(event) {
  event.gEvent.preventDefault();
  return event.gEvent.originalEvent.deltaY > 0;
}
registerInteraction('view-zoom', {
  start: [
    {
      trigger: 'plot:mousewheel',
      isEnable(context) {
        return isWheelDown(context.event);
      },
      action: 'scale-zoom:zoomOut',
      throttle: { wait: 100, leading: true, trailing: false },
    },
    {
      trigger: 'plot:mousewheel',
      isEnable(context) {
        return !isWheelDown(context.event);
      },
      action: 'scale-zoom:zoomIn',
      throttle: { wait: 100, leading: true, trailing: false },
    },
  ],
});

registerInteraction('sibling-tooltip', {
  start: [{ trigger: 'plot:mousemove', action: 'sibling-tooltip:show' }],
  end: [{ trigger: 'plot:mouseleave', action: 'sibling-tooltip:hide' }],
});

registerInteraction('plot-mousewheel-scroll', {
  start: [{ trigger: 'plot:mousewheel', action: 'mousewheel-scroll:scroll' }],
});

// 让 TS 支持 View 原型上添加的创建 Geometry 方法的智能提示
/**
 * 往 View 原型上添加的创建 Geometry 的方法
 *
 * Tips:
 * view module augmentation, detail: http://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation
 */
declare module './chart/view' {
  interface View {
    /**
     * 创建 Polygon 几何标记。
     * @param [cfg] 传入 Polygon 构造函数的配置。
     * @returns polygon 返回 Polygon 实例。
     */
    polygon(cfg?: Partial<GeometryCfg>): Polygon;
    /**
     * 创建 Point 几何标记。
     * @param [cfg] 传入 Point 构造函数的配置。
     * @returns point 返回 Point 实例。
     */
    point(cfg?: Partial<GeometryCfg>): Point;
    /**
     * 创建 Interval 几何标记。
     * @param [cfg] 传入 Interval 构造函数的配置。
     * @returns interval 返回 Interval 实例。
     */
    interval(cfg?: Partial<IntervalCfg>): Interval;
    /**
     * 创建 Schema 几何标记。
     * @param [cfg] 传入 Schema 构造函数的配置。
     * @returns schema 返回 Schema 实例。
     */
    schema(cfg?: Partial<GeometryCfg>): Schema;
    /**
     * 创建 Path 几何标记。
     * @param [cfg] 传入 Path 构造函数的配置。
     * @returns path 返回 Path 实例。
     */
    path(cfg?: Partial<PathCfg>): Path;
    /**
     * 创建 Line 几何标记。
     * @param [cfg] 传入 Line 构造函数的配置。
     * @returns line 返回 Line 实例。
     */
    line(cfg?: Partial<PathCfg>): Line;
    /**
     * 创建 Area 几何标记。
     * @param [cfg] 传入 Area 构造函数的配置。
     * @returns area 返回 Area 实例。
     */
    area(cfg?: Partial<AreaCfg>): Area;
    /**
     * 创建 Edge 几何标记。
     * @param [cfg] 传入 Edge 构造函数的配置。
     * @returns schema 返回 Edge 实例。
     */
    edge(cfg?: Partial<GeometryCfg>): Edge;
    /**
     * 创建 Heatmap 几何标记。
     * @param [cfg] 传入 Heatmap 构造函数的配置。
     * @returns heatmap 返回 Heatmap 实例。
     */
    heatmap(cfg?: Partial<GeometryCfg>): Heatmap;
    /**
     * 创建 Violin 几何标记。
     * @param [cfg] 传入 Violin 构造函数的配置。
     * @returns violin 返回 Violin 实例。
     */
    violin(cfg?: Partial<GeometryCfg>): Violin;
  }
}

// 暴露一些常量
export { VIEW_LIFE_CIRCLE } from './constant';
/** brush 范围筛选的一些事件常量 */
export { BRUSH_FILTER_EVENTS, ELEMENT_RANGE_HIGHLIGHT_EVENTS };

export * from './core';
