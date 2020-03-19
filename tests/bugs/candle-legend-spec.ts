import { Chart } from '../../src';
import { createDiv } from '../util/dom';

const data = [
  {
    "date": 1186444800000,
    "range": [22.258032033902, 25.4889359321959],
    "start": 22.75,
    "end": 23.44,
    "lowest": 22.69,
    "highest": 23.7,
    "mean": 23.335,
    "trend": "up"
  },
  {
    "date": 1186358400000,
    "range": [22.2381666799343, 25.3786666401314],
    "start": 23.03,
    "end": 22.97,
    "lowest": 22.44,
    "highest": 23.15,
    "mean": 23.285,
    "trend": "down"
  },
  {
    "date": 1186099200000,
    "range": [22.2646752576289, 25.3541494847422],
    "start": 23.2,
    "end": 22.92,
    "lowest": 22.87,
    "highest": 23.39,
    "mean": 23.2945,
    "trend": "down"
  },
  {
    "date": 1186012800000,
    "range": [22.351151387828, 25.293697224344],
    "start": 22.65,
    "end": 23.36,
    "lowest": 22.65,
    "highest": 23.7,
    "mean": 23.332,
    "trend": "up"
  },
  {
    "date": 1185926400000,
    "range": [22.4525580936985, 25.195883812603],
    "start": 23.17,
    "end": 23.25,
    "lowest": 22.85,
    "highest": 23.4,
    "mean": 23.367,
    "trend": "up"
  },
  {
    "date": 1185840000000,
    "range": [22.5727587647169, 25.0649824705663],
    "start": 23.88,
    "end": 23.25,
    "lowest": 23.24,
    "highest": 23.93,
    "mean": 23.4035,
    "trend": "down"
  },
  {
    "date": 1185753600000,
    "range": [22.615611475491, 25.0677770490181],
    "start": 23.55,
    "end": 23.62,
    "lowest": 23.38,
    "highest": 23.88,
    "mean": 23.433,
    "trend": "up"
  },
  {
    "date": 1185494400000,
    "range": [22.6132951454669, 25.0574097090663],
    "start": 23.98,
    "end": 23.49,
    "lowest": 23.47,
    "highest": 24.49,
    "mean": 23.428,
    "trend": "down"
  }
];
data.forEach(obj => {
  obj.range = [obj.start, obj.end, obj.lowest, obj.highest];
});
const chart = new Chart({
  container: createDiv(),
  width: 500,
  height: 400,
});

chart.data(data);

chart.scale({
  date: {
    type: 'timeCat',
    tickCount: 4,
  },
  trend: {
    values: ['up', 'down']
  },
  volumn: { alias: '成交量' },
  start: { alias: '开盘价' },
  end: { alias: '收盘价' },
  max: { alias: '最高价' },
  min: { alias: '最低价' },
  range: { alias: '股票价格' }
});
chart.tooltip({
  showTitle: false,
  showMarkers: false,
  itemTpl: '<li class="g2-tooltip-list-item" data-index={index}>'
    + '<span style="background-color:{color};" class="g2-tooltip-marker"></span>'
    + '{name}{value}</li>'
});

const geom = chart.schema()
  .position('date*range')
  .color('trend', val => {
    if (val === 'up') {
      return '#f04864';
    }

    if (val === 'down') {
      return '#2fc25b';
    }
  })
  .shape('candle')

chart.render();

it('candle checked', () => {
  expect(() => {
    chart.filter('trend', v => v === 'up');
    chart.render(true);
    expect(geom.elements.length).toBe(4);
  }).not.toThrow();
});
