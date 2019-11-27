import GeomLabels from './geom-labels';
import PolarLabels from './polar-labels';
import PieLabels from './pie-labels';
import IntervalLabels from './interval-labels';

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

export default Labels;
