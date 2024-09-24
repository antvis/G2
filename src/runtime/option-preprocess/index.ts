import { G2ViewTree } from '../types/options';
import { flow } from '../../utils/flow';
import { columnWidthRatio } from './style';

export function optionPreprocess(options: G2ViewTree): G2ViewTree {
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
export function preprocess(options: G2ViewTree): G2ViewTree {
  //@todo define a type for params of flow
  return flow(columnWidthRatio)(options);
}
