import { Chart, getEngine } from '@antv/g2';
const G = getEngine('canvas');

const data = [
  { sex: '男', sold: 0.45 },
  { sex: '女', sold: 0.55 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
  height: 500,
  padding: [20, 30, 30, 20],
});

chart.coordinate('theta', {
  radius: 0.8,
});

chart.data(data);

chart.tooltip({
  showTitle: false,
  showMarkers: false,
});

chart
  .interval()
  .adjust('stack')
  .position('sold')
  .color('sex', ['#1890ff', '#f04864'])
  .label('sold', {
    content: (obj) => {
      const group = new G.Group({});
      group.addShape({
        type: 'image',
        attrs: {
          x: 0,
          y: 0,
          width: 40,
          height: 50,
          img: obj.sex === '男' ?
            'https://gw.alipayobjects.com/zos/rmsportal/oeCxrAewtedMBYOETCln.png' :
            'https://gw.alipayobjects.com/zos/rmsportal/mweUsJpBWucJRixSfWVP.png',
        },
      });

      group.addShape({
        type: 'text',
        attrs: {
          x: 20,
          y: 54,
          text: obj.sex,
          textAlign: 'center',
          textBaseline: 'top',
          fill: obj.sex === '男' ? '#1890ff' : '#f04864',
        },
      });
      return group;
    }
  });

chart.interaction('element-active');

chart.render();
