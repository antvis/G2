import { Chart, registerInteraction } from '@antv/g2';

registerInteraction('drag-move', {
  start: [{ trigger: 'plot:mousedown', action: 'scale-translate:start' }],
  processing: [{ trigger: 'plot:mousemove', action: 'scale-translate:translate', throttle: {wait: 100, leading: true, trailing: false} }],
  end: [{ trigger: 'plot:mouseup', action: 'scale-translate:end' }],
});

fetch('../data/scatter.json')
  .then((res) => res.json())
  .then((data) => {
    const chart = new Chart({
      container: 'container',
      autoFit: true,
      height: 500,
      limitInPlot: true
    });
    chart.data(data);
    chart.scale({
      height: { nice: true },
      weight: { nice: true },
    });
    chart.animate(false);
    chart
      .point()
      .position('height*weight')
      .color('gender')
      .shape('circle')
      .style({
        fillOpacity: 0.85
      });

    chart.interaction('drag-move');

    chart.render();
    
  });
