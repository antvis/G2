const GeomLabels = require('./geom-labels');
const PolarLabels = require('./polar-labels');
const PieLabels = require('./pie-labels');
const IntervalLabels = require('./interval-labels');

const Labels = {
  getLabelsClass(coordType, type) {
    let rst = GeomLabels;
    if (coordType === 'polar') {
      rst = PolarLabels;
    } else if (coordType === 'theta') { // pie chart
      rst = PieLabels;
    } else if (type === 'interval' || type === 'polygon') { // bar
      rst = IntervalLabels;
    }
    return rst;
  }
};

module.exports = Labels;
