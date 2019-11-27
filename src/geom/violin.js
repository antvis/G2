/**
 * @fileOverview Venn Diagram
 * @author leungwensen@gmail.com
 */
import GeomBase from './base';

import Util from '../util';
import SizeMixin from './mixin/size';
import './shape/violin';

class Violin extends GeomBase {
  /**
   * get default configuration
   * @protected
   * @return {Object} configuration
   */
  getDefaultCfg() {
    const cfg = super.getDefaultCfg();
    cfg.type = 'violin';
    cfg.shapeType = 'violin';
    cfg.generatePoints = true;
    // super.draw(data, container, shapeFactory, index);
    return cfg;
  }

  constructor(cfg) {
    super(cfg);
    Util.assign(this, SizeMixin);
  }

  createShapePointsCfg(obj) {
    const self = this;
    const cfg = super.createShapePointsCfg(obj);
    cfg.size = self.getNormalizedSize(obj);
    const sizeField = self.get('_sizeField');
    cfg._size = obj._origin[sizeField];
    return cfg;
  }

  clearInner() {
    super.clearInner();
    this.set('defaultSize', null);
  }

  _initAttrs() {
    const self = this;
    const attrOptions = self.get('attrOptions');
    const sizeField = attrOptions.size ? attrOptions.size.field : (self.get('_sizeField') ? self.get('_sizeField') : 'size');
    self.set('_sizeField', sizeField);
    delete attrOptions.size;
    super._initAttrs();
  }
}

class ViolinDodge extends Violin {
  getDefaultCfg() {
    const cfg = super.getDefaultCfg();
    cfg.hasDefaultAdjust = true;
    cfg.adjusts = [{ type: 'dodge' }];
    return cfg;
  }
}

Violin.Dodge = ViolinDodge;

GeomBase.Violin = Violin;
GeomBase.ViolinDodge = ViolinDodge;

export default Violin;
