import { Coordinate } from './coordinate';
import { ORIGINAL_FIELD } from '../constant';
import type { ScaleDef } from '../visual/scale';
import { Datum, Data, Func, PlainObject, RangePoint, Point } from './common';
import { ShapeAttrs, ShapeMarkerSymbol, Group } from './g';

/**
 * 视觉通道的 key
 */
export type AttributeKey =
  | 'position'
  | 'color'
  | 'shape'
  | 'size'
  | 'style'
  | 'label'
  | 'tooltip'
  | 'sequence'
  | 'custom';

/**
 * 视觉通道映射的配置
 */
export type AttributeOption = {
  fields: string[];
  value?: any;
  callback?: Func;
};

export type AttributeOptions = Map<AttributeKey, AttributeOption>;

/**
 * geometry 更新的配置定义
 */
export type GeometryOption = {
  /**
   * 具体渲染的 G 容器
   */
  container: Group;
  /**
   * 原始的明细数据
   */
  data: Data;
  /**
   * 对应字段的 scale 信息
   */
  scales: Map<string, ScaleDef>;
  /**
   * 当前坐标系
   */
  coordinate: Coordinate;
  /**
   * 是否生成关键点信息
   */
  generatePoints?: boolean;
  /**
   * 主题配置
   */
  theme?: PlainObject;
};

export type ShapeVertices = RangePoint[] | Point[] | Point[][];

/** 用户数据经过图形映射处理后的数据结构 */
export type MappingDatum = {
  /** 原始数据 */
  [ORIGINAL_FIELD]: Datum;
  /** shape 的关键点信息 */
  points?: ShapeVertices;
  /** 相对于当前 shape 的下一个 shape 的关键点信息 */
  nextPoints?: ShapeVertices;
  /** x 轴的坐标 */
  x?: number[] | number;
  /** y 轴的坐标 */
  y?: number[] | number;
  /** 颜色 */
  color?: string;
  /** 渲染的 shape 类型 */
  shape?: string | string[];
  /** 大小 */
  size?: number;
};

/**
 * adjust 配置
 */
export type AdjustOption = {
  type?: string;
  [key: string]: any;
};

/** shape 关键点信息 */
export type ShapePoint = {
  /** 数据点映射后对应 x 的值。 */
  x: number | number[];
  /** 数据点映射后对应 y 的值。 */
  y?: number | number[];
  /** 数据在 y 方向的最小值。 */
  y0?: number;
  /** 大小 */
  size?: number;
};

/** 绘制 Shape 需要的图形、样式、关键点等信息 */
export interface ShapeInfo {
  /** x 坐标 */
  x: number | number[];
  /** y 坐标 */
  y: number | number[];
  /** 映射的 shape 类型 */
  shape?: string | string[];
  /** size 映射值 */
  size?: number;
  /** 映射的颜色值 */
  color?: string;
  /** 用户设置的图形样式 */
  style?: PlainObject;
  /** 是否在极坐标下 */
  isInCircle?: boolean;
  /** 对应的原始数据记录 */
  data?: Datum | Data;
  /** 存储进行图形映射后的数据 */
  mappingData?: MappingDatum | MappingDatum[];
  /** 构成 shape 的关键点  */
  points?: ShapeVertices;
  /** 下一个数据集对应的关键点 */
  nextPoints?: ShapeVertices;
  /** Geometry.Text 需要 */
  text?: string;
  /** 数据是否发生层叠 */
  isStack?: boolean;
  /** 是否连接空值，只对 Path Line Area 这三种 Geometry 生效。 */
  connectNulls?: boolean;
  /** shape 背景，只对 Interval Geometry 生效，目前只对 interval-rect shape 生效。 */
  background?: {
    style?: ShapeAttrs;
  };
  /** 是否展示单个孤立的数据点，只对 Path Line Area 这三种 Geometry 生效。 */
  showSinglePoint?: boolean;
  /** 默认的 shape 样式 */
  defaultStyle?: PlainObject;
  /** 自定义通道的，传入到 shapeInfo 中 */
  custom?: any;
}

/** 获取 shape marker 时需要的信息 */
export type ShapeMarkerCfg = {
  /** 颜色。 */
  color: string;
  /** 是否是极坐标。 */
  isInPolar: boolean;
};

/** 图形 marker 的配置信息。 */
export interface ShapeMarkerAttrs {
  /** marker 的形状。 */
  symbol: string | ShapeMarkerSymbol;
  /**
   * marker 的样式，`ShapeAttrs` 属性结构如下：
   *
   * ```ts
   * {
   *   // x 坐标
   *   x?: number;
   *   // y 坐标
   *   y?: number;
   *   // 圆半径
   *   r?: number;
   *   // 描边颜色
   *   stroke?: string | null;
   *   // 描边透明度
   *   strokeOpacity?: number;
   *   // 填充颜色
   *   fill?: string | null;
   *   // 填充透明度
   *   fillOpacity?: number;
   *   // 整体透明度
   *   opacity?: number;
   *   // 线宽
   *   lineWidth?: number;
   *   // 指定如何绘制每一条线段末端
   *   lineCap?: 'butt' | 'round' | 'square';
   *   // 用来设置2个长度不为0的相连部分（线段，圆弧，曲线）如何连接在一起的属性（长度为0的变形部分，其指定的末端和控制点在同一位置，会被忽略）
   *   lineJoin?: 'bevel' | 'round' | 'miter';
   *   // 设置线的虚线样式，可以指定一个数组。一组描述交替绘制线段和间距（坐标空间单位）长度的数字。 如果数组元素的数量是奇数，数组的元素会被复制并重复。例如， [5, 15, 25] 会变成 [5, 15, 25, 5, 15, 25]。这个属性取决于浏览器是否支持 setLineDash() 函数。
   *   lineDash?: number[] | null;
   *   // Path 路径
   *   path?: string | object[];
   *   // 图形坐标点
   *   points?: object[];
   *   // 宽度
   *   width?: number;
   *   // 高度
   *   height?: number;
   *   // 阴影模糊效果程度
   *   shadowBlur?: number;
   *   // 阴影颜色
   *   shadowColor?: string | null;
   *   // 阴影 x 方向偏移量
   *   shadowOffsetX?: number;
   *   // 阴影 y 方向偏移量
   *   shadowOffsetY?: number;
   *   // 设置文本内容的当前对齐方式
   *   textAlign?: 'start' | 'center' | 'end' | 'left' | 'right';
   *   // 设置在绘制文本时使用的当前文本基线
   *   textBaseline?: 'top' | 'hanging' | 'middle' | 'alphabetic' | 'ideographic' | 'bottom';
   *   // 字体样式
   *   fontStyle?: 'normal' | 'italic' | 'oblique';
   *   // 文本字体大小
   *   fontSize?: number;
   *   // 文本字体
   *   fontFamily?: string;
   *   // 文本粗细
   *   fontWeight?: 'normal' | 'bold' | 'bolder' | 'lighter' | number;
   *   // 字体变体
   *   fontVariant?: 'normal' | 'small-caps' | string;
   *   // 文本行高
   *   lineHeight?: number;
   *   [key: string]: any;
   * }
   * ```
   *
   * 详见 {@link https://github.com/antvis/g/blob/28e3178b616573e0fa6d59694f1aaca2baaa9766/packages/g-base/src/types.ts#L37|ShapeAttrs}
   */
  style: ShapeAttrs;
}
