import Geometry from './base';
import './shape/edge';

/**
 * Edge 几何标记，用于绘制关系图中的**边**图形，如：
 * 1. 流程图
 * 2. 树
 * 3. 弧长连接图
 * 4. 和弦图
 * 5. 桑基图
 */
export default class Edge extends Geometry {
  public readonly type: string = 'edge';
  public readonly shapeType: string = 'edge';
  protected generatePoints: boolean = true;
}
