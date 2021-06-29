import { AttributeKey } from './types';

/**
 * 作为分组的视觉属性
 */
export const GROUP_ATTR_KEYS = ['color', 'shape', 'size'] as Partial<AttributeKey>[];

/**
 * 存储原始数据的 key
 */
export const ORIGINAL_FIELD = Symbol('ORIGINAL_FIELD');
