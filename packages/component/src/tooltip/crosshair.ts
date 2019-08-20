
import * as Util  from '@antv/util';
import Guide from '../base';
import { Attrs } from '../interface';
import { TooltipCfg, ToolTipContentItem } from './interface';

export default class Crosshair extends Guide {

  constructor(cfg: TooltipCfg) {
    super({
      /**
       * crosshair的类型
       */
      type: null,
      /**
       * 画在哪层视图
       */
      plot: null,
      /**
       * x轴上，移动到位置的偏移量
       */
      panelRange: null,
      /**
       * 默认line crosshair样式
       */
      lineStyle: {
        stroke: 'rgba(0, 0, 0, 0.25)',
        lineWidth: 1,
      },
      isTransposed: false,
      ...cfg,
    });
    this._init_();
    this.render();
  }

  _init_() {
    const plot = this.get('plot');
    const group = plot.addGroup();
    this.set('container', group);
  }

  _addLineShape(attrs: Attrs, type: string) {
    const container = this.get('container');
    const shape = container.addShape('line', {
      attrs,
      capture: false,
    });
    // shape.hide();
    this.set(`crossLineShape${type}`, shape);
    return shape;
  }

  _renderHorizontalLine(canvas: any, panelRange: any) { // todo
    const style = Util.mix(this.get('lineStyle'), this.get('style'));
    const attrs = Util.mix({
      x1: panelRange ? panelRange.bl.x : canvas.get('width'),
      y1: 0,
      x2: panelRange ? panelRange.br.x : 0,
      y2: 0,
    },                     style);
    this._addLineShape(attrs, 'X');
  }

  _renderVerticalLine(canvas: any, panelRange: any) { // todo
    const style = Util.mix(this.get('lineStyle'), this.get('style'));
    const attrs = Util.mix({
      x1: 0,
      y1: panelRange ? panelRange.bl.y : canvas.get('height'),
      x2: 0,
      y2: panelRange ? panelRange.tl.y : 0,
    },                     style);

    this._addLineShape(attrs, 'Y');
  }

  render() {
    const canvas = this.get('canvas');
    const panelRange = this.get('panelRange');
    const isTransposed = this.get('isTransposed');
    this.clear();
    switch (this.get('type')) {
      case 'x':
        this._renderHorizontalLine(canvas, panelRange);
        break;
      case 'y':
        this._renderVerticalLine(canvas, panelRange);
        break;
      case 'cross':
        this._renderHorizontalLine(canvas, panelRange);
        this._renderVerticalLine(canvas, panelRange);
        break;
      default:
        isTransposed ? this._renderHorizontalLine(canvas, panelRange) : this._renderVerticalLine(canvas, panelRange);
    }
  }

  show() {
    const container = this.get('container');
    // super.show();
    container.show();
  }

  hide() {
    const container = this.get('container');
    // super.hide();
    container.hide();
  }

  clear() {
    const container = this.get('container');
    this.set('crossLineShapeX', null);
    this.set('crossLineShapeY', null);
    this.set('crosshairsRectShape', null);
    // super.clear();
    container.clear();
  }

  destroy() {
    const container = this.get('container');
    super.destroy();
    container.remove();
  }

  setPosition(x: number, y: number, items?: ToolTipContentItem[]) {
    const crossLineShapeX = this.get('crossLineShapeX');
    const crossLineShapeY = this.get('crossLineShapeY');
    if (crossLineShapeY && !crossLineShapeY.get('destroyed')) { // 第一次进入时，画布需要单独绘制，所以需要先设定corss的位置
      crossLineShapeY.move(x, 0);
    }
    if (crossLineShapeX && !crossLineShapeX.get('destroyed')) {
      crossLineShapeX.move(0, y);
    }
  }
}
