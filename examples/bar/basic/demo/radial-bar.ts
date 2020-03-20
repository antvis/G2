import { Chart } from '@antv/g2';

const data = [
  { question: '问题 1', percent: 0.21 },
  { question: '问题 2', percent: 0.4 },
  { question: '问题 3', percent: 0.49 },
  { question: '问题 4', percent: 0.52 },
  { question: '问题 5', percent: 0.53 },
  { question: '问题 6', percent: 0.84 },
  { question: '问题 7', percent: 1.0 },
  { question: '问题 8', percent: 1.2 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
  height: 500,
});

chart.data(data);

chart.scale('percent', {
  min: 0,
  max: 2,
});

chart.tooltip({
  title: 'question',
  showMarkers: false
});

chart.legend(false);
chart.axis('question', {
  grid: null,
  tickLine: null,
  line: null,
  label: {
    style: {
      fill: '#595959'
    }
  }
});

chart.coordinate('polar', { innerRadius: 0.1 }).transpose();

chart
  .interval()
  .position('question*percent')
  .color('percent', '#BAE7FF-#1890FF-#0050B3')
  .tooltip('percent', (val) => {
    return {
      name: '占比',
      value: val * 100 + '%',
    };
  })
  .label('percent', {
    offset: -2,
    content: (data) => {
      return data.percent * 100 + '%';
    }
  });


chart.interaction('element-active');

chart.render();
