/**
 * @fileOverview mirror facets
 * @author dxq613@gmail.com
 */

const List = require('./list');

class Mirror extends List {
  getDefaultCfg() {
    const cfg = super.getDefaultCfg();
    cfg.type = 'mirror';
    this.transpose = false;
    return cfg;
  }

  init() {
    const self = this;
    if (self.transpose) {
      self.cols = 2;
      self.rows = 1;
    } else {
      self.cols = 1;
      self.rows = 2;
    }
    super.init();
  }

  beforeProcessView(view, facet) {
    if (this.transpose) {
      if (facet.colIndex % 2 === 0) {
        view.coord().transpose().scale(-1, 1);
      } else {
        view.coord().transpose();
      }
    } else {
      if (facet.rowIndex % 2 !== 0) {
        view.coord().scale(1, -1);
      }
    }
  }

  renderTitle(view, facet) {
    if (this.transpose) {
      this.drawColTitle(view, facet);
    } else {
      this.drawRowTitle(view, facet);
    }
  }

  setXAxis(xField, axes, facet) {
    // 当是最后一行或者下面没有 view 时文本不显示
    if (facet.colIndex === 1 || facet.rowIndex === 1) {
      axes[xField].label = null;
      axes[xField].title = null;
    }
  }

  setYAxis(/* yField, axes, facet */) {

  }

}

module.exports = Mirror;
