
import * as Util from '@antv/util';
import Guide from '../base';
import { GuideCfg } from '../interface';
import positionAdjust from './adjust/position';
import spirialAdjust from './adjust/spiral';
import bboxAdjust from './adjust/bbox';

interface Layouts {
  [key: string]: Function|undefined;
}

const LAYOUTS: Layouts = {
  scatter: positionAdjust,
  map: spirialAdjust,
  treemap: bboxAdjust,
};

class Label extends Guide {

  constructor(cfg: GuideCfg = {}) {
    super({
      name: 'label',
      type: 'default', // label 类型
      // html 渲染时用的容器的模板，必须存在 class = "g-labels"
      containerTpl: '<div class="g-labels" style="position:absolute;top:0;left:0;"></div>',
      // html 渲染时单个 label 的模板，必须存在 class = "g-label"
      itemTpl: '<div class="g-label" style="position:absolute;">{text}</div>',
      items: null, // 文本集合
      lineGroup: null, // label牵引线容器
      shapes: null, // 需添加label的shape
      useHtml: false, // 是否使用html渲染label
      ...cfg,
    });
  }

  /**
     * label绘制全过程
     */
  render() {
    this.clear();
    this._init();
    this.emit('beforerender');
    this.draw();
    this.emit('afterrender');
  }

  /**
   * 更新 label
   * 1. 将items与group中的children对比，更新/新增/删除labels
   * 2. labels布局优化
   * 3. 画label连接线
   * 4. 绘制到画布
   */
  draw(canvasDraw = true) {
    this._dryDraw();
    canvasDraw && this.get('canvas').draw();
  }

  /*
   * 清空label容器
   */
  clear() {
    const group = this.get('group');
    const container = this.get('container');
    if (group && !group.destroyed) {
      group.clear();
    }
    if (container) {
      container.innerHTML = '';
    }
  }

  /**
   * 销毁group
   */
  destroy() {
    super.destroy();
    const group = this.get('group');
    const container = this.get('container');
    if (group && !group.destroyed) {
      group.destroy();
    }
    if (container) {
      container.innerHTML = '';
    }
  }

  // label 容器初始化
  private _init() {
    if (!this.get('group')) {
      const group = this.get('canvas').addGroup({
        id: 'label-group',
      });
      this.set('group', group);
    }
  }

  private _dryDraw() {
    const items = this.get('items');
    const children = this.getLabels();
    const count = children.length;
    Util.each(items, (item:any, index:number) => {
      if (index < count) {
        const label = children[index];
        this.changeLabel(label, item);
      } else {
        const labelShape = this._createText(item);
        if (labelShape) {
          labelShape.id = item.id;
          labelShape.set('coord', item.coord);
        }
      }
    });
    for (let i = count - 1; i >= items.length; i -= 1) {
      children[i].remove();
    }
    this._adjustLabels();
    this.drawLines();
  }

  /*
   * 更新label
   * oldLabel shape或label dom
   * newLabel label data
   * index items中的下标
   */
  changeLabel(oldLabel:any, newLabel:any) {
    if (!oldLabel) {
      return;
    }
    if (oldLabel.tagName) {
      const node = this._createDom(newLabel);
      oldLabel.innerHTML = node.innerHTML;
      this._setCustomPosition(newLabel, oldLabel);
    } else {
      oldLabel.id = newLabel.id;
      oldLabel.attr('text', newLabel.text);
      if (oldLabel.attr('x') !== newLabel.x || oldLabel.attr('y') !== newLabel.y) {
        oldLabel.resetMatrix();
        if (newLabel.textStyle.rotate) {
          oldLabel.rotateAtStart(newLabel.textStyle.rotate);
          delete newLabel.textStyle.rotate;
        }
        oldLabel.attr(newLabel);
      }
    }
  }

  /**
   * 显示label
   */
  show() {
    const group = this.get('group');
    const container = this.get('container');
    if (group) {
      group.show();
    }
    if (container) {
      container.style.opacity = 1;
    }
  }

  /**
   * 隐藏label
   */
  hide() {
    const group = this.get('group');
    const container = this.get('container');
    if (group) {
      group.hide();
    }
    if (container) {
      container.style.opacity = 0;
    }
  }

  /**
   * 画label连接线
   */
  drawLines() {
    let lineGroup = this.get('lineGroup');
    if (!lineGroup || lineGroup.destroyed) {
      lineGroup = this.get('group').addGroup();
      this.set('lineGroup', lineGroup);
    } else {
      lineGroup.clear();
    }
    Util.each(this.get('items'), (label:any) => {
      this._lineToLabel(label, lineGroup);
    });
  }

  _lineToLabel(label:any, lineGroup:any) {
    if (!label.labelLine) { // labelLine: null | false，关闭 label 对应的 labelLine
      return;
    }
    const lineStyle = Util.isBoolean(label.labelLine) ? {} : label.labelLine; // 兼容 labelLine: true，此时使用默认的样式
    const capture = typeof label.capture === 'undefined' ? this.get('capture') : label.capture;
    let path = lineStyle.path;
    if (path && Util.isFunction(lineStyle.path)) {
      path = lineStyle.path(label);
    }
    if (!path) {
      const start = label.start;
      path = [
        [ 'M', start.x, start.y ],
        [ 'L', label.x, label.y ],
      ];
    }
    let stroke = label.color;
    if (!stroke) {
      if (label.textStyle && label.textStyle.fill) {
        stroke = label.textStyle.fill;
      } else {
        stroke = '#000';
      }
    }
    const lineShape = lineGroup.addShape('path', {
      capture,
      attrs: Util.mix(
        {
          path,
          stroke,
          fill: null,
        },
        lineStyle,
      ),
    });
    // label 对应线的动画关闭
    lineShape.name = this.get('name');
    // generate labelLine id according to label id
    lineShape.id = label.id && label.id.replace('glabel', 'glabelline');
    lineShape.set('coord', this.get('coord'));
  }

  // 根据type对label布局
  _adjustLabels() {
    const type = this.get('type');
    const labels = this.getLabels();
    const shapes = this.get('shapes');
    const layout = LAYOUTS[type];
    if (!layout) {
      return;
    }
    layout(labels, shapes);
  }

  /**
   * 获取当前所有label实例
   * @return {Array} 当前label实例
   */
  getLabels() {
    const container = this.get('container');
    if (container) {
      return Util.toArray(container.childNodes);
    }
    const children = this.get('group').get('children');
    return Util.filter(children, (child: any) => child.isShape);
  }

  // 分html dom和G shape两种情况生成label实例
  _createText(oldcfg: any) {
    let cfg = oldcfg;
    let container = this.get('container');
    const capture = typeof cfg.capture === 'undefined' ? this.get('capture') : cfg.capture;
    let labelShape;
    if (cfg.useHtml || cfg.htmlTemplate) {
      if (!container) {
        container = this._initHtmlContainer();
      }
      const node = this._createDom(cfg);
      container.appendChild(node);
      this._setCustomPosition(cfg, node);
    } else {
      const name = this.get('name');
      const origin = cfg.origin;
      const group = this.get('group');
      delete cfg.origin; // 临时解决，否则影响动画
      let rotate = cfg.rotate;
      // textStyle中的rotate虽然可以正常画出，但是在做动画的时候可能会导致动画异常。移出，在定义好shape后通过transform实现效果。
      if (cfg.textStyle) {
        if (cfg.textStyle.rotate) {
          rotate = cfg.textStyle.rotate;
          delete cfg.textStyle.rotate;
        }
        cfg = Util.mix(
          {
            x: cfg.x,
            y: cfg.y,
            textAlign: cfg.textAlign,
            text: cfg.text,
          },
          cfg.textStyle,
        );
      }
      labelShape = group.addShape('text', {
        capture,
        attrs: cfg,
      });
      if (rotate) {
        // rotate是用角度定义的，转换为弧度
        if (Math.abs(rotate) > Math.PI * 2) {
          rotate = rotate / 180 * Math.PI;
        }

        labelShape.transform([
          [ 't', -cfg.x, -cfg.y ],
          [ 'r', rotate ],
          [ 't', cfg.x, cfg.y ],
        ]);
      }
      labelShape.setSilent('origin', origin || cfg);
      labelShape.name = name; // 用于事件标注
      this.get('appendInfo') && labelShape.setSilent('appendInfo', this.get('appendInfo'));
      return labelShape;
    }
  }

  _initHtmlContainer() {
    let container = this.get('container');
    if (!container) {
      const containerTpl = this.get('containerTpl');
      const wrapper = this.get('canvas').get('el').parentNode;
      container = Util.createDom(containerTpl);
      wrapper.style.position = 'relative';
      wrapper.appendChild(container);
      this.set('container', container);
    }
    return container;
  }

  _createDom(cfg:any) {
    const itemTpl = this.get('itemTpl');
    const str = Util.substitute(itemTpl, { text: cfg.text });
    return Util.createDom(str);
  }
  // 根据文本对齐方式确定dom位置
  _setCustomPosition(cfg:any, htmlDom:any) {
    const textAlign = cfg.textAlign || 'left';
    let top = cfg.y;
    let left = cfg.x;
    const width = Util.getOuterWidth(htmlDom);
    const height = Util.getOuterHeight(htmlDom);

    top = top - height / 2;
    if (textAlign === 'center') {
      left = left - width / 2;
    } else if (textAlign === 'right') {
      left = left - width;
    }

    htmlDom.style.top = `${parseInt(top, 10)}px`;
    htmlDom.style.left = `${parseInt(left, 10)}px`;
  }
}

export default Label;
