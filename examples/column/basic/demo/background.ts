import { Chart } from '@antv/g2';

fetch('https://gw.alipayobjects.com/os/antfincdn/ryFSTIaqAP/column-data.json')
  .then(data => data.json())
  .then(data => {
    const chart = new Chart({
      container: 'container',
      autoFit: true,
      height: 500,
    });
    chart.data(data);

    chart.tooltip({
      shared: true,
      showMarkers: false
    });

    chart
      .interval({
        background: {
          style: {
            // fill: 'rgba(0,0,0,0.05)',
            fill: 'yellow',
          }
        }
      })
      .adjust([
        {
          type: 'dodge',
          dodgeBy: 'trace',
        },
        {
          type: 'stack',
          dodgeBy: 'colorField',
        }
      ])
      .position('x*y')
      .style({ opacity: 0.4 })
      .color('colorField', ["#5B8FF9", "#61DDAA", "#65789B", "#F6BD16",])
      .state({
        active: {
          style: {
            stroke: 'red',
            lineWidth: 4,
            opacity: 1
          }
        }
      })

    chart.interaction('element-active');
    chart.interaction('tooltip', {
      start: [
        {
          trigger: `element:click`,
          action: "tooltip:show"
        }
      ]
    })

    chart.render();
  })