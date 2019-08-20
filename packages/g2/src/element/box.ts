import Element from './base';
import SizeController from './controller/size';
import BoxShapeFactory from './shape/box';

export default class Box extends Element {
  constructor(cfg) {
    super({
      type: 'box',
      shapeType: 'box',
      generatePoints: true,
      ...cfg,
    });

    // 初始化 sizeController
    const sizeController = new SizeController(this);
    this.set('sizeController', sizeController);
    this.set('shapeFactory', BoxShapeFactory);
  }

  createShapePointsCfg(obj) {
    const cfg = super.createShapePointsCfg(obj);
    cfg.size = this.getNormalizedSize(obj);
    return cfg;
  }
}
