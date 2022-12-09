import { G2Spec } from '../../../src';
import { profit } from '../data/profit';

export function profitCustomIntervalLegendFilter(): G2Spec {
  return {
    paddingLeft: 60,
    type: 'interval',
    data: profit,
    axis: { y: { labelFormatter: '~s' } },
    legend: false,
    encode: {
      x: 'month',
      y: ['end', 'start'],
      color: (d) =>
        d.month === 'Total' ? 'Total' : d.profit > 0 ? 'Increase' : 'Decrease',
    },
    interactions: [
      {
        type: 'legendFilter',
        channel: 'color',
        legends: () => document.getElementsByClassName('legend'),
        label: (item) => item.getElementsByClassName('label')[0],
        marker: (item) => item.getElementsByClassName('marker')[0],
        datum: (item) => item.getElementsByClassName('label')[0].textContent,
        setAttribute: (element, key, v) => (element.style[key] = v),
        labelUnselectedColor: '#aaa',
        markerUnselectedColor: '#aaa',
      },
    ],
  };
}

profitCustomIntervalLegendFilter.dom = () => {
  const div = document.createElement('div');
  const legend = (div, text) => {
    const item = document.createElement('div');
    item.className = 'legend';
    item.style.cursor = 'pointer';
    div.appendChild(item);

    const marker = document.createElement('span');
    marker.className = 'marker';
    marker.textContent = '* ';
    item.appendChild(marker);

    const label = document.createElement('span');
    label.className = 'label';
    label.textContent = text;
    item.appendChild(label);
  };
  legend(div, 'Increase');
  legend(div, 'Decrease');
  legend(div, 'Total');
  return div;
};

// Skip because using DOM, which can not be created in node-canvas env.
profitCustomIntervalLegendFilter.skip = true;
