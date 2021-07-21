import { Interaction } from '../interaction';
import { PlainObject } from '../../types';

/**
 * 将交互语法的 json 解析成自定义交互的 class 类
 * // todo 新茗、万木
 * @param grammar 语法的定义，需要一个更严格的类型定义
 */
export function parse(grammar: PlainObject) {
  // 根据 json，返回一个自定义的交互 class
  return class extends Interaction {
    public init() {
      throw new Error('Method not implemented.');
    }
  };
}
