import { IGroup } from '../../../dependents';
import { Point, ShapeInfo, ShapeMarkerCfg, ShapePoint } from '../../../interface';

import { registerShape, registerShapeFactory } from '../base';
import { getStyle } from '../util/get-style';
import { getLinePath } from '../util/path';
import { splitPoints } from '../util/split-points';

const EdgeShapeFactory = registerShapeFactory('edge', {
  defaultShapeType: 'line',
  getDefaultPoints(pointInfo: ShapePoint): Point[] {
    return splitPoints(pointInfo);
  },
});

registerShape('edge', 'line', {
  draw(cfg: ShapeInfo, container: IGroup) {
    const style = getStyle(cfg, true, false, 'lineWidth');
    const path = getLinePath(this.parsePoints(cfg.points), this.coordinate.isPolar);
    return container.addShape('path', {
      attrs: {
        ...style,
        path,
      },
    });
  },
  getMarker(markerCfg: ShapeMarkerCfg) {
    return {
      symbol: 'circle',
      style: {
        r: 4.5,
        fill: markerCfg.color,
      },
    };
  },
});

export default EdgeShapeFactory;
