import { IGroup } from '../../../dependents';
import { ShapeInfo, ShapeMarkerCfg } from '../../../interface';

import { registerShape } from '../base';
import { getConstraint, getShapeAttrs } from './util';

/**
 * 填充的平滑曲面图
 */
registerShape('area', 'smooth', {
  draw(cfg: ShapeInfo, container: IGroup) {
    const coordinate = this.coordinate;
    const attrs = getShapeAttrs(cfg, false, true, this, getConstraint(coordinate));
    const shape = container.addShape({
      type: 'path',
      attrs,
      name: 'area',
    });

    return shape;
  },
  getMarker(markerCfg: ShapeMarkerCfg) {
    const { color } = markerCfg;
    return {
      symbol: (x: number, y: number, r: number = 5.5) => {
        return [['M', x - r, y - 4], ['L', x + r, y - 4], ['L', x + r, y + 4], ['L', x - r, y + 4], ['Z']];
      },
      style: {
        r: 5,
        fill: color,
        fillOpacity: 1,
      },
    };
  },
});
