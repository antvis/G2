/**
 * @fileOverview The class that performs label rendering
 * @author sima.zhang
 */
const Util = require('../../util');
const Labels = require('./labels');

module.exports = {
  renderLabels() {
    const labelCfg = this.get('label');

    if (Util.isNil(labelCfg)) {
      return;
    }

    if (Util.isNil(labelCfg.items)) {
      labelCfg.items = [];
    }

    const labelsGroup = this.addGroup(Labels, labelCfg);
    this.set('labelsGroup', labelsGroup);
  },

  resetLabels(items) {
    const self = this;
    const labelCfg = self.get('label');

    if (!labelCfg) {
      return;
    }

    const labelsGroup = self.get('labelsGroup');
    const children = labelsGroup.getLabels();
    const count = children.length;
    items = items || labelCfg.items;
    Util.each(items, function(item, index) {
      if (index < count) {
        const label = children[index];
        labelsGroup.changeLabel(label, item);
      } else {
        const labelShape = self.addLabel(item.text, item);
        if (labelShape) {
          labelShape._id = item._id;
          labelShape.set('coord', item.coord);
        }
      }
    });
    for (let i = count - 1; i >= items.length; i--) {
      children[i].remove();
    }
  },

  addLabel(value, offsetPoint) {
    const self = this;
    const labelsGroup = self.get('labelsGroup');
    const label = {};
    let rst;
    if (labelsGroup) {
      label.text = value;
      label.x = offsetPoint.x;
      label.y = offsetPoint.y;
      label.point = offsetPoint;
      label.textAlign = offsetPoint.textAlign;
      if (offsetPoint.rotate) {
        label.rotate = offsetPoint.rotate;
      }
      rst = labelsGroup.addLabel(label);
    }
    return rst;
  },

  removeLabels() {
    const labelsGroup = this.get('labelsGroup');
    labelsGroup && labelsGroup.remove();
    this.set('labelsGroup', null);
  }
};
