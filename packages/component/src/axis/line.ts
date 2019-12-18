import { Shape } from '@antv/g';
import { vec2 } from '@antv/matrix-util';
import * as Util from '@antv/util';
import { LineAxisCfg } from '../interface';
import Axis from './base';

export default class Line extends Axis {
  constructor(cfg = {} as LineAxisCfg) {
    super({
      type: 'line',
      x: null, // 距离初始位置的x轴偏移量,仅对于左侧、右侧的纵向坐标有效
      y: null, // 距离初始位置的y轴偏移量，仅对顶部、底部的横向坐标轴有效
      isVertical: false,
      start: null, // 起点
      end: null, // 终点
      ...cfg,
    });
  }

  /**
   * 获取距离坐标轴的向量
   * @override
   * @param  {Number} offset 偏移值
   * @return {Array}        返回二维向量
   */
  public getSideVector(offset) {
    const isVertical = this.get('isVertical');
    const factor = this.get('factor');
    // if (Util.isArray(offset)) {
    //   return offset.map(value => value * factor);
    // }
    if (!Util.isNumber(offset)) {
      return [0, 0];
    }
    const start = this.get('start');
    const end = this.get('end');
    const axisVector = this.getAxisVector();
    const normal = vec2.normalize([], axisVector);
    let direction = false;
    if ((isVertical && start.y < end.y) || (!isVertical && start.x > end.x)) {
      direction = true;
    }
    const verticalVector = vec2.vertical([], normal, direction);
    return vec2.scale([], verticalVector, offset * factor);
  }

  public getAxisVector() {
    const start = this.get('start');
    const end = this.get('end');
    return [end.x - start.x, end.y - start.y];
  }

  public getLinePath() {
    const start = this.get('start');
    const end = this.get('end');
    return [
      ['M', start.x, start.y],
      ['L', end.x, end.y],
    ];
  }

  public getTickEnd(start, value) {
    const offsetVector = this.getSideVector(value);
    return {
      x: start.x + offsetVector[0],
      y: start.y + offsetVector[1],
    };
  }

  public getTickPoint(tickValue) {
    const start = this.get('start');
    const end = this.get('end');
    const rangeX = end.x - start.x;
    const rangeY = end.y - start.y;
    return {
      x: start.x + rangeX * tickValue,
      y: start.y + rangeY * tickValue,
    };
  }

  public renderTitle() {
    const title = this.get('title');
    const label = this.get('label');
    const rotate = Util.get(label, 'rotate');
    const autoRotateTitle = this.get('autoRotateTitle');
    const offsetPoint = this.getTickPoint(0.5);
    let titleOffset = title.offset ? title.offset : 20;
    // if (Util.isNil(titleOffset)) { // 没有指定 offset 则自动计算
    const labelRenderer = this.get('labelRenderer');
    if (labelRenderer) {
      const position = this.get('position');
      const property = position === 'bottom' || position === 'top' ? 'height' : 'width';
      let labelLength = this.getMaxLabelWidthOrHeight(labelRenderer, property);
      if (rotate) {
        labelLength = Math.max(
          labelLength,
          this.getMaxLabelWidthOrHeight(labelRenderer, 'width') * Math.abs(Math.sin((rotate * Math.PI) / 180))
        );
      }
      const labelOffset = Util.get(this.get('label'), 'offset', 5);
      titleOffset += labelLength + labelOffset;
    }
    // }
    const textStyle = title.textStyle;
    const cfg = Util.mix({}, textStyle);
    if (title.text) {
      const vector = this.getAxisVector(); // 坐标轴方向的向量
      if (autoRotateTitle && Util.isNil(title.rotate)) {
        // 自动旋转并且用户没有设置 title.rotate
        let angle = 0;
        if (!Util.isNumberEqual(vector[1], 0)) {
          // 所有水平坐标轴，文本不转置
          const v1 = [1, 0];
          const v2 = [vector[0], vector[1]];
          angle = vec2.angleTo(v2, v1, true);
        }

        cfg.rotate = angle * (180 / Math.PI);
      } else if (!Util.isNil(title.rotate)) {
        // 用户设置了旋转角度就以用户设置的为准
        cfg.rotate = (title.rotate / 180) * Math.PI; // 将角度转换为弧度
      }

      const sideVector = this.getSideVector(titleOffset);
      let point;
      const position = title.position;
      if (position === 'start') {
        point = {
          x: this.get('start').x + sideVector[0],
          y: this.get('start').y + sideVector[1],
        };
      } else if (position === 'end') {
        point = {
          x: this.get('end').x + sideVector[0],
          y: this.get('end').y + sideVector[1],
        };
      } else {
        point = {
          x: offsetPoint.x + sideVector[0],
          y: offsetPoint.y + sideVector[1],
        };
      }

      cfg.x = point.x;
      cfg.y = point.y;
      cfg.text = title.text;

      const group = this.get('group');
      const titleShape = group.addShape('Text', {
        zIndex: 2,
        attrs: cfg,
      });
      titleShape.name = 'axis-title';
      this.get('appendInfo') && titleShape.setSilent('appendInfo', this.get('appendInfo'));
    }
  }

  public autoRotateLabels() {
    const labelRenderer = this.get('labelRenderer');
    const title = this.get('title');
    if (labelRenderer) {
      const labels: Shape[] = labelRenderer.getLabels();
      const offset = this.get('label').offset;
      const append = 12;
      const titleOffset = title && title.offset ? title.offset : 20;
      if (titleOffset < 0) {
        // 如果是负的的话就不旋转
        return;
      }
      const vector = this.getAxisVector(); // 坐标轴的向量，仅处理水平或者垂直的场景
      let angle;
      let maxWidth;
      if (Util.isNumberEqual(vector[0], 0) && title && title.text) {
        // 坐标轴垂直，由于不知道边距，只能防止跟title重合，如果title不存在，则不自动旋转
        maxWidth = this.getMaxLabelWidthOrHeight(labelRenderer, 'width');
        if (maxWidth > titleOffset - offset - append) {
          angle = Math.acos((titleOffset - offset - append) / maxWidth) * -1;
        }
      } else if (Util.isNumberEqual(vector[1], 0) && labels.length > 1) {
        // 坐标轴水平，不考虑边距，根据最长的和平均值进行翻转
        const avgWidth = Math.abs(this._getAvgLabelLength(labelRenderer));
        maxWidth = this.getMaxLabelWidthOrHeight(labelRenderer, 'width');
        if (maxWidth > avgWidth) {
          angle = Math.asin(((titleOffset - offset - append) * 1.25) / maxWidth);
        }
      }

      if (angle) {
        const factor = this.get('factor');
        const offsetY = -3 * Math.abs(Math.sin(angle));
        Util.each(labels, (label) => {
          label.rotateAtStart(angle);
          label.attr('y', label.attr('y') + offsetY);
          if (Util.isNumberEqual(vector[1], 0)) {
            if (factor > 0) {
              label.attr('textAlign', 'right');
            } else {
              label.attr('textAlign', 'left');
            }
          }
        });
      }
    }
  }

  public autoHideLabels() {
    const labelRenderer = this.get('labelRenderer');
    let labelSpace;
    let tickStep;
    const append = 8;
    if (labelRenderer) {
      const ticks = this.get('tickItems');
      const labels = labelRenderer.getLabels();
      const vector = this.getAxisVector(); // 坐标轴的向量，仅处理水平或者垂直的场景
      if (labels.length < 2) {
        return;
      }
      if (Util.isNumberEqual(vector[0], 0)) {
        // 坐标轴垂直
        const maxHeight = this.getMaxLabelWidthOrHeight(labelRenderer, 'height') + append;
        const avgHeight = Math.abs(this._getAvgLabelHeightSpace(labelRenderer));
        if (maxHeight > avgHeight) {
          labelSpace = maxHeight;
          tickStep = avgHeight;
        }
      } else if (Util.isNumberEqual(vector[1], 0) && labels.length > 1) {
        // 坐标轴水平
        const maxWidth = this.getMaxLabelWidthOrHeight(labelRenderer, 'width') + append;
        const avgWidth = Math.abs(this._getAvgLabelLength(labelRenderer));
        if (maxWidth > avgWidth) {
          labelSpace = maxWidth;
          tickStep = avgWidth;
        }
      }

      if (labelSpace && tickStep) {
        const ratio = Math.ceil(labelSpace / tickStep);
        Util.each(labels, (label: Shape, i: number) => {
          if (i % ratio !== 0) {
            label.set('visible', false);
            label.attr('text', '');
          }
        });
        if (ticks) {
          const visibleTicks = Util.filter(ticks, (tick, idx) => labels[idx].get('visible'));
          if (Util.size(visibleTicks) > 0) {
            this.set('tickItems', visibleTicks);
            Util.remove(this.get('group').get('children'), (s: Shape) => s.name === 'axis-ticks');
            this._renderTicks();
          }
        }
      }
    }
  }

  private _getAvgLabelLength(labelRenderer) {
    const labels = labelRenderer.getLabels();
    return labels[1].attr('x') - labels[0].attr('x');
  }

  private _getAvgLabelHeightSpace(labelRenderer) {
    const labels = labelRenderer.getLabels();
    return labels[1].attr('y') - labels[0].attr('y');
  }
}
