import { Coordinate, IGroup, IShape } from '../../dependents';
import { Datum, MappingDatum, Point, Region } from '../../interface';
import { GeometryLabelCfg } from '../interface';

export interface LabelCfg extends GeometryLabelCfg {
  content?: any;
  position?: 'top' | 'bottom' | 'middle' | 'left' | 'right';
  id: string;
  data: Datum;
  mappingData: MappingDatum;
  coordinate: Coordinate;
}

export interface LabelPointCfg {
  x?: number;
  y?: number;
  start?: Point;
  color?: string;
  content?: any;
  textAlign?: string;
  rotate?: number;
  angle?: number;
  r?: number;
}

export interface LabelItem extends GeometryLabelCfg {
  id: string;
  data: Datum;
  mappingData: MappingDatum;
  coordinate: Coordinate;
  x?: number;
  y?: number;
  start?: Point;
  color?: string;
  content?: any;
  textAlign?: string;
  rotate?: number;
  angle?: number;
  r?: number;
  labelLine?: null | boolean | { style?: object; path?: string };
}

export interface GeometryLabelLayoutCfg {
  /** 所有 label 对应的图形元素 */
  shapes: IShape[] | IGroup[];
  /** 画布区域 */
  region: Region;
}
