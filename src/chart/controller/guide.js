/**
 * @fileOverview The controller of guide
 * @author sima.zhang
 */
const Util = require('../../util');
const Guide = require('../../component/guide');
const Global = require('../../global');

class GuideController {
  constructor(cfg) {
    this.guides = [];
    this.options = [];
    this.xScales = null;
    this.yScales = null;
    this.view = null;
    this.frontGroup = null;
    this.backGroup = null;
    Util.mix(this, cfg);
  }

  _creatGuides() {
    const self = this;
    const options = this.options;
    const xScales = this.xScales;
    const yScales = this.yScales;
    const view = this.view;
    if (this.backContainer && view) {
      this.backGroup = this.backContainer.addGroup({
        viewId: view.get('_id')
      });
    }
    if (this.frontContainer && view) {
      this.frontGroup = this.frontContainer.addGroup({
        viewId: view.get('_id')
      });
    }
    options.forEach(function(option) {
      let type = option.type;
      const config = Util.deepMix({
        xScales,
        yScales,
        view
      }, Global.guide[type], option);
      type = Util.upperFirst(type);
      const guide = new Guide[type](config);
      self.guides.push(guide);
    });

    return self.guides;
  }

  line(cfg = {}) {
    this.options.push(Util.mix({
      type: 'line'
    }, cfg));
    return this;
  }

  arc(cfg = {}) {
    this.options.push(Util.mix({
      type: 'arc'
    }, cfg));
    return this;
  }

  text(cfg = {}) {
    this.options.push(Util.mix({
      type: 'text'
    }, cfg));
    return this;
  }

  image(cfg = {}) {
    this.options.push(Util.mix({
      type: 'image'
    }, cfg));
    return this;
  }

  region(cfg = {}) {
    this.options.push(Util.mix({
      type: 'region'
    }, cfg));
    return this;
  }

  regionFilter(cfg = {}) {
    this.options.push(Util.mix({
      type: 'regionFilter'
    }, cfg));
    return this;
  }

  html(cfg = {}) {
    this.options.push(Util.mix({
      type: 'html'
    }, cfg));
    return this;
  }


  render(coord) {
    const self = this;
    const guides = self._creatGuides();
    let container = self.backGroup || this.backContainer;

    Util.each(guides, guide => {
      if (guide.top) { // 默认 guide 绘制到 backPlot，用户也可以声明 top: true，显示在最上层
        container = self.frontGroup || this.frontContainer;
      }
      guide.render(coord, container);
    });
  }

  clear() {
    this.options = [];
    this.reset();
  }

  changeVisible(visible) {
    const guides = this.guides;
    Util.each(guides, function(guide) {
      guide.setVisible(visible);
    });
  }

  reset() {
    const guides = this.guides;
    Util.each(guides, function(guide) {
      guide.remove();
    });
    this.guides = [];
    this.backGroup && this.backGroup.remove();
    this.frontGroup && this.frontGroup.remove();
  }
}

module.exports = GuideController;
