import { Datum, MappingDatum, Point } from '../../interface';
import { GeometryLabelCfg } from '../interface';

export interface LabelCfg extends GeometryLabelCfg {
  content?: any;
  position?: 'top' | 'bottom' | 'middle' | 'left' | 'right';
  id: string;
  data: Datum;
  mappingData: MappingDatum;
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
