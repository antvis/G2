import { lowerCase } from '@antv/util';
import { FacetCtor } from '../interface';
export { Facet } from './facet';

/**
 * 所有的 Facet 类
 */
const Facets: Record<string, FacetCtor> = {};

/**
 * 根据 type 获取 facet 类
 * @param type 分面类型
 */
export const getFacet = (type: string): FacetCtor => {
  return Facets[lowerCase(type)];
};

/**
 * 注册一个 Facet 类
 * @param type 分面类型
 * @param ctor 分面类
 */
export const registerFacet = (type: string, ctor: FacetCtor) => {
  Facets[lowerCase(type)] = ctor;
};
