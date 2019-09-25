const Util = require('../../util');
const Guide = require('../../component/guide');

class GuideController {
  constructor(cfg) {
    this.guides = [];
    this.options = [];
    this.xScales = null;
    this.yScales = null;
    this.view = null;
    this.viewTheme = null;
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
    const viewTheme = this.viewTheme;
    // @2019-01-18 by blue.lb 这里如果给 backContainer 添加 group 的话，会直接导致 BBoxOfBackPlot 函数中计算 element.getBBox() 出错
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
    options.forEach(option => {
      let type = option.type;
      const config = Util.deepMix({
        xScales,
        yScales,
        viewTheme
      }, viewTheme ? viewTheme.guide[type] : {}, option);
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

  dataMarker(cfg = {}) {
    this.options.push(Util.mix({
      type: 'dataMarker'
    }, cfg));
    return this;
  }

  dataRegion(cfg = {}) {
    this.options.push(Util.mix({
      type: 'dataRegion'
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
    const view = self.view;
    const viewData = view && view.get('data');
    const guides = self._creatGuides();

    Util.each(guides, guide => {
      let container;
      if (guide.get('top')) { // 默认 guide 绘制到 backPlot，用户也可以声明 top: true，显示在最上层
        // @2019-01-18 by blue.lb 直接用传入的就行
        container = self.frontGroup || self.frontContainer;
        // container = self.frontContainer;
      } else {
        // @2019-01-18 by blue.lb 直接用传入的就行
        container = self.backGroup || self.backContainer;
        // container = self.backContainer;
      }
      guide.render(coord, container, viewData, view);
    });
  }

  clear() {
    this.options = [];
    this.reset();
  }

  changeVisible(visible) {
    const guides = this.guides;
    Util.each(guides, guide => {
      guide.changeVisible(visible);
    });
  }

  reset() {
    const guides = this.guides;
    Util.each(guides, guide => {
      guide.clear();
    });
    this.guides = [];
    // @2019-01-18 by blue.lb 删除这部分
    this.backGroup && this.backGroup.remove();
    this.frontGroup && this.frontGroup.remove();
  }
}

module.exports = GuideController;
