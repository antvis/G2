import { LooseObject } from '../../../interface';
import { IGroup } from '@antv/g-base';
import { ext } from '@antv/matrix-util';
import { deepMix } from '@antv/util';
import { parsePadding } from '../../../util/padding';
import Action from '../base';
const PADDING_RIGHT = 10;
const PADDING_TOP = 5;

/**
 * Button action
 * @ignore
 */
class ButtonAction extends Action {
  private buttonGroup: IGroup = null;
  private buttonCfg = {
    name: 'button',
    text: 'button',
    textStyle: {
      x: 0,
      y: 0,
      fontSize: 12,
      fill: '#333333',
      cursor: 'pointer',
    },
    padding: [8, 10],
    style: {
      fill: '#f7f7f7',
      stroke: '#cccccc',
      cursor: 'pointer',
    },
    activeStyle: {
      fill: '#e6e6e6',
    },
  };
  // mix 默认的配置和用户配置
  private getButtonCfg(): LooseObject {
    return deepMix(this.buttonCfg, this.cfg);
  }
  // 绘制 Button 和 文本
  private drawButton() {
    const config = this.getButtonCfg();
    const group = this.context.view.foregroundGroup.addGroup({
      name: config.name,
    });
    // 添加文本
    const textShape = group.addShape({
      type: 'text',
      name: 'button-text',
      attrs: {
        text: config.text,
        ...config.textStyle,
      },
    });
    const textBBox = textShape.getBBox();
    const padding = parsePadding(config.padding);
    // 添加背景按钮
    const buttonShape = group.addShape({
      type: 'rect',
      name: 'button-rect',
      attrs: {
        x: textBBox.x - padding[3],
        y: textBBox.y - padding[0],
        width: textBBox.width + padding[1] + padding[3],
        height: textBBox.height + padding[0] + padding[2],
        ...config.style,
      },
    });
    buttonShape.toBack(); // 在后面
    // active 效果内置
    group.on('mouseenter', () => {
      buttonShape.attr(config.activeStyle);
    });
    group.on('mouseleave', () => {
      buttonShape.attr(config.style);
    });
    this.buttonGroup = group;
  }

  // 重置位置
  private resetPosition() {
    const view = this.context.view;
    const coord = view.getCoordinate();
    const point = coord.convert({ x: 1, y: 1 }); // 后面直接改成左上角
    const buttonGroup = this.buttonGroup;
    const bbox = buttonGroup.getBBox();
    const matrix = ext.transform(null, [
      ['t', point.x - bbox.width - PADDING_RIGHT, point.y + bbox.height + PADDING_TOP],
    ]);
    buttonGroup.setMatrix(matrix);
  }

  /**
   * 显示
   */
  public show() {
    if (!this.buttonGroup) {
      this.drawButton();
    }
    this.resetPosition();
    this.buttonGroup.show();
  }

  /**
   * 隐藏
   */
  public hide() {
    if (this.buttonGroup) {
      this.buttonGroup.hide();
    }
  }

  /**
   * 销毁
   */
  public destroy() {
    const buttonGroup = this.buttonGroup;
    if (buttonGroup) {
      buttonGroup.remove();
    }
    super.destroy();
  }
}

export default ButtonAction;
