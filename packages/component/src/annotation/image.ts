import { Coordinate } from '@antv/coord';
import { Group } from '@antv/g';
import * as _ from '@antv/util';
import Annotation, { AnnotationCfg } from './base';

export interface ImageCfg extends AnnotationCfg {
  src: string;
  width: number;
  height: number;
}

export default class Image extends Annotation<ImageCfg> {
  constructor(cfg: ImageCfg) {
    /* istanbul ignore next */
    super({
      type: 'image',
      start: null,
      end: null,
      src: '',
      ...cfg,
    });
  }

  public render(coord: Coordinate, group: Group) {
    const start = this.parsePoint(coord, this.get('start'));

    const cfg: any = {
      x: start.x,
      y: start.y,
      img: this.get('src'),
    };

    if (!this.get('end')) {
      cfg.width = this.get('width') || 32;
      cfg.height = this.get('height') || 32;
    } else {
      const end = this.parsePoint(coord, this.get('end'));
      cfg.width = end.x - start.x;
      cfg.height = end.y - start.y;
    }

    if (this.get('offsetX')) {
      cfg.x += this.get('offsetX');
    }

    if (this.get('offsetY')) {
      cfg.y += this.get('offsetY');
    }

    const imgGuide = group.addShape('Image', {
      zIndex: 1,
      attrs: cfg,
    });
    imgGuide.name = 'annotation-image';
    this.get('appendInfo') &&
      imgGuide.setSilent('appendInfo', this.get('appendInfo'));
    this.set('el', imgGuide);
  }
}
