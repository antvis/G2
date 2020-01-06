import { Chart, registerInteraction } from '@antv/g2';
registerInteraction('drag-view', {
  start: [{ trigger: 'plot:mousedown', action: 'view-drag:start' }],
  processing: [{ trigger: 'plot:mousemove', action: 'view-drag:drag' }],
  end: [{ trigger: 'plot:mouseup', action: 'view-drag:end' }],
});

registerInteraction('drag-move', {
  start: [{ trigger: 'dragstart', action: 'view-move:start' }],
  processing: [{ trigger: 'drag', action: 'view-move:move' }],
  end: [{ trigger: 'dragend', action: 'view-move:end' }],
});

fetch('../data/scatter.json')
  .then((res) => res.json())
  .then((data) => {
    const chart = new Chart({
      container: 'container',
      autoFit: true,
      height: 500,
    });
    // 数据格式： [{"gender":"female","height":161.2,"weight":51.6}]
    chart.data(data);
    chart.interaction('drag-move');
    chart
      .point()
      .position('height*weight')
      .color('gender')
      .shape('circle')
      .tooltip('gender*height*weight', (gender, height, weight) => {
        return {
          name: gender,
          value: height + '(cm), ' + weight + '(kg)',
        };
      });
    chart.render();
  });
