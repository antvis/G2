/* 依赖的模块，在这里统一引入，方便打包优化 */

// G
export { ICanvas, IElement, IGroup, IShape } from '@antv/g-base/lib/interfaces';
export { PathCommand, BBox, Point, ShapeAttrs } from '@antv/g-base/lib/types';
export { Event, AbstractGroup, AbstractShape } from '@antv/g-base';
// 需要有 G-base 提供 g engine 类型定义
export type IG = any;

// adjust
export { registerAdjust, getAdjust, Adjust } from '@antv/adjust/lib/factory';

// attr
export { getAttribute, Attribute } from '@antv/attr/lib/factory';
export { Color } from '@antv/attr';

// coordinate
export { getCoordinate, registerCoordinate, Coordinate, CoordinateCfg } from '@antv/coord';

// scale
export { getScale, registerScale, Scale, ScaleConfig } from '@antv/scale';
export { Tick } from '@antv/scale/lib/types';

// component
import {
  Annotation,
  Axis,
  Component,
  Crosshair,
  Grid,
  GroupComponent,
  HtmlComponent,
  Legend,
  Slider,
  Tooltip,
} from '@antv/component';
export { IComponent, IList } from '@antv/component/lib/interfaces';
export {
  CategoryLegendCfg,
  CircleAxisCfg,
  LineAxisCfg,
  GroupComponentCfg,
  ListItem,
  AxisLineCfg,
  AxisTickLineCfg,
  AxisSubTickLineCfg,
  AxisTitleCfg,
  AxisLabelCfg,
  GridLineCfg,
  LegendMarkerCfg,
  LegendTitleCfg,
  LegendBackgroundCfg,
  LegendItemNameCfg,
  LegendItemValueCfg,
  ContinueLegendCfg,
  ContinueLegendTrackCfg,
  ContinueLegendRailCfg,
  ContinueLegendLabelCfg,
  ContinueLegendHandlerCfg,
  CrosshairLineCfg,
  CrosshairTextCfg,
  CrosshairTextBackgroundCfg,
  SliderCfg,
  TrendCfg,
} from '@antv/component/lib/types';
export { HtmlComponent, GroupComponent, Component, Crosshair };
export { Annotation };
// axis
const { Line: LineAxis, Circle: CircleAxis } = Axis;
export { LineAxis, CircleAxis };
// grid
const { Line: LineGrid, Circle: CircleGrid } = Grid;
export { LineGrid, CircleGrid };
// legend
const { Category: CategoryLegend, Continuous: ContinuousLegend } = Legend;
export { CategoryLegend, ContinuousLegend };
// Tooltip
const { Html: HtmlTooltip } = Tooltip;
export { HtmlTooltip };
// Slider
export { Slider };
