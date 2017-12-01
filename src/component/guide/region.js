/**
 * @fileOverview the region guide
 * @author sima.zhang
 */
const Util = require('../../util');
const Base = require('./base');

class Region extends Base {
  getDefaultCfg() {
    const cfg = super.getDefaultCfg();

    return Util.mix({}, cfg, {
      type: 'region',
      zIndex: 1,
      start: null,
      end: null,
      style: {
        lineWidth: 0,
        fill: '#CCD7EB',
        opacity: 0.4
      }
    });
  }

  render(coord, group) {
    const self = this;
    const rectStyle = self.style;
    const path = self._getPath(coord);

    const regionGroup = group.addShape('path', {
      zIndex: self.zIndex,
      attrs: Util.mix({
        path
      }, rectStyle)
    });
    regionGroup.name = 'guide-region';
    self.appendInfo && regionGroup.setSilent('appendInfo', self.appendInfo);
    self.el = regionGroup;
  }

  _getPath(coord) {
    const self = this;
    const start = self.parsePoint(coord, self.start);
    const end = self.parsePoint(coord, self.end);
    const path = [];
    path.push([ 'M', start.x, start.y ]);
    path.push([ 'L', end.x, start.y ]);
    path.push([ 'L', end.x, end.y ]);
    path.push([ 'L', start.x, end.y ]);
    path.push([ 'z' ]);
    return path;
  }
}

module.exports = Region;
