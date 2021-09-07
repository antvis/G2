import { Chart } from '@antv/g2';
import inserCss from 'insert-css';

const $container = document.getElementById('container');
$container.innerHTML = `
<div id="app-container">
  <div id="g2-customize-tooltip"></div>
  <div id="g2-container"></div>
</div>
`;

inserCss(`
#app-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

#g2-container {
  flex: auto;
}

#g2-customize-tooltip {
  margin-bottom: 16px;
  font-size: 12px;
}


#g2-customize-tooltip .tooltip-title {
  
}

#g2-customize-tooltip .tooltip-items {
  display: flex;
  flex-direction: row;
}

#g2-customize-tooltip .tooltip-item {
  flex-basis: 240px;
  padding-left: 8px;
  margin-right: 12px;
}

#g2-customize-tooltip .tooltip-item .tooltip-item-value {
  font-size: 16px;
  font-weight: bold;
}



#g2-customize-tooltip .tooltip-item-info {
  display: flex;
  justify-content: space-between;
}

#g2-customize-tooltip .tooltip-item-info .info-item {
  display: flex;
}

#g2-customize-tooltip .tooltip-item-info .info-item .info-item-name {
  opacity: 0.65;
}

#g2-customize-tooltip .tooltip-item-info .info-item .info-item-value {
  margin-left: 8px;
}
`);

const data = [
  { month: 'Jan', city: 'Tokyo', temperature: 7 },
  { month: 'Jan', city: 'London', temperature: 3.9 },
  { month: 'Feb', city: 'Tokyo', temperature: 6.9 },
  { month: 'Feb', city: 'London', temperature: 4.2 },
  { month: 'Mar', city: 'Tokyo', temperature: 9.5 },
  { month: 'Mar', city: 'London', temperature: 5.7 },
  { month: 'Apr', city: 'Tokyo', temperature: 14.5 },
  { month: 'Apr', city: 'London', temperature: 8.5 },
  { month: 'May', city: 'Tokyo', temperature: 18.4 },
  { month: 'May', city: 'London', temperature: 11.9 },
  { month: 'Jun', city: 'Tokyo', temperature: 21.5 },
  { month: 'Jun', city: 'London', temperature: 15.2 },
  { month: 'Jul', city: 'Tokyo', temperature: 25.2 },
  { month: 'Jul', city: 'London', temperature: 17 },
  { month: 'Aug', city: 'Tokyo', temperature: 26.5 },
  { month: 'Aug', city: 'London', temperature: 16.6 },
  { month: 'Sep', city: 'Tokyo', temperature: 23.3 },
  { month: 'Sep', city: 'London', temperature: 14.2 },
  { month: 'Oct', city: 'Tokyo', temperature: 18.3 },
  { month: 'Oct', city: 'London', temperature: 10.3 },
  { month: 'Nov', city: 'Tokyo', temperature: 13.9 },
  { month: 'Nov', city: 'London', temperature: 6.6 },
  { month: 'Dec', city: 'Tokyo', temperature: 9.6 },
  { month: 'Dec', city: 'London', temperature: 4.8 },
];

const chart = new Chart({
  container: 'g2-container',
  autoFit: true,
});

chart.data(data);
chart.scale({
  month: {
    range: [0, 1],
  },
  temperature: {
    nice: true,
  },
});

chart.tooltip({
  showCrosshairs: true,
  shared: true,
});

chart.axis('temperature', {
  label: {
    formatter: (val) => {
      return val + ' °C';
    },
  },
});

chart
  .line()
  .position('month*temperature')
  .color('city')
  .shape('smooth');

chart
  .point()
  .position('month*temperature')
  .color('city')
  .shape('circle');

// customize tooltip
const $tooltip = document.getElementById('g2-customize-tooltip');

function getTooltipHTML(data) {
  const { title, items } = data;
  return `
    <div class="tooltip-title">${title}</div>
    <div class="tooltip-items">
      ${items.map(datum => {
        const color = datum.color;
        const name = datum.name;
        const value = datum.value;

        return `
        <div class="tooltip-item" style="border-left: 2px solid ${color}">
          <div class="tooltip-item-name">${name}</div>
          <div class="tooltip-item-value">${value} °C</div>
          <div class="tooltip-item-info">
            <div class="info-item">
              <div class="info-item-name">最新值</div>
              <div class="info-item-value">9.6</div>
            </div>
            <div class="info-item">
              <div class="info-item-name">平均值</div>
              <div class="info-item-value">4.8</div>
            </div>
            <div class="info-item">
              <div class="info-item-name">最大值</div>
              <div class="info-item-value">16.9</div>
            </div>
          </div>
        </div>
        `;
      }).join('')}
    </div>
  `;
  
}

// 初始的 tooltip
chart.on('afterrender', (e) => {
  const elements = e.view.getElements();
  console.log(111, elements);
  // 获取最新值的数据
  const items = elements
    .filter(ele => ele.getData().month === 'Dec')
    .map(ele => {
      const model = ele.getModel();
      return {
        color: model.color,
        name: model.data.city,
        value: model.data.temperature,
      };
    });
  
  const data = {
    title: 'Dec',
    items,
  }

  $tooltip.innerHTML = getTooltipHTML(data);
});

// tooltip 的更新
chart.on('tooltip:change', (e) => {
  $tooltip.innerHTML = getTooltipHTML(e.data);
});

chart.render();
