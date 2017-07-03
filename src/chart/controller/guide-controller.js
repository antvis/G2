const Util = require('../../util');
const { Guide } = require('../../component/index');

// TODO: 移入 theme 主题中
const Global = {
  guide: {
    line: {
      lineStyle: {
        stroke: '#4E7CCC',
        lineDash: [ 0, 2, 2 ],
        lineWidth: 1
      },
      text: {
        position: 'end',
        autoRotate: true,
        style: {
          fill: '#999',
          fontSize: 12,
          fontWeight: 500,
          textAlign: 'center'
        }
      }
    },
    text: {
      style: {
        fill: '#666',
        fontSize: 12,
        fontWeight: 'bold'
      }
    },
    region: {
      style: {
        lineWidth: 0, // 辅助框的边框宽度
        fill: '#4E7CCC', // 辅助框填充的颜色
        fillOpacity: 0.1 // 辅助框的背景透明度
      } // 辅助框的图形样式属性
    },
    html: {
      alignX: 'middle',
      alignY: 'middle'
    }
  }
};

class GuideController {
  constructor(cfg) {
    this.guides = [];
    this.options = [];
    this.xScales = null;
    this.yScales = null;
    this.container = null;
    Util.mix(this, cfg);
  }

  creatGuide() {
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

  paint(coord, container) {
    const guides = this.guides;
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
