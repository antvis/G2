import { IGroup, Point } from '../../../dependents';
import { ShapeInfo, ShapeMarkerCfg } from '../../../interface';
import { registerShape } from '../base';
import { getSmoothViolinPath, getViolinPath } from '../util/get-path-points';
import { getStyle } from '../util/get-style';

/**
 * 空心小提琴图
 */
registerShape('violin', 'hollow', {
  draw(cfg: ShapeInfo, container: IGroup) {
    const attrs = getStyle(cfg, true, false);
    const path = this.parsePath(getViolinPath(cfg.points));
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
        r: 4,
        fill: null,
        stroke: color,
      },
    };
  },
});

/**
 * 平滑边界的空心小提琴图
 */
registerShape('violin', 'hollow-smooth', {
  draw(cfg: ShapeInfo, container: IGroup) {
    const attrs = getStyle(cfg, true, false);
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
        r: 4,
        fill: null,
        stroke: color,
      },
    };
  },
});
