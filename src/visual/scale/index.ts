import { BaseOptions } from '@antv/scale';
import { min, max, isNil } from '@antv/util';
// TODO: 在下一个 scale 版本中 base 会从 index 中导出，无需 lib
import { Base } from '@antv/scale/lib/scales/base';
import { ScaleDefCfg } from '../../types';
import { createScaleFactory } from '../../util/scale';

/**
 * 将 @antv/scale 进行针对于 G2 的二次包装，让使用更加容易方便
 *
 * 其实名字叫 FieldMeta 更好，但是考虑到 G2 旧版本的概念兼容
 * 所以还是用重名的 Scale 命名，它的内部会包含一个真正的 scale 实例
 *
 * @param T scale 类型，默认为 Base
 * @param O scale 选项，默认为 BaseOption
 * @see {BaseOptions} in @antv/scale, scale 的基础配置
 * @see {Base} in @antv/scale scale 的基类
 */
export class ScaleDef<T extends Base<any>, O extends BaseOptions> {
  // 线性类型
  public static LINEAR_TYPES = ['linear', 'log', 'pow', 'sqrt', 'time'];

  // 离散类型
  public static CATEGORY_TYPES = ['ordinal', 'band', 'point'];

  /**
   * 包含的 antv/scale 实例
   */
  private scale: T;

  /**
   * 传入的配置
   */
  private cfg: ScaleDefCfg;

  /**
   * 构造函数
   *
   * @param cfg G2 Scale 配置
   */
  constructor(cfg: ScaleDefCfg) {
    // 设置默认值
    this.cfg = {
      range: [0, 1],
      ...cfg,
    };

    this.initScale(cfg);
  }

  /**
   * 获取字段的类型
   *
   * @return 字段的类型
   */
  public getType() {
    return this.cfg.type;
  }

  /**
   * 获取对应的列字段
   *
   * @return 对应的列字段
   */
  public getField() {
    return this.cfg.field;
  }

  /**
   * 获取配置
   *
   * @return 配置
   */
  public getCfg() {
    return this.cfg;
  }

  /**
   * 获取字段名字，考虑别名
   *
   * @return {string} 字段名称，如果配置了别名，则优先返回别名
   */
  public getFieldName() {
    return this.cfg.alias || this.getField();
  }

  /**
   * 是否是线性连续 scale
   */
  public isLinear() {
    return ScaleDef.LINEAR_TYPES.includes(this.getType());
  }

  /**
   * 是否是离散的分类 scale
   */
  public isCategory() {
    return ScaleDef.CATEGORY_TYPES.includes(this.getType());
  }

  /**
   * 是否是常量的 scale
   */
  public isIdentity() {
    return this.getType() === 'identity';
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
  public update(cfg: Partial<ScaleDefCfg>) {
    // merge 配置，然后更新 scale
    this.cfg = { ...this.cfg, ...cfg };

    // 如果参数中有 type，那么我们会重新初始化新的 scale 实例
    if (!isNil(cfg.type)) {
      this.scale = createScaleFactory(this.cfg.type, cfg) as T;
      this.initScale(cfg as ScaleDefCfg);
    } else {
      // 配置转换
      const antvScaleCfg = ScaleDef.g2ToAntvScaleCfg(this.cfg) as O;

      // 执行 antv/scale 更新
      this.scale.update(antvScaleCfg);
    }
  }

  /**
   * 将 G2 scale 配置转换成下层的 @antv/scale 配置
   *
   * @param cfg G2 scale 配置
   */
  public static g2ToAntvScaleCfg(cfg: Partial<ScaleDefCfg>): BaseOptions {
    return {
      domain: [
        isNil(cfg.min) ? min(cfg.values) : cfg.min,
        isNil(cfg.max) ? max(cfg.values) : cfg.max,
      ],
      ...cfg,
    };
  }

  /**
   * 初始化 inner scale
   *
   * @param cfg G2 scale 配置
   */
  private initScale(cfg: ScaleDefCfg) {
    // 将 G2 配置转换为 antv 配置
    const antvConfig = ScaleDef.g2ToAntvScaleCfg(cfg);

    // 通过类型创建 scale
    this.scale = createScaleFactory(this.cfg.type, antvConfig) as T;
  }
}
