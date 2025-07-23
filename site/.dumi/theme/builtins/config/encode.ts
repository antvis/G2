import { TreeNode } from '../Tree';

export const encodeConfig: TreeNode[] = [
  // 视觉编码
  {
    id: 'mark.encode',
    label: 'encode',
    type: 'Record<ChannelTypes, Encode>',
    description: '编码|编码配置',
    optional: true,
    important: true,
    defaultExpanded: true,
    children: [
      // 通用编码类型说明
      {
        id: 'mark.encode.types',
        label: '编码类型',
        type: 'EncodeTypes',
        description: '基础|支持的编码类型',
        defaultExpanded: true,
        children: [
          {
            id: 'mark.encode.types.field',
            label: '字段编码',
            type: 'string | FieldEncode',
            description: '基础|绑定数据字段',
            children: [
              {
                id: 'mark.encode.types.field.simple',
                label: "'fieldName'",
                type: 'string',
                description: '直接使用字段名',
              },
              {
                id: 'mark.encode.types.field.object',
                label: '{ type: "field", value: "fieldName" }',
                type: 'FieldEncode',
                description: '对象形式的字段编码',
              },
            ],
          },
          {
            id: 'mark.encode.types.constant',
            label: '常量编码',
            type: 'any | ConstantEncode',
            description: '基础|使用固定值',
            children: [
              {
                id: 'mark.encode.types.constant.simple',
                label: '100',
                type: 'number',
                description: '直接使用数值',
              },
              {
                id: 'mark.encode.types.constant.object',
                label: '{ type: "constant", value: 100 }',
                type: 'ConstantEncode',
                description: '对象形式的常量编码',
              },
            ],
          },
          {
            id: 'mark.encode.types.transform',
            label: '函数编码',
            type: 'TransformEncode',
            description: '基础|使用变换函数',
            children: [
              {
                id: 'mark.encode.types.transform.function',
                label: '(d, i, data) => d.value * 2',
                type: 'Function',
                description: '变换函数示例',
              },
              {
                id: 'mark.encode.types.transform.object',
                label: '{ type: "transform", value: (d) => d.value }',
                type: 'TransformEncode',
                description: '对象形式的函数编码',
              },
            ],
          },
          {
            id: 'mark.encode.types.column',
            label: '数据编码',
            type: 'ColumnEncode',
            description: '基础|使用数组数据',
            children: [
              {
                id: 'mark.encode.types.column.array',
                label: '[1, 2, 3, 4]',
                type: 'Primitive[]',
                description: '直接使用数组',
              },
              {
                id: 'mark.encode.types.column.object',
                label: '{ type: "column", value: [1, 2, 3] }',
                type: 'ColumnEncode',
                description: '对象形式的数据编码',
              },
            ],
          },
        ],
      },
      // 位置通道
      {
        id: 'mark.encode.x',
        label: 'x',
        type: 'Encode',
        description: 'X轴位置编码',
        optional: true,
      },
      {
        id: 'mark.encode.y',
        label: 'y',
        type: 'Encode',
        description: 'Y轴位置编码',
        optional: true,
      },
      {
        id: 'mark.encode.z',
        label: 'z',
        type: 'Encode',
        description: 'Z轴位置编码（3D图表）',
        optional: true,
      },
      {
        id: 'mark.encode.x1',
        label: 'x1',
        type: 'Encode',
        description: 'X轴结束位置编码（区间图表）',
        optional: true,
      },
      {
        id: 'mark.encode.y1',
        label: 'y1',
        type: 'Encode',
        description: 'Y轴结束位置编码（区间图表）',
        optional: true,
      },
      {
        id: 'mark.encode.position',
        label: 'position',
        type: 'Encode',
        description: '通用位置编码',
        optional: true,
      },
      {
        id: 'mark.encode.position${number}',
        label: 'position${number}',
        type: 'Encode',
        description: '通用位置编码',
        optional: true,
      },
      // 视觉通道
      {
        id: 'mark.encode.color',
        label: 'color',
        type: 'Encode',
        description: '颜色编码',
        optional: true,
      },
      {
        id: 'mark.encode.size',
        label: 'size',
        type: 'Encode',
        description: '大小编码',
        optional: true,
      },
      {
        id: 'mark.encode.shape',
        label: 'shape',
        type: 'Encode',
        description: '形状编码',
        optional: true,
      },
      {
        id: 'mark.encode.opacity',
        label: 'opacity',
        type: 'Encode',
        description: '透明度编码（0-1）',
        optional: true,
      },
      // 分组通道
      {
        id: 'mark.encode.series',
        label: 'series',
        type: 'Encode',
        description: '系列编码（用于多线图、分组柱图等）',
        optional: true,
      },
      // 动画通道
      {
        id: 'mark.encode.key',
        label: 'key',
        type: 'Encode',
        description: '数据键编码（用于动画识别）',
        optional: true,
      },
      {
        id: 'mark.encode.groupKey',
        label: 'groupKey',
        type: 'Encode',
        description: '分组键编码',
        optional: true,
      },
      // 入场动画
      {
        id: 'mark.encode.enterType',
        label: 'enterType',
        type: 'Encode',
        description: '入场动画类型编码',
        optional: true,
      },
      {
        id: 'mark.encode.enterEasing',
        label: 'enterEasing',
        type: 'Encode',
        description: '入场缓动函数编码',
        optional: true,
      },
      {
        id: 'mark.encode.enterDuration',
        label: 'enterDuration',
        type: 'Encode',
        description: '入场动画时长编码（毫秒）',
        optional: true,
      },
      {
        id: 'mark.encode.enterDelay',
        label: 'enterDelay',
        type: 'Encode',
        description: '入场动画延迟编码',
        optional: true,
      },
      // 更新动画
      {
        id: 'mark.encode.updateType',
        label: 'updateType',
        type: 'Encode',
        description: '更新动画类型编码',
        optional: true,
      },
      {
        id: 'mark.encode.updateEasing',
        label: 'updateEasing',
        type: 'Encode',
        description: '更新缓动函数编码',
        optional: true,
      },
      {
        id: 'mark.encode.updateDuration',
        label: 'updateDuration',
        type: 'Encode',
        description: '更新动画时长编码',
        optional: true,
      },
      {
        id: 'mark.encode.updateDelay',
        label: 'updateDelay',
        type: 'Encode',
        description: '更新动画延迟编码',
        optional: true,
      },
      // 退场动画
      {
        id: 'mark.encode.exitType',
        label: 'exitType',
        type: 'Encode',
        description: '退场动画类型编码',
        optional: true,
      },
      {
        id: 'mark.encode.exitEasing',
        label: 'exitEasing',
        type: 'Encode',
        description: '退场缓动函数编码',
        optional: true,
      },
      {
        id: 'mark.encode.exitDuration',
        label: 'exitDuration',
        type: 'Encode',
        description: '退场动画时长编码',
        optional: true,
      },
      {
        id: 'mark.encode.exitDelay',
        label: 'exitDelay',
        type: 'Encode',
        description: '退场动画延迟编码',
        optional: true,
      },
    ],
  },
];
