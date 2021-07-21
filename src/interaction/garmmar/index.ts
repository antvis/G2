/**
 * G2 4.x 版本开始内置的交互语法实现。
 *
 * 使用 Garmmar of Interaction 的方式自定义交互。内置的交互语法设计： https://www.yuque.com/antv/blog/ovznet
 *
 * 核心逻辑：
 * - 将交互拆解成 5 个阶段
 *    示能：表示交互可以进行
 *    开始：交互开始
 *    持续：交互持续
 *    结束：交互结束
 *    回滚：取消交互，恢复到原始状态
 * - 每个阶段有包含有触发和反馈
 *    触发：由 G 层提供基础图形层的事件，G2 层提供一些生命周期事件
 *    反馈：决定事件执行之后，做什么事情，取名叫 Action（所以会有 action 的注册逻辑）
 */

import { Action } from './action';
import { parse } from './parser';
import { registerAction, getAction } from './factory';

// 二级的 API，合并成一个变量暴露出去
export const grammar = {
  Action, parse, registerAction, getAction,
};
