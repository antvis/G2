import { IGroup } from '../../../dependents';
import { ShapeInfo, ShapeMarkerCfg } from '../../../interface';
import { registerShape } from '../base';
import { getSmoothViolinPath } from '../util/get-path-points';
import { getStyle } from '../util/get-style';

/**
 * 平滑边界的小提琴图
 */
registerShape('violin', 'smooth', {
  draw(cfg: ShapeInfo, container: IGroup) {
    const attrs = getStyle(cfg, true, true);
    const path = this.parsePath(getSmoothViolinPath(cfg.points));
    return container.addShape('path', {
      attrs: {
        ...attrs,
        path,
      },
    });
  },
  getMarker(markerCfg: ShapeMarkerCfg) {
    const { color } = markerCfg;
    return {
      symbol: 'circle',
      style: {
        stroke: null,
        r: 4,
        fill: color,
      },
    };
  },
});
