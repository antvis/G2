import { TreeNode } from '../Tree';

export const stateConfig: TreeNode[] = [
  // 状态配置
  {
    id: 'mark.state',
    label: 'state',
    type: 'State',
    description: '状态|状态样式配置',
    optional: true,
    children: [
      // 激活状态
      {
        id: 'mark.state.active',
        label: 'active',
        type: 'Record<string, any>',
        description: '激活状态样式（如鼠标悬浮）',
        optional: true,
        children: [
          {
            id: 'mark.state.active.properties',
            label: '[key: string]',
            type: 'any',
            description: '自定义样式属性',
            optional: true,
          },
        ],
      },
      // 选中状态
      {
        id: 'mark.state.selected',
        label: 'selected',
        type: 'Record<string, any>',
        description: '选中状态样式',
        optional: true,
        children: [
          {
            id: 'mark.state.selected.properties',
            label: '[key: string]',
            type: 'any',
            description: '自定义样式属性',
            optional: true,
          },
        ],
      },
      // 非激活状态
      {
        id: 'mark.state.inactive',
        label: 'inactive',
        type: 'Record<string, any>',
        description: '非激活状态样式（其他元素激活时）',
        optional: true,
        children: [
          {
            id: 'mark.state.inactive.properties',
            label: '[key: string]',
            type: 'any',
            description: '自定义样式属性',
            optional: true,
          },
        ],
      },
      // 未选中状态
      {
        id: 'mark.state.unselected',
        label: 'unselected',
        type: 'Record<string, any>',
        description: '未选中状态样式（其他元素选中时）',
        optional: true,
        children: [
          {
            id: 'mark.state.unselected.properties',
            label: '[key: string]',
            type: 'any',
            description: '自定义样式属性',
            optional: true,
          },
        ],
      },
    ],
  },
];
