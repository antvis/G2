import { TreeNode } from '../Tree';

export const sliderConfig: TreeNode[] = [
  // 缩略轴配置
  {
    id: 'mark.slider',
    label: 'slider',
    type: 'SliderComponent',
    description: '组件|缩略轴组件',
    optional: true,
    children: [
      // 基础配置
      {
        id: 'mark.slider.orientation',
        label: 'orientation',
        type: "'horizontal' | 'vertical'",
        description: '基础|缩略轴方向',
        optional: true,
      },
      {
        id: 'mark.slider.showHandle',
        label: 'showHandle',
        type: 'boolean',
        description: '基础|是否显示手柄',
        optional: true,
      },
      {
        id: 'mark.slider.showLabel',
        label: 'showLabel',
        type: 'boolean',
        description: '基础|是否显示标签',
        optional: true,
      },
      {
        id: 'mark.slider.showLabelOnInteraction',
        label: 'showLabelOnInteraction',
        type: 'boolean',
        description: '基础|交互时是否显示标签',
        optional: true,
      },
      {
        id: 'mark.slider.autoFitLabel',
        label: 'autoFitLabel',
        type: 'boolean',
        description: '基础|是否自动适配标签',
        optional: true,
      },
      // 位置配置（组件属性）
      {
        id: 'mark.slider.position',
        label: 'position',
        type: "'top' | 'bottom' | 'left' | 'right'",
        description: '位置|缩略轴位置（默认bottom）',
        optional: true,
      },
      {
        id: 'mark.slider.order',
        label: 'order',
        type: 'number',
        description: '位置|渲染顺序（默认1）',
        optional: true,
      },
      {
        id: 'mark.slider.size',
        label: 'size',
        type: 'number',
        description: '位置|组件尺寸（默认24）',
        optional: true,
      },
      // 边距配置
      {
        id: 'mark.slider.padding',
        label: 'padding',
        type: '[number, number]',
        description: '边距|内边距（默认[12, 12]）',
        optional: true,
      },
      {
        id: 'mark.slider.crossPadding',
        label: 'crossPadding',
        type: '[number, number]',
        description: '边距|交叉边距（默认[12, 12]）',
        optional: true,
      },
      // 功能配置
      {
        id: 'mark.slider.labelFormatter',
        label: 'labelFormatter',
        type: 'string | ((value: any) => string)',
        description: '功能|标签格式化函数',
        optional: true,
      },
      {
        id: 'mark.slider.sparklineData',
        label: 'sparklineData',
        type: 'any[]',
        description: '功能|火花线数据',
        optional: true,
      },
      // 轨道配置
      {
        id: 'mark.slider.trackSize',
        label: 'trackSize',
        type: 'number',
        description: '轨道|轨道尺寸',
        optional: true,
      },
      {
        id: 'mark.slider.trackLength',
        label: 'trackLength',
        type: 'number',
        description: '轨道|轨道长度（自动计算）',
        optional: true,
      },
      // 轨道样式属性
      {
        id: 'mark.slider.trackStyles',
        label: 'track*',
        type: 'any',
        description:
          '样式|轨道样式属性（trackFill、trackStroke、trackRadius等）',
        optional: true,
      },
      // 手柄样式属性
      {
        id: 'mark.slider.handleStyles',
        label: 'handle*',
        type: 'any',
        description:
          '样式|手柄样式属性（handleFill、handleStroke、handleRadius等）',
        optional: true,
      },
      // 标签样式属性
      {
        id: 'mark.slider.labelStyles',
        label: 'label*',
        type: 'any',
        description:
          '样式|标签样式属性（labelFill、labelFontSize、labelOffset等）',
        optional: true,
      },
      // 火花线样式属性
      {
        id: 'mark.slider.sparklineStyles',
        label: 'sparkline*',
        type: 'any',
        description:
          '样式|火花线样式属性（sparklineFill、sparklineStroke、sparklineOpacity等）',
        optional: true,
      },
      // 缩略轴整体样式
      {
        id: 'mark.slider.style',
        label: 'style',
        type: 'Record<string, any>',
        description: '样式|整体样式配置',
        optional: true,
      },
    ],
  },
];
