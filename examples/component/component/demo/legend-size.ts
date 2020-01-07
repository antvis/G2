// TODO: 图形与图例之间的交互联动
import DataSet from '@antv/data-set';
import { Chart } from '@antv/g2';

fetch('../data/world.geo.json')
  .then((res) => res.json())
  .then((data) => {
    const ds = new DataSet();
    const dv = ds.createView('back').source(data, {
      type: 'GeoJSON',
    });
    const userData = [
      { name: 'Russia', value: 86.8 },
      { name: 'China', value: 106.3 },
      { name: 'Japan', value: 94.7 },
      { name: 'Mongolia', value: 98 },
      { name: 'Canada', value: 98.4 },
      { name: 'United Kingdom', value: 97.2 },
      { name: 'United States of America', value: 98.3 },
      { name: 'Brazil', value: 96.7 },
      { name: 'Argentina', value: 95.8 },
      { name: 'Algeria', value: 101.3 },
      { name: 'France', value: 94.8 },
      { name: 'Germany', value: 96.6 },
      { name: 'Ukraine', value: 86.3 },
      { name: 'Egypt', value: 102.1 },
      { name: 'South Africa', value: 101.3 },
      { name: 'India', value: 107.6 },
      { name: 'Australia', value: 99.9 },
      { name: 'Saudi Arabia', value: 130.1 },
      { name: 'Afghanistan', value: 106.5 },
      { name: 'Kazakhstan', value: 93.4 },
      { name: 'Indonesia', value: 101.4 },
    ];
    const userDv = ds
      .createView()
      .source(userData)
      .transform({
        geoDataView: dv,
        field: 'name',
        type: 'geo.centroid',
        as: ['longitude', 'latitude'],
      });
    const chart = new Chart({
      container: 'container',
      autoFit: true,
      height: 500,
    });
    chart.scale({
      longitude: {
        sync: true,
      },
      latitude: {
        sync: true,
      },
    });
    chart.axis(false);

    chart.legend({ position: 'right' });
    chart.tooltip({
      showTitle: false,
    });
    const bgView = chart.createView();
    bgView.data(dv.rows);
    bgView.tooltip(false);
    bgView
      .polygon()
      .position('longitude*latitude')
      .color('#ebedf0')
      .style({
        lineWidth: 1,
        stroke: '#fafbfc',
      });

    const userView = chart.createView();
    userView.data(userDv.rows);
    userView
      .point()
      .position('longitude*latitude')
      .color('#1890ff')
      .shape('circle')
      .size('value', [5, 15])
      .style({
        lineWidth: 1,
        stroke: '#1890ff',
      });
    chart.render();
    console.log(userView);
  });
