import { ElementLabelsConstructor, default as ElementLabels } from './base';

interface ElementLabelsMapType {
  [type: string]: ElementLabelsConstructor;
}

const ELEMENT_LABELS_MAP: ElementLabelsMapType = {};

export function getElementLabels(type: string) {
  return ELEMENT_LABELS_MAP[type.toLowerCase()];
}

export function registerElementLabels(type: string, ctor: ElementLabelsConstructor) {
  if (getElementLabels(type)) {
    throw new Error(`ElementLabels type '${type}' existed.`);
  }
  ELEMENT_LABELS_MAP[type.toLowerCase()] = ctor;
}
