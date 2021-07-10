import { PlainObject } from './common';

export type Theme = PlainObject;

/**
 * 主题的样式 token 定义
 */
export type StyleSheet = {
  /** 主题名称 */
  name: string;
  /** 背景色 */
  backgroundColor: string;
  /** 默认色 fixme 主题色和默认色的应用区别 */
  defaultColor: string;
  /** 主题色 */
  brandColor?: string;
  /** 辅助色 */
  subColor?: string;
  /** 分类色板 1，在数据量小于等于 10 时使用 */
  paletteQualitative10?: string[];
  /** 分类色板 2，在数据量大于 10 时使用 */
  paletteQualitative20?: string[];
  /** (单色)顺序色板 */
  paletteSequence?: string[];
  /** 语义色，适用于股票图、瀑布图 */
  paletteSemanticRed?: string;
  /** 语义色，适用于股票图、瀑布图 */
  paletteSemanticGreen?: string;
  /** 语义色 */
  paletteSemanticYellow?: string;

  /** 字体 */
  fontFamily?: string;

  // -------------------- 坐标轴 --------------------
  /** 坐标轴线颜色 */
  axisLineBorderColor?: string;
  /** 坐标轴线粗细 */
  axisLineBorder?: number;
  /** 坐标轴线 lineDash 设置 */
  axisLineDash?: number[];

  /** 坐标轴标题颜色 */
  axisTitleTextFillColor?: string;
  /** 坐标轴标题文本字体大小 */
  axisTitleTextFontSize?: number;
  /** 坐标轴标题文本行高 */
  axisTitleTextLineHeight?: number;
  /** 坐标轴标题文本字体粗细 */
  axisTitleTextFontWeight?: number | string;
  /** 坐标轴标题文本对齐方式 */
  axisTitleTextBaseline?: string;
  /** 坐标轴标题距离坐标轴文本的间距 */
  axisTitleSpacing?: number;

  /** 坐标轴刻度线颜色 */
  axisTickLineBorderColor?: string;
  /** 坐标轴刻度线长度 */
  axisTickLineLength?: number;
  /** 坐标轴刻度线粗细 */
  axisTickLineBorder?: number;

  /** 坐标轴次刻度线颜色 */
  axisSubTickLineBorderColor?: string;
  /** 坐标轴次刻度线长度 */
  axisSubTickLineLength?: number;
  /** 坐标轴次刻度线粗细 */
  axisSubTickLineBorder?: number;

  /** 坐标轴刻度文本颜色 */
  axisLabelFillColor?: string;
  /** 坐标轴刻度文本字体大小 */
  axisLabelFontSize?: number;
  /** 坐标轴刻度文本行高 */
  axisLabelLineHeight?: number;
  /** 坐标轴刻度文本字体粗细 */
  axisLabelFontWeight?: number | string;
  /** 坐标轴刻度文本距离坐标轴线的间距 */
  axisLabelOffset?: number

  /** 坐标轴网格线颜色 */
  axisGridBorderColor?: string;
  /** 坐标轴网格线粗细 */
  axisGridBorder?: number;
  /** 坐标轴网格线虚线设置 */
  axisGridLineDash?: number[];

  // -------------------- 图例 --------------------

  /** 图例标题颜色 */
  legendTitleTextFillColor?: string;
  /** 图例标题文本字体大小 */
  legendTitleTextFontSize?: number;
  /** 图例标题文本行高 */
  legendTitleTextLineHeight?: number;
  /** 图例标题文本字体粗细 */
  legendTitleTextFontWeight?: number | string;

  /** 图例 marker 颜色 */
  legendMarkerColor?: string;
  /** 图例 marker 距离图例文本的间距 */
  legendMarkerSpacing?: number;
  /** 图例 marker 默认半径大小 */
  legendMarkerSize?: number;
  /** 图例 'circle' marker 半径 */
  legendCircleMarkerSize?: number;
  /** 图例 'square' marker 半径 */
  legendSquareMarkerSize?: number;
  /** 图例 'line' marker 半径 */
  legendLineMarkerSize?: number;

  /** 图例项文本颜色 */
  legendItemNameFillColor?: string;
  /** 图例项文本字体大小 */
  legendItemNameFontSize?: number;
  /** 图例项文本行高 */
  legendItemNameLineHeight?: number;
  /** 图例项粗细 */
  legendItemNameFontWeight?: number | string;
  /** 图例项之间的水平间距 */
  legendItemSpacing?: number;
  /** 图例项垂直方向的间隔 */
  legendItemMarginBottom?: number;
  /** 图例与图表绘图区域的偏移距离  */
  legendPadding?: number[];
  /** 水平布局的图例与绘图区域偏移距离 */
  legendHorizontalPadding?: number[];
  /** 垂直布局的图例与绘图区域偏移距离 */
  legendVerticalPadding?: number[];

  /** 图例分页器 marker 大小 */
  legendPageNavigatorMarkerSize?: number
  /** 图例分页器 marker 非激活状态填充色 */
  legendPageNavigatorMarkerInactiveFillColor?: string;
  /** 图例分页器 marker 非激活状态填充色透明度 */
  legendPageNavigatorMarkerInactiveFillOpacity?: number
  /** 图例分页器 marker 填充色 */
  legendPageNavigatorMarkerFillColor?: string
  /** 图例分页器 marker 填充色透明度 */
  legendPageNavigatorMarkerFillOpacity?: number
  /** 图例分页器文本颜色 */
  legendPageNavigatorTextFillColor?: string
  /** 图例分页器文本字体大小 */
  legendPageNavigatorTextFontSize?: number

  /** 连续图例滑道填充色 */
  legendRailFillColor?: string;
  /** 连续图例滑道边框粗细 */
  legendRailBorder?: number;
  /** 连续图例滑道边框颜色 */
  legendRailBorderColor?: string;
  /** 连续图例滑道宽度 */
  legendRailWidth?: number;
  /** 连续图例滑道滑块高度 */
  legendRailHeight?: number;

  /** 连续图例滑道标签文本颜色 */
  legendRailLabelTextFillColor?: string;
  /** 连续图例滑道标签文本字体大小 */
  legendRailLabelTextFontSize?: number;
  /** 连续图例滑道标签文本行高 */
  legendRailLabelTextLineHeight?: number;
  /** 连续图例滑道标签文本字体粗细 */
  legendRailLabelTextFontWeight?: number | string;

  /** 连续图例滑块颜色 */
  legendHandlerFillColor?: string;
  /** 连续图例滑块宽度 */
  legendHandlerWidth?: number;
  /** 连续图例滑块高度 */
  legendHandlerHeight?: number;
  /** 连续图例滑块边框粗细 */
  legendHandlerBorder?: number;
  /** 连续图例滑块边框颜色 */
  legendHandlerBorderColor?: string;

  // -------------------- Annotation，图形标注 --------------------
  /** arc 图形标注描边颜色 */
  annotationArcBorderColor?: string;
  /** arc 图形标注粗细 */
  annotationArcBorder?: number;

  /** line 图形标注颜色 */
  annotationLineBorderColor?: string;
  /** line 图形标注粗细 */
  annotationLineBorder?: number;
  /** lube 图形标注的虚线间隔 */
  annotationLineDash?: number[];

  /** text 图形标注文本颜色 */
  annotationTextFillColor?: string;
  /** text 图形标注文本字体大小 */
  annotationTextFontSize?: number;
  /** text 图形标注文本行高 */
  annotationTextLineHeight?: number;
  /** text 图形标注文本字体粗细 */
  annotationTextFontWeight?: number | string;

  /** text 图形标注文本边框颜色 */
  annotationTextBorderColor?: string;
  /** text 图形标注文本边框粗细 */
  annotationTextBorder?: number;

  /** region 图形标注填充颜色 */
  annotationRegionFillColor?: string;
  /** region 图形标注填充颜色透明色 */
  annotationRegionFillOpacity?: number;
  /** region 图形标注描边粗细 */
  annotationRegionBorder?: number;
  /** region 图形标注描边颜色 */
  annotationRegionBorderColor?: string;

  /** dataMarker 图形标注的连接线长度 */
  annotationDataMarkerLineLength?: number;

  // -------------------- Tooltip --------------------
  /** tooltip crosshairs 辅助线颜色 */
  tooltipCrosshairsBorderColor?: string;
  /** tooltip crosshairs 辅助线粗细 */
  tooltipCrosshairsBorder?: number;
  /** tooltip crosshairs 辅助线虚线间隔 */
  tooltipCrosshairsLineDash?: number[];

  /** tooltip 内容框背景色 */
  tooltipContainerFillColor?: string;
  /** tooltip 内容框背景透明度 */
  tooltipContainerFillOpacity?: number;
  /** tooltip 内容框阴影 */
  tooltipContainerShadow?: string;
  /** tooltip 内容框圆角 */
  tooltipContainerBorderRadius?: number;

  /** tooltip 文本颜色 */
  tooltipTextFillColor?: string;
  /** tooltip 文本字体大小 */
  tooltipTextFontSize?: number;
  /** tooltip 文本行高 */
  tooltipTextLineHeight?: number;
  /** tooltip 文本字体粗细 */
  tooltipTextFontWeight?: number | string;

  // -------------------- Geometry labels --------------------
  /** Geometry label 文本颜色 */
  labelFillColor?: string;
  /** Geometry label 暗色文本颜色 */
  labelFillColorDark?: string;
  /** Geometry label 亮色文本颜色 */
  labelFillColorLight?: string;
  /** Geometry label 文本字体大小 */
  labelFontSize?: number;
  /** Geometry label 文本行高 */
  labelLineHeight?: number;
  /** Geometry label 文本字体粗细 */
  labelFontWeight?: number | string;
  /** Geometry label 文本描边颜色 */
  labelBorderColor?: string;
  /** Geometry label 文本描边粗细 */
  labelBorder?: number;

  /** Geometry innerLabel 文本颜色 */
  innerLabelFillColor?: string;
  /** Geometry innerLabel 文本字体大小 */
  innerLabelFontSize?: number;
  /** Geometry innerLabel 文本行高 */
  innerLabelLineHeight?: number;
  /** Geometry innerLabel 文本字体粗细 */
  innerLabelFontWeight?: number | string;
  /** Geometry innerLabel 文本描边颜色 */
  innerLabelBorderColor?: string;
  /** Geometry innerLabel 文本描边粗细 */
  innerLabelBorder?: number;

  /** Geometry overflowLabel 文本颜色 */
  overflowLabelFillColor?: string;
  /** Geometry overflowLabel 暗色文本颜色 */
  overflowLabelFillColorDark?: string;
  /** Geometry overflowLabel 亮色文本颜色 */
  overflowLabelFillColorLight?: string;
  /** Geometry overflowLabel 文本字体大小 */
  overflowLabelFontSize?: number;
  /** Geometry overflowLabel 文本行高 */
  overflowLabelLineHeight?: number;
  /** Geometry overflowLabel 文本字体粗细 */
  overflowLabelFontWeight?: number | string;
  /** Geometry overflowLabel 文本描边颜色 */
  overflowLabelBorderColor?: string;
  /** Geometry overflowLabel 文本描边粗细 */
  overflowLabelBorder?: number;

  /** Geometry label 文本连接线粗细 */
  labelLineBorder?: number;
  /** Geometry label 文本连接线颜色 */
  labelLineBorderColor?: string;
  /** Geometry label 文本连接线样式 */
  labelLineDash?: number[];

  // -------------------- Slider 组件样式--------------------
  /** slider 滑道高度 */
  sliderRailHieght?: number;
  /** slider 滑道背景色 */
  sliderBackgroundFillColor?: string;
  /** slider 滑道背景色透明度 */
  sliderBackgroundFillOpacity?: number;
  /** slider 滑道前景色 */
  sliderForegroundFillColor?: string;
  /** slider 滑道前景色透明度 */
  sliderForegroundFillOpacity?: number;

  /** slider 手柄高度 */
  sliderHandlerHeight?: number;
  /** Slider 手柄宽度 */
  sliderHandlerWidth?: number;
  /** Slider 手柄背景色 */
  sliderHandlerFillColor?: string;
  /** Slider 手柄背景色透明度 */
  sliderHandlerFillOpacity?: number;
  /** Slider 手柄高亮背景色 */
  sliderHandlerHighlightFillColor?: string;
  /** Slider 手柄边框色 */
  sliderHandlerBorderColor?: string;
  /** Slider 手柄边框粗细 */
  sliderHandlerBorder?: number;
  /** Slider 手柄边框圆角 */
  sliderHandlerBorderRadius?: number;

  /** Slider 字体标签颜色 */
  sliderTextFillColor?: string;
  /** Slider 字体标签透明度 */
  sliderTextFillOpacity?: number;
  /** Slider 字体标签大小 */
  sliderTextFontSize?: number;
  /** Slider 字体标签行高 */
  sliderTextLineHeight?: number;
  /** Slider 字体标签字重 */
  sliderTextFontWeight?: number | string;
  /** Slider 字体标签描边色 */
  sliderTextBorderColor?: string;
  /** Slider 字体标签描边粗细 */
  sliderTextBorder?: number;

  // -------------------- Scrollbar 组件样式 todo 需要补充 --------------------
  /** 滚动条 滚道填充色 */
  scrollbarTrackFillColor?: string;
  /** 滚动条 滑块填充色 */
  scrollbarThumbFillColor?: string;
  /** 滚动条 滑块高亮填充色 */
  scrollbarThumbHighlightFillColor?: string;

  // -------------------- Geometry 图形样式 todo 需要补充 & 考虑 marker --------------------
  /** 点图的大小范围 */
  pointSizeRange?: [number, number];
  /** 点图填充颜色 */
  pointFillColor?: string;
  /** 点图填充颜色透明度 */
  pointFillOpacity?: number;
  /** 点图大小 */
  pointSize?: number;
  /** 点图描边粗细 */
  pointBorder?: number;
  /** 点图描边颜色 */
  pointBorderColor?: string;
  /** 点图描边透明度 */
  pointBorderOpacity?: number;

  /** 点图 active 状态下填充颜色 */
  pointActiveFillColor?: string;
  /** 点图 active 状态下填充颜色透明度 */
  pointActiveFillOpacity?: number;
  /** 点图 active 状态下大小 */
  pointActiveSize?: number;
  /** 点图 active 状态下描边粗细 */
  pointActiveBorder?: number;
  /** 点图 active 状态下描边颜色 */
  pointActiveBorderColor?: string;
  /** 点图 active 状态下描边透明度 */
  pointActiveBorderOpacity?: number;

  /** 点图 selected 状态下填充颜色 */
  pointSelectedFillColor?: string;
  /** 点图 selected 状态下填充颜色透明度 */
  pointSelectedFillOpacity?: number;
  /** 点图 selected 状态下大小 */
  pointSelectedSize?: number;
  /** 点图 selected 状态下描边粗细 */
  pointSelectedBorder?: number;
  /** 点图 selected 状态下描边颜色 */
  pointSelectedBorderColor?: string;
  /** 点图 selected 状态下描边透明度 */
  pointSelectedBorderOpacity?: number;

  /** 点图 inactive 状态下填充颜色 */
  pointInactiveFillColor?: string;
  /** 点图 inactive 状态下填充颜色透明度 */
  pointInactiveFillOpacity?: number;
  /** 点图 inactive 状态下大小 */
  pointInactiveSize?: number;
  /** 点图 inactive 状态下描边粗细 */
  pointInactiveBorder?: number;
  /** 点图 inactive 状态下描边颜色 */
  pointInactiveBorderColor?: string;
  /** 点图 inactive 状态下描边透明度 */
  pointInactiveBorderOpacity?: number;

  /** 描边点图大小 */
  hollowPointSize?: number;
  /** 描边点图描边粗细 */
  hollowPointBorder?: number;
  /** 描边点图描边颜色 */
  hollowPointBorderColor?: string;
  /** 描边点图描边透明度 */
  hollowPointBorderOpacity?: number;
  /** 描边点图填充颜色 */
  hollowPointFillColor?: string;
  /** 描边点图填充透明度 */
  hollowPointFillOpacity?: number;

  /** 点 描边 active 状态下大小 */
  hollowPointActiveSize?: number;
  /** 点 描边 active 状态下描边粗细 */
  hollowPointActiveBorder?: number;
  /** 点 描边 active 状态下描边颜色 */
  hollowPointActiveBorderColor?: string;
  /** 点 描边 active 状态下描边透明度 */
  hollowPointActiveBorderOpacity?: number;

  /** 点 描边 selected 状态下大小 */
  hollowPointSelectedSize?: number;
  /** 点 描边 selected 状态下描边粗细 */
  hollowPointSelectedBorder?: number;
  /** 点 描边 selected 状态下描边颜色 */
  hollowPointSelectedBorderColor?: string;
  /** 点 描边 selected 状态下描边透明度 */
  hollowPointSelectedBorderOpacity?: number;

  /** 点 描边 inactive 状态下大小 */
  hollowPointInactiveSize?: number;
  /** 点 描边 inactive 状态下描边粗细 */
  hollowPointInactiveBorder?: number;
  /** 点 描边 inactive 状态下描边颜色 */
  hollowPointInactiveBorderColor?: string;
  /** 点 描边 inactive 状态下描边透明度 */
  hollowPointInactiveBorderOpacity?: number;

  /** 线图粗细 */
  lineBorder?: number;
  /** 线图颜色 */
  lineBorderColor?: string;
  /** 线图透明度 */
  lineBorderOpacity?: number;

  /** 线图 active 状态下粗细 */
  lineActiveBorder?: number;
  /** 线图 active 状态下颜色 */
  lineActiveBorderColor?: string;
  /** 线图 active 状态下透明度 */
  lineActiveBorderOpacity?: number;

  /** 线图 selected 状态下粗细 */
  lineSelectedBorder?: number;
  /** 线图 selected 状态下颜色 */
  lineSelectedBorderColor?: string;
  /** 线图 selected 状态下透明度 */
  lineSelectedBorderOpacity?: number;

  /** 线图 inactive 状态下粗细 */
  lineInactiveBorder?: number;
  /** 线图 inactive 状态下颜色 */
  lineInactiveBorderColor?: string;
  /** 线图 inactive 状态下透明度 */
  lineInactiveBorderOpacity?: number;

  areaBorder?: number;
  /** area 边框颜色 */
  areaBorderColor?: string;
  /** area 边框透明度 */
  areaBorderOpacity?: number;
  /** area 填充颜色 */
  areaFillColor?: string;
  /** area 填充透明度 */
  areaFillOpacity?: number;

  /** area Active 状态下边框粗细 */
  areaActiveBorder?: number;
  /** area Active 状态下边框颜色 */
  areaActiveBorderColor?: string;
  /** area Active 状态下边框透明度 */
  areaActiveBorderOpacity?: number;
  /** area Active 状态下填充颜色 */
  areaActiveFillColor?: string;
  /** area Active 状态下填充透明度 */
  areaActiveFillOpacity?: number;

  /** area selected 状态下边框粗细 */
  areaSelectedBorder?: number;
  /** area selected 状态下边框颜色 */
  areaSelectedBorderColor?: string;
  /** area selected 状态下边框透明度 */
  areaSelectedBorderOpacity?: number;
  /** area selected 状态下填充颜色 */
  areaSelectedFillColor?: string;
  /** area selected 状态下填充透明度 */
  areaSelectedFillOpacity?: number;

  /** area inactive 状态下边框粗细 */
  areaInactiveBorder?: number;
  /** area inactive 状态下边框颜色 */
  areaInactiveBorderColor?: string;
  /** area inactive 状态下边框透明度 */
  areaInactiveBorderOpacity?: number;
  /** area inactive 状态下填充颜色 */
  areaInactiveFillColor?: string;
  /** area inactive 状态下填充透明度 */
  areaInactiveFillOpacity?: number;

  /** hollowArea 边框粗细 */
  hollowAreaBorder?: number;
  /** hollowArea 边框颜色 */
  hollowAreaBorderColor?: string;
  /** hollowArea 边框透明度 */
  hollowAreaBorderOpacity?: number;

  /** hollowArea Active 状态下边框粗细 */
  hollowAreaActiveBorder?: number;
  /** hollowArea Active 状态下边框颜色 */
  hollowAreaActiveBorderColor?: string;
  /** hollowArea Active 状态下边框透明度 */
  hollowAreaActiveBorderOpacity?: number;

  /** hollowArea selected 状态下边框粗细 */
  hollowAreaSelectedBorder?: number;
  /** hollowArea selected 状态下边框颜色 */
  hollowAreaSelectedBorderColor?: string;
  /** hollowArea selected 状态下边框透明度 */
  hollowAreaSelectedBorderOpacity?: number;

  /** hollowArea inactive 状态下边框粗细 */
  hollowAreaInactiveBorder?: number;
  /** hollowArea inactive 状态下边框颜色 */
  hollowAreaInactiveBorderColor?: string;
  /** hollowArea inactive 状态下边框透明度 */
  hollowAreaInactiveBorderOpacity?: number;

  /** interval 边框粗细 */
  intervalBorder?: number;
  /** interval 边框颜色 */
  intervalBorderColor?: string;
  /** interval 边框透明度 */
  intervalBorderOpacity?: number;
  /** interval 填充颜色 */
  intervalFillColor?: string;
  /** interval 填充透明度 */
  intervalFillOpacity?: number;

  /** interval active 状态下边框粗细 */
  intervalActiveBorder?: number;
  /** interval active 状态下边框颜色 */
  intervalActiveBorderColor?: string;
  /** interval active 状态下边框透明度 */
  intervalActiveBorderOpacity?: number;
  /** interval active 状态下填充颜色 */
  intervalActiveFillColor?: string;
  /** interval active 状态下填充透明度 */
  intervalActiveFillOpacity?: number;

  /** interval selected 状态下边框粗细 */
  intervalSelectedBorder?: number;
  /** interval selected 状态下边框颜色 */
  intervalSelectedBorderColor?: string;
  /** interval selected 状态下边框透明度 */
  intervalSelectedBorderOpacity?: number;
  /** interval selected 状态下填充颜色 */
  intervalSelectedFillColor?: string;
  /** interval selected 状态下填充透明度 */
  intervalSelectedFillOpacity?: number;

  /** interval inactive 状态下边框粗细 */
  intervalInactiveBorder?: number;
  /** interval inactive 状态下边框颜色 */
  intervalInactiveBorderColor?: string;
  /** interval inactive 状态下边框透明度 */
  intervalInactiveBorderOpacity?: number;
  /** interval inactive 状态下填充颜色 */
  intervalInactiveFillColor?: string;
  /** interval inactive 状态下填充透明度 */
  intervalInactiveFillOpacity?: number;

  /** hollowInterval 边框粗细 */
  hollowIntervalBorder?: number;
  /** hollowInterval 边框颜色 */
  hollowIntervalBorderColor?: string;
  /** hollowInterval 边框透明度 */
  hollowIntervalBorderOpacity?: number;
  /** hollowInterval 填充颜色 */
  hollowIntervalFillColor?: string;
  /** hollowInterval 填充透明度 */
  hollowIntervalFillOpacity?: number;

  /** hollowInterval active 状态下边框粗细 */
  hollowIntervalActiveBorder?: number;
  /** hollowInterval active 状态下边框颜色 */
  hollowIntervalActiveBorderColor?: string;
  /** hollowInterval active 状态下边框透明度 */
  hollowIntervalActiveBorderOpacity?: number;

  /** hollowInterval selected 状态下边框粗细 */
  hollowIntervalSelectedBorder?: number;
  /** hollowInterval selected 状态下边框颜色 */
  hollowIntervalSelectedBorderColor?: string;
  /** hollowInterval selected 状态下边框透明度 */
  hollowIntervalSelectedBorderOpacity?: number;

  /** hollowInterval inactive 状态下边框粗细 */
  hollowIntervalInactiveBorder?: number;
  /** hollowInterval inactive 状态下边框颜色 */
  hollowIntervalInactiveBorderColor?: string;
  /** hollowInterval inactive 状态下边框透明度 */
  hollowIntervalInactiveBorderOpacity?: number;
};
