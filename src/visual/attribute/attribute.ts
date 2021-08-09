import { isNil } from '@antv/util';
import { Callback } from '../../types';
import type { Scale } from '../scale';

export type AttributeCfg = {
  /**
   * 对应字段
   */
  readonly fields: string[]; // 可以直接 = scale.field 的值
  /**
   * 对应字段的 scales
   */
  readonly scales: Scale[];
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
  public type: 'base' | 'position' | 'color' | 'size' | 'shape';

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
  public scales: Scale[];

  /**
   * 是否是线性的 attr
   */
  public isLinear = false;

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
    return params.map((param: any, idx: number) => {
      const scale = this.scales[idx];
      return scale.isIdentity ? scale.values[0] : this.performUnitOfScale(param, scale, idx);
    });
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
  protected performUnitOfScale(param: any, scale: Scale, index: number): number | string {
    // 如果是非线性的字段，直接从 values 中取值即可
    if (scale.isCategory && !this.isLinear) {
      // 离散 scale 变换成索引
      const idx = scale.translate(param) as number;
      return this.value[idx % this.value.length];
    }

    // 线性则使用线性值
    const percent = scale.scale(param);
    return this.getLinearValue(percent);
  }

  /**
   * 如果进行线性映射，返回对应的映射值
   * @param percent
   */
  public getLinearValue(percent: number): number | string {
    // 分段数量
    const steps = this.value.length - 1;

    const step = Math.floor(steps * percent);
    const leftPercent = steps * percent - step;

    // todo 不懂这个逻辑
    const start = this.value[step];
    const end = step === steps ? start : this.value[step + 1];

    // 线性方程
    return start + (end - start) * leftPercent;
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
