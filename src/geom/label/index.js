const GeomLabels = require('./geom-labels');
const PolarLabels = require('./polar-labels');
const PieLabels = require('./pie-labels');

const Labels = {
  getLabelsClass(coordType) {
    let rst = GeomLabels;
    if (coordType === 'polar') {
      rst = PolarLabels;
    } else if (coordType === 'theta') { // pie chart
      rst = PieLabels;
    }
    return rst;
  }
};

module.exports = Labels;
