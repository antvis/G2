import { TreeNode } from '../Tree';

export const tooltipConfig: TreeNode[] = [
  // 提示信息配置
  {
    id: 'mark.tooltip',
    label: 'tooltip',
    type: 'TooltipComponent',
    description: '组件|提示框组件',
    optional: true,
    children: [
      // 直接配置方式
      {
        id: 'mark.tooltip.disabled',
        label: 'false',
        type: 'false',
        description: '直接|禁用提示框',
        optional: true,
      },
      {
        id: 'mark.tooltip.hidden',
        label: 'null',
        type: 'null',
        description: '直接|不显示提示框',
        optional: true,
      },
      {
        id: 'mark.tooltip.singleItem',
        label: 'TooltipItem',
        type: 'TooltipItem',
        description: '直接|单个项目配置',
        optional: true,
        children: [
          {
            id: 'mark.tooltip.singleItem.string',
            label: 'string',
            type: 'string',
            description: '项目|简单字符串项目',
            optional: true,
          },
          {
            id: 'mark.tooltip.singleItem.object',
            label: 'TooltipItemObject',
            type: 'Object',
            description: '项目|项目对象配置',
            optional: true,
            children: [
              {
                id: 'mark.tooltip.singleItem.object.name',
                label: 'name',
                type: 'string',
                description: '项目|项目名称',
                optional: true,
              },
              {
                id: 'mark.tooltip.singleItem.object.color',
                label: 'color',
                type: 'string',
                description: '项目|项目颜色',
                optional: true,
              },
              {
                id: 'mark.tooltip.singleItem.object.channel',
                label: 'channel',
                type: 'string',
                description: '项目|编码通道',
                optional: true,
              },
              {
                id: 'mark.tooltip.singleItem.object.field',
                label: 'field',
                type: 'string',
                description: '项目|数据字段',
                optional: true,
              },
              {
                id: 'mark.tooltip.singleItem.object.value',
                label: 'value',
                type: 'string',
                description: '项目|显示值',
                optional: true,
              },
              {
                id: 'mark.tooltip.singleItem.object.valueFormatter',
                label: 'valueFormatter',
                type: 'string | ((d: any) => string)',
                description: '项目|值格式化函数',
                optional: true,
              },
            ],
          },
          {
            id: 'mark.tooltip.singleItem.encodeable',
            label: 'Encodeable<Primitive | TooltipItemValue>',
            type: 'Primitive | TooltipItemValue | Function',
            description: '项目|可编码项目值',
            optional: true,
          },
        ],
      },
      {
        id: 'mark.tooltip.itemArray',
        label: 'TooltipItem[]',
        type: 'TooltipItem[]',
        description: '直接|项目数组配置',
        optional: true,
        children: [
          {
            id: 'mark.tooltip.itemArray.item',
            label: 'TooltipItem',
            type: 'TooltipItem',
            description: '项目|数组中的单个项目',
            optional: true,
          },
        ],
      },
      // 完整对象配置
      {
        id: 'mark.tooltip.fullConfig',
        label: 'TooltipConfig',
        type: 'Object',
        description: '完整|完整配置对象',
        optional: true,
        children: [
          {
            id: 'mark.tooltip.fullConfig.title',
            label: 'title',
            type: 'Encodeable<TooltipTitle>',
            description: '标题|提示框标题配置',
            optional: true,
            children: [
              {
                id: 'mark.tooltip.fullConfig.title.string',
                label: 'string',
                type: 'string',
                description: '标题|简单字符串标题',
                optional: true,
              },
              {
                id: 'mark.tooltip.fullConfig.title.object',
                label: 'TooltipTitle',
                type: 'Object',
                description: '标题|标题对象配置',
                optional: true,
                children: [
                  {
                    id: 'mark.tooltip.fullConfig.title.object.field',
                    label: 'field',
                    type: 'string',
                    description: '标题|数据字段名',
                    optional: true,
                  },
                  {
                    id: 'mark.tooltip.fullConfig.title.object.channel',
                    label: 'channel',
                    type: 'string',
                    description: '标题|编码通道名',
                    optional: true,
                  },
                  {
                    id: 'mark.tooltip.fullConfig.title.object.value',
                    label: 'value',
                    type: 'string',
                    description: '标题|自定义值',
                    optional: true,
                  },
                ],
              },
              {
                id: 'mark.tooltip.fullConfig.title.function',
                label: 'function',
                type: '(d: any, index?: number, data?: any[], column?: any) => TooltipTitle',
                description: '标题|动态标题函数',
                optional: true,
              },
            ],
          },
          {
            id: 'mark.tooltip.fullConfig.items',
            label: 'items',
            type: 'TooltipItem[] | null | false',
            description: '项目|提示框项目配置',
            optional: true,
            children: [
              {
                id: 'mark.tooltip.fullConfig.items.disabled',
                label: 'false',
                type: 'false',
                description: '项目|不显示项目',
                optional: true,
              },
              {
                id: 'mark.tooltip.fullConfig.items.auto',
                label: 'null',
                type: 'null',
                description: '项目|自动推断项目',
                optional: true,
              },
              {
                id: 'mark.tooltip.fullConfig.items.array',
                label: 'TooltipItem[]',
                type: 'Array',
                description: '项目|项目数组',
                optional: true,
              },
            ],
          },
        ],
      },
    ],
  },
];
