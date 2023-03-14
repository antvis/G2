import { IGroup } from '../../../dependents';
import { Point, ShapeInfo, ShapeMarkerCfg } from '../../../interface';

import { registerShape } from '../base';
import { BACKGROUND_SHAPE } from '../constant';
import { getBackgroundRectStyle, getStyle } from '../util/get-style';
import { getBackgroundRectPath, getRectPath } from './util';

/** 描边柱状图 */
registerShape('interval', 'hollow-rect', {
  draw(cfg: ShapeInfo, container: IGroup) {
    const style = getStyle(cfg, true, false);
    let group = container;
    const backgroundCfg = cfg?.background;
    if (backgroundCfg) {
      group = container.addGroup();
      const backgroundStyle = getBackgroundRectStyle(cfg);
      const backgroundPath = getBackgroundRectPath(cfg, this.parsePoints(cfg.points) as Point[], this.coordinate);
      group.addShape('path', {
        attrs: {
          ...backgroundStyle,
          path: backgroundPath,
        },
        capture: false,
        zIndex: -1,
        name: BACKGROUND_SHAPE,
      });
    }

    const path = this.parsePath(getRectPath(cfg.points as Point[]));
    const shape = group.addShape('path', {
      attrs: {
        ...style,
        path,
      },
      name: 'interval',
    });

    return backgroundCfg ? group : shape;
  },
  getMarker(markerCfg: ShapeMarkerCfg) {
    const { color, isInPolar } = markerCfg;
    if (isInPolar) {
      return {
        symbol: 'circle',
        style: {
          r: 4.5,
          stroke: color,
          fill: null,
        },
      };
    }

    return {
      symbol: 'square',
      style: {
        r: 4,
        stroke: color,
        fill: null,
      },
    };
  },
});
