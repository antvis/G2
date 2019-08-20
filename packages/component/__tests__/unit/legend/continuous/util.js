import * as _ from '@antv/util';
import { Canvas } from '@antv/g';

export const sizeItems = [
  { value: 10 },
  { value: 20 },
  { value: 40 },
  { value: 50 },
];

export const colorItems = [
  { value: 0, color: 'blue' },
  { value: 20, color: '#4D4DB2' },
  { value: 40, color: 'green' },
  { value: 60, color: 'orange' },
  { value: 80, color: '#FF00FE' },
  { value: 100, color: 'red' },
];

export const newId = () => {
  return _.uniqueId('legend-');
};

// 创建一个 div 和 canvas
export const createNewCanvas = (width = 300, height = 60, renderer = 'canvas') => {
  const id = newId();

  const div = document.createElement('div');
  div.id = id;
  document.body.appendChild(div);

  return new Canvas({
    containerId: id,
    width,
    height,
    renderer,
  });
};
