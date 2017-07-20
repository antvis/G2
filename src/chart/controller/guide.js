const Util = require('../../util');
const { Guide } = require('../../component/index');
const Global = require('../../global');

class GuideController {
  constructor(cfg) {
    this.guides = [];
    this.options = [];
    this.xScales = null;
    this.yScales = null;
    this.container = null;
    Util.mix(this, cfg);
  }

  _creatGuides() {
    const self = this;
    const options = this.options;
    const xScales = this.xScales;
    const yScales = this.yScales;
    options.forEach(function(option) {
      let type = option.type;
      const config = Util.defaultsDeep(option, Global.guide[type], {
        xScales,
        yScales
      });
      type = Util.upperFirst(type);
      const guide = new Guide[type](config);
      self.guides.push(guide);
    });

    return self.guides;
  }

  line(cfg = {}) {
    cfg.type = 'line';
    this.options.push(cfg);
    return this;
  }

  text(cfg = {}) {
    cfg.type = 'text';
    this.options.push(cfg);
    return this;
  }

  image(cfg = {}) {
    cfg.type = 'image';
    this.options.push(cfg);
  }

  region(cfg = {}) {
    cfg.type = 'region';
    this.options.push(cfg);
  }

  html(cfg = {}) {
    cfg.type = 'html';
    this.options.push(cfg);
  }

  render(coord, container) {
    const guides = this._creatGuides();
    container = container || this.container;

    Util.each(guides, function(guide) {
      guide.render(coord, container);
    });
  }

  clear() {
    this.options = [];
    this.reset();
  }

  reset() {
    this.guides = [];
    const container = this.container;
    if (container && !container.get('destroyed')) {
      const parent = container.get('parent') ? container.get('parent').get('el').parentNode : container.get('el').parentNode;
      const guideWrappers = parent.getElementsByClassName('g-guide');
      Util.each(guideWrappers, function(item) {
        parent.removeChild(item);
      });
    }
  }
}

module.exports = GuideController;
