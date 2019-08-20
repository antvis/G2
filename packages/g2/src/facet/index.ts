import * as _ from '@antv/util';
import { FacetCtor } from './interface';

export { Facet } from './base';

// 所有的 Facet 类
const Facets = {};

/**
 * 根据 type 获取 facet 类
 * @param type
 */
export const getFacet = (type: string): FacetCtor => {
  return Facets[_.lowerFirst(type)];
};

/**
 * 注册一个 Facet 类
 * @param type
 * @param ctor
 */
export const registerFacet = (type: string, ctor: FacetCtor) => {
  Facets[_.lowerFirst(type)] = ctor;
};
