/**
 * @fileOverview The class of the size legend
 * @author sima.zhang
 */
const Util = require('../../util');
const Global = require('../../global');
const Continuous = require('./continuous');
const CIRCLE_GAP = 8;

class Size extends Continuous {
  getDefaultCfg() {
    const cfg = super.getDefaultCfg();
    return Util.mix({}, cfg, {
      /**
       * 类型
       * @type {String}
       */
      type: 'size-legend',
      width: 100,
      height: 200,
      _circleStyle: {
        stroke: '#4E7CCC',
        fill: '#fff',
        fillOpacity: 0
      },
      textStyle: {
        fill: '#333',
        textAlign: 'start',
        textBaseline: 'middle',
        fontFamily: Global.fontFamily
      }
    });
  }

  _renderSliderShape() {
    const slider = this.get('slider');
    const backgroundElement = slider.get('backgroundElement');
    const width = this.get('width');
    const height = this.get('height');
    const inRange = this.get('inRange');
    const layout = this.get('layout');
    const points = (layout === 'vertical') ? [
      [ 0, 0 ],
      [ width, 0 ],
      [ width, height ]
    ] : [
      [ 0, height ],
      [ width, 0 ],
      [ width, height ]
    ];

    return this._addBackground(backgroundElement, 'Polygon', Util.mix({
      points
    }, inRange));
  }

  _addCircle(x, y, r, text, maxWidth) {
    const group = this.addGroup();
    const circleStyle = this.get('_circleStyle');
    const textStyle = this.get('textStyle');
    const titleShape = this.get('titleShape');
    let titleGap = this.get('titleGap');
    if (titleShape) {
      titleGap += titleShape.getBBox().height;
    }

    group.addShape('circle', {
      attrs: Util.mix({
        x,
        y: y + titleGap,
        r: r === 0 ? 1 : r
      }, circleStyle)
    });
    group.addShape('text', {
      attrs: Util.mix({
        x: maxWidth + 5,
        y: y + titleGap,
        text: text === 0 ? '0' : text
      }, textStyle)
    });
  }

  _renderBackground() {
    const self = this;
    const minRadius = this.get('firstItem').attrValue * 1;
    const maxRadius = this.get('lastItem').attrValue * 1;
    const medianRadius = (minRadius + maxRadius) / 2;
    self._addCircle(maxRadius, maxRadius, maxRadius, medianRadius, 2 * maxRadius);
    self._addCircle(maxRadius, maxRadius * 2 + CIRCLE_GAP + medianRadius, medianRadius, (minRadius + medianRadius) / 2, 2 * maxRadius);
    self._addCircle(maxRadius, (maxRadius + CIRCLE_GAP + medianRadius) * 2 + minRadius, minRadius, minRadius, 2 * maxRadius);
  }
}

module.exports = Size;
