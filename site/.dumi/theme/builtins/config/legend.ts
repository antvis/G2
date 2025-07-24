import { TreeNode } from '../Tree';

// 生成图例通用配置的函数
const createLegendCommonConfig = (channelType: string): TreeNode[] => [
  // 通用配置属性
  {
    id: `mark.legend.${channelType}.position`,
    label: 'position',
    type: "'top' | 'bottom' | 'left' | 'right' | 'center'",
    description: '通用|图例位置（默认top）',
    optional: true,
  },
  {
    id: `mark.legend.${channelType}.title`,
    label: 'title',
    type: 'string | string[]',
    description: '通用|图例标题',
    optional: true,
  },
  {
    id: `mark.legend.${channelType}.layout`,
    label: 'layout',
    type: 'FlexLayout',
    description: '通用|布局配置',
    optional: true,
    children: [
      {
        id: `mark.legend.${channelType}.layout.justifyContent`,
        label: 'justifyContent',
        type: "'flex-start' | 'flex-end' | 'center'",
        description: '布局|主轴对齐方式（默认flex-start）',
        optional: true,
      },
      {
        id: `mark.legend.${channelType}.layout.alignItems`,
        label: 'alignItems',
        type: "'flex-start' | 'flex-end' | 'center'",
        description: '布局|交叉轴对齐（默认flex-start）',
        optional: true,
      },
      {
        id: `mark.legend.${channelType}.layout.flexDirection`,
        label: 'flexDirection',
        type: "'row' | 'column'",
        description:
          '布局|主轴方向（position为top和bottom时默认row，其他为column）',
        optional: true,
      },
    ],
  },
  {
    id: `mark.legend.${channelType}.labelFormatter`,
    label: 'labelFormatter',
    type: 'string | ((d: any) => string)',
    description: '通用|标签格式化函数',
    optional: true,
  },
  {
    id: `mark.legend.${channelType}.orientation`,
    label: 'orientation',
    type: "'horizontal' | 'vertical'",
    description: '分类|图例方向',
    optional: true,
  },
  {
    id: `mark.legend.${channelType}.cols`,
    label: 'cols',
    type: 'number',
    description: '分类|网格列数',
    optional: true,
  },
  {
    id: `mark.legend.${channelType}.gridRow`,
    label: 'gridRow',
    type: 'number',
    description: '分类|网格行数',
    optional: true,
  },
  {
    id: `mark.legend.${channelType}.colPadding`,
    label: 'colPadding',
    type: 'number',
    description: '分类|图例项横向间隔（默认12）',
    optional: true,
  },
  {
    id: `mark.legend.${channelType}.rowPadding`,
    label: 'rowPadding',
    type: 'number',
    description: '分类|图例项纵向间隔（默认8）',
    optional: true,
  },
  {
    id: `mark.legend.${channelType}.maxRows`,
    label: 'maxRows',
    type: 'number',
    description: '分类|最大行数（默认3，仅水平布局生效）',
    optional: true,
  },
  {
    id: `mark.legend.${channelType}.maxCols`,
    label: 'maxCols',
    type: 'number',
    description: '分类|最大列数（默认3，仅垂直布局生效）',
    optional: true,
  },
  {
    id: `mark.legend.${channelType}.itemWidth`,
    label: 'itemWidth',
    type: 'number',
    description: '分类|图例项宽度',
    optional: true,
  },
  {
    id: `mark.legend.${channelType}.itemSpan`,
    label: 'itemSpan',
    type: 'number | number[]',
    description: '分类|图例项图标、标签和值的空间划分（默认[1, 1, 1]）',
    optional: true,
  },
  {
    id: `mark.legend.${channelType}.itemSpacing`,
    label: 'itemSpacing',
    type: 'number | number[]',
    description: '分类|图例项图标、标签和值之间的间距（默认[8, 8]）',
    optional: true,
  },
  {
    id: `mark.legend.${channelType}.itemMarker`,
    label: 'itemMarker',
    type: 'string | (datum: any, index: number, data: any[]) => string | DisplayObject)',
    description: '分类|图例项标记形状',
    optional: true,
  },
  {
    id: `mark.legend.${channelType}.itemValueText`,
    label: 'itemValueText',
    type: 'string | ((datum: any, index: number, data: any[]) => string)',
    description: '分类|图例项值文本',
    optional: true,
  },
  {
    id: `mark.legend.${channelType}.itemLabelText`,
    label: 'itemLabelText',
    type: 'string | ((datum: any, index: number, data: any[]) => string)',
    description: '分类|图例项标签文本',
    optional: true,
  },
  // 分页器样式属性
  {
    id: `mark.legend.${channelType}.navStyles`,
    label: 'nav*',
    type: 'any',
    description: '分类|分页器属性',
    optional: true,
  },
  {
    id: `mark.legend.${channelType}.sizeConfig`,
    label: 'size',
    type: 'number',
    description: '通用|图例尺寸（默认60）',
    optional: true,
  },
  {
    id: `mark.legend.${channelType}.length`,
    label: 'length',
    type: 'number',
    description: '通用|图例长度（默认200）',
    optional: true,
  },
  // 位置配置（组件属性）
  {
    id: `mark.legend.${channelType}.order`,
    label: 'order',
    type: 'number',
    description: '位置|渲染顺序（默认1）',
    optional: true,
  },
  // 边距配置
  {
    id: `mark.legend.${channelType}.padding`,
    label: 'padding',
    type: '[number, number]',
    description: '边距|内边距（分类默认[12, 12]，连续默认[20, 10]）',
    optional: true,
  },
  {
    id: `mark.legend.${channelType}.crossPadding`,
    label: 'crossPadding',
    type: '[number, number]',
    description: '边距|交叉边距（默认[12, 12]）',
    optional: true,
  },
  // 连续图例配置
  {
    id: `mark.legend.${channelType}.colorRange`,
    label: 'color',
    type: 'string[] | d3-interpolate',
    description: '连续|连续图例色带颜色',
    optional: true,
  },
  {
    id: `mark.legend.${channelType}.block`,
    label: 'block',
    type: 'boolean',
    description: '连续|连续图例是否按区间显示（默认false）',
    optional: true,
  },
  {
    id: `mark.legend.${channelType}.itemMarkerStyles`,
    label: 'itemMarker*',
    type: 'any',
    description:
      '样式|图例项标记样式属性（itemMarkerFill、itemMarkerStroke等）',
    optional: true,
  },
  {
    id: `mark.legend.${channelType}.itemLabelStyles`,
    label: 'itemLabel*',
    type: 'any',
    description: '样式|图例项标签样式属性（itemLabelFill、itemLabelStroke等）',
    optional: true,
  },
  {
    id: `mark.legend.${channelType}.itemValueStyles`,
    label: 'itemValue*',
    type: 'any',
    description: '样式|图例项值样式属性（itemValueFill、itemValueStroke等）',
    optional: true,
  },
  {
    id: `mark.legend.${channelType}.itemBackgroundStyles`,
    label: 'itemBackground*',
    type: 'any',
    description:
      '样式|图例项背景样式属性（itemBackgroundFill、itemBackgroundStroke、itemBackgroundRadius等）',
    optional: true,
  },
  // 连续图例样式属性
  {
    id: `mark.legend.${channelType}.ribbonStyles`,
    label: 'ribbon*',
    type: 'any',
    description:
      '样式|连续图例色带样式属性（ribbonFill、ribbonStroke、ribbonRadius等）',
    optional: true,
  },
  {
    id: `mark.legend.${channelType}.handleStyles`,
    label: 'handle*',
    type: 'any',
    description:
      '样式|连续图例手柄样式属性（handleFill、handleStroke、handleSize等）',
    optional: true,
  },
  // 标题样式属性
  {
    id: `mark.legend.${channelType}.titleStyles`,
    label: 'title*',
    type: 'any',
    description:
      '样式|图例标题样式属性（titleFill、titleFontSize、titleSpacing等）',
    optional: true,
  },
  // 标签样式属性
  {
    id: `mark.legend.${channelType}.labelStyles`,
    label: 'label*',
    type: 'any',
    description:
      '样式|连续图例刻度值标签样式属性（labelFill、labelFontSize、labelSpacing等）',
    optional: true,
  },
];

export const legendConfig: TreeNode[] = [
  // 图例配置
  {
    id: 'mark.legend',
    label: 'legend',
    type: 'LegendComponent',
    description: '组件|图例组件',
    optional: true,
    children: [
      // 可视化通道配置（与通用配置同级）
      {
        id: 'mark.legend.color',
        label: 'color',
        type: 'LegendChannelComponent',
        description: '通道|颜色图例配置',
        optional: true,
        children: createLegendCommonConfig('color'),
      },
      {
        id: 'mark.legend.size',
        label: 'size',
        type: 'LegendChannelComponent',
        description: '通道|大小图例配置',
        optional: true,
        children: createLegendCommonConfig('size'),
      },
      {
        id: 'mark.legend.shape',
        label: 'shape',
        type: 'LegendChannelComponent',
        description: '通道|形状图例配置',
        optional: true,
        children: createLegendCommonConfig('shape'),
      },
      {
        id: 'mark.legend.opacity',
        label: 'opacity',
        type: 'LegendChannelComponent',
        description: '通道|透明度图例配置',
        optional: true,
        children: createLegendCommonConfig('opacity'),
      },
    ],
  },
];
