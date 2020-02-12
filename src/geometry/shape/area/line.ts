import { IGroup } from '../../../dependents';
import { ShapeInfo, ShapeMarkerCfg } from '../../../interface';
import { registerShape } from '../base';
import { getShapeAttrs } from './util';

/**
 * 描边但不填充的区域图
 */
registerShape('area', 'line', {
  draw(cfg: ShapeInfo, container: IGroup) {
    const attrs = getShapeAttrs(cfg, true, false, this);
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
        stroke: color,
        fill: null,
      },
    };
  },
});
