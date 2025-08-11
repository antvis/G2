import { TreeNode } from '../Tree';

export const titleConfig: TreeNode[] = [
  // 标题配置
  {
    id: 'mark.title',
    label: 'title',
    type: 'string | TitleComponent',
    description: '组件|标题组件',
    optional: true,
    children: [
      // 字符串配置
      {
        id: 'mark.title.string',
        label: 'string',
        type: 'string',
        description: '简单字符串标题，和对象配置二选一',
      },
      // 标题组件配置
      {
        id: 'mark.title.component',
        label: 'TitleComponent',
        type: 'Object',
        description: '标题组件配置',
        children: [
          // 基础内容配置
          {
            id: 'mark.title.component.title',
            label: 'title',
            type: 'string',
            description: '基础|主标题文本',
            optional: true,
          },
          {
            id: 'mark.title.component.subtitle',
            label: 'subtitle',
            type: 'string',
            description: '基础|副标题文本',
            optional: true,
          },
          // 布局配置
          {
            id: 'mark.title.component.align',
            label: 'align',
            type: "'left' | 'center' | 'right'",
            description: '布局|对齐方式（默认left）',
            optional: true,
          },
          {
            id: 'mark.title.component.spacing',
            label: 'spacing',
            type: 'number',
            description: '布局|主副标题间距（默认2）',
            optional: true,
          },
          // 位置配置（组件属性）
          {
            id: 'mark.title.component.position',
            label: 'position',
            type: "'top' | 'bottom' | 'left' | 'right'",
            description: '位置|标题位置（默认top）',
            optional: true,
          },
          {
            id: 'mark.title.component.order',
            label: 'order',
            type: 'number',
            description: '位置|渲染顺序（默认2）',
            optional: true,
          },
          {
            id: 'mark.title.component.size',
            label: 'size',
            type: 'number',
            description: '位置|组件尺寸（默认36）',
            optional: true,
          },
          // 边距配置
          {
            id: 'mark.title.component.padding',
            label: 'padding',
            type: '[number, number]',
            description: '边距|内边距（默认[12, 12]）',
            optional: true,
          },
          {
            id: 'mark.title.component.crossPadding',
            label: 'crossPadding',
            type: '[number, number]',
            description: '边距|交叉边距（默认[20, 20]）',
            optional: true,
          },
          // 主标题样式属性
          {
            id: 'mark.title.component.titleStyles',
            label: 'title*',
            type: 'any',
            description:
              '样式|主标题样式属性（titleFill、titleFontSize、titleFontWeight等）',
            optional: true,
          },
          // 副标题样式属性
          {
            id: 'mark.title.component.subtitleStyles',
            label: 'subtitle*',
            type: 'any',
            description:
              '样式|副标题样式属性（subtitleFill、subtitleFontSize、subtitleOpacity等）',
            optional: true,
          },
        ],
      },
    ],
  },
];
