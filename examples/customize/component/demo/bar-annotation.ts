import { Chart } from '@antv/g2';
import inserCss from 'insert-css';

const $container = document.getElementById('container');
$container.innerHTML = `
<div id="app-container">
  <div id="g2-container-bar">
    <div id="g2-customize-annotation"></div>
  </div>
</div>
`;

inserCss(`
#app-container {
  width: 100%;
  height: 100%;
}

#g2-container-bar {
  position: relative;
}

#g2-customize-annotation {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

#g2-customize-annotation .annotation-item {
  position: absolute;
  margin-left: 8px;
  padding: 0 4px;
  background: #fffbe6;

  font-size: 12px;
  opacity: 0.8;
}
`);

const data = [
  { name: '曝光', count: 120000000, message: '曝光率过低' },
  { name: '点击', count: 80000000 },
  { name: '承接访问页', count: 60000000 },
  { name: '承接点击页', count: 40000000, message: '最终转化率过低，请关注表单提交成功率' },
  { name: '最终转化量', count: 2000000 },
];

const chart = new Chart({
  container: 'g2-container-bar',
  autoFit: true,
  height: 400,
});

chart.data(data);

chart.scale('count', { nice: true });

chart.coordinate().transpose().scale(1, -1);

chart.tooltip({
  showMarkers: false
});

chart.interaction('active-region');

chart.interval().position('name*count');

// customize annotation
const $annotation = document.getElementById('g2-customize-annotation');
chart.on('afterrender', (e) => {
  const elements = e.view.getElements();
  const x = chart.getCoordinate().x.start;

  const html = [];

  elements.reduce((prev, curr) => {
    if (prev && curr) {
      const data = prev.getData();
      const message = data.message;

      if (message) {
        // 第一个空隙的 y 位置
        const y = prev.getBBox().maxY;
        // 第一个空隙的高度
        const height = curr.getBBox().minY - prev.getBBox().maxY;
        
        html.push(`
          <div class="annotation-item" style="top: ${y + height / 2 - 9}px; left: ${x}px;">${message}。<a href="https://antv.vision/" target="_blank">查看原因</a></div>
        `);
      }

      return curr;
    }
  });

  $annotation.innerHTML = html.join('');
});

chart.render();
