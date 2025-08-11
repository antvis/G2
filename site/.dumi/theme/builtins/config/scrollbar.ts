import { TreeNode } from '../Tree';

export const scrollbarConfig: TreeNode[] = [
  // 滚动条配置
  {
    id: 'mark.scrollbar',
    label: 'scrollbar',
    type: 'ScrollbarComponent',
    description: '组件|滚动条组件',
    optional: true,
    children: [
      // 基础配置
      {
        id: 'mark.scrollbar.orientation',
        label: 'orientation',
        type: "'horizontal' | 'vertical'",
        description: '基础|滚动条方向',
        optional: true,
      },
      {
        id: 'mark.scrollbar.ratio',
        label: 'ratio',
        type: 'number',
        description: '基础|滚动比例',
        optional: true,
      },
      // 位置配置（组件属性）
      {
        id: 'mark.scrollbar.position',
        label: 'position',
        type: "'top' | 'bottom' | 'left' | 'right'",
        description: '位置|滚动条位置（默认bottom）',
        optional: true,
      },
      {
        id: 'mark.scrollbar.order',
        label: 'order',
        type: 'number',
        description: '位置|渲染顺序（默认1）',
        optional: true,
      },
      {
        id: 'mark.scrollbar.size',
        label: 'size',
        type: 'number',
        description: '位置|组件尺寸（默认24）',
        optional: true,
      },
      // 边距配置
      {
        id: 'mark.scrollbar.padding',
        label: 'padding',
        type: '[number, number]',
        description: '边距|内边距（默认[12, 12]）',
        optional: true,
      },
      {
        id: 'mark.scrollbar.crossPadding',
        label: 'crossPadding',
        type: '[number, number]',
        description: '边距|交叉边距（默认[12, 12]）',
        optional: true,
      },
      // 功能配置
      {
        id: 'mark.scrollbar.labelFormatter',
        label: 'labelFormatter',
        type: '(value: any) => string',
        description: '功能|标签格式化函数',
        optional: true,
      },
      // 轨道样式属性
      {
        id: 'mark.scrollbar.trackStyles',
        label: 'track*',
        type: 'any',
        description:
          '样式|轨道样式属性（trackFill、trackStroke、trackRadius等）',
        optional: true,
      },
      // 滑块样式属性
      {
        id: 'mark.scrollbar.thumbStyles',
        label: 'thumb*',
        type: 'any',
        description:
          '样式|滑块样式属性（thumbFill、thumbStroke、thumbRadius等）',
        optional: true,
      },
      // 滚动条整体样式
      {
        id: 'mark.scrollbar.style',
        label: 'style',
        type: 'Record<string, any>',
        description: '样式|整体样式配置',
        optional: true,
      },
    ],
  },
];
