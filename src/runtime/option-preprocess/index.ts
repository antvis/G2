import { G2ViewTree } from '../types/options';
import { flow } from '../../utils/flow';
import { columnWidthRatio } from './style';

export function preprocessOption<T extends G2ViewTree = G2ViewTree>(
  options: T,
): T {
  const convertedOptions = adapter(options);
  // If there are children, recursively convert each child node.
  if (convertedOptions.children && Array.isArray(convertedOptions.children)) {
    convertedOptions.children = convertedOptions.children.map((child) =>
      preprocessOption(child),
    );
  }

  return convertedOptions;
}

// Entry point for all syntactic sugar functions.
function adapter<T extends G2ViewTree = G2ViewTree>(options: T): T {
  //@todo define a type for params of flow
  return flow(columnWidthRatio)(options);
}
