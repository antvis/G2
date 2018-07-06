/**
 * @fileOverview the data-marker guide
 * @author Ye Liu liuye10@yahoo.com
 */
const Text = require('./text');
const Util = require('../../util');
class DataMarker extends Text {
  getDefaultCfg() {
    const cfg = super.getDefaultCfg();

    return Util.mix({}, cfg, {
      type: 'dataMarker',
      zIndex: 1,
      top: true,
      position: null,
      style: {
        point: {
          r: 4,
          fill: '#FFFFFF',
          stroke: '#1890FF',
          lineWidth: 2
        },
        line: {
          stroke: '#000000',
          lineWidth: 1,
          opacity: 0.25
        },
        text: {
          fill: '#000000',
          opacity: 0.65,
          fontSize: 14,
          fontWeight: 500,
          textAlign: 'center'
        }
      }, // end of style
      display: {
        point: true,
        line: true,
        text: true
      },
      lineLength: 30,
      direction: 'upward'
    });
  }

  render(coord, group) {
    const self = this;
    const position = self.position;
    const point = self.parsePoint(coord, position);
    // container
    const markerGroup = group.addGroup();
    markerGroup.name = 'marker-group';
    markerGroup.translate(point.x, point.y);
    const positions = self._getElementPosition();
    // add line
    if (self.display.line) {
      const lineData = positions.line;
      self._drawLine(lineData, markerGroup);
    }
    // add text
    if (self.display.text && self.content) {
      const textPosition = positions.text;
      self._drawText(textPosition, markerGroup);
    }
    // add circle
    if (self.display.point) {
      const pointPoisition = positions.point;
      self._drawPoint(pointPoisition, markerGroup);
    }
    self.appendInfo && markerGroup.setSilent('marker-group', self.appendInfo);
    self.el = markerGroup;
  }

  set(field, v) {
    this[field] = v;
  }

  _getElementPosition() {
    const self = this;
    const lineLength = self.display.line ? self.lineLength : 5;
    self.style.text.textBaseline = self.direction === 'upward' ? 'bottom' : 'top';
    const dir = self.direction === 'upward' ? -1 : 1;
    const pointPoisition = { x: 0, y: 0 };
    const lineStart = { x: 0, y: 0 };
    const lineEnd = { x: 0, y: lineLength * dir };
    const textPosition = { x: 0, y: lineLength * dir };

    return { point: pointPoisition, line: [ lineStart, lineEnd ], text: textPosition };
  }

  _drawLine(lineData, g) {
    const self = this;
    const lineStyle = self.style.line;
    const linePath = [[ 'M', lineData[0].x, lineData[0].y ],
                        [ 'L', lineData[1].x, lineData[1].y ]];
    g.addShape('path', {
      attrs: Util.mix({
        path: linePath
      }, lineStyle)
    });
  }

  _drawText(position, g) {
    const self = this;
    const textStyle = this.style.text;
    g.addShape('text', {
      attrs: Util.mix({
        text: self.content
      }, textStyle, position)
    });
  }

  _drawPoint(position, g) {
    const self = this;
    const pointStyle = self.style.point;
    g.addShape('circle', {
      attrs: Util.mix({}, pointStyle, position)
    });
  }

}

module.exports = DataMarker;
