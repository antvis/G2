/**
 * Text shape factory
 */
import { Group } from '@antv/g';
import * as _ from '@antv/util';
import { registerShape, registerShapeFactory, ShapeFactoryCFG } from './base';
import { splitPoints, setFillStyle } from '../util/shape';
import { ShapeDrawCFG, ShapePointInfo, ShapeMarkerCfg } from '../../interface';

function getFillAttrs(cfg) {
  const textAttrs = cfg.style;
  setFillStyle(textAttrs, cfg);
  if (_.isNumber(cfg.size)) { // 如果设置了size，则text的字体大小由size决定
    textAttrs.fontSize = cfg.size;
  }
  return textAttrs;
}

const TextShapeFactory: ShapeFactoryCFG = registerShapeFactory('text', {
  defaultShapeType: 'text',
  getDefaultPoints(pointInfo: ShapePointInfo) {
    return splitPoints(pointInfo);
  },
});

registerShape('text', 'text', {
  draw(cfg: ShapeDrawCFG, container: Group) {
    const attrs = getFillAttrs(cfg);
    const shape = container.addShape('text', {
      attrs: {
        ...attrs,
        x: cfg.x,
        y: cfg.y,
        text: cfg.text,
      },
    });
    return shape;
  },
  getMarkerStyle(markerCfg: ShapeMarkerCfg) {
    const markerStyle = {
      symbol: 'circle',
      radius: 4.5,
    };
    setFillStyle(markerStyle, markerCfg);
    return markerStyle;
  },
});

export default TextShapeFactory;
