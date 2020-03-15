import { Chart, registerInteraction } from '@antv/g2';

registerInteraction('legend-active', {
  showEnable: [
    { trigger: 'legend-item:mouseenter', action: 'cursor:pointer' },
    { trigger: 'legend-item:mouseleave', action: 'cursor:default' },
  ],
  start: [
    {
      trigger: 'legend-item:mouseenter',
      action: ['list-active:active', 'element-active:active'],
    },
  ],
  end: [
    {
      trigger: 'legend-item:mouseleave',
      action: ['list-active:reset', 'element-active:reset'],
    },
  ],
});

const data = [
  { item: '事例一', count: 40, percent: 0.4, color: '#5B8FF9' },
  { item: '事例二', count: 21, percent: 0.21, color: '#5AD8A6' },
  { item: '事例三', count: 17, percent: 0.17, color: '#5D7092' },
  { item: '事例四', count: 13, percent: 0.13, color: '#F6BD16' },
  { item: '事例五', count: 9, percent: 0.09, color: '#E86452' },
];

// 自定义图例项
const legendItems = data.map(obj => {
  return {
    name: obj.item,
    value: obj.percent,
    marker: {
      symbol: 'square',
      style: {
        r: 5,
        fill: obj.color,
      }
    }
  };
});

const chart = new Chart({
  container: 'container',
  autoFit: true,
  height: 500,
});

chart.coordinate('theta', {
  radius: 0.75,
  innerRadius: 0.5,
});

chart.data(data);

chart.scale('percent', {
  formatter: val => {
    val = val * 100 + '%';
    return val;
  },
});

chart.tooltip({
  showTitle: false,
  showMarkers: false,
});

// 自定义图例
chart.legend('item', {
  position: 'right',
  custom: true,
  items: legendItems,
  itemValue: {
    style: {
      fill: '#999',
      fontSize: 20
    },
    formatter: val => `${val * 100}%`
  },
  itemName: {
    style: {
      fontSize: 20
    }
  },
  itemHeight: 40,
});

chart
  .interval()
  .adjust('stack')
  .position('percent')
  .color('item')
  .style({
    fillOpacity: 1,
  })
  .state({
    active: {
      style: element => {
        const shape = element.shape;
        return {
          lineWidth: 10,
          stroke: shape.attr('fill'),
          strokeOpacity: shape.attr('fillOpacity'),
        };
      },
    },
  });

chart.removeInteraction('legend-filter');
chart.interaction('element-active');
chart.render();
