const Util = require('../../util');
const Labels = require('./labels');

module.exports = {
  renderLabels() {
    const labels = this.get('labels');

    if (Util.isNil(labels)) {
      return;
    }

    if (Util.isNil(labels.items)) {
      labels.items = [];
    }

    const labelsGroup = this.addGroup(Labels, labels);
    this.set('labelsGroup', labelsGroup);
  },

  resetLabels(items) {
    const self = this;
    const labels = self.get('labels');

    if (!labels) {
      return;
    }

    const labelsGroup = self.get('labelsGroup');
    const children = labelsGroup.getLabels();
    const count = children.length;
    items = items || labels.items;
    Util.each(items, function(item, index) {
      if (index < count) {
        const label = children[index];
        labelsGroup.changeLabel(label, item);
      } else {
        self.addLabel(item.text, item);
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
      label.name = offsetPoint.name; // 用于事件的标注
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
