import { TreeNode } from '../Tree';

export const labelsConfig: TreeNode[] = [
  // 标签配置
  {
    id: 'mark.labels',
    label: 'labels',
    type: 'Record<string, any>[]',
    description: '组件|标签配置数组',
    optional: true,
    children: [
      // 标签项配置
      {
        id: 'mark.labels.item',
        label: 'LabelItem',
        type: 'Object',
        description: '单个标签配置项',
        children: [
          // 基础文本配置
          {
            id: 'mark.labels.item.text',
            label: 'text',
            type: 'string | Function',
            description: '基础|标签数据通道，类似mark标记的x通道',
            optional: true,
          },
          {
            id: 'mark.labels.item.innerHTML',
            label: 'innerHTML',
            type: 'string | Function',
            description: '基础|HTML内容，和text类似，同时配置时text会失效',
            optional: true,
          },
          {
            id: 'mark.labels.item.render',
            label: 'render',
            type: '(text: string, datum: any, index: number) => string | HTMLElement',
            description: '基础|自定义渲染函数，和innerHTML配置类型一致',
            optional: true,
          },
          {
            id: 'mark.labels.item.formatter',
            label: 'formatter',
            type: 'string | Function<string>',
            description: '基础|标签文本格式化函数',
            optional: true,
          },
          // 位置配置
          {
            id: 'mark.labels.item.position',
            label: 'position',
            type: 'LabelPosition',
            description: '位置|标签相对图形位置，并非标签方向',
            optional: true,
            children: [
              // 基本方向位置
              {
                id: 'mark.labels.item.position.top',
                label: "'top'",
                type: 'string',
                description: '顶部位置',
              },
              {
                id: 'mark.labels.item.position.bottom',
                label: "'bottom'",
                type: 'string',
                description: '底部位置',
              },
              {
                id: 'mark.labels.item.position.left',
                label: "'left'",
                type: 'string',
                description: '左侧位置',
              },
              {
                id: 'mark.labels.item.position.right',
                label: "'right'",
                type: 'string',
                description: '右侧位置',
              },
              // 角落位置
              {
                id: 'mark.labels.item.position.topLeft',
                label: "'top-left'",
                type: 'string',
                description: '左上角位置',
              },
              {
                id: 'mark.labels.item.position.topRight',
                label: "'top-right'",
                type: 'string',
                description: '右上角位置',
              },
              {
                id: 'mark.labels.item.position.bottomLeft',
                label: "'bottom-left'",
                type: 'string',
                description: '左下角位置',
              },
              {
                id: 'mark.labels.item.position.bottomRight',
                label: "'bottom-right'",
                type: 'string',
                description: '右下角位置',
              },
              // 特殊位置
              {
                id: 'mark.labels.item.position.inside',
                label: "'inside'",
                type: 'string',
                description: '内部位置',
              },
              {
                id: 'mark.labels.item.position.outside',
                label: "'outside'",
                type: 'string',
                description: '外部位置',
              },
              {
                id: 'mark.labels.item.position.area',
                label: "'area'",
                type: 'string',
                description: '区域位置',
              },
              {
                id: 'mark.labels.item.position.spider',
                label: "'spider'",
                type: 'string',
                description: '蜘蛛图位置',
              },
              {
                id: 'mark.labels.item.position.surround',
                label: "'surround'",
                type: 'string',
                description: '环绕位置',
              },
            ],
          },
          // 坐标位置
          {
            id: 'mark.labels.item.x',
            label: 'x',
            type: 'number | string',
            description: '位置|X轴坐标（支持百分比）',
            optional: true,
          },
          {
            id: 'mark.labels.item.y',
            label: 'y',
            type: 'number | string',
            description: '位置|Y轴坐标（支持百分比）',
            optional: true,
          },
          // 偏移配置
          {
            id: 'mark.labels.item.dx',
            label: 'dx',
            type: 'number',
            description: '位置|标签文字在水平方向的偏移量（默认0）',
            optional: true,
          },
          {
            id: 'mark.labels.item.dy',
            label: 'dy',
            type: 'number',
            description: '位置|标签文字在垂直方向的偏移量（默认0）',
            optional: true,
          },
          {
            id: 'mark.labels.item.offset',
            label: 'offset',
            type: 'number',
            description: '位置|标签偏移距离',
            optional: true,
          },
          // 样式配置
          {
            id: 'mark.labels.item.fill',
            label: 'fill',
            type: 'string',
            description: '样式|文字颜色',
            optional: true,
          },
          {
            id: 'mark.labels.item.stroke',
            label: 'stroke',
            type: 'string',
            description: '样式|文字描边颜色',
            optional: true,
          },
          {
            id: 'mark.labels.item.fontSize',
            label: 'fontSize',
            type: 'number',
            description: '样式|字体大小',
            optional: true,
          },
          {
            id: 'mark.labels.item.fontWeight',
            label: 'fontWeight',
            type: 'string | number',
            description: '样式|字体粗细',
            optional: true,
          },
          {
            id: 'mark.labels.item.fontFamily',
            label: 'fontFamily',
            type: 'string',
            description: '样式|字体族',
            optional: true,
          },
          {
            id: 'mark.labels.item.textAlign',
            label: 'textAlign',
            type: "'start' | 'end' | 'center' | 'left' | 'right'",
            description: '样式|文本对齐方式',
            optional: true,
          },
          {
            id: 'mark.labels.item.textBaseline',
            label: 'textBaseline',
            type: "'top' | 'middle' | 'bottom' | 'alphabetic' | 'hanging'",
            description: '样式|文本基线',
            optional: true,
          },
          {
            id: 'mark.labels.item.opacity',
            label: 'opacity',
            type: 'number',
            description: '样式|透明度',
            optional: true,
          },
          // 变换配置
          {
            id: 'mark.labels.item.rotate',
            label: 'rotate',
            type: 'number',
            description: '变换|旋转角度（度）',
            optional: true,
          },
          {
            id: 'mark.labels.item.transform',
            label: 'transform',
            type: 'string',
            description: '变换|CSS变换字符串',
            optional: true,
          },
          {
            id: 'mark.labels.item.transformOrigin',
            label: 'transformOrigin',
            type: 'string',
            description: '变换|变换原点',
            optional: true,
          },
          // 选择器配置
          {
            id: 'mark.labels.item.selector',
            label: 'selector',
            type: 'Selector',
            description: '选择器|标签选择器，可以保留或隐藏标签',
            optional: true,
            children: [
              {
                id: 'mark.labels.item.selector.type',
                label: 'type',
                type: "'cartesian'",
                description: '选择器类型（默认cartesian）',
                optional: true,
              },
            ],
          },
          // 其他配置
          {
            id: 'mark.labels.item.className',
            label: 'className',
            type: 'string',
            description: '其他|CSS类名',
            optional: true,
          },
          {
            id: 'mark.labels.item.bounds',
            label: 'bounds',
            type: '[[number, number], [number, number]]',
            description: '其他|边界框',
            optional: true,
          },
          {
            id: 'mark.labels.item.datum',
            label: 'datum',
            type: 'any',
            description: '其他|数据项',
            optional: true,
          },
          {
            id: 'mark.labels.item.index',
            label: 'index',
            type: 'number',
            description: '其他|数据索引',
            optional: true,
          },
          {
            id: 'mark.labels.item.connector',
            label: 'connector*',
            type: 'any',
            description:
              '样式|数据标签连接器样式属性（connectorFill、connectorStroke等）',
            optional: true,
          },
          {
            id: 'mark.labels.item.background',
            label: 'background*',
            type: 'any',
            description:
              '样式|数据标签背景样式属性（backgroundFill、backgroundStroke等）',
            optional: true,
          },
        ],
      },
      // 标签转换配置
      {
        id: 'mark.labels.transform',
        label: 'labelTransform',
        type: 'LabelTransform[]',
        description: '标签转换，用来优化标签展示，解决标签重叠、颜色不明显问题',
        optional: true,
        children: [
          // 重叠隐藏转换
          {
            id: 'mark.labels.transform.overlapHide',
            label: 'OverlapHideLabelTransform',
            type: 'Object',
            description: '重叠标签隐藏',
            children: [
              {
                id: 'mark.labels.transform.overlapHide.type',
                label: 'type',
                type: "'overlapHide'",
                description: '转换类型',
                optional: true,
              },
              {
                id: 'mark.labels.transform.overlapHide.priority',
                label: 'priority',
                type: '(a: DisplayObject, b: DisplayObject) => number',
                description: '隐藏优先级比较函数',
                optional: true,
              },
            ],
          },
          // 重叠Y轴避让转换
          {
            id: 'mark.labels.transform.overlapDodgeY',
            label: 'OverlapDodgeYLabelTransform',
            type: 'Object',
            description: 'Y轴重叠避让',
            children: [
              {
                id: 'mark.labels.transform.overlapDodgeY.type',
                label: 'type',
                type: "'overlapDodgeY'",
                description: '转换类型',
                optional: true,
              },
              {
                id: 'mark.labels.transform.overlapDodgeY.maxIterations',
                label: 'maxIterations',
                type: 'number',
                description: '最大迭代次数',
                optional: true,
              },
              {
                id: 'mark.labels.transform.overlapDodgeY.maxError',
                label: 'maxError',
                type: 'number',
                description: '最大误差',
                optional: true,
              },
              {
                id: 'mark.labels.transform.overlapDodgeY.padding',
                label: 'padding',
                type: 'number',
                description: '标签间距',
                optional: true,
              },
            ],
          },
          // 对比度反转转换
          {
            id: 'mark.labels.transform.contrastReverse',
            label: 'ContrastReverseLabelTransform',
            type: 'Object',
            description: '对比度反转',
            children: [
              {
                id: 'mark.labels.transform.contrastReverse.type',
                label: 'type',
                type: "'contrastReverse'",
                description: '转换类型',
                optional: false,
              },
              {
                id: 'mark.labels.transform.contrastReverse.threshold',
                label: 'threshold',
                type: 'number',
                description: '对比度阈值（默认4.5）',
                optional: true,
              },
              {
                id: 'mark.labels.transform.contrastReverse.palette',
                label: 'palette',
                type: 'string[]',
                description: '颜色调色板（默认[#000, #fff]）',
                optional: true,
              },
            ],
          },
          // 溢出描边转换
          {
            id: 'mark.labels.transform.overflowStroke',
            label: 'OverflowStrokeTransform',
            type: 'Object',
            description: '溢出时添加描边',
            children: [
              {
                id: 'mark.labels.transform.overflowStroke.type',
                label: 'type',
                type: "'overflowStroke'",
                description: '转换类型',
                optional: true,
              },
              {
                id: 'mark.labels.transform.overflowStroke.threshold',
                label: 'threshold',
                type: 'number',
                description: '溢出阈值（默认2）',
                optional: true,
              },
              {
                id: 'mark.labels.transform.overflowStroke.palette',
                label: 'palette',
                type: 'string[]',
                description: '颜色调色板（默认[#000, #fff]）',
                optional: true,
              },
            ],
          },
          // 溢出隐藏转换
          {
            id: 'mark.labels.transform.overflowHide',
            label: 'OverflowHideLabelTransform',
            type: 'Object',
            description: '溢出标签隐藏',
            children: [
              {
                id: 'mark.labels.transform.overflowHide.type',
                label: 'type',
                type: "'overflowHide'",
                description: '转换类型',
                optional: false,
              },
            ],
          },
          // 超出调整转换
          {
            id: 'mark.labels.transform.exceedAdjust',
            label: 'ExceedAdjustLabel',
            type: 'Object',
            description: '超出边界调整',
            children: [
              {
                id: 'mark.labels.transform.exceedAdjust.type',
                label: 'type',
                type: "'exceedAdjust'",
                description: '转换类型',
                optional: false,
              },
              {
                id: 'mark.labels.transform.exceedAdjust.bounds',
                label: 'bounds',
                type: "'view' | 'main'",
                description: '边界检查区域（view：全视图区域，main：主区域）',
                optional: true,
              },
              {
                id: 'mark.labels.transform.exceedAdjust.offsetX',
                label: 'offsetX',
                type: 'number',
                description: 'X轴偏移量（默认0）',
                optional: true,
              },
              {
                id: 'mark.labels.transform.exceedAdjust.offsetY',
                label: 'offsetY',
                type: 'number',
                description: 'Y轴偏移量（默认0）',
                optional: true,
              },
            ],
          },
        ],
      },
    ],
  },
];
