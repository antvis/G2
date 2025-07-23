import { TreeNode } from '../Tree';
import { coordinateConfig } from './coordinate';
import { dataConfig } from './data';
import { encodeConfig } from './encode';
import { scaleConfig } from './scale';
import { scrollbarConfig } from './scrollbar';
import { stateConfig } from './state';
import { animateConfig } from './animate';
import { transformConfig } from './transform';
import { titleConfig } from './title';
import { interactionConfig } from './interaction';
import { tooltipConfig } from './tooltip';
import { labelsConfig } from './labels';
import { axisConfig } from './axis';
import { legendConfig } from './legend';
import { sliderConfig } from './slider';

// 基础配置
export const baseMarkConfig: TreeNode[] = [
  // 基础属性
  {
    id: 'mark.width',
    label: 'width',
    type: 'number',
    description: '基础|图表宽度',
    optional: true,
  },
  {
    id: 'mark.height',
    label: 'height',
    type: 'number',
    description: '基础|图表高度',
    optional: true,
  },
  {
    id: 'mark.depth',
    label: 'depth',
    type: 'number',
    description: '基础|3D图表深度',
    optional: true,
  },
  {
    id: 'mark.autoFit',
    label: 'autoFit',
    type: 'boolean',
    description: '基础|自适应容器大小',
    optional: true,
  },
  // 标记类型
  {
    id: 'mark.type',
    label: 'type',
    type: '"interval" | "rect" | "line" | "point" | "text" | "cell" | "area" | "node" | "edge" | "link" | "image" | "polygon" | "box" | "vector" | "lineX" | "lineY" | "connector" | "range" | "rangeX" | "rangeY" | "sankey" | "chord" | "path" | "treemap" | "pack" | "boxplot" | "shape" | "forceGraph" | "tree" | "wordCloud" | "gauge" | "density" | "heatmap" | "liquid"',
    description: '标记|标记类型',
    optional: true,
    important: true,
  },
  {
    id: 'mark.class',
    label: 'class',
    type: 'string',
    description: '标记|CSS类名',
    optional: true,
  },
  {
    id: 'mark.key',
    label: 'key',
    type: 'string',
    description: '标记|唯一标识符',
    optional: true,
  },
  // 位置与尺寸
  {
    id: 'mark.x',
    label: 'x',
    type: 'number',
    description: '位置|X坐标',
    optional: true,
  },
  {
    id: 'mark.y',
    label: 'y',
    type: 'number',
    description: '位置|Y坐标',
    optional: true,
  },
  {
    id: 'mark.zIndex',
    label: 'zIndex',
    type: 'number',
    description: '位置|层级',
    optional: true,
  },
  {
    id: 'mark.frame',
    label: 'frame',
    type: 'boolean',
    description: '位置|是否显示边框',
    optional: true,
  },
  // 间距配置
  {
    id: 'mark.padding',
    label: 'padding',
    type: 'Padding',
    description: '间距|内边距',
    optional: true,
  },
  {
    id: 'mark.paddingLeft',
    label: 'paddingLeft',
    type: 'Padding',
    description: '间距|左内边距',
    optional: true,
  },
  {
    id: 'mark.paddingRight',
    label: 'paddingRight',
    type: 'Padding',
    description: '间距|右内边距',
    optional: true,
  },
  {
    id: 'mark.paddingTop',
    label: 'paddingTop',
    type: 'Padding',
    description: '间距|上内边距',
    optional: true,
  },
  {
    id: 'mark.paddingBottom',
    label: 'paddingBottom',
    type: 'Padding',
    description: '间距|下内边距',
    optional: true,
  },
  {
    id: 'mark.margin',
    label: 'margin',
    type: 'number',
    description: '间距|外边距',
    optional: true,
  },
  {
    id: 'mark.marginLeft',
    label: 'marginLeft',
    type: 'number',
    description: '间距|左外边距',
    optional: true,
  },
  {
    id: 'mark.marginRight',
    label: 'marginRight',
    type: 'number',
    description: '间距|右外边距',
    optional: true,
  },
  {
    id: 'mark.marginTop',
    label: 'marginTop',
    type: 'number',
    description: '间距|上外边距',
    optional: true,
  },
  {
    id: 'mark.marginBottom',
    label: 'marginBottom',
    type: 'number',
    description: '间距|下外边距',
    optional: true,
  },
  {
    id: 'mark.inset',
    label: 'inset',
    type: 'number',
    description: '间距|内缩',
    optional: true,
  },
  {
    id: 'mark.insetLeft',
    label: 'insetLeft',
    type: 'number',
    description: '间距|左内缩',
    optional: true,
  },
  {
    id: 'mark.insetRight',
    label: 'insetRight',
    type: 'number',
    description: '间距|右内缩',
    optional: true,
  },
  {
    id: 'mark.insetTop',
    label: 'insetTop',
    type: 'number',
    description: '间距|上内缩',
    optional: true,
  },
  {
    id: 'mark.insetBottom',
    label: 'insetBottom',
    type: 'number',
    description: '间距|下内缩',
    optional: true,
  },
  // 样式配置
  {
    id: 'mark.style',
    label: 'style',
    type: 'Record<string, any>',
    description: '样式|标记样式',
    optional: true,
  },
  {
    id: 'mark.viewStyle',
    label: 'viewStyle',
    type: 'Record<string, any>',
    description: '样式|视图样式',
    optional: true,
  },
];

// 布局配置
export const layoutConfig: TreeNode[] = [
  {
    id: 'mark.facet',
    label: 'facet',
    type: 'boolean',
    description: '布局|是否启用分面',
    optional: true,
  },
  {
    id: 'mark.layout',
    label: 'layout',
    type: 'Record<string, any>',
    description: '布局|布局配置，仅部分标记有，例如wordCloud、sankey等',
    optional: true,
  },
  {
    id: 'mark.cartesian',
    label: 'cartesian',
    type: 'boolean',
    description: '布局|是否使用笛卡尔坐标系',
    optional: true,
  },
  {
    id: 'mark.clip',
    label: 'clip',
    type: 'boolean',
    description: '布局|是否裁剪超出区域',
    optional: true,
  },
];

// 复合视图配置
export const compositionConfig: TreeNode[] = [
  {
    id: 'composition',
    label: 'Composition',
    type: 'Object',
    description: '复合视图配置，标记可以单独使用，也可以嵌套在复合视图下',
    important: true,
    defaultExpanded: true,
    children: [
      {
        id: 'composition.type',
        label: 'type',
        type: "'view' | 'getView' | 'geoPath' | 'spaceLayer' | 'spaceFlex' | 'facetRect' | 'facetCircle' | 'repeatMatrix' | 'timingKeyframe'",
        description: '复合类型',
        optional: true,
      },
      {
        id: 'composition.children',
        label: 'children',
        type: '(Mark | AxisComponent | LegendComponent)[]',
        description: '子组件，具体配置项见标记配置',
        optional: true,
      },
      {
        id: 'composition.properties',
        label: '[key: string]',
        type: 'any',
        description: '其他属性，例如style、data等，具体配置项见标记配置',
        optional: true,
      },
    ],
  },
];

// 主要的Mark配置，整合所有子配置
export const markConfig: TreeNode = {
  id: 'mark',
  label: 'Mark',
  type: 'Object',
  description: '标记配置',
  important: true,
  defaultExpanded: true,
  children: [
    ...baseMarkConfig,
    ...dataConfig,
    ...transformConfig,
    ...encodeConfig,
    ...scaleConfig,
    ...coordinateConfig,
    ...layoutConfig,
    ...stateConfig,
    ...animateConfig,
    ...interactionConfig,
    ...labelsConfig,
    ...tooltipConfig,
    ...axisConfig,
    ...legendConfig,
    ...sliderConfig,
    ...scrollbarConfig,
    ...titleConfig,
  ],
};

// 完整的G2配置数据
export const g2ConfigData: TreeNode[] = [
  {
    id: 'g2spec',
    label: 'G2Spec',
    type: 'Object',
    description: '顶级配置',
    important: true,
    defaultExpanded: true,
    children: [
      {
        id: 'g2spec.width',
        label: 'width',
        type: 'number',
        description: '基础|图表宽度',
        optional: true,
      },
      {
        id: 'g2spec.height',
        label: 'height',
        type: 'number',
        description: '基础|图表高度',
        optional: true,
      },
      {
        id: 'g2spec.depth',
        label: 'depth',
        type: 'number',
        description: '基础|3D图表深度',
        optional: true,
      },
      {
        id: 'g2spec.autoFit',
        label: 'autoFit',
        type: 'boolean',
        description: '基础|自适应容器大小',
        optional: true,
      },
      markConfig,
      ...compositionConfig,
    ],
  },
];

// 导出所有配置
export { dataConfig, scaleConfig, coordinateConfig, encodeConfig };

export default g2ConfigData;
