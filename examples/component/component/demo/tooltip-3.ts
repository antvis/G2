import { Chart } from '@antv/g2';

fetch('../data/scatter.json')
  .then(res => res.json())
  .then(data => {
    const chart = new Chart({
      container: 'container',
      autoFit: true,
      height: 500,
      padding: [ 50, 70 ],
      localRefresh: false,
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
        text: (type, defaultText, items) => {
          const color = items[0].color;
          if (type === 'x') {
            return {
              offset: 5,
              position: 'end',
              content: defaultText + ' cm',
              style: {
                textAlign: 'center',
                textBaseline: 'top',
                fill: color,
                fontSize: 14,
                fontWeight: 'bold',
                stroke: '#333',
                lineWidth: 2,
              },
            };
          } else {
            return {
              offset: 5,
              content: defaultText + ' kg',
              style: {
                textAlign: 'end',
                fill: color,
                fontSize: 14,
                fontWeight: 'bold',
                stroke: '#333',
                lineWidth: 2,
              },
            };
          }
        },
        // FIXME: textBackground 应该可以支持关闭
        textBackground: {
          padding: 0,
          style: {
            fill: null,
          }
        }
      },
      itemTpl: '<li class="g2-tooltip-list-item" data-index={index} style="margin-bottom:4px;">'
        + '<span style="background-color:{color};" class="g2-tooltip-marker"></span>'
        + '{name}<br/>'
        + '{value}'
        + '</li>'
    });
    chart.point().position('height*weight')
      .color('gender')
      .shape('circle')
      .tooltip('gender*height*weight', (gender, height, weight) => {
        return {
          name: gender,
          value: height + '(cm), ' + weight + '(kg)'
        };
      })
      .style({
        opacity: 0.85,
      });
    chart.render();
  });
