/**
 * @fileOverview the data-region guide
 * @author Ye Liu liuye10@yahoo.com
 */
const Util = require('../../util');
const DataMarker = require('./data-marker');

function getFirstScale(scales) {
  let firstScale;
  Util.each(scales, scale => {
    if (scale) {
      firstScale = scale;
      return false;
    }
  });
  return firstScale;
}

class DataRegion extends DataMarker {
  getDefaultCfg() {
    const cfg = super.getDefaultCfg();
    return Util.mix({}, cfg, {
      type: 'dataRegion',
      start: null,
      end: null,
      bbox: null,
      regionStyle: {
        lineWidth: 0,
        fill: '#CCD7EB',
        opacity: 0.4
      }
    });
  }

  render(coord, group) {
    const self = this;
    // draw region
    const lineLength = self.lineLength;
    const regionData = self._getRegionData(coord);
    self.bbox = self._dataBbox(regionData);
    self._drawRegion(regionData, group);
    const dir = self.direction === 'upward' ? 1 : -1;
    // draw text
    const textStyle = self.style.text;
    textStyle.textBaseline = dir > 0 ? 'bottom' : 'top';
    const textPosition = { x: self.bbox.xMin + (self.bbox.xMax - self.bbox.xMin) / 2, y: self.bbox.yMin - self.lineLength * dir };
    group.addShape('text', {
      attrs: Util.mix({
        text: self.content
      }, textStyle, textPosition)
    });
    // draw marker
    let startLineLength = Math.abs(regionData[0].y - self.bbox.yMin);
    startLineLength += lineLength;
    super.set('lineLength', startLineLength);
    super.set('content', null);
    super.set('position', self.start);
    super.render(coord, group);
    let endLineLength = 0;
    if (dir > 0) {
      endLineLength = Math.abs(regionData[regionData.length - 1].y - self.bbox.yMin);
      endLineLength += lineLength;
    } else {
      endLineLength = lineLength;
    }
    super.set('lineLength', endLineLength);
    super.set('position', self.end);
    super.render(coord, group);
  }

  _getRegionData(coord) {
    const self = this;
    const arr = [];
    const data = self.view.get('data');
    const xField = getFirstScale(self.xScales).field;
    const yField = getFirstScale(self.yScales).field;
    const startIndex = self._getDataIndex(self.start, data);
    const endIndex = self._getDataIndex(self.end, data);
    for (let i = startIndex; i <= endIndex; i++) {
      const d = data[i];
      const xValue = d[xField];
      const yValue = d[yField];
      const position = self.parsePoint(coord, [ xValue, yValue ]);
      arr.push(position);
    }
    return arr;
  }

  _getDataIndex(d, data) {
    const self = this;
    const xField = getFirstScale(self.xScales).field;
    const xValue = d[0];
    for (let i = 0; i < data.length; i++) {
      const v = data[i][xField];
      if (v === xValue) {
        return i;
      }
    }
  }

  _dataBbox(data) {
    const xs = [];
    const ys = [];
    for (let i = 0; i < data.length; i++) {
      xs.push(data[i].x);
      ys.push(data[i].y);
    }
    const xRange = Util.Array.getRange(xs);
    const yRange = Util.Array.getRange(ys);

    const output = { xMin: xRange.min, xMax: xRange.max, yMin: yRange.min, yMax: yRange.max };

    // adjust by direction
    if (this.direction === 'downward') {
      return { xMin: output.xMax, xMax: output.xMin, yMin: output.yMax, yMax: output.yMin };
    }

    return output;
  }

  _drawRegion(regionData, group) {
    const self = this;
    const dir = self.direction === 'upward' ? 1 : -1;
    const bbox = self.bbox;
    const pathes = [];
    pathes.push([ 'M', regionData[0].x, bbox.yMin - self.lineLength * dir ]);
    for (let i = 0; i < regionData.length; i++) {
      const p = [ 'L', regionData[i].x, regionData[i].y ];
      pathes.push(p);
    }
    pathes.push([ 'L', regionData[regionData.length - 1].x, bbox.yMin - self.lineLength * dir ]);
    // draw
    group.addShape('path', {
      attrs: Util.mix({
        path: pathes
      }, self.regionStyle)
    });
  }

  _adjustLineLength(bbox, position) {
    return Math.abs(bbox.yMin - position.y);
  }


}

module.exports = DataRegion;
