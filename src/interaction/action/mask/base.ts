import Action from '../base';

/**
 * 辅助框 Action 的基类
 */
class MaskBase extends Action {
  // mask 图形
  protected maskShape = null;
  // 组成 mask 的各个点
  protected points = [];
  // 开始 mask 的标记
  protected starting = false;
  // 获取当前的位置
  protected getCurrentPoint() {
    const event = this.context.event;
    return {
      x: event.x,
      y: event.y,
    };
  }
  // 触发 mask 的事件
  protected emitEvent(type) {
    const eventName = `mask:${type}`;
    const view = this.context.view;
    const event = this.context.event;
    view.emit(eventName, {
      target: this.maskShape,
      shape: this.maskShape,
      x: event.x,
      y: event.y,
    });
  }

  // 创建 mask
  private createMask() {
    const view = this.context.view;
    const maskShape = view.foregroundGroup.addShape({
      type: 'path',
      name: 'mask',
      attrs: {
        // 暂时写死样式
        fill: 'red',
        fillOpacity: 0.2,
        path: this.getMaskPath(),
      },
    });
    return maskShape;
  }

  // 生成 mask 的路径
  protected getMaskPath() {
    return [];
  }

  /**
   * 显示
   */
  public show() {
    if (this.maskShape) {
      this.maskShape.show();
      this.emitEvent('show');
    }
  }

  /**
   * 开始
   */
  public start() {
    this.starting = true;
    this.points = [this.getCurrentPoint()];
    if (!this.maskShape) {
      this.maskShape = this.createMask();
    }
    const path = this.getMaskPath();
    this.maskShape.attr('path', path);
    this.emitEvent('start');
  }

  public end() {
    this.starting = false;
    this.emitEvent('end');
  }

  /**
   * 隐藏
   */
  public hide() {
    if (this.maskShape) {
      this.maskShape.hide();
      this.emitEvent('hide');
    }
  }

  /**
   * 大小变化
   */
  public resize() {
    // 只有进行中，才会允许大小变化
    if (this.starting && this.maskShape) {
      const path = this.getMaskPath();
      this.maskShape.attr('path', path);
      this.emitEvent('change');
    }
  }

  /**
   * 销毁
   */
  public destroy() {
    this.points = [];
    if (this.maskShape) {
      this.maskShape.remove();
    }
    this.maskShape = null;
    super.destroy();
  }
}

export default MaskBase;
