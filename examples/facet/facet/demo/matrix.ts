import { DataView } from '@antv/data-set';
import { Chart } from '@antv/g2';

const COLOR = ['#1890FF', '#2FC25B', '#FACC14'];

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/iris.json')
  .then(res => res.json())
  .then(data => {
    const chart = new Chart({
      container: 'container',
      autoFit: true,
      height: 500,
      padding: [16, 16, 48, 48],
    });

    chart.data(data);

    chart.scale({
      Species: { sync: true },
      SepalLength: { nice: true },
      SepalWidth: { nice: true },
      PetalLength: { nice: true },
      PetalWidth: { nice: true }
    });

    chart.facet('matrix', {
      fields: [ 'SepalLength', 'SepalWidth', 'PetalLength', 'PetalWidth' ],
      eachView(view, facet) {
        if (facet.rowIndex === facet.columnIndex) {
          // 对角线的图形，做数据封箱之后绘制图形
          const dv = new DataView();
          dv.source(facet.data)
            .transform({
              type: 'bin.histogram',
              field: facet.columnField,  // 对应数轴上的一个点
              bins: 30,               // 分箱个数
              as: [ facet.columnField, 'count' ],
              groupBy: [ 'Species' ]
            });
          view.data(dv.rows);

          view.interval()
            .position(facet.columnField + '*count')
            .color('Species', COLOR)
            .adjust('stack')
            .style({ opacity: 0.85 });
        } else {
          view.point()
            .position([ facet.columnField, facet.rowField ])
            .color('Species', COLOR)
            .shape('circle')
            .style({ fillOpacity: 0.3, stroke: null })
            .size(3);
        }
      }
    });
    chart.render();
  });
