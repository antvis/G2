import { Chart } from '@antv/g2';

const data = [
  { type: '男性', value: 56.4 },
  { type: '女性', value: 43.6 }
];
const chart = new Chart({
  container: 'container',
  autoFit: true,
  height: 500
});
chart.data(data);
chart.legend(false);
chart.tooltip({
  showMarkers: false
});
chart.facet('rect', {
  fields: ['type'],
  padding: 20,
  showTitle: false,
  eachView: (view, facet) => {
    const data = facet.data;
    let color;
    if (data[0].type === '男性') {
      color = '#0a9afe';
    } else {
      color = '#f0657d';
    }
    data.push({ type: '其他', value: 100 - data[0].value });
    view.data(data);
    view.coordinate('theta', {
      radius: 0.8,
      innerRadius: 0.5
    });
    view
      .interval()
      .adjust('stack')
      .position('value')
      .color('type', [color, '#eceef1'])
      .style({
        opacity: 1,
      });
    view.annotation().text({
      position: [ '50%', '50%' ],
      content: data[0].type,
      style: {
        fontSize: 12,
        fill: '#8c8c8c',
        fontWeight: 300,
        textBaseline: 'bottom',
        textAlign: 'center'
      },
      offsetY: -12,
    });

    view.annotation().text({
      position: ['50%', '50%'],
      content: data[0].value,
      style: {
        fontSize: 18,
        fill: '#000',
        fontWeight: 500,
        textAlign: 'center'
      },
      offsetY: 10,
    });

    view.interaction('element-active');
  }
});
chart.render();
