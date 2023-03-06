import { tree } from 'd3-hierarchy';
import { DataComponent as DC } from '../runtime';
import { hierarchyFunction } from './cluster';

export type TreeOptions = Omit<Record<string, any>, 'type'>;

export const Tree: DC<TreeOptions> = (options) => {
  return hierarchyFunction(tree)(options);
};

Tree.props = {};
