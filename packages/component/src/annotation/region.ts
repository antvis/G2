import { Coordinate } from '@antv/coord';
import { Group } from '@antv/g';
import * as _ from '@antv/util';
import Annotation, { AnnotationCfg } from './base';

export default class Region extends Annotation {
  constructor(cfg: AnnotationCfg) {
    /* istanbul ignore next */
    super({
      type: 'region',
      zIndex: 1,
      start: null,
      end: null,
      style: {
        lineWidth: 0,
        fill: '#CCD7EB',
        opacity: 0.4,
      },
      ...cfg,
    });
  }

  public render(coord: Coordinate, group: Group) {
    const rectStyle = this.get('style');
    const path = this.getPath(coord);

    const regionGroup = group.addShape('path', {
      zIndex: this.get('zIndex'),
      attrs: _.assign(
        {
          path,
        },
        rectStyle,
      ),
    });
    regionGroup.name = 'annotation-region';
    this.get('appendInfo') &&
      regionGroup.setSilent('appendInfo', this.get('appendInfo'));
    this.set('el', regionGroup);
  }

  private getPath(coord: Coordinate) {
    const start = this.parsePoint(coord, this.get('start'));
    const end = this.parsePoint(coord, this.get('end'));

    return [
      [ 'M', start.x, start.y ],
      [ 'L', end.x, start.y ],
      [ 'L', end.x, end.y ],
      [ 'L', start.x, end.y ],
      [ 'z' ],
    ];
  }
}
