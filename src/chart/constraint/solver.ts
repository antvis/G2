import { BBox } from '../../util/bbox';

/**
 * 约束规则求解器：
 *
 * 针对 G2 布局（G2 场景简单，应该无需不等式）
 * 轻量（< 5 Kb）
 * 高性能版本（50 个 bbox 节点，100 个公式，布局时间在 5ms 内，这个标准不知道是否合理）
 *
 * 可以参考 https://yuque.antfin.com/ii/monthly/kof4ss 最底部引用地址（一个开源的实现、一个是论文介绍）
 *
 * @万木
 * 1. API 设计
 * 2. 具体实现原理介绍
 */
export class Solver {
  /**
   * 添加约束规则
   */
  public addRule() {}

  /**
   * 计算求解，最后给出所有节点的位置 BBox
   */
  public calc(): Record<string, BBox> {
    return {};
  }
}
