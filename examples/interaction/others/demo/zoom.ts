import { Chart } from '@antv/g2';

fetch('../data/scatter.json')
  .then((res) => res.json())
  .then((data) => {
    const chart = new Chart({
      container: 'container',
      autoFit: true,
      height: 500,
      limitInPlot: true
    });
    // 数据格式： [{"gender":"female","height":161.2,"weight":51.6}]
    chart.data(data);
    chart.animate(false);
    chart.scale({
      height: { nice: true },
      weight: { nice: true },
    });

    chart
      .point()
      .position('height*weight')
      .color('gender')
      .shape('circle')
      .style({
        fillOpacity: 0.85
      });

    chart.interaction('view-zoom');

    chart.render();
    // 阻止默认事件，否则会整个窗口滚动
  	chart.getCanvas().on('mousewheel', ev=> {ev.preventDefault();})
  });
