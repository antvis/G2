import { Group } from '@antv/g';
import { Coord } from '@antv/coord';
import * as _ from '@antv/util';
import Annotation, { AnnotationCfg, Point, SvgAttrs } from './base';
import { FONT_FAMILY } from '../const';

export interface LineCfg extends AnnotationCfg {
  line: {
    style: SvgAttrs;
  };
  text: Partial<{
    display: boolean;
    position: string; // 文本的显示位置： start / center / end / 百分比
    autoRotate: boolean; // 文本是否沿着辅助线的方向自动旋转
    style: SvgAttrs;
    content: string; // 辅助文本的文字
    offsetX: number;
    offsetY: number;
  }>;
}

export default class Line extends Annotation<LineCfg> {
  constructor(cfg: LineCfg) {
    /* istanbul ignore next */
    super(
      _.deepMix(
        {
          type: 'line',
          xScales: null,
          yScales: null,
          line: {
            style: {
              stroke: '#000',
            },
          },
          text: {
            display: true,
            position: 'end',
            autoRotate: true,
            style: {
              fill: '#999',
              fontSize: 12,
              fontWeight: 500,
              fontFamily: FONT_FAMILY,
            },
          },
        },
        cfg,
      ),
    );
  }

  render(coord: Coord, group: Group) {
    const start = this.parsePoint(coord, this.get('start'));
    const end = this.parsePoint(coord, this.get('end'));
    const guideLineGroup = group.addGroup();

    this.drawLines(start, end, guideLineGroup);

    const text = this.get('text');
    if (text.display && text.content) {
      this.drawText(start, end, guideLineGroup);
    }

    guideLineGroup.get('children').forEach((child) => {
      child.name = 'annotation-line';
      this.get('appendInfo') && child.setSilent('appendInfo', this.get('appendInfo'));
    });
    this.set('el', guideLineGroup);
  }

  private drawLines(start: Point, end: Point, group: Group) {
    const path = [ [ 'M', start.x, start.y ], [ 'L', end.x, end.y ] ];

    group.addShape('Path', {
      attrs: _.assign({ path }, this.get('line').style),
    });
  }

  private drawText(start: Point, end: Point, group: Group) {
    const textCfg = this.get('text');
    const position = textCfg.position;
    const textStyle = textCfg.style || {};

    let percent = 1;
    if (position === 'start') {
      percent = 0;
    } else if (position === 'center') {
      percent = 0.5;
    } else if (!_.isNil(position) && _.includes(position as any, '%')) {
      percent = parseInt(position, 10) / 100;
    } else if (_.isNumber(position) && (position >= 0 && position < 1)) {
      percent = position;
    }

    const cfg: any = {
      x: start.x + (end.x - start.x) * percent,
      y: start.y + (end.y - start.y) * percent,
      text: textCfg.content,
    };

    if (textCfg.offsetX) {
      // 设置了偏移量
      cfg.x += textCfg.offsetX;
    }
    if (textCfg.offsetY) {
      // 设置了偏移量
      cfg.y += textCfg.offsetY;
    }
    _.assign(cfg, textStyle);

    if (textCfg.autoRotate && _.isNil(textStyle.rotate)) {
      // 自动旋转且用户没有设置旋转角度
      const angle = _.vec2.angleTo([ end.x - start.x, end.y - start.y ], [ 1, 0 ], 1);
      cfg.rotate = angle;
    } else if (!_.isNil(textStyle.rotate)) {
      // 用户设置了旋转角度
      cfg.rotate = (<number>textStyle.rotate * Math.PI) / 180;
    }

    group.addShape('Text', {
      attrs: cfg,
    });
  }
}
