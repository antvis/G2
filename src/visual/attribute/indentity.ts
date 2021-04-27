import { Attribute } from "./attribute";

/**
 * 对应 indentity 的映射，不做任何事情！
 */
export class Indentity extends Attribute {
  /**
   * @override attribute 类型
   */
  public type: string = "indentity";

  /**
   * @override 不做任何事情，直接返回
   */
  public mapping(...params: any[]) {
    return params;
  }
}
