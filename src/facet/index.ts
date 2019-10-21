import * as _ from '@antv/util';
import { FacetCtor } from './interface';
export { default as Facet } from './facet';

// 所有的 Facet 类
const Facets: Record<string, FacetCtor> = {};

/**
 * 根据 type 获取 facet 类
 * @param type
 */
export const getFacet = (type: string): FacetCtor => {
  return Facets[_.lowerCase(type)];
};

/**
 * 注册一个 Facet 类
 * @param type
 * @param ctor
 */
export const registerFacet = (type: string, ctor: FacetCtor) => {
  Facets[_.lowerCase(type)] = ctor;
};
