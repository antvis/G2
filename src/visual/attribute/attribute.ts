import { isNil } from '@antv/util';
import { Callback } from '../../types';
import { ScaleDef } from '../scale';

export type AttributeCfg = {
  /**
   * 对应字段
   */
  readonly fields: string[]; // 可以直接 = scale.field 的值
  /**
   * 对应字段的 scales
   */
  readonly scales: ScaleDef[];
  /**
   * 用户传参, 用于辅助映射的 value，比如 color，可以传一个色板数组
   */
  readonly value?: any;
  /**
   * 属性映射的 function，和 value 2 选 1
   */
  readonly callback?: Callback;
};

/**
 * 所有视觉通道属性的基类
 *
 * @class Base
 */
export class Attribute {
  /**
   * attribute 的类型
   */
  public type: 'base' | 'position' | 'color';

  /**
   * 字段信息
   */
  public fields: string[];

  /**
   * 用户传参, 用于辅助映射的 value，比如 color，可以传一个色板数组
   */
  public value: any[] = [];

  /**
   * 属性映射的 callback 函数
   */
  public callback: Callback;

  /**
   * 属性映射对应的字段 scale
   */
  public scales: ScaleDef[];

  constructor(cfg: Partial<AttributeCfg>) {
    this.update(cfg);
    this.type = 'base';
  }

  /**
   * 执行映射
   *
   * @param params 需要映射的值（对应 scale 顺序的值传入）
   * @return {any[]} 映射结果
   */
  public mapping(...params: any[]) {
    if (this.callback) {
      const ret = this.callback(...params);
      if (!isNil(ret)) {
        return [ret];
      }
    }
    // 没有 params 的情况，即没有指定 fields，直接返回配置的 values 常量
    if (params.length === 0) {
      return this.value;
    }
    return this.defaultCallback(...params);
  }

  /**
   * attr 的默认回调函数，获取每一个参数和对应的 scale，然后调用 performUnitOfScale 进行映射
   *
   * @param params 需要映射的值（对应 scale 顺序的值传入）
   * @return {any[]} 映射结果
   */
  protected defaultCallback(...params: any[]): any[] {
    const results = [];
    const len = params.length;
    for (let i = 0; i < len; i += 1) {
      const targetScale = this.scales[i];
      const param = params[i];
      results.push(this.performUnitOfScale(param, targetScale, i));
    }

    return results;
  }

  /**
   * 开始处理一个参数，子类可以通过覆写此方法来自定义处理策略
   * 我们的默认行为：直接映射
   *
   * @return {any[]} 映射结果
   * @param param 需要映射的参数(用户传参)
   * @param scale 本次对应的 scale 值
   * @param index 当前参数基于所有参数的下标
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected performUnitOfScale(param: any, scale: ScaleDef, index: number) {
    // 默认行为 -- 直接映射
    return scale.map(param);
  }

  /**
   * 更新 Attribute 配置
   *
   * @param cfg attribute 配置
   */
  public update(cfg: Partial<AttributeCfg>) {
    const { fields = [], scales = [], value = [], callback } = cfg;

    this.fields = fields;
    this.value = value;
    this.callback = callback;
    this.scales = scales;
  }
}
