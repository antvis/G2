import { InteractionConstructor } from './base';

export const INTERACTION_MAP : {
  [key: string]: InteractionConstructor;
} = {};

export const getInteraction = (type: string): InteractionConstructor => {
  return INTERACTION_MAP[type];
};

export const registerInteraction = (type: string, ctor: InteractionConstructor): void => {
    // 注册的时候，需要校验 type 重名，不区分大小写
  if (getInteraction(type)) {
    throw new Error(`Interaction type '${type}' existed.`);
  }
    // 存储到 map 中
  INTERACTION_MAP[type] = ctor;
};
