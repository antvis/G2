import { Chart } from '@antv/g2';

fetch('../data/world.geo.json')
  .then((res) => res.json())
  .then((mapData) => {
    const chart = new Chart({
      container: 'container',
      autoFit: true,
      height: 500,
      padding: [55, 20],
    });
    chart.tooltip(false);
    chart.axis(false);
    chart.legend('trend', {
      position: 'left',
    });
    // 绘制世界地图背景
    const worldMap = new DataSet.View().source(mapData, {
      type: 'GeoJSON',
    });
    chart.data(worldMap.rows);
    chart.tooltip(false);
    chart
      .polygon()
      .position('longitude*latitude')
      .label('name', {
        adjustType: 'map',
        offset: 0,
        style: {
          fill: 'black',
          stroke: '#fff',
          // lineWidth: 2
        },
      })
      .style({
        fill: '#CED4D9',
        stroke: '#F2F4F5',
        lineWidth: 0.5,
      });
    chart.render();
  });
