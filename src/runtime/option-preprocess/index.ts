import { G2ViewTree } from '../types/options';
import { flow } from '../../utils/flow';
import { columnWidthRatio } from './style';

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
  //@todo define a type for params of flow
  return flow(columnWidthRatio)(options);
}
