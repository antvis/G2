import { registerViewPrototype } from '../plot/view';
import { ElementConstructor } from './base';

export const ELEMENT_MAP: {
  [key: string]: ElementConstructor;
} = {}; // element 映射
/**
 * 根据类型获取 Element 类
 * @param type
 */
export const getElement = (type: string): ElementConstructor => {
  return ELEMENT_MAP[type.toLowerCase()];
};

/**
 * 注册自定义 Element 类
 * @param type
 * @param ctor
 */
export const registerElement = (type: string, ctor: ElementConstructor): void => {
  // 注册的时候，需要校验 type 重名，不区分大小写
  if (getElement(type)) {
    throw new Error(`Element type '${type}' existed.`);
  }
  const t = type.toLowerCase();
  // 存储到 map 中
  ELEMENT_MAP[t] = ctor;

  registerViewPrototype(t, ctor);
};
