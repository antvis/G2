import { Group } from '@antv/g';
import { Coord } from '@antv/coord';
import * as _ from '@antv/util';
import Annotation, { AnnotationCfg } from './base';

export interface TextCfg extends AnnotationCfg {
  content: string;
}

export default class Text extends Annotation<TextCfg> {
  constructor(cfg: TextCfg) {
    super({
      type: 'text',
      position: null,
      content: null,
      style: {
        fill: '#999',
        fontSize: 12,
        fontWeight: 500,
        textAlign: 'center',
      },
      ...cfg,
    });
  }

  render(coord: Coord, group: Group) {
    const point = this.parsePoint(coord, this.get('position'));
    const textStyle = _.clone(this.get('style'));
    const offsetX = this.get('offsetX');
    const offsetY = this.get('offsetY');

    if (offsetX) {
      point.x += offsetX;
    }

    if (offsetY) {
      point.y += offsetY;
    }

    if (textStyle.rotate) {
      textStyle.rotate = (textStyle.rotate * Math.PI) / 180; // 将角度转换为弧度
    }

    const guideText = group.addShape('Text', {
      zIndex: this.get('zIndex'),
      attrs: _.assign(
        {
          text: this.get('content'),
        },
        textStyle,
        point,
      ),
    });
    guideText.name = 'annotation-text';

    if (this.get('appendInfo')) {
      guideText.setSilent('appendInfo', this.get('appendInfo'));
    }
    this.set('el', guideText);
  }
}
