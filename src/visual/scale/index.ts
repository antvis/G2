import { Linear, Band, Time, Ordinal, Log, Pow, Identity } from '@antv/scale';
import { min, max, isNil } from '@antv/util';

type Scale = any;
type ScaleCfg = any;

/**
 * // TODO @万木 增加 Scale 包装，需要对于 G2 来实现无感！代码整洁、架构上是否 OK？
 * G2.Scale 列定义的类型配置
 */
export type ScaleDefCfg = {
  /**
   * 字段类型区分
   */
  type: 'identity' | 'linear' | 'log' | 'pow' | 'cat' | 'category' | 'time' | 'timeCat';
  /**
   * 字段名称
   */
  field?: string;
  /**
   * 字段别名
   */
  alias?: string;
  /**
   * 映射的定义域 min
   */
  min?: number;
  /**
   * 映射的定义域 min
   */
  max?: number;
  /**
   * 映射的定义域范围，默认为是 [0, 1]
   */
  range?: number[];
  /**
   * 字段的格式化方法
   */
  formatter?: (v: any) => string;
  /**
   * field 对应的枚举值
   */
  values?: any[];
};

/**
 * 将 @antv/scale 进行针对于 G2 的二次包装，让使用更加容易方便！
 * 其实名字叫 FieldMeta 更好，但是考虑到 G2 旧版本的概念兼容，所以还是用重名的 Scale 命名，它的内部会包含一个真正的 scale 示例
 */
export class ScaleDef {
  /**
   * 包含的 antv/scale 实例
   */
  private scale: Scale;

  /**
   * 传入的配置
   */
  private cfg: ScaleDefCfg;

  /**
   * 构造函数
   * @param cfg
   */
  constructor(cfg: ScaleDefCfg) {
    // 设置默认值
    this.cfg = {
      range: [0, 1],
      ...cfg,
    };
    // create scale by type
    this.scale = ScaleDef.createScale(cfg);
  }

  /**
   * 字段的类型
   */
  public get type() {
    return this.cfg.type;
  }

  /**
   * 对应的列字段
   */
  public get field() {
    return this.cfg.field;
  }

  /**
   * 获取字段名字，考虑别名
   */
  public get fieldName() {
    return this.cfg.alias || this.field;
  }

  /**
   * 是否是线性连续 scale
   */
  public isLinear() {
    return ['linear', 'log', 'pow'].includes(this.type);
  }

  /**
   * 是否是离散的分类 scale
   */
  public isCategory() {
    return ['cat', 'category', 'time', 'timeCat'].includes(this.type);
  }

  /**
   * 是否是常量的 scale
   */
  public isIdentity() {
    return this.type === 'identity';
  }

  /**
   * 将值映射到值域
   * @param v
   */
  public map(v: any): any {
    return this.scale.map(v);
  }

  /**
   * 将数据逆向映射会原始数据
   * @param v
   */
  public invert(v: any): any {
    return this.scale.invert(v);
  }

  /**
   * 更新 antv/scale 配置和实例
   */
  public update(cfg: Partial<ScaleDefCfg>) {
    // merge 配置，然后更新 scale
    this.cfg = { ...this.cfg, ...cfg };
    this.scale.update(ScaleDef.getAntVScaleCfg(this.cfg));
  }

  /**
   * 从配置中，生成 antv scale 的配置！
   * @param cfg
   */
  private static getAntVScaleCfg(cfg: Partial<ScaleDefCfg>): ScaleCfg {
    // todo 抽出配置
    return {
      domain: [
        isNil(cfg.min) ? min(cfg.values) : cfg.min,
        isNil(cfg.max) ? max(cfg.values) : cfg.max,
      ],
      ...cfg,
    };
  }

  /**
   * 创建具体的 scale 类型
   * @param cfg
   */
  private static createScale(cfg: ScaleDefCfg) {
    const { type } = cfg;
    const scaleCfg = ScaleDef.getAntVScaleCfg(cfg);

    // 针对不同的类型，创建不同的 scale
    switch (type) {
      case 'cat':
      case 'category':
        return new Band(scaleCfg);
      case 'linear':
        return new Linear(scaleCfg);
      case 'log':
        return new Log(scaleCfg);
      case 'pow':
        return new Pow(scaleCfg);
      case 'timeCat':
        return new Ordinal(scaleCfg);
      case 'time':
        return new Time(scaleCfg);
      case 'identity':
        return new Identity(scaleCfg);
      default:
        return new Band(scaleCfg);
    }
  }
}
