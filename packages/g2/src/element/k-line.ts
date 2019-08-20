import Element from './base';
import SizeController from './controller/size';
import KLineShapeFactory from './shape/k-line';

export default class KLine extends Element {
  constructor(cfg) {
    super({
      type: 'kline',
      shapeType: 'kline',
      generatePoints: true,
      ...cfg,
    });

    const sizeController = new SizeController(this);
    this.set('sizeController', sizeController);
    this.set('shapeFactory', KLineShapeFactory);
  }

  createShapePointsCfg(obj) {
    const cfg = super.createShapePointsCfg(obj);
    cfg.size = this.getNormalizedSize(obj);
    return cfg;
  }
}
