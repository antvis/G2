import { BBox, Canvas } from '@antv/g';
import * as Util from '@antv/util';
import Guide from '../base';
import { Attrs } from '../interface';
import { TooltipCfg, ToolTipContentItem } from './interface';

interface CrosshairCfg extends TooltipCfg {
  rectStyle?: object;
}
export default class Crosshair extends Guide<CrosshairCfg> {
  constructor(cfg: CrosshairCfg) {
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
       * 默认rect crosshair样式
       * @type {Object}
       */
      rectStyle: {
        fill: '#CCD6EC',
        opacity: 0.3,
      },
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

  public _init_() {
    const plot = this.get('plot');
    let group;
    if (this.get('type') === 'rect') {
      group = plot.addGroup({
        zIndex: 0,
      });
    } else {
      group = plot.addGroup();
    }
    this.set('container', group);
  }

  public _addLineShape(attrs: Attrs, type: string) {
    const container = this.get('container');
    const shape = container.addShape('line', {
      attrs,
      capture: false,
    });
    // shape.hide();
    this.set(`crossLineShape${type}`, shape);
    return shape;
  }

  public _renderHorizontalLine(canvas: any, panelRange: any) {
    // todo
    const style = Util.mix(this.get('lineStyle'), this.get('style'));
    const attrs = Util.mix(
      {
        x1: panelRange ? panelRange.bl.x : canvas.get('width'),
        y1: 0,
        x2: panelRange ? panelRange.br.x : 0,
        y2: 0,
      },
      style
    );
    this._addLineShape(attrs, 'X');
  }

  public _renderVerticalLine(canvas: any, panelRange: any) {
    // todo
    const style = Util.mix(this.get('lineStyle'), this.get('style'));
    const attrs = Util.mix(
      {
        x1: 0,
        y1: panelRange ? panelRange.bl.y : canvas.get('height'),
        x2: 0,
        y2: panelRange ? panelRange.tl.y : 0,
      },
      style
    );

    this._addLineShape(attrs, 'Y');
  }

  public _renderBackground(canvas: Canvas, panelRange: BBox) {
    const style = Util.mix(this.get('rectStyle'), this.get('style'));
    const container = this.get('container');
    const attrs = Util.mix(
      {
        x: panelRange ? panelRange.tl.x : 0,
        y: panelRange ? panelRange.tl.y : canvas.get('height'),
        width: panelRange ? panelRange.br.x - panelRange.bl.x : canvas.get('width'),
        height: panelRange ? Math.abs(panelRange.tl.y - panelRange.bl.y) : canvas.get('height'),
      },
      style
    );

    const shape = container.addShape('rect', {
      attrs,
      capture: false,
    });
    // shape.hide();
    this.set('crosshairsRectShape', shape);
    return shape;
  }

  public _updateRectShape(items: any[]) {
    let offset;
    const crosshairsRectShape = this.get('crosshairsRectShape');
    const isTransposed = this.get('isTransposed');
    const firstItem = items[0];
    const lastItem = items[items.length - 1];
    const dim = isTransposed ? 'y' : 'x';
    const attr = isTransposed ? 'height' : 'width';
    let startDim = firstItem[dim];
    if (items.length > 1 && firstItem[dim] > lastItem[dim]) {
      startDim = lastItem[dim];
    }
    if (this.get('width')) {
      // 用户定义了 width
      crosshairsRectShape.attr(dim, startDim - this.get('crosshairs').width / 2);
      crosshairsRectShape.attr(attr, this.get('width'));
    } else {
      if (Util.isArray(firstItem.point[dim]) && !firstItem.size) {
        // 直方图
        const width = firstItem.point[dim][1] - firstItem.point[dim][0];
        crosshairsRectShape.attr(dim, firstItem.point[dim][0]);
        crosshairsRectShape.attr(attr, width);
      } else {
        offset = (3 * firstItem.size) / 4;
        crosshairsRectShape.attr(dim, startDim - offset);

        if (items.length === 1) {
          crosshairsRectShape.attr(attr, (3 * firstItem.size) / 2);
        } else {
          crosshairsRectShape.attr(attr, Math.abs(lastItem[dim] - firstItem[dim]) + 2 * offset);
        }
      }
    }
  }

  public render() {
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
      case 'rect':
        this._renderBackground(canvas, panelRange);
        break;
      default:
        isTransposed ? this._renderHorizontalLine(canvas, panelRange) : this._renderVerticalLine(canvas, panelRange);
    }
  }

  public show() {
    const container = this.get('container');
    // super.show();
    container.show();
  }

  public hide() {
    const container = this.get('container');
    // super.hide();
    container.hide();
  }

  public clear() {
    const container = this.get('container');
    this.set('crossLineShapeX', null);
    this.set('crossLineShapeY', null);
    this.set('crosshairsRectShape', null);
    // super.clear();
    container.clear();
  }

  public destroy() {
    const container = this.get('container');
    super.destroy();
    container.remove();
  }

  public setPosition(x: number, y: number, items?: ToolTipContentItem[]) {
    const crossLineShapeX = this.get('crossLineShapeX');
    const crossLineShapeY = this.get('crossLineShapeY');
    const crosshairsRectShape = this.get('crosshairsRectShape');
    if (crossLineShapeY && !crossLineShapeY.get('destroyed')) {
      // 第一次进入时，画布需要单独绘制，所以需要先设定corss的位置
      crossLineShapeY.move(x, 0);
    }
    if (crossLineShapeX && !crossLineShapeX.get('destroyed')) {
      crossLineShapeX.move(0, y);
    }
    if (crosshairsRectShape && !crosshairsRectShape.get('destroyed')) {
      this._updateRectShape(items);
    }
  }
}
