import { DataView } from '@antv/data-set';
import { Chart } from '@antv/g2';

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/diamond.json')
  .then(res => res.json())
  .then(data => {
    const chart = new Chart({
      container: 'container',
      autoFit: true,
      height: 500,
      padding: [30, 90, 80, 80]
    });
    chart.data(data);

    chart.scale({
      mean: {
        sync: true
      },
      cut: {
        sync: true
      }
    });

    chart.coordinate('polar');
    chart.axis(false);
    chart.tooltip({
      showMarkers: false
    });

    chart.facet('circle', {
      fields: ['clarity'],
      eachView(view, facet) {
        const facetData = facet.data;
        const dv = new DataView();
        dv.source(facetData).transform({
          type: 'aggregate',
          fields: ['price'],
          operations: ['mean'],
          as: ['mean'],
          groupBy: ['cut']
        });

        view.data(dv.rows);
        view.interval().position('cut*mean').color('cut');
        view.interaction('element-active');
      }
    }); // 分面设置
    chart.render();
  });
