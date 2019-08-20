import * as Util from '@antv/util';
import { vec2 } from '@antv/matrix-util';
import { Shape } from '@antv/g';
import Axis from './base';
import { CircleAxisCfg } from '../interface';

export default class Circle extends Axis {
  constructor(cfg = {} as CircleAxisCfg) {
    super({
      type: 'circle', // 坐标轴的类型
      startAngle: -Math.PI / 2, // 坐标轴开始弧度
      endAngle: Math.PI * 3 / 2, // 坐标轴结束弧度
      ...cfg,
    });
  }

  parseTick(tick, index, length) {
    return {
      text: tick,
      value: index / length,
    };
  }

  getTickPoint(value) {
    const startAngle = this.get('startAngle');
    const endAngle = this.get('endAngle');
    const angle = startAngle + (endAngle - startAngle) * value;
    return this._getCirclePoint(angle);
  }

  getSideVector(offset, point) {
    const center = this.get('center');
    const vector = [ point.x - center.x, point.y - center.y ];
    if (!Util.isNil(offset)) {
      const vecLen = vec2.length(vector);
      vec2.scale(vector, vector, offset / vecLen);
    }
    return vector;
  }

  getSidePoint(point, offset) {
    const vector = this.getSideVector(offset, point);
    return {
      x: point.x + vector[0],
      y: point.y + vector[1],
    };
  }

  getTickEnd(start, length) {
    const tickLine = this.get('tickLine');
    const len = !Util.isNil(length) ? length : tickLine.length;
    return this.getSidePoint(start, len);
  }

  getTextAnchor(vector) {
    let align;
    if (Util.isNumberEqual(vector[0], 0)) {
      align = 'center';
    } else if (vector[0] > 0) {
      align = 'left';
    } else if (vector[0] < 0) {
      align = 'right';
    }
    return align;
  }

  getLinePath() {
    const center = this.get('center');
    const { x, y } = center;
    const rx = this.get('radius');
    const ry = rx;
    const startAngle = this.get('startAngle');
    const endAngle = this.get('endAngle');
    const inner = this.get('inner');

    let path = [];
    if (Math.abs(endAngle - startAngle) === Math.PI * 2) {
      path = [
        [ 'M', x, y ],
        [ 'm', 0, -ry ],
        [ 'a', rx, ry, 0, 1, 1, 0, 2 * ry ],
        [ 'a', rx, ry, 0, 1, 1, 0, -2 * ry ],
        [ 'z' ],
      ];
    } else {
      const startPoint = this._getCirclePoint(startAngle);
      const endPoint = this._getCirclePoint(endAngle);
      const large = Math.abs(endAngle - startAngle) > Math.PI ? 1 : 0;
      const sweep = startAngle > endAngle ? 0 : 1;
      if (!inner) {
        path = [
          [ 'M', x, y ],
          [ 'L', startPoint.x, startPoint.y ],
          [ 'A', rx, ry, 0, large, sweep, endPoint.x, endPoint.y ],
          [ 'L', x, y ],
        ];
      } else {
        const innerStartVector = this.getSideVector(inner * rx, startPoint);
        const innerEndVector = this.getSideVector(inner * rx, endPoint);
        const innerStartPoint = {
          x: innerStartVector[0] + x,
          y: innerStartVector[1] + y,
        };
        const innerEndPoint = {
          x: innerEndVector[0] + x,
          y: innerEndVector[1] + y,
        };

        path = [
          [ 'M', innerStartPoint.x, innerStartPoint.y ],
          [ 'L', startPoint.x, startPoint.y ],
          [ 'A', rx, ry, 0, large, sweep, endPoint.x, endPoint.y ],
          [ 'L', innerEndPoint.x, innerEndPoint.y ],
          [ 'A', rx * inner, ry * inner, 0, large, Math.abs(sweep - 1), innerStartPoint.x, innerStartPoint.y ],
        ];
      }
    }
    return path;
  }

  addLabel(tick, point, index, tickCount) {
    const offset = Util.get(this.get('label'), 'offset', 5);
    const p = this.getSidePoint(point, offset);
    super.addLabel(tick, p, index, tickCount);
  }

  autoRotateLabels() {
    const ticks = this.get('ticks');
    const labelRenderer = this.get('labelRenderer');
    if (labelRenderer && ticks.length > 12) { // 小于12个文本时文本不旋转
      const radius = this.get('radius');
      const startAngle = this.get('startAngle');
      const endAngle = this.get('endAngle');
      const totalAngle = (endAngle - startAngle);
      const avgAngle = totalAngle / (ticks.length - 1);
      const avgWidth = Math.sin(avgAngle / 2) * radius * 2;
      const maxLength = this.getMaxLabelWidthOrHeight(labelRenderer, 'width');
      Util.each(labelRenderer.getLabels(), (label: Shape, index: number) => {
        const tick = ticks[index];
        let angle = tick.value * totalAngle + startAngle;
        const mode = angle % (Math.PI * 2);
        if (maxLength < avgWidth) { // 文本的最大宽度大于
          if (mode <= 0) {
            angle = angle + Math.PI;
          }
          if (mode > Math.PI) {
            angle = angle - Math.PI;
          }
          angle = angle - Math.PI / 2;
          label.attr('textAlign', 'center');
        } else {
          if (mode > Math.PI / 2) {
            angle = angle - Math.PI;
          } else if (mode < Math.PI / 2 * -1) {
            angle = angle + Math.PI;
          }
        }
        label.rotateAtStart(angle);
      });
    }
  }

  private _getCirclePoint(angle, radius = 0) {
    const center = this.get('center');
    const r = radius || this.get('radius');
    return {
      x: center.x + Math.cos(angle) * r,
      y: center.y + Math.sin(angle) * r,
    };
  }
}
