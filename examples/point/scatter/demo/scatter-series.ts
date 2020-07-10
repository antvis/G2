import { Chart } from '@antv/g2';

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/scatter.json')
  .then(res => res.json())
  .then(data => {
    const chart = new Chart({
      container: 'container',
      autoFit: true,
      height: 500
    });
    // 数据格式： [{"gender":"female","height":161.2,"weight":51.6}]
    chart.data(data);
    chart.scale({
      height: { nice: true },
      weight: { nice: true },
    });
    chart.tooltip({
      showTitle: false,
      showCrosshairs: true,
      crosshairs: {
        type: 'xy',
      },
      itemTpl: '<li class="g2-tooltip-list-item" data-index={index} style="margin-bottom:4px;">'
        + '<span style="background-color:{color};" class="g2-tooltip-marker"></span>'
        + '{name}<br/>'
        + '{value}'
        + '</li>'
    });
    chart
      .point()
      .position('height*weight')
      .color('gender')
      .shape('circle')
      .tooltip('gender*height*weight', (gender, height, weight) => {
        return {
          name: gender,
          value: height + '(cm), ' + weight + '(kg)'
        };
      })
      .style({
        fillOpacity: 0.85
      });
    chart.interaction('legend-highlight');
    chart.render();
  });
