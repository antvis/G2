import { isNil, map, max, min } from '@antv/util';
import { ScaleBaseOptions, ScaleOption } from '../../types';
import { createScaleFactory } from '../../util/scale';

/**
 * 将 @antv/scale 进行针对于 G2 的二次包装，让使用更加容易方便
 *
 * 其实名字叫 FieldMeta 更好，但是考虑到 G2 旧版本的概念兼容
 * 所以还是用重名的 Scale 命名，它的内部会包含一个真正的 scale 实例
 *
 * @param T scale 类型，默认为 Base
 * @param O scale 选项，默认为 BaseOption
 * @see {ScaleBaseOptions} in @antv/scale, scale 的基础配置
 * @see {Base} in @antv/scale scale 的基类
 */
export class ScaleDef {
  /**
   * 包含的 antv/scale 实例
   */
  private scale: any;

  /**
   * 传入的配置
   */
  private option: ScaleOption;

  /**
   * 构造函数
   *
   * @param cfg G2 Scale 配置
   */
  constructor(option: ScaleOption) {
    // 设置默认值
    this.option = {
      range: [0, 1],
      ...option,
    };

    this.initScale();
  }

  /**
   * 获取字段的类型
   *
   * @return 字段的类型
   */
  public get type() {
    return this.option.type;
  }

  /**
   * 获取对应的列字段
   *
   * @return 对应的列字段
   */
  public get field() {
    return this.option.field;
  }

  /**
   * 获取字段名字，考虑别名
   *
   * @return {string} 字段名称，如果配置了别名，则优先返回别名
   */
  public get fieldName() {
    return this.option.alias || this.field;
  }

  /**
   * 获取值对应的内容，处理 formatter
   * @param v
   * @returns
   */
  public getText(v: any) {
    const text = this.scale.invert(v);
    return this.option.formatter ? this.option.formatter(text) : `${text}`;
  }

  /**
   * 获取 ticks，处理过 formatter 的
   */
  public getTicks() {
    return map(this.scale.getTicks(), (value) => ({
      text: this.getText(value),
      value,
    }));
  }

  /**
   * 是否是线性连续 scale
   */
  public isLinear() {
    const LINEAR_TYPES = ['linear', 'log', 'pow', 'sqrt', 'time'];
    return LINEAR_TYPES.includes(this.type);
  }

  /**
   * 是否是离散的分类 scale
   */
  public isCategory() {
    const CATEGORY_TYPES = ['ordinal', 'band', 'point', 'cat', 'category'];
    return CATEGORY_TYPES.includes(this.type);
  }

  /**
   * 是否是常量的 scale
   */
  public isIdentity() {
    return this.type === 'identity';
  }

  /**
   * 获取 scale 的配置
   * @returns
   */
  public getOptions() {
    return this.scale.getOptions();
  }

  /**
   * 获取某一项配置
   * @param k
   * @returns
   */
  public getOption(k: string) {
    return this.scale.getOptions()[k];
  }

  /**
   * 将值映射到值域
   *
   * @param v 需要映射的值
   */
  public map(v: any): any {
    return this.scale.map(v);
  }

  /**
   * 将数据逆向映射会原始数据
   *
   * @param v 需要逆向映射的值
   */
  public invert(v: any): any {
    return this.scale.invert(v);
  }

  /**
   * 更新 antv/scale 配置和实例，注意：如果参数中有 type，那么我们会重新初始化新的 scale 实例
   *
   * @param cfg G2 scale 配置
   */
  public update(cfg: Partial<ScaleOption>) {
    const { type } = cfg;
    // scale 是否需要改变 -- 传入的新配置的 type 有值，并且 type 发生了改变
    const shouldScaleUpdate = !isNil(type) && this.option.type !== type;

    // merge 配置，然后更新 scale
    this.option = { ...this.option, ...cfg };

    // 如果 type 发生了改变，我们更新 scale
    if (shouldScaleUpdate) {
      this.scale = createScaleFactory(this.option.type, cfg);
      this.initScale();
    } else {
      // 配置转换
      const antvScaleCfg = this.toAntvScaleCfg();

      // 执行 antv/scale 更新
      this.scale.update(antvScaleCfg);
    }
  }

  /**
   * 复制一个新的 scale
   */
  public clone() {
    return new ScaleDef(this.option);
  }

  /**
   * 初始化 inner scale
   *
   */
  private initScale() {
    // 将 G2 配置转换为 antv 配置
    const antvConfig = this.toAntvScaleCfg();

    // 通过类型创建 scale
    this.scale = createScaleFactory(this.option.type, antvConfig);
  }

  /**
   * 转换成下层的 @antv/scale 配置
   *
   * @return {ScaleBaseOptions} 下层的 @antv/scale 配置
   */
  private toAntvScaleCfg(): ScaleBaseOptions {
    const option = this.option;
    let finalDomain: any[];
    // 如果是线性的，尝试使用 min 和 max 构造 domain 如果没有，我们从 传入的 domain 中寻找
    if (this.isLinear()) {
      finalDomain = [
        isNil(option.min) ? min(option.domain) : option.min,
        isNil(option.max) ? max(option.domain) : option.max,
      ];
    } else {
      // 非线性，直接赋值
      finalDomain = option.domain;
    }

    return {
      ...option,
      domain: finalDomain,
    };
  }
}
