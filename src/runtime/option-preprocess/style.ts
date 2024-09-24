import { get } from '@antv/util';
import { G2View, G2ViewTree } from '../types/options';

// style: { columnWidthRatio: 0.2 } => scale: { x: { padding: 0.8 } }
export function columnWidthRatio(option: G2ViewTree) {
  const { style, scale, type } = option;
  const scaleOption: G2View = {};
  const columnWidthRatio = get(style, 'columnWidthRatio');
  if (columnWidthRatio && type === 'interval') {
    scaleOption.x = {
      ...scale?.x,
      padding: 1 - columnWidthRatio,
    };
  }
  return {
    ...option,
    scale: { ...scale, ...scaleOption },
  };
}
