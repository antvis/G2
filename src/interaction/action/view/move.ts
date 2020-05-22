import { ext } from '@antv/matrix-util';
import { Action } from '..';
import { distance } from '../util';

const MIN_DISTANCE = 5;

/**
 * @ignore
 * View 移动的 Action
 */
class Move extends Action {
  private starting = false;
  private isMoving = false;
  // private cacheRange = null;
  private startPoint = null;
  private startMatrix = null;
  /**
   * 开始移动
   */
  public start() {
    this.starting = true;
    this.startPoint = this.context.getCurrentPoint();
    // 缓存开始时的矩阵，防止反复拖拽
    this.startMatrix = this.context.view.middleGroup.getMatrix();
  }

  /**
   * 移动
   */
  public move() {
    if (!this.starting) {
      return;
    }
    const startPoint = this.startPoint;
    const currentPoint = this.context.getCurrentPoint();
    const d = distance(startPoint, currentPoint);
    if (d > MIN_DISTANCE && !this.isMoving) {
      this.isMoving = true;
    }
    if (this.isMoving) {
      const view = this.context.view;
      const matrix = ext.transform(this.startMatrix, [
        ['t', currentPoint.x - startPoint.x, currentPoint.y - startPoint.y],
      ]);
      view.backgroundGroup.setMatrix(matrix);
      view.foregroundGroup.setMatrix(matrix);
      view.middleGroup.setMatrix(matrix);
    }
  }

  /**
   * 结束移动
   */
  public end() {
    if (this.isMoving) {
      this.isMoving = false;
    }
    this.startMatrix = null;
    this.starting = false;
    this.startPoint = null;
  }

  /**
   * 回滚
   */
  public reset() {
    this.starting = false;
    this.startPoint = null;
    this.isMoving = false;

    const view = this.context.view;
    view.backgroundGroup.resetMatrix();
    view.foregroundGroup.resetMatrix();
    view.middleGroup.resetMatrix();
    this.isMoving = false;
  }
}

export default Move;
