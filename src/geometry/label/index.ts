import { GeometryLabelsConstructor } from './base';

interface GeometryLabelsMapCfg {
  [type: string]: GeometryLabelsConstructor;
}

const GEOMETRY_LABELS_MAP: GeometryLabelsMapCfg = {};

export function getGeometryLabels(type: string) {
  return GEOMETRY_LABELS_MAP[type.toLowerCase()];
}

export function registerGeometryLabels(type: string, ctor: GeometryLabelsConstructor) {
  GEOMETRY_LABELS_MAP[type.toLowerCase()] = ctor;
}
