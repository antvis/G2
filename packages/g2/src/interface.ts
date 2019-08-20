/**
 * 通用接口定义
 */

export interface DataPointType {
  [ k: string ]: any;
}

export interface PointObject {
  x: number;
  y: number;
}

export interface ShapeDrawCFG {
  color: string | null | undefined; // 颜色
  isInCircle: boolean | undefined; // 是否在极坐标下
  x: number | number[];
  y: number | number[];
  shape: string | undefined | null;
  size: number | undefined | null;
  opacity: number | undefined;
  origin: DataPointType;

  geomType?: string; // 对应 geom 的类型
  id?: string; // 唯一标识，用于动画
  points?: DataPointType[];
  nextPoints?: PointObject[];
  splitedIndex?: number;
  text?: string | null;
  style?: DataPointType | null;

  yIndex?: number;
  constraint?: [ number, number ][];

  showSinglePoint?: boolean; // area line 两类 Element 适用，当只有一个数据时是否以数据点的形式显示
  connectNulls?: boolean; // area line 两类 Element 适用，是否连接空值
}

export interface ShapePointInfo {
  x: number | number[];
  y: number | number[];
  y0?: number;
  size?: number;
  _size?: number;
}

export interface ShapeStateCfg {
  origin: DataPointType; // shape 数据 shape.get('origin')
  [key: string]: any; // shape 的绘图属性  shape.attr()
}

export interface ShapeMarkerCfg {
  isInCircle?: boolean; // 是否位于极坐标
  color?: string[]; // marker 的颜色
}

// 数据调整配置项
export interface AdjustCfg {
  type: string;
  marginRatio?: number;
  reverseOrder?: boolean;
  dodgeBy?: string;
}
