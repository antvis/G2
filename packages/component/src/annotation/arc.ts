import { Group } from '@antv/g';
import { Coord } from '@antv/coord';
import * as _ from '@antv/util';
import Annotation, { AnnotationCfg, Point } from './base';

// 只适用于极坐标系
export default class Arc extends Annotation {
  constructor(cfg: AnnotationCfg) {
    super({
      type: 'arc',
      start: null,
      end: null,
      style: {
        stroke: '#999',
        lineWidth: 1,
      },
      ...cfg,
    });
  }

  render(coord: Coord, group: Group) {
    const originStart = this.get('start');
    const originEnd = this.get('end');
    const start = this.parsePoint(coord, this.get('start'));
    const end = this.parsePoint(coord, this.get('end'));
    const coordCenter = coord.getCenter() as Point;
    const radius = Math.sqrt(
      (start.x - coordCenter.x) * (start.x - coordCenter.x) +
        (start.y - coordCenter.y) * (start.y - coordCenter.y),
    );
    let path = [
      [ 'M', start.x, start.y ],
    ];

    // 圆形
    if (_.isNumberEqual(start.x, end.x) && _.isNumberEqual(start.y, end.y)) {
      if (_.isEqual(originStart, originEnd)) {
        // 只有一个点，不进行绘制
        console.warn('start point is the same as end point!');
      } else {
        path = [
          [ 'M', start.x, start.y ],
          [
            'A',
            radius,
            radius,
            0,
            1,
            1,
            2 * coordCenter.x - start.x,
            2 * coordCenter.y - start.y,
          ],
          [ 'A', radius, radius, 0, 1, 1, start.x, start.y ],
        ];
      }
    } else {
      // 只适用于start和end，yScale值相同，需要判断scale结果

      // 求向量 center -> start 和 center -> end 的顺时针角度
      // 即等于求 start -> center 和 end -> center 的逆时针角度
      const dAngle = _.vec2.angleTo(
        [ coordCenter.x - start.x, coordCenter.y - start.y ],
        [ coordCenter.x - end.x, coordCenter.y - end.y ],
        0,
      );
      const largeArc = dAngle > Math.PI ? 1 : 0;
      path = [
        [ 'M', start.x, start.y ],
        [ 'A', radius, radius, 0, largeArc, 1, end.x, end.y ],
      ];
    }

    const arcShape = group.addShape('path', {
      zIndex: this.get('zIndex'),
      attrs: _.assign({ path }, this.get('style')),
    });
    arcShape.name = 'annotation-arc'; // 用于事件以及动画识别

    if (this.get('appendInfo')) {
      arcShape.setSilent('appendInfo', this.get('appendInfo'));
    }

    this.set('el', arcShape);
  }
}
