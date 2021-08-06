/**
 * 管理 view 中的所有组件和图形，然后调用约束布局求解器进行计算约束变量，作为组件和图形的布局信息。
 * docs: https://www.yuque.com/antv/g2-docs/mx4nt7
 */

import type { View } from '../view';
import { UnitMeta, UnitVariable } from '../../types/layout';

/**
 * 布局类
 * const l = new Layout(view);
 *
 * l.init();
 * l.calculate();
 * l.apply();
 */
export class Layout {
  /**
   * Layout 所处理的 view
   */
  private view: View;

  /**
   * 存储 view 中所包含的 geometry、component
   */
  private unitMetaMap = new Map<string, UnitMeta>();

  /**
   * 对应约束布局求解器中的变量，一个 unit 元素有四个变量
   */
  private variableMap = new Map<string, UnitVariable>();

  constructor(view: View) {
    this.view = view;
  }

  /**
   * 初始化，从 view 中获取元素，并重新生成 unitMetaMap
   */
  public init() {
    const components = this.view.getComponents();
    const geometries = this.view.geometries;

    // TODO 改成真实的数据
    // 存储为 id -> UnitMeta
    components.forEach((component) => {
      this.unitMetaMap.set(component.id, {
        type: '',
        extra: {},
        unit: component,
      });
    });

    geometries.forEach((geometry) => {
      this.unitMetaMap.set(geometry.id, {
        type: '',
        extra: {},
        unit: geometry,
      });
    });
  }

  /**
   * 开始进行布局处理
   */
  public calculate() {
    // 1. 设置变量初始常量值，比如 x 周的高度、y 轴的宽度
    this.setConstantValue();

    // 2. 生成约束条件的公示
    this.generateConstraintRules();

    // 3. 约束求解
    this.solveIt();
  }

  private setConstantValue() {
  }

  private generateConstraintRules() {
  }

  private solveIt() {
  }

  /**
   * 应用布局结果到元素伤
   */
  public apply() {
  }
}
