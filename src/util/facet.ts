import { Constructable } from '../types';
import { Facet, Rect } from '../facet';

const FacetMap = {
  rect: Rect,
};

/**
 * 根据类型获取分面的 class 类
 * @param type
 * @returns
 */
export function getFacet(type: string): Constructable<Facet> {
  return FacetMap[type.toLowerCase()];
}
