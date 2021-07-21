import type { InteractionCtor } from './interaction';

const INTERACRION_MAP = new Map<string, InteractionCtor>();

/**
 * 注册自定义交互
 * @param name 交互名称（全局唯一）
 * @param interaction
 */
export function registerInteraction(name: string, interaction: InteractionCtor) {
  INTERACRION_MAP.set(name.toLowerCase(), interaction);
}

/**
 * 根据名称获得一个交互
 * @param name 交互名称（全局唯一）
 * @returns
 */
export function getInteraction(name: string): InteractionCtor {
  return INTERACRION_MAP.get(name.toLowerCase());
}
