import { DataView } from '@antv/data-set';
import { Chart } from '@antv/g2';

const data = [
  { gender: '男', count: 40, class: '一班', grade: '一年级' },
  { gender: '女', count: 30, class: '一班', grade: '一年级' },
  { gender: '男', count: 35, class: '二班', grade: '一年级' },
  { gender: '女', count: 45, class: '二班', grade: '一年级' },
  { gender: '男', count: 20, class: '三班', grade: '一年级' },
  { gender: '女', count: 35, class: '三班', grade: '一年级' },
  { gender: '男', count: 30, class: '一班', grade: '二年级' },
  { gender: '女', count: 40, class: '一班', grade: '二年级' },
  { gender: '男', count: 25, class: '二班', grade: '二年级' },
  { gender: '女', count: 32, class: '二班', grade: '二年级' },
  { gender: '男', count: 28, class: '三班', grade: '二年级' },
  { gender: '女', count: 36, class: '三班', grade: '二年级' }
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
  height: 500,
  padding: [ 60, 90, 80, 80 ]
});

chart.data(data);
chart.coordinate('theta');
chart.tooltip({
  showTitle: false,
  showMarkers: false
});
chart.facet('tree', {
  fields: [ 'grade', 'class' ],
  line: {
    style: {
      stroke: '#00a3d7',
    },
    smooth: true,
  },
  eachView(view, facet) {
    const dv = new DataView();
    dv.source(facet.data)
      .transform({
      type: 'percent',
      field: 'count',
      dimension: 'gender',
      as: 'percent'
    });

    view.data(dv.rows);
    view.scale({
      percent: {
        formatter(val) {
          return (val * 100).toFixed(2) + '%';
        }
      }
    });
    view.interval().position('percent').color('gender').adjust('stack');
    view.interaction('element-active');
  }
});
chart.render();
