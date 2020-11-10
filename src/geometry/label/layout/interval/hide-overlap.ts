import { IGroup, IShape } from '../../../../dependents';
import { each, groupBy, uniq, map, size, filter } from '@antv/util';
import Geometry from '../../../base';
import Element from '../../../element';
import { LabelItem } from '../../interface';
import { checkShapeOverlap } from '../../util';

function filterLabel(labels: IShape[] | IGroup[]) {
  const MAX_CNT = 500; // 最多显示 500 个数据标签
  const filteredLabels = [];
  const pages = Math.max(Math.floor(labels.length / MAX_CNT), 1);
  each(labels, (label, idx) => {
    if (idx % pages === 0) {
      filteredLabels.push(label);
    } else {
      label.set('visible', false);
    }
  });

  return filteredLabels;
}

/**
 * 为 interval geometry 定制的数据标签重叠自动隐藏布局方法
 * @param items
 * @param labels
 * @param shapes
 */
export function intervalHideOverlap(items: LabelItem[], labels: IGroup[], shapes: IShape[] | IGroup[]) {
  if (shapes.length === 0) {
    return;
  }
  const element: Element = shapes[0]?.get('element');
  const geometry: Geometry = element?.geometry;
  if (!geometry || geometry.type !== 'interval') {
    return;
  }

  const filteredLabels = filterLabel(labels);
  const [xField] = geometry.getXYFields();
  const dones: IShape[] = [];
  const todo: IShape[] = [];
  const groupedLabels = groupBy(filteredLabels, (label) => label.get('data')[xField]);
  const xValues = uniq(map(filteredLabels, (label: IShape) => label.get('data')[xField]));
  let xValue;

  filteredLabels.forEach((label) => {
    label.set('visible', true);
  });

  const addCurrentGroup = (curItems: IShape[]) => {
    if (curItems) {
      if (curItems.length) {
        // 最后一个
        todo.push(curItems.pop());
      }
      todo.push(...curItems);
    }
  };

  if (size(xValues) > 0) {
    // 第一组
    xValue = xValues.shift();
    addCurrentGroup(groupedLabels[xValue]);
  }
  if (size(xValues) > 0) {
    // 最后一组
    xValue = xValues.pop();
    addCurrentGroup(groupedLabels[xValue]);
  }
  each(xValues.reverse(), (val) => {
    // 其他组
    addCurrentGroup(groupedLabels[val]);
  });

  while (todo.length > 0) {
    const cur = todo.shift();
    if (cur.get('visible')) {
      if (checkShapeOverlap(cur, dones)) {
        cur.set('visible', false);
      } else {
        dones.push(cur);
      }
    }
  }
}
