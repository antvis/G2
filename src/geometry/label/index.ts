import { BBox, IGroup, IShape } from '../../dependents';
import { GeometryLabelConstructor } from './base';

/**
 * label 布局函数定义
 * @param labels 所有的 label shape
 * @param shapes 所有 label 对应的图形元素
 * @param region 画布区域
 */
type GeometryLabelsLayoutFn = (labels: IGroup[], shapes: IShape[] | IGroup[], region: BBox) => void;

const GEOMETRY_LABELS_MAP: Record<string, GeometryLabelConstructor> = {};
const GEOMETRY_LABELS_LAYOUT_MAP: Record<string, GeometryLabelsLayoutFn>  = {};

/**
 * 获取 `type` 对应的 [[GeometryLabel]] 类
 * @param type
 * @returns
 */
export function getGeometryLabel(type: string): GeometryLabelConstructor {
  return GEOMETRY_LABELS_MAP[type.toLowerCase()];
}

/**
 * 注册定义的 GeometryLabel 类
 * @param type GeometryLabel 类型名称
 * @param ctor GeometryLabel 类
 */
export function registerGeometryLabel(type: string, ctor: GeometryLabelConstructor) {
  GEOMETRY_LABELS_MAP[type.toLowerCase()] = ctor;
}

/**
 * 获取 `type` 对应的 [[GeometryLabelsLayoutFn]] label 布局函数
 * @param type 布局函数名称
 * @returns
 */
export function getGeometryLabelLayout(type: string): GeometryLabelsLayoutFn {
  return GEOMETRY_LABELS_LAYOUT_MAP[type.toLowerCase()];
}

/**
 * 注册定义的 label 布局函数
 * @param type label 布局函数名称
 * @param layoutFn label 布局函数
 */
export function registerGeometryLabelLayout(type: string, layoutFn: GeometryLabelsLayoutFn) {
  GEOMETRY_LABELS_LAYOUT_MAP[type.toLowerCase()] = layoutFn;
}
