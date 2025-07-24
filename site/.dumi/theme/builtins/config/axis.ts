import { TreeNode } from '../Tree';

export const axisConfig: TreeNode[] = [
  // 坐标轴配置
  {
    id: 'mark.axis',
    label: 'axis',
    type: 'AxisComponent',
    description: '组件|坐标轴组件',
    optional: true,
    children: [
      // 基础配置
      {
        id: 'mark.axis.position',
        label: 'position',
        type: "'top' | 'bottom' | 'left' | 'right' | 'center' | 'inner' | 'outer'",
        description: '基础|坐标轴位置',
        optional: true,
      },
      {
        id: 'mark.axis.plane',
        label: 'plane',
        type: "'xy' | 'xz' | 'yz'",
        description: '基础|坐标平面（3D）',
        optional: true,
      },
      {
        id: 'mark.axis.zIndex',
        label: 'zIndex',
        type: 'number',
        description: '基础|层级顺序',
        optional: true,
      },
      {
        id: 'mark.axis.direction',
        label: 'direction',
        type: "'left' | 'center' | 'right'",
        description: '基础|标签方向（默认left）',
        optional: true,
      },
      // 标题配置
      {
        id: 'mark.axis.title',
        label: 'title',
        type: 'string | string[]',
        description: '标题|坐标轴标题',
        optional: true,
      },
      // 标签配置
      {
        id: 'mark.axis.labelFormatter',
        label: 'labelFormatter',
        type: 'string | ((datum: any, index: number, array: any[]) => string)',
        description: '标签|标签格式化函数',
        optional: true,
      },
      {
        id: 'mark.axis.labelFilter',
        label: 'labelFilter',
        type: '(datum: any, index: number, array: any[]) => boolean',
        description: '标签|标签过滤函数',
        optional: true,
      },
      // 刻度配置
      {
        id: 'mark.axis.tickFormatter',
        label: 'tickFormatter',
        type: '(datum: any, index: number, array: any[], vector: [number, number]) => DisplayObject',
        description: '刻度|刻度格式化函数',
        optional: true,
      },
      {
        id: 'mark.axis.tickFilter',
        label: 'tickFilter',
        type: '(datum: any, index: number, array: any[]) => boolean',
        description: '刻度|刻度过滤函数',
        optional: true,
      },
      {
        id: 'mark.axis.tickMethod',
        label: 'tickMethod',
        type: '(start: number | Date, end: number | Date, tickCount: number) => number[]',
        description: '刻度|刻度计算方法',
        optional: true,
      },
      {
        id: 'mark.axis.tickCount',
        label: 'tickCount',
        type: 'number',
        description: '刻度|刻度数量',
        optional: true,
      },
      // 网格配置
      {
        id: 'mark.axis.grid',
        label: 'grid',
        type: 'boolean | any',
        description: '网格|是否显示网格线',
        optional: true,
      },
      // 3D旋转配置
      {
        id: 'mark.axis.origin',
        label: 'origin',
        type: 'Vector3',
        description: '3D|旋转原点 [x, y, z]',
        optional: true,
      },
      {
        id: 'mark.axis.eulerAngles',
        label: 'eulerAngles',
        type: 'Vector3',
        description: '3D|欧拉角 [x, y, z]',
        optional: true,
      },
      // 位置配置（组件属性）
      {
        id: 'mark.axis.order',
        label: 'order',
        type: 'number',
        description: '位置|渲染顺序（默认0）',
        optional: true,
      },
      {
        id: 'mark.axis.size',
        label: 'size',
        type: 'number',
        description: '位置|组件尺寸（默认45）',
        optional: true,
      },
      // 边距配置
      {
        id: 'mark.axis.padding',
        label: 'padding',
        type: '[number, number]',
        description: '边距|内边距（默认[12, 12]）',
        optional: true,
      },
      {
        id: 'mark.axis.crossPadding',
        label: 'crossPadding',
        type: '[number, number]',
        description: '边距|交叉边距（默认[12, 12]）',
        optional: true,
      },
      // 标签样式属性
      {
        id: 'mark.axis.labelStyles',
        label: 'label*',
        type: 'any',
        description:
          '样式|标签样式属性（labelFill、labelFontSize、labelRotate、labelAutoRotate、labelAutoHide等）',
        optional: true,
      },
      // 刻度样式属性
      {
        id: 'mark.axis.tickStyles',
        label: 'tick*',
        type: 'any',
        description:
          '样式|刻度样式属性（tickFill、tickStroke、tickLength、tickDirection等）',
        optional: true,
      },
      // 轴线样式属性
      {
        id: 'mark.axis.lineStyles',
        label: 'line*',
        type: 'any',
        description:
          '样式|轴线样式属性（lineStroke、lineWidth、lineOpacity等）',
        optional: true,
      },
      // 网格样式属性
      {
        id: 'mark.axis.gridStyles',
        label: 'grid*',
        type: 'any',
        description:
          '样式|网格样式属性（gridStroke、gridStrokeWidth、gridLineDash等）',
        optional: true,
      },
      // 标题样式属性
      {
        id: 'mark.axis.titleStyles',
        label: 'title*',
        type: 'any',
        description:
          '样式|标题样式属性（titleFill、titleFontSize、titleSpacing等）',
        optional: true,
      },
      // 重要配置
      {
        id: 'mark.axis.important',
        label: 'important',
        type: 'Record<string, any>',
        description: '高级|不会被覆盖的重要配置',
        optional: true,
      },
      // 其他自定义属性
      {
        id: 'mark.axis.properties',
        label: '[key: string]',
        type: 'any',
        description: '其他|自定义属性',
        optional: true,
      },
    ],
  },
];
