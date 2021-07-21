/**
 * 包含：
 * 1. 交互机制
 * 2. 4.x 的交互语法
 * 3. 内置的交互
 */

// 基类，用于外部做自定义交互
export { Interaction, InteractionCtor } from './interaction';

// 交互池注册的 API
export { getInteraction, registerInteraction } from './factory';

// 内置交互语法相关 API
export { grammar } from './garmmar';
