import { isNil } from "@antv/util";
import { Base } from "../../../../scale/lib/scales/base";

export type CallbackFunc = (...args: any[]) => any[];

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
   * 属性映射的 value
   */
  readonly value?: any;
  /**
   * 属性映射的 function，和 value 2 选 1
   */
  readonly callback?: CallbackFunc;
};

type Scale = Base<any>;

/**
 * 所有视觉通道属性的基类
 * @class Base
 */
export class Attribute {
  /**
   * attribute 的类型
   */
  public type: string = "base";

  /**
   * 字段信息
   */
  public fields: string[];

  /**
   * 映射的值范围
   */
  public value: any[] = [];

  /**
   * 属性映射的 callback 函数
   */
  public callback: CallbackFunc;

  /**
   * 属性映射对应的字段 scale
   */
  public scales: Scale[];

  /**
   * 是否是 linear 线性映射
   */
  public isLinear: boolean = false;

  constructor(cfg: AttributeCfg) {
    this.update(cfg);
  }

  /**
   * 映射的值组成的数组
   *
   * @param params 对应 scale 顺序的值传入
   */
  public mapping(...params: any[]): any[] {
    // 1. 使用 callback 进行自定义映射
    if (this.callback) {
      // 当用户设置的 callback 返回 null 时, 应该返回默认 callback 中的值
      const ret = this.callback(...params);
      if (!isNil(ret)) {
        return [ret];
      }
    }

    // 2. 没有 callback 或者用户 callback 返回值为空,根据 value 来进行映射

    // 没有 params 的情况，是指没有指定 fields，直接返回配置的 values 常量
    if (this.fields.length === 0) {
      return this.value;
    }

    return params.map((param, idx) => {
      const scale = this.scales[idx];

      // 线性的，则使用 linear value
      if (this.isLinear) {
        // 线性则使用线性值
        const percent = scale.map(param);
        return this.getLinearValue(percent);
      }

      // 如果是非线性的字段，直接从 values 中取值即可
      // 离散 scale 变换成索引
      const scaleValue = scale.map(param) as number;
      return this.value[scaleValue % this.value.length];
    });
  }

  /**
   * 更新配置
   *
   * @param cfg attribute 配置
   */
  public update(cfg: AttributeCfg) {
    const {
      fields = [],
      scales = [],
      value = [],
      callback
    } = cfg;

    this.fields = fields;
    this.value = value;
    this.callback = callback;
    this.scales = scales;
  }

  /**
   * 如果进行线性映射，返回对应的映射值
   * @param percent
   */
  protected getLinearValue(percent: number): number | string {
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
}
