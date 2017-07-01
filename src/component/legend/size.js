const Util = require('../../util');
const Continuous = require('./continuous');

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
        textBaseline: 'middle'
      }
    });
  }

  _renderSliderShape() {
    const rangeElement = this.get('rangeElement');
    const backgroundElement = rangeElement.get('backgroundElement');
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

    group.addShape('circle', {
      attrs: Util.mix({
        x,
        y,
        r: r === 0 ? 1 : r
      }, circleStyle)
    });
    group.addShape('text', {
      attrs: Util.mix({
        x: maxWidth + 5,
        y,
        text: text === 0 ? '0' : text
      }, textStyle)
    });
  }

  _renderBackground() {
    const self = this;
    const width = this.get('width');
    const height = this.get('height');
    const min = this.get('firstItem').name * 1;
    const max = this.get('lastItem').name * 1;
    let GAP = 10; // 默认的圆之间的距离
    let ratio = (3 * max + 3 * min + 2 * GAP) / height; // 实际高度和限制高度比

    let maxRadius;
    let medianRadius;
    let minRadius;
    GAP = ratio > 1 ? GAP / ratio : GAP * ratio;
    if (ratio > 1) {
      maxRadius = max / ratio;
      medianRadius = (max + min) / (2 * ratio);
      minRadius = min / ratio;
    } else {
      maxRadius = max * ratio;
      medianRadius = ((max + min) / 2) * ratio;
      minRadius = min * ratio;
    }

    if (2 * maxRadius > width) {
      ratio = width / (2 * maxRadius);
      maxRadius *= ratio;
      medianRadius *= ratio;
      minRadius *= ratio;
      GAP *= ratio;
    }

    self._addCircle(maxRadius, maxRadius, maxRadius, max, 2 * maxRadius);
    self._addCircle(maxRadius, maxRadius * 2 + GAP + medianRadius, medianRadius, (min + max) / 2, 2 * maxRadius);
    self._addCircle(maxRadius, (maxRadius + GAP + medianRadius) * 2 + minRadius, minRadius, min, 2 * maxRadius);
  }
}

module.exports = Size;
