import { Chart } from '@antv/g2';

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/scatter.json')
  .then((res) => res.json())
  .then((data) => {
    const chart = new Chart({
      container: 'container',
      autoFit: true,
      height: 500,
      padding: [20, 20, 50, 80]
    });
    chart.data(data);
    chart.scale({
      height: { nice: true },
      weight: { nice: true },
    });
    chart.tooltip({
      showCrosshairs: true,
      showContent: false,
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
                fontSize: 14,
                fontWeight: 'bold',
              },
            };
          }
          return {
            offset: 5,
            content: defaultText + ' kg',
            style: {
              textAlign: 'end',
              fontSize: 14,
              fontWeight: 'bold',
            },
          };
        },
        textBackground: null,
      },
    });

    chart
      .point()
      .position('height*weight')
      .color('gender')
      .shape('gender', ['circle', 'square'])
      .tooltip('gender')
      .style({
        fillOpacity: 0.85
      });
    chart.interaction('legend-highlight');

    chart.render();
  });
