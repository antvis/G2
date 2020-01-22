import { Chart } from '@antv/g2';

insertCss(`
  .g2-label-spec {
    font-size: 12px;
    text-align: center;
    position: absolute;
    width: 200px;
    color: #595959;
  }

  .g2-label-spec-value {
    color: #ff5250;
    font-weight: bold;
  }
`);

const data = [
  { year: '2013', value: -3.1 },
  { year: '2014', value: 0.8 },
  { year: '2015', value: 2.3 },
  { year: '2016', value: 3.5 },
  { year: '2017', value: 5.4 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
  height: 500,
});
chart.data(data);
chart.scale('value', {
  alias: '现金流(亿)',
  nice: true,
});
chart.axis('year', {
  label: {
    style: {
      fill: '#aaaaaa',
    },
  },
  tickLine: {
    length: 0,
    alignTick: true,
  },
});

chart.axis('value', {
  label: null,
  title: {
    offset: 30,
  },
});
chart.legend(false);
chart
  .interval()
  .position('year*value')
  .color('year', (val) => {
    if (val === '2013') {
      return '#36c361';
    }
    return '#ff5957';
  })
  .label('year*value', (year, value) => {
    return {
      content: (originData) => {
        if (originData.year === '2014') {
          return null;
        }
        return value;
      },
      style: {
        fill: '#595959',
      },
    };
  });

chart.render();

// 使用  html 添加特殊标注
const position = chart.getXY({ year: '2014', value: 0.8 });
const div = document.createElement('div');
div.className = 'g2-label-spec';
div.innerHTML = `新产品上市破局，现金流<span class="g2-label-spec-value"> 0.8 </span>亿`;
div.setAttribute('style', `top: ${position.y - 34}px; left: ${position.x - 100}px`);
const chartContainer = chart.getCanvas().get('container');
chartContainer.appendChild(div);
