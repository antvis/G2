/**
 * @description 关系图的边
 */

import Element from './base';
import { DataPointType } from '../interface';
import EdgeShapeFactory from './shape/edge';

export default class Edge extends Element {
  constructor(cfg: DataPointType) {
    super({
      type: 'edge',
      generatePoints: true,
      shapeType: 'edge',
      shareTooltip: false,
      ...cfg,
    });
    this.set('shapeFactory', EdgeShapeFactory);
  }
}
