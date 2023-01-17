import { each, isArray } from '@antv/util';
import { View } from '../../chart';
import { BBox, PathCommand, Point } from '../../dependents';
import Geometry from '../../geometry/base';
import Element from '../../geometry/element/';
import { catmullRom2bezier, getLinePath } from '../../geometry/shape/util/path';
import { toPoints } from '../../util/bbox';
import { isPolygonsIntersect } from '@antv/path-util';
import { ComponentOption, IInteractionContext, LooseObject } from '../../interface';

function getMaskBBox(context: IInteractionContext, tolerance: number) {
  const event = context.event;
  const maskShape = event.target;
  return getMaskBBoxByShape(maskShape, tolerance);
}

/**
 * 如果 mask BBox 过小则不返回
 */
function isValidMaskBBox(maskShape, tolerance: number) {
  const maskBBox = maskShape.getCanvasBBox();
  const { width, height } = maskBBox;
  return width > 0 && height > 0 && (width >= tolerance || height >= tolerance);
}

/**
 * 通过 maskShape 获取 mask 的 canvasBBox
 * @param maskShape
 * @param tolerance
 * @returns
 */
function getMaskBBoxByShape(maskShape, tolerance: number) {
  const maskBBox = maskShape.getCanvasBBox();
  return isValidMaskBBox(maskShape, tolerance) ? maskBBox : null;
}

/**
 * 获取 multiple 模式下 mask 的 canvasBBox 数组
 * @param context 上下文
 * @param tolerance box 宽高小于则不返回
 * @returns
 */
function getMultiMaskBBoxList(context: IInteractionContext, tolerance: number) {
  const { maskShapes } = context.event;
  return maskShapes.map((maskShape) => getMaskBBoxByShape(maskShape, tolerance)).filter((bBox) => !!bBox);
}

function getMaskPath(context: IInteractionContext, tolerance: number) {
  const event = context.event;
  const maskShape = event.target;
  return getMaskPathByMaskShape(maskShape, tolerance);
}

/**
 * 通过 maskShape 获取 mask path
 * @param maskShape
 * @param tolerance box 宽高小于则不返回
 * @returns
 */
function getMaskPathByMaskShape(maskShape, tolerance: number) {
  return isValidMaskBBox(maskShape, tolerance) ? maskShape.attr('path') : null;
}

/**
 * 获取 multiple 模式下 mask path 数组
 * @param context 上下文
 * @param tolerance box 宽高小于则不返回
 * @returns
 */
function getMultiMaskPathList(context: IInteractionContext, tolerance: number) {
  const { maskShapes } = context.event;
  return maskShapes.map((maskShape) => getMaskPathByMaskShape(maskShape, tolerance));
}

/**
 * 获取当前事件相关的图表元素
 * @param context 交互的上下文
 * @ignore
 */
export function getCurrentElement(context: IInteractionContext): Element {
  const event = context.event;
  let element;
  const target = event.target;
  if (target) {
    element = target.get('element');
  }
  return element;
}

/**
 * 获取委托对象
 * @param context 上下文
 * @ignore
 */
export function getDelegationObject(context: IInteractionContext): LooseObject {
  const event = context.event;
  const target = event.target;
  let delegateObject;
  if (target) {
    delegateObject = target.get('delegateObject');
  }
  return delegateObject;
}

export function isElementChange(context: IInteractionContext) {
  const event = context.event.gEvent;
  // 在同一个 element 内部移动，label 和 shape 之间
  if (event && event.fromShape && event.toShape && event.fromShape.get('element') === event.toShape.get('element')) {
    return false;
  }
  return true;
}

/**
 * 是否是列表组件
 * @param delegateObject 委托对象
 * @ignore
 */
export function isList(delegateObject: LooseObject): boolean {
  return delegateObject && delegateObject.component && delegateObject.component.isList();
}

/**
 * 是否是滑块组件
 * @param delegateObject 委托对象
 * @ignore
 */
export function isSlider(delegateObject: LooseObject): boolean {
  return delegateObject && delegateObject.component && delegateObject.component.isSlider();
}

/**
 * 是否由 mask 触发
 * @param context 上下文
 * @ignore
 */
export function isMask(context: IInteractionContext): boolean {
  const event = context.event;
  const target = event.target;
  return (target && target?.get('name') === 'mask') || isMultipleMask(context);
}

/**
 * 是否由 multiple mask 触发
 * @param context
 * @returns
 */
export function isMultipleMask(context: IInteractionContext): boolean {
  return context.event.target?.get('name') === 'multi-mask';
}

/**
 * 获取被遮挡的 elements
 * @param context 上下文
 * @ignore
 */
export function getMaskedElements(context: IInteractionContext, tolerance: number): Element[] {
  const target = context.event.target;

  // multiple 模式下
  if (isMultipleMask(context)) {
    return getMultiMaskedElements(context, tolerance);
  }

  // 正常模式下
  if (target.get('type') === 'path') {
    const maskPath = getMaskPath(context, tolerance);
    if (!maskPath) {
      return;
    }
    return getElementsByPath(context.view, maskPath);
  }
  const maskBBox = getMaskBBox(context, tolerance);
  // 如果 bbox 过小则不返回
  if (!maskBBox) {
    return null;
  }
  return getIntersectElements(context.view, maskBBox);
}

/**
 * 获取 multiple 模式下被 mask 遮挡的 elements
 * @param context 上下文
 * @returns
 */
function getMultiMaskedElements(context: IInteractionContext, tolerance: number): Element[] {
  const { target } = context.event;
  if (target.get('type') === 'path') {
    const maskPathList = getMultiMaskPathList(context, tolerance);
    if (maskPathList.length > 0) {
      return maskPathList.flatMap((maskPath) => getElementsByPath(context.view, maskPath));
    }
    return null;
  }
  const maskBBoxList = getMultiMaskBBoxList(context, tolerance);
  if (maskBBoxList.length > 0) {
    return maskBBoxList.flatMap((maskBBox) => getIntersectElements(context.view, maskBBox));
  }
  return null;
}

/**
 * @ignore
 */
export function getSiblingMaskElements(context: IInteractionContext, sibling: View, tolerance: number) {
  // multiple 模式下
  if (isMultipleMask(context)) {
    return getSiblingMultiMaskedElements(context, sibling, tolerance);
  }

  // 正常模式下
  const maskBBox = getMaskBBox(context, tolerance);
  // 如果 bbox 过小则不返回
  if (!maskBBox) {
    return null;
  }
  return getSiblingMaskElementsByBBox(maskBBox, context, sibling);
}

/**
 * 通过 mashBBox 获取 sibling 模式下被 mask 遮挡的 elements
 * @param maskBBox
 * @param context 上下文
 * @param sibling sibling view
 * @returns
 */
function getSiblingMaskElementsByBBox(maskBBox, context: IInteractionContext, sibling: View) {
  const view = context.view;
  const start = getSiblingPoint(view, sibling, { x: maskBBox.x, y: maskBBox.y });
  const end = getSiblingPoint(view, sibling, { x: maskBBox.maxX, y: maskBBox.maxY });
  const box = {
    minX: start.x,
    minY: start.y,
    maxX: end.x,
    maxY: end.y,
  };
  return getIntersectElements(sibling, box);
}

/**
 * 获取 sibling 模式下被 multiple mask 遮挡的 elements
 * @param context 上下文
 * @param sibling sibling view
 * @param tolerance box 宽高小于则不返回
 * @returns
 */
function getSiblingMultiMaskedElements(context: IInteractionContext, sibling: View, tolerance: number): Element[] {
  const maskBBoxList = getMultiMaskBBoxList(context, tolerance);
  if (maskBBoxList.length > 0) {
    return maskBBoxList.flatMap((maskBBox) => getSiblingMaskElementsByBBox(maskBBox, context, sibling));
  }
  return null;
}

/**
 * 获取所有的图表元素
 * @param view View/Chart
 * @ignore
 */
export function getElements(view: View): Element[] {
  const geometries = view.geometries;
  let rst: Element[] = [];
  each(geometries, (geom: Geometry) => {
    const elements = geom.elements;
    rst = rst.concat(elements);
  });
  if (view.views && view.views.length) {
    each(view.views, (subView) => {
      rst = rst.concat(getElements(subView));
    });
  }
  return rst;
}

/**
 * 获取所有的图表元素
 * @param view View/Chart
 * @param field 字段名
 * @param value 字段值
 * @ignore
 */
export function getElementsByField(view: View, field: string, value: any) {
  const elements = getElements(view);
  return elements.filter((el) => {
    return getElementValue(el, field) === value;
  });
}

/**
 * 根据状态名获取图表元素
 * @param view View/Chart
 * @param stateName 状态名
 * @ignore
 */
export function getElementsByState(view: View, stateName: string): Element[] {
  const geometries = view.geometries;
  let rst: Element[] = [];
  each(geometries, (geom: Geometry) => {
    const elements = geom.getElementsBy((el) => el.hasState(stateName));
    rst = rst.concat(elements);
  });
  return rst;
}

/**
 * 获取图表元素对应字段的值
 * @param element 图表元素
 * @param field 字段名
 * @ignore
 */
export function getElementValue(element: Element, field) {
  const model = element.getModel();
  const record = model.data;
  let value;
  if (isArray(record)) {
    value = record[0][field];
  } else {
    value = record[field];
  }
  return value;
}

/**
 * 两个包围盒是否相交
 * @param box1 包围盒1
 * @param box2 包围盒2
 * @ignore
 */
export function intersectRect(box1, box2) {
  return !(box2.minX > box1.maxX || box2.maxX < box1.minX || box2.minY > box1.maxY || box2.maxY < box1.minY);
}

/**
 * 获取包围盒内的图表元素
 * @param view View/Chart
 * @param box 包围盒
 * @ignore
 */
export function getIntersectElements(view: View, box) {
  const elements = getElements(view);
  const rst = [];
  each(elements, (el) => {
    const shape = el.shape;
    const shapeBBox = shape.getCanvasBBox();
    if (intersectRect(box, shapeBBox)) {
      rst.push(el);
    }
  });
  return rst;
}
function pathToPoints(path: any[]) {
  const points = [];
  each(path, (seg) => {
    const command = seg[0];
    if (command !== 'A') {
      for (let i = 1; i < seg.length; i = i + 2) {
        points.push([seg[i], seg[i + 1]]);
      }
    } else {
      const length = seg.length;
      points.push([seg[length - 2], seg[length - 1]]);
    }
  });
  return points;
}
/**
 * 获取包围盒内的图表元素
 * @param view View/Chart
 * @param path 路径
 * @ignore
 */
export function getElementsByPath(view: View, path: any[]) {
  const elements = getElements(view);
  const points = pathToPoints(path);
  const rst = elements.filter((el: Element) => {
    const shape = el.shape;
    let shapePoints;
    if (shape.get('type') === 'path') {
      shapePoints = pathToPoints(shape.attr('path'));
    } else {
      const shapeBBox = shape.getCanvasBBox();
      shapePoints = toPoints(shapeBBox);
    }
    return isPolygonsIntersect(points, shapePoints);
  });
  return rst;
}

/**
 * 获取当前 View 的所有组件
 * @param view View/Chart
 * @ignore
 */
export function getComponents(view) {
  return view.getComponents().map((co: ComponentOption) => co.component);
}

/** @ignore */
export function distance(p1: Point, p2: Point) {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  return Math.sqrt(dx * dx + dy * dy);
}

/** @ignore */
export function getSpline(points: Point[], z: boolean): PathCommand[] {
  if (points.length <= 2) {
    return getLinePath(points, false);
  }
  const first = points[0];
  const arr = [];
  each(points, (point) => {
    arr.push(point.x);
    arr.push(point.y);
  });
  const path = catmullRom2bezier(arr, z, null);
  path.unshift(['M', first.x, first.y]);
  return path;
}

/**
 * 检测点是否在包围盒内
 * @param box 包围盒
 * @param point 点
 * @ignore
 */
export function isInBox(box: BBox, point: Point) {
  return box.x <= point.x && box.maxX >= point.x && box.y <= point.y && box.maxY > point.y;
}

/**
 * 获取同 view 同一级的 views
 * @param view 当前 view
 * @returns 同一级的 views
 * @ignore
 */
export function getSilbings(view: View): View[] {
  const parent = view.parent;
  let siblings = null;
  if (parent) {
    siblings = parent.views.filter((sub) => sub !== view);
  }
  return siblings;
}

function point2Normalize(view: View, point: Point): Point {
  const coord = view.getCoordinate();
  return coord.invert(point);
}
/**
 * 将 view 上的一点转换成另一个 view 的点
 * @param view 当前的 view
 * @param sibling 同一层级的 view
 * @param point 指定点
 * @ignore
 */
export function getSiblingPoint(view: View, sibling: View, point: Point): Point {
  const normalPoint = point2Normalize(view, point);
  return sibling.getCoordinate().convert(normalPoint);
}

/**
 * 是否在记录中，临时因为所有的 view 中的数据不是引用，而使用的方法
 * 不同 view 上对数据的引用不相等，导致无法直接用 includes
 * 假设 x, y 值相等时是同一条数据，这个假设不完全正确，而改成 isEqual 则成本太高
 * 后面改成同一个引用时可以修改回来
 * @param records
 * @param record
 * @param xFiled
 * @param yField
 * @returns
 * @ignore
 */
export function isInRecords(records: object[], record: object, xFiled: string, yField: string) {
  let isIn = false;
  each(records, (r) => {
    if (r[xFiled] === record[xFiled] && r[yField] === record[yField]) {
      isIn = true;
      return false;
    }
  });
  return isIn;
}

// 级联获取 field 对应的 scale，如果 view 上没有，遍历子 view
export function getScaleByField(view: View, field: string) {
  let scale = view.getScaleByField(field);
  if (!scale && view.views) {
    each(view.views, (subView) => {
      scale = getScaleByField(subView, field);
      if (scale) {
        return false; // 终止循环
      }
    });
  }
  return scale;
}
