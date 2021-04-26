/**
 * G2.Scale 列定义的类型配置
 */
export type ScaleCfg = {
  /**
   * 字段类型区分
   */
  type: 'linear' | 'cat' | 'time' | 'timeCat';
  /**
   * 字段名称
   */
  field: string;
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
   * 字段的格式化方法
   */
  formatter?: (v: any) => string;
};

/**
 * // TODO 万木
 * 将 @antv/scale 进行针对于 G2 的二次包装，让使用更加容易方便！
 * 其实名字叫 FieldMeta 更好，但是考虑到 G2 旧版本的概念兼容，所以还是用重名的 Scale 命名，它的内部会包含一个真正的 scale 示例
 */
export class Scale {
  /**
   * 传入的配置
   */
  private options: ScaleCfg;

  /**
   * 构造函数
   * @param cfg
   */
  constructor(cfg: ScaleCfg) {
    // TODO create scale by type
    // this.scale = xxx;
  }

  /**
   * 包含的 antv/scale 实例
   */
  private scale;

  /**
   * 是否是线性连续 scale
   */
  public isLinear() {}

  /**
   * 是否是离散的分类 scale
   */
  public isCategory() {}

  /**
   * 将值映射到值域
   * @param v
   */
  public map(v: any): any {
    this.scale.map(v);
  }

  /**
   * 将数据逆向映射会原始数据
   * @param v
   */
  public invert(v: any): any {}

  /**
   * 更新 antv/scale 配置和实例
   */
  public update(cfg: Partial<ScaleCfg>) {
    this.scale.update(this.getAntVScaleCfg(cfg));
  }

  /**
   * 从配置中，生成 antv scale 的配置！
   * @param cfg
   */
  private getAntVScaleCfg(cfg: Partial<ScaleCfg>) {
    return cfg;
  }
}
