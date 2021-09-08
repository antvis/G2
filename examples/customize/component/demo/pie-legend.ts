import { Chart } from '@antv/g2';
import inserCss from 'insert-css';

const $container = document.getElementById('container');
$container.innerHTML = `
<div id="app-container">
  <div id="g2-container-pie"></div>
  <div id="g2-customize-legend"></div>
</div>
`;

inserCss(`
#app-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column,
}

#g2-container-pie {
  flex: auto;
}

#g2-customize-legend {
  margin-left: 8px;
  width: 160px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#g2-customize-legend .legend-item {
  width: 100%;
  line-height: 32px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}

#g2-customize-legend .legend-item > span {
  margin-left: 8px;
}

#g2-customize-legend .legend-item .legend-item-marker {
  width: 8px;
  height: 8px;
  display: inline-block;
}

`);

const data = [
  { item: '事例一', count: 40, percent: 0.4 },
  { item: '事例二', count: 21, percent: 0.21 },
  { item: '事例三', count: 17, percent: 0.17 },
  { item: '事例四', count: 13, percent: 0.13 },
  { item: '事例五', count: 9, percent: 0.09 },
];

const chart = new Chart({
  container: 'g2-container-pie',
  autoFit: true,
  height: 500,
});

chart.coordinate('theta', {
  radius: 0.75,
});

chart.data(data);

chart.legend(false);

chart.scale('percent', {
  formatter: (val) => val * 100 + '%',
});

chart
  .interval()
  .position('percent')
  .color('item')
  .label('percent', {
    content: (data) => {
      return `${data.item}: ${data.percent * 100}%`;
    },
  })
  .adjust('stack');

// customize legend
const $legend = document.getElementById('g2-customize-legend');
chart.on('afterrender', (e) => {
  const elements = e.view.getElements();
  const mappingData = elements.map(e => e.getModel());

  $legend.innerHTML = `
    ${mappingData.map(datum => {
      const color = datum.color;
      const name = datum.data.item;
      const value = `${datum.data.count} (${datum.data.percent * 100}%)`;

      return `<div class="legend-item">
        <span class="legend-item-marker" style="background: ${color}"></span>
        <span class="legend-item-name">${name}</span>
        <span class="legend-item-value">${value}</span>
      </div>`;
    }).join('')}
  `;
});

chart.render();
