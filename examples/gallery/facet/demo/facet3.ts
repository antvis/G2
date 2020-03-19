import { Chart } from '@antv/g2';

function getTypeColor(type) {
  if (type === '转基因作物种植面积') { return '#1890ff'; }
  if (type === '耕地总面积') { return '#2fc25b'; }
  if (type === '转基因作物种植占比（%）') { return '#facc14'; }
}

const data = [
  { class: '转基因作物种植面积', country: '印度', type: '1', value: 10.8 },
  { class: '转基因作物种植面积', country: '印度', type: '2', value: 89.2 },
  { class: '转基因作物种植面积', country: '美国', type: '1', value: 72.9 },
  { class: '转基因作物种植面积', country: '美国', type: '2', value: 27.1 },
  { class: '转基因作物种植面积', country: '中国', type: '1', value: 2.8 },
  { class: '转基因作物种植面积', country: '中国', type: '2', value: 97.2 },
  { class: '转基因作物种植面积', country: '巴西', type: '1', value: 49.1 },
  { class: '转基因作物种植面积', country: '巴西', type: '2', value: 50.9 },
  { class: '转基因作物种植面积', country: '加拿大', type: '1', value: 11.6 },
  { class: '转基因作物种植面积', country: '加拿大', type: '2', value: 88.4 },
  { class: '转基因作物种植面积', country: '阿根廷', type: '1', value: 23.8 },
  { class: '转基因作物种植面积', country: '阿根廷', type: '2', value: 76.2 },
  { class: '转基因作物种植面积', country: '巴基斯坦', type: '1', value: 2.9 },
  { class: '转基因作物种植面积', country: '巴基斯坦', type: '2', value: 97.1 },
  { class: '转基因作物种植面积', country: '南非', type: '1', value: 2.7 },
  { class: '转基因作物种植面积', country: '南非', type: '2', value: 97.3 },
  { class: '转基因作物种植面积', country: '巴拉圭', type: '1', value: 3.6 },
  { class: '转基因作物种植面积', country: '巴拉圭', type: '2', value: 96.4 },
  { class: '转基因作物种植面积', country: '乌拉圭', type: '1', value: 1.3 },
  { class: '转基因作物种植面积', country: '乌拉圭', type: '2', value: 98.7 },
  { class: '耕地总面积', country: '印度', type: '1', value: 175.4 },
  { class: '耕地总面积', country: '印度', type: '2', value: 24.6 },
  { class: '耕地总面积', country: '美国', type: '1', value: 165.2 },
  { class: '耕地总面积', country: '美国', type: '2', value: 34.8 },
  { class: '耕地总面积', country: '中国', type: '1', value: 108.4 },
  { class: '耕地总面积', country: '中国', type: '2', value: 91.6 },
  { class: '耕地总面积', country: '巴西', type: '1', value: 73.2 },
  { class: '耕地总面积', country: '巴西', type: '2', value: 126.8 },
  { class: '耕地总面积', country: '加拿大', type: '1', value: 46.9 },
  { class: '耕地总面积', country: '加拿大', type: '2', value: 153.1 },
  { class: '耕地总面积', country: '阿根廷', type: '1', value: 38.6 },
  { class: '耕地总面积', country: '阿根廷', type: '2', value: 161.4 },
  { class: '耕地总面积', country: '巴基斯坦', type: '1', value: 22 },
  { class: '耕地总面积', country: '巴基斯坦', type: '2', value: 178 },
  { class: '耕地总面积', country: '南非', type: '1', value: 12.1 },
  { class: '耕地总面积', country: '南非', type: '2', value: 187.9 },
  { class: '耕地总面积', country: '巴拉圭', type: '1', value: 5.5 },
  { class: '耕地总面积', country: '巴拉圭', type: '2', value: 194.5 },
  { class: '耕地总面积', country: '乌拉圭', type: '1', value: 1.8 },
  { class: '耕地总面积', country: '乌拉圭', type: '2', value: 198.2 },
  { class: '转基因作物种植占比（%）', country: '印度', type: '1', value: 6.2 },
  { class: '转基因作物种植占比（%）', country: '印度', type: '2', value: 93.8 },
  { class: '转基因作物种植占比（%）', country: '美国', type: '1', value: 44.1 },
  { class: '转基因作物种植占比（%）', country: '美国', type: '2', value: 55.9 },
  { class: '转基因作物种植占比（%）', country: '中国', type: '1', value: 2.6 },
  { class: '转基因作物种植占比（%）', country: '中国', type: '2', value: 97.4 },
  { class: '转基因作物种植占比（%）', country: '巴西', type: '1', value: 67 },
  { class: '转基因作物种植占比（%）', country: '巴西', type: '2', value: 33 },
  { class: '转基因作物种植占比（%）', country: '加拿大', type: '1', value: 24.7 },
  { class: '转基因作物种植占比（%）', country: '加拿大', type: '2', value: 75.3 },
  { class: '转基因作物种植占比（%）', country: '阿根廷', type: '1', value: 61.6 },
  { class: '转基因作物种植占比（%）', country: '阿根廷', type: '2', value: 38.4 },
  { class: '转基因作物种植占比（%）', country: '巴基斯坦', type: '1', value: 13.2 },
  { class: '转基因作物种植占比（%）', country: '巴基斯坦', type: '2', value: 86.8 },
  { class: '转基因作物种植占比（%）', country: '南非', type: '1', value: 22.4 },
  { class: '转基因作物种植占比（%）', country: '南非', type: '2', value: 77.6 },
  { class: '转基因作物种植占比（%）', country: '巴拉圭', type: '1', value: 65.7 },
  { class: '转基因作物种植占比（%）', country: '巴拉圭', type: '2', value: 34.3 },
  { class: '转基因作物种植占比（%）', country: '乌拉圭', type: '1', value: 73 },
  { class: '转基因作物种植占比（%）', country: '乌拉圭', type: '2', value: 27 }
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
  height: 500,
  padding: [20, 20, 20, 70]
});

chart.data(data);
chart.legend(false);
chart.tooltip({
  showMarkers: false
});
chart.facet('rect', {
  fields: ['class'],
  columnTitle: {
    offsetY: -15,
    style: {
      fontSize: 14,
      fontWeight: 300,
      fill: '#8d8d8d'
    }
  },
  eachView: (view, facet) => {
    view.coordinate().transpose();

    if (facet.columnIndex === 0) {
      view.axis('country', {
        tickLine: null,
        line: null,
      });
      view.axis('value', false);
    } else {
      view.axis(false);
    }
    const color = getTypeColor(facet.columnValue);
    view
      .interval()
      .adjust('stack')
      .position('country*value')
      .color('type', [color, '#ebedf0'])
      .size(20)
      .label('value*type', (value, type) => {
        if (type === '2') {
          return null;
        }
        const offset = (value < 30) ? 10 : -4;
        return {
          offset,
        };
      });
    view.interaction('element-active');
  }
});
chart.render();
