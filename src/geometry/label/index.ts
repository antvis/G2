import { GeometryLabelConstructor } from './base';

interface GeometryLabelsMapCfg {
  [type: string]: GeometryLabelConstructor;
}

const GEOMETRY_LABELS_MAP: GeometryLabelsMapCfg = {};

export function getGeometryLabel(type: string) {
  return GEOMETRY_LABELS_MAP[type.toLowerCase()];
}

export function registerGeometryLabel(type: string, ctor: GeometryLabelConstructor) {
  GEOMETRY_LABELS_MAP[type.toLowerCase()] = ctor;
}
