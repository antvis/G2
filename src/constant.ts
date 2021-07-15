import { AttributeKey } from './types';

/**
 * 作为分组的视觉属性
 */
export const GROUP_ATTR_KEYS = ['color', 'shape', 'size'] as Partial<AttributeKey>[];

/**
 * 存储原始数据的 key
 */
export const ORIGINAL_FIELD = Symbol('ORIGINAL_FIELD');

/**
 * View 的生命周期阶段
 */
export enum VIEW_LIFE_CIRCLE {
  BEFORE_RENDER = 'beforerender',
  AFTER_RENDER = 'afterrender',

  BEFORE_PAINT = 'beforepaint',
  AFTER_PAINT = 'afterpaint',

  BEFORE_CHANGE_DATA = 'beforechangedata',
  AFTER_CHANGE_DATA = 'afterchangedata',

  BEFORE_CLEAR = 'beforeclear',
  AFTER_CLEAR = 'afterclear',

  BEFORE_DESTROY = 'beforedestroy',

  BEFORE_CHANGE_SIZE = 'beforechangesize',
  AFTER_CHANGE_SIZE = 'afterchangesize',
}
