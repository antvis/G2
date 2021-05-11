import * as FacetObject from '../facet';
import { Facet } from '../facet';
import { Constructable } from '../types/common';

/**
 * 根据类型获取分面的 class 类
 * @param type
 * @returns
 */
export function getFacet(type: string): Constructable<Facet> {
  return FacetObject[type];
}
