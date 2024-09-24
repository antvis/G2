import { get } from '@antv/util';
import { G2View, G2ViewTree } from '../types/options';
import { convertScale } from './scale';

export function optionPreprocess<T extends G2ViewTree = G2ViewTree>(
  options: T,
): T {
  const convertedOptions = preprocess(options);
  // If there are children, recursively convert each child node.
  if (convertedOptions.children && Array.isArray(convertedOptions.children)) {
    convertedOptions.children = convertedOptions.children.map((child) =>
      optionPreprocess(child),
    );
  }

  return convertedOptions;
}

// Entry point for all syntactic sugar functions.
export function preprocess<T extends G2ViewTree = G2ViewTree>(options: T): T {
  const { style, scale, type } = options;
  const scaleOption: G2View = {};
  // style: { columnWidthRatio: 0.2 } => scale: { x: { padding: 0.8 } }
  const columnWidthRatio = get(style, 'columnWidthRatio');
  if (columnWidthRatio && type === 'interval') {
    scaleOption.x = {
      ...scale?.x,
      ...convertScale(columnWidthRatio),
    };
  }
  return {
    ...options,
    scale: { ...scale, ...scaleOption },
  };
}
