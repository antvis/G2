import { GeometryLabelsConstructor } from './base';

interface GeometryLabelsMapCfg {
  [type: string]: GeometryLabelsConstructor;
}

const GEOMETRY_LABELS_MAP: GeometryLabelsMapCfg = {};

export function getGeometryLabels(type: string) {
  return GEOMETRY_LABELS_MAP[type.toLowerCase()];
}

export function registerGeometryLabels(type: string, ctor: GeometryLabelsConstructor) {
  if (getGeometryLabels(type)) {
    throw new Error(`GeometryLabels type '${type}' existed.`);
  }
  GEOMETRY_LABELS_MAP[type.toLowerCase()] = ctor;
}
