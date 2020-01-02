import { Chart, registerInteraction } from '@antv/g2';
registerInteraction('move-zoom', {
  start: [
    {
      trigger: 'wheel',
      isEnable(context) {
        const event = context.event;
        const delt = event.gEvent.originalEvent.deltaY;
        return delt > 0;
      },
      action: 'scale-zoom:zoomIn',
    },
    {
      trigger: 'wheel',
      isEnable(context) {
        const event = context.event;
        const delt = event.gEvent.originalEvent.deltaY;
        return delt < 0;
      },
      action: 'scale-zoom:zoomOut',
    },
  ],
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
