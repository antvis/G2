import { StyleSheetCfg } from '../../interface';

const WHITE_COLORS = {
  100: '#000',
  95: '#0D0D0D',
  85: '#262626',
  65: '#595959',
  45: '#8C8C8C',
  25: '#BFBFBF',
  15: '#D9D9D9',
  6: '#F0F0F0',
};

const BLACK_COLORS = {
  100: '#FFFFFF',
  95: '#F2F2F2',
  85: '#D9D9D9',
  65: '#A6A6A6',
  45: '#737373',
  25: '#404040',
  15: '#262626',
  6: '#0F0F0F',
};

const QUALITATIVE_10 = [
  '#5B8FF9',
  '#5AD8A6',
  '#5D7092',
  '#F6BD16',
  '#E86452',
  '#6DC8EC',
  '#945FB9',
  '#FF9845',
  '#1E9493',
  '#FF99C3',
];

const QUALITATIVE_20 = [
  '#5B8FF9',
  '#CDDDFD',
  '#5AD8A6',
  '#CDF3E4',
  '#5D7092',
  '#CED4DE',
  '#F6BD16',
  '#FCEBB9',
  '#E86452',
  '#F8D0CB',
  '#6DC8EC',
  '#D3EEF9',
  '#945FB9',
  '#DECFEA',
  '#FF9845',
  '#FFE0C7',
  '#1E9493',
  '#BBDEDE',
  '#FF99C3',
  '#FFE0ED',
];

/** 单色顺序色板 */
const SINGLE_SEQUENCE = [
  '#B8E1FF',
  '#9AC5FF',
  '#7DAAFF',
  '#5B8FF9',
  '#3D76DD',
  '#085EC0',
  '#0047A5',
  '#00318A',
  '#001D70',
];

export const createDarkStyleSheet = (cfg: StyleSheetCfg = {}) => {
  const { paletteQualitative10 = QUALITATIVE_10, paletteQualitative20 = QUALITATIVE_20 } = cfg;
  const { brandColor = paletteQualitative10[0] } = cfg;

  const token = {
    /** 图表背景色 */
    backgroundColor: '#141414',
    /** 主题色 */
    brandColor,
    /** 图表辅助色 */
    subColor: 'rgba(255,255,255,0.05)',
    /** 分类色板 1，在数据量小于等于 10 时使用 */
    paletteQualitative10,
    /** 分类色板 2，在数据量大于 10 时使用 */
    paletteQualitative20,
    /** 语义色 */
    paletteSemanticRed: '#F4664A',
    /** 语义色 */
    paletteSemanticGreen: '#30BF78',
    /** 语义色 */
    paletteSemanticYellow: '#FAAD14',
    /** (单色)顺序色板 */
    paletteSequence: SINGLE_SEQUENCE,
    /** 字体 */
    fontFamily: `"Segoe UI", Roboto, "Helvetica Neue", Arial,
    "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
    "Noto Color Emoji"`,

    // -------------------- 坐标轴 --------------------
    /** 坐标轴线颜色 */
    axisLineBorderColor: BLACK_COLORS[25],
    /** 坐标轴线粗细 */
    axisLineBorder: 1,
    /** 坐标轴线 lineDash 设置 */
    axisLineDash: null,

    /** 坐标轴标题颜色 */
    axisTitleTextFillColor: BLACK_COLORS[65],
    /** 坐标轴标题文本字体大小 */
    axisTitleTextFontSize: 12,
    /** 坐标轴标题文本行高 */
    axisTitleTextLineHeight: 12,
    /** 坐标轴标题文本字体粗细 */
    axisTitleTextFontWeight: 'normal',
    /** 坐标轴标题距离坐标轴文本的间距 */
    axisTitleSpacing: 12,
    /** 坐标轴标题详细说明icon颜色 */
    axisDescriptionIconFillColor: WHITE_COLORS[85],

    /** 坐标轴刻度线颜色 */
    axisTickLineBorderColor: BLACK_COLORS[25],
    /** 坐标轴刻度线长度 */
    axisTickLineLength: 4,
    /** 坐标轴刻度线粗细 */
    axisTickLineBorder: 1,

    /** 坐标轴次刻度线颜色 */
    axisSubTickLineBorderColor: BLACK_COLORS[15],
    /** 坐标轴次刻度线长度 */
    axisSubTickLineLength: 2,
    /** 坐标轴次刻度线粗细 */
    axisSubTickLineBorder: 1,

    /** 坐标轴刻度文本颜色 */
    axisLabelFillColor: BLACK_COLORS[45],
    /** 坐标轴刻度文本字体大小 */
    axisLabelFontSize: 12,
    /** 坐标轴刻度文本行高 */
    axisLabelLineHeight: 12,
    /** 坐标轴刻度文本字体粗细 */
    axisLabelFontWeight: 'normal',
    /** 坐标轴刻度文本距离坐标轴线的间距 */
    axisLabelOffset: 8,

    /** 坐标轴网格线颜色 */
    axisGridBorderColor: BLACK_COLORS[15],
    /** 坐标轴网格线粗细 */
    axisGridBorder: 1,
    /** 坐标轴网格线虚线设置 */
    axisGridLineDash: null,

    // -------------------- 图例 --------------------
    /** 图例标题颜色 */
    legendTitleTextFillColor: BLACK_COLORS[45],
    /** 图例标题文本字体大小 */
    legendTitleTextFontSize: 12,
    /** 图例标题文本行高 */
    legendTitleTextLineHeight: 21,
    /** 图例标题文本字体粗细 */
    legendTitleTextFontWeight: 'normal',

    /** 图例 marker 颜色 */
    legendMarkerColor: QUALITATIVE_10[0],
    /** 图例 marker 距离图例文本的间距 */
    legendMarkerSpacing: 8,
    /** 图例 marker 默认半径大小 */
    legendMarkerSize: 4,
    /** 图例 'circle' marker 半径 */
    legendCircleMarkerSize: 4,
    /** 图例 'square' marker 半径 */
    legendSquareMarkerSize: 4,
    /** 图例 'line' marker 半径 */
    legendLineMarkerSize: 5,

    /** 图例项文本颜色 */
    legendItemNameFillColor: BLACK_COLORS[65],
    /** 图例项文本字体大小 */
    legendItemNameFontSize: 12,
    /** 图例项文本行高 */
    legendItemNameLineHeight: 12,
    /** 图例项粗细 */
    legendItemNameFontWeight: 'normal',
    /** 图例项之间的水平间距 */
    legendItemSpacing: 24,
    /** 图例项垂直方向的间隔 */
    legendItemMarginBottom: 12,
    /** 图例与图表绘图区域的偏移距离  */
    legendSpacing: 16,
    /** 图例与图表绘图区域的偏移距离  */
    legendPadding: [8, 8, 8, 8],
    /** 水平布局的图例与绘图区域偏移距离 */
    legendHorizontalPadding: [8, 0, 8, 0],
    /** 垂直布局的图例与绘图区域偏移距离 */
    legendVerticalPadding: [0, 8, 0, 8],

    // 图例分页器
    /** 图例分页器 marker 大小 */
    legendPageNavigatorMarkerSize: 12,
    /** 图例分页器 marker 填充色 */
    legendPageNavigatorMarkerInactiveFillColor: BLACK_COLORS[45],
    /** 图例分页器 marker 填充色透明度 */
    legendPageNavigatorMarkerInactiveFillOpacity: 0.45,
    /** 图例分页器 marker 激活状态填充色 */
    legendPageNavigatorMarkerFillColor: BLACK_COLORS[45],
    /** 图例分页器 marker 激活状态填充色透明度 */
    legendPageNavigatorMarkerFillOpacity: 1,
    /** 图例分页器文本颜色 */
    legendPageNavigatorTextFillColor: BLACK_COLORS[65],
    /** 图例分页器文本字体大小 */
    legendPageNavigatorTextFontSize: 12,

    /** 连续图例滑块填充色 */
    sliderRailFillColor: BLACK_COLORS[15],
    /** 连续图例滑块边框粗细 */
    sliderRailBorder: 0,
    /** 连续图例滑块边框颜色 */
    sliderRailBorderColor: null,
    /** 连续图例滑块宽度 */
    sliderRailWidth: 100,
    /** 连续图例滑块高度 */
    sliderRailHeight: 12,

    /** 连续图例文本颜色 */
    sliderLabelTextFillColor: BLACK_COLORS[45],
    /** 连续图例文本字体大小 */
    sliderLabelTextFontSize: 12,
    /** 连续图例文本行高 */
    sliderLabelTextLineHeight: 12,
    /** 连续图例文本字体粗细 */
    sliderLabelTextFontWeight: 'normal',

    /** 连续图例滑块颜色 */
    sliderHandlerFillColor: WHITE_COLORS[6],
    /** 连续图例滑块宽度 */
    sliderHandlerWidth: 10,
    /** 连续图例滑块高度 */
    sliderHandlerHeight: 14,
    /** 连续图例滑块边框粗细 */
    sliderHandlerBorder: 1,
    /** 连续图例滑块边框颜色 */
    sliderHandlerBorderColor: WHITE_COLORS[25],

    // -------------------- Annotation，图形标注 --------------------
    /** arc 图形标注描边颜色 */
    annotationArcBorderColor: BLACK_COLORS[15],
    /** arc 图形标注粗细 */
    annotationArcBorder: 1,

    /** line 图形标注颜色 */
    annotationLineBorderColor: BLACK_COLORS[25],
    /** line 图形标注粗细 */
    annotationLineBorder: 1,
    /** lube 图形标注的虚线间隔 */
    annotationLineDash: null,

    /** text 图形标注文本颜色 */
    annotationTextFillColor: BLACK_COLORS[65],
    /** text 图形标注文本字体大小 */
    annotationTextFontSize: 12,
    /** text 图形标注文本行高 */
    annotationTextLineHeight: 12,
    /** text 图形标注文本字体粗细 */
    annotationTextFontWeight: 'normal',
    /** text 图形标注文本边框颜色 */
    annotationTextBorderColor: null,
    /** text 图形标注文本边框粗细 */
    annotationTextBorder: 0,

    /** region 图形标注填充颜色 */
    annotationRegionFillColor: BLACK_COLORS[100],
    /** region 图形标注填充颜色透明色 */
    annotationRegionFillOpacity: 0.06,
    /** region 图形标注描边粗细 */
    annotationRegionBorder: 0,
    /** region 图形标注描边颜色 */
    annotationRegionBorderColor: null,

    /** dataMarker 图形标注线的长度 */
    annotationDataMarkerLineLength: 16,

    // -------------------- Tooltip --------------------
    /** tooltip crosshairs 辅助线颜色 */
    tooltipCrosshairsBorderColor: BLACK_COLORS[25],
    /** tooltip crosshairs 辅助线粗细 */
    tooltipCrosshairsBorder: 1,
    /** tooltip crosshairs 辅助线虚线间隔 */
    tooltipCrosshairsLineDash: null,

    /** tooltip 内容框背景色 */
    tooltipContainerFillColor: '#1f1f1f',
    tooltipContainerFillOpacity: 0.95,
    /** tooltip 内容框阴影 */
    tooltipContainerShadow: '0px 2px 4px rgba(0,0,0,.5)',
    /** tooltip 内容框圆角 */
    tooltipContainerBorderRadius: 3,

    /** tooltip 文本颜色 */
    tooltipTextFillColor: BLACK_COLORS[65],
    /** tooltip 文本字体大小 */
    tooltipTextFontSize: 12,
    /** tooltip 文本行高 */
    tooltipTextLineHeight: 12,
    /** tooltip 文本字体粗细 */
    tooltipTextFontWeight: 'bold',

    // -------------------- Geometry labels --------------------
    /** Geometry label 文本颜色 */
    labelFillColor: BLACK_COLORS[65],
    labelFillColorDark: '#2c3542',
    labelFillColorLight: '#ffffff',
    /** Geometry label 文本字体大小 */
    labelFontSize: 12,
    /** Geometry label 文本行高 */
    labelLineHeight: 12,
    /** Geometry label 文本字体粗细 */
    labelFontWeight: 'normal',
    /** Geometry label 文本描边颜色 */
    labelBorderColor: null,
    /** Geometry label 文本描边粗细 */
    labelBorder: 0,

    /** Geometry innerLabel 文本颜色 */
    innerLabelFillColor: WHITE_COLORS[100],
    /** Geometry innerLabel 文本字体大小 */
    innerLabelFontSize: 12,
    /** Geometry innerLabel 文本行高 */
    innerLabelLineHeight: 12,
    /** Geometry innerLabel 文本字体粗细 */
    innerLabelFontWeight: 'normal',
    /** Geometry innerLabel 文本描边颜色 */
    innerLabelBorderColor: null,
    /** Geometry innerLabel 文本描边粗细 */
    innerLabelBorder: 0,

    /** Geometry label 文本颜色 */
    overflowLabelFillColor: BLACK_COLORS[65],
    overflowLabelFillColorDark: '#2c3542',
    overflowLabelFillColorLight: '#ffffff',
    /** Geometry label 文本字体大小 */
    overflowLabelFontSize: 12,
    /** Geometry label 文本行高 */
    overflowLabelLineHeight: 12,
    /** Geometry label 文本字体粗细 */
    overflowLabelFontWeight: 'normal',
    /** Geometry label 文本描边颜色 */
    overflowLabelBorderColor: WHITE_COLORS[100],
    /** Geometry label 文本描边粗细 */
    overflowLabelBorder: 1,

    /** Geometry label 文本连接线粗细 */
    labelLineBorder: 1,
    /** Geometry label 文本连接线颜色 */
    labelLineBorderColor: BLACK_COLORS[25],

    // -------------------- Slider 组件样式--------------------
    /** slider 滑道高度 */
    cSliderRailHieght: 16,
    /** slider 滑道背景色 */
    cSliderBackgroundFillColor: '#416180',
    /** slider 滑道背景色透明度 */
    cSliderBackgroundFillOpacity: 0.05,
    /** slider 滑道前景色 */
    cSliderForegroundFillColor: '#5B8FF9',
    /** slider 滑道前景色透明度 */
    cSliderForegroundFillOpacity: 0.15,
    // slider handlerStyle 手柄样式
    /** slider 手柄高度 */
    cSliderHandlerHeight: 24,
    /** Slider 手柄宽度 */
    cSliderHandlerWidth: 10,
    /** Slider 手柄背景色 */
    cSliderHandlerFillColor: '#F7F7F7',
    /** Slider 手柄背景色透明度 */
    cSliderHandlerFillOpacity: 1,
    /** Slider 手柄高亮背景色 */
    cSliderHandlerHighlightFillColor: '#FFF',
    /** Slider 手柄边框色 */
    cSliderHandlerBorderColor: '#BFBFBF',
    /** Slider 手柄边框粗细 */
    cSliderHandlerBorder: 1,
    /** Slider 手柄边框圆角 */
    cSliderHandlerBorderRadius: 2,
    // slider textStyle 字体标签样式
    /** Slider 字体标签颜色 */
    cSliderTextFillColor: '#fff',
    /** Slider 字体标签透明度 */
    cSliderTextFillOpacity: 0.45,
    /** Slider 字体标签大小 */
    cSliderTextFontSize: 12,
    /** Slider 字体标签行高 */
    cSliderTextLineHeight: 12,
    /** Slider 字体标签字重 */
    cSliderTextFontWeight: 'normal',
    /** Slider 字体标签描边色 */
    cSliderTextBorderColor: null,
    /** Slider 字体标签描边粗细 */
    cSliderTextBorder: 0,

    // -------------------- Scrollbar 组件样式--------------------
    /** 滚动条 滚道填充色 */
    scrollbarTrackFillColor: 'rgba(255,255,255,0.65)',
    /** 滚动条 滑块填充色 */
    scrollbarThumbFillColor: 'rgba(0,0,0,0.35)',
    /** 滚动条 滑块高亮填充色 */
    scrollbarThumbHighlightFillColor: 'rgba(0,0,0,0.45)',

    // -------------------- Geometry 图形样式--------------------
    /** 点图填充颜色 */
    pointFillColor: QUALITATIVE_10[0],
    /** 点图填充颜色透明度 */
    pointFillOpacity: 0.95,
    /** 点图大小 */
    pointSize: 4,
    /** 点图描边粗细 */
    pointBorder: 1,
    /** 点图描边颜色 */
    pointBorderColor: WHITE_COLORS[100],
    /** 点图描边透明度 */
    pointBorderOpacity: 1,

    /** 点图 active 状态下描边颜色 */
    pointActiveBorderColor: BLACK_COLORS[100],

    /** 点图 selected 状态下描边粗细 */
    pointSelectedBorder: 2,
    /** 点图 selected 状态下描边颜色 */
    pointSelectedBorderColor: BLACK_COLORS[100],

    /** 点图 inactive 状态下填充颜色透明度 */
    pointInactiveFillOpacity: 0.3,
    /** 点图 inactive 状态下描边透明度 */
    pointInactiveBorderOpacity: 0.3,

    /** 空心点图大小 */
    hollowPointSize: 4,
    /** 空心点图描边粗细 */
    hollowPointBorder: 1,
    /** 空心点图描边颜色 */
    hollowPointBorderColor: QUALITATIVE_10[0],
    /** 空心点图描边透明度 */
    hollowPointBorderOpacity: 0.95,
    hollowPointFillColor: WHITE_COLORS[100],

    /** 空心点图 active 状态下描边粗细 */
    hollowPointActiveBorder: 1,
    /** 空心点图 active 状态下描边颜色 */
    hollowPointActiveBorderColor: BLACK_COLORS[100],
    /** 空心点图 active 状态下描边透明度 */
    hollowPointActiveBorderOpacity: 1,

    /** 空心点图 selected 状态下描边粗细 */
    hollowPointSelectedBorder: 2,
    /** 空心点图 selected 状态下描边颜色 */
    hollowPointSelectedBorderColor: BLACK_COLORS[100],
    /** 空心点图 selected 状态下描边透明度 */
    hollowPointSelectedBorderOpacity: 1,

    /** 空心点图 inactive 状态下描边透明度 */
    hollowPointInactiveBorderOpacity: 0.3,

    /** 线图粗细 */
    lineBorder: 2,
    /** 线图颜色 */
    lineBorderColor: QUALITATIVE_10[0],
    /** 线图透明度 */
    lineBorderOpacity: 1,

    /** 线图 Active 状态下粗细 */
    lineActiveBorder: 3,

    /** 线图 selected 状态下粗细 */
    lineSelectedBorder: 3,

    /** 线图 inactive 状态下透明度 */
    lineInactiveBorderOpacity: 0.3,

    /** area 填充颜色 */
    areaFillColor: QUALITATIVE_10[0],
    /** area 填充透明度 */
    areaFillOpacity: 0.25,

    /** area 在 active 状态下的填充透明度 */
    areaActiveFillColor: QUALITATIVE_10[0],
    areaActiveFillOpacity: 0.5,

    /** area 在 selected 状态下的填充透明度 */
    areaSelectedFillColor: QUALITATIVE_10[0],
    areaSelectedFillOpacity: 0.5,

    /** area inactive 状态下填充透明度 */
    areaInactiveFillOpacity: 0.3,

    /** hollowArea 颜色 */
    hollowAreaBorderColor: QUALITATIVE_10[0],
    /** hollowArea 边框粗细 */
    hollowAreaBorder: 2,
    /** hollowArea 边框透明度 */
    hollowAreaBorderOpacity: 1,

    /** hollowArea active 状态下的边框粗细 */
    hollowAreaActiveBorder: 3,
    hollowAreaActiveBorderColor: BLACK_COLORS[100],

    /** hollowArea selected 状态下的边框粗细 */
    hollowAreaSelectedBorder: 3,
    hollowAreaSelectedBorderColor: BLACK_COLORS[100],

    /** hollowArea inactive 状态下的边框透明度 */
    hollowAreaInactiveBorderOpacity: 0.3,

    /** interval 填充颜色 */
    intervalFillColor: QUALITATIVE_10[0],
    /** interval 填充透明度 */
    intervalFillOpacity: 0.95,

    /** interval active 状态下边框粗细 */
    intervalActiveBorder: 1,
    /** interval active 状态下边框颜色 */
    intervalActiveBorderColor: BLACK_COLORS[100],
    intervalActiveBorderOpacity: 1,

    /** interval selected 状态下边框粗细 */
    intervalSelectedBorder: 2,
    /** interval selected 状态下边框颜色 */
    intervalSelectedBorderColor: BLACK_COLORS[100],
    /** interval selected 状态下边框透明度 */
    intervalSelectedBorderOpacity: 1,

    /** interval inactive 状态下边框透明度 */
    intervalInactiveBorderOpacity: 0.3,
    /** interval inactive 状态下填充透明度 */
    intervalInactiveFillOpacity: 0.3,

    /** interval 边框粗细 */
    hollowIntervalBorder: 2,
    /** hollowInterval 边框颜色 */
    hollowIntervalBorderColor: QUALITATIVE_10[0],
    /** hollowInterval 边框透明度 */
    hollowIntervalBorderOpacity: 1,
    hollowIntervalFillColor: WHITE_COLORS[100],

    /** hollowInterval active 状态下边框粗细 */
    hollowIntervalActiveBorder: 2,
    /** hollowInterval active 状态下边框颜色 */
    hollowIntervalActiveBorderColor: BLACK_COLORS[100],

    /** hollowInterval selected 状态下边框粗细 */
    hollowIntervalSelectedBorder: 3,
    /** hollowInterval selected 状态下边框颜色 */
    hollowIntervalSelectedBorderColor: BLACK_COLORS[100],
    /** hollowInterval selected 状态下边框透明度 */
    hollowIntervalSelectedBorderOpacity: 1,

    /** hollowInterval inactive 状态下边框透明度 */
    hollowIntervalInactiveBorderOpacity: 0.3,
  };

  return { ...token, ...cfg };
};

export const antvDark = createDarkStyleSheet();
