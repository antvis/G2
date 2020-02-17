import DataSet from '@antv/data-set';
import { Chart } from '@antv/g2';

fetch('../data/mobile.json')
  .then((res) => res.json())
  .then((mobiles) => {
    const { DataView } = DataSet;

    // 会通过子节点累加 value 值，所以设置为 0
    mobiles.forEach(function(mobile) {
      mobile.value = null;
    });
    const data = {
      name: 'root',
      children: mobiles,
    };
    const dv = new DataView();
    dv.source(data, {
      type: 'hierarchy',
    }).transform({
      field: 'value',
      type: 'hierarchy.treemap',
      tile: 'treemapResquarify',
      as: ['x', 'y'],
    });
    // 将 DataSet 处理后的结果转换为 G2 接受的数据
    const nodes = [];
    for (const node of dv.getAllNodes()) {
      if (!node.children || node.children.length > 1) {
        const eachNode: any = {
          name: node.data.name,
          x: node.x,
          y: node.y,
          depth: node.depth,
          value: node.value,
        };
        if (!node.data.brand && node.parent) {
          eachNode.brand = node.parent.data.brand;
        } else {
          eachNode.brand = node.data.brand;
        }

        nodes.push(eachNode);
      }
    }
    const chart = new Chart({
      container: 'container',
      autoFit: true,
      height: 500,
    });
    chart.coordinate('polar').reflect('y'); // 习惯性最小的在最下面
    chart.data(nodes);
    chart.axis(false);
    chart.legend(false);
    chart.tooltip({
      showTitle: false,
      showMarker: false
    });
    chart
      .polygon()
      .position('x*y')
      .color('brand')
      .tooltip('name*value', function(name, value) {
        return {
          name,
          value,
        };
      })
      .style({
        lineWidth: 1,
        stroke: '#fff',
      })
      .label(
        'brand*depth*value',
        function(brand, depth, value) {
          if (depth === 1 && value > 1) {
            // 只有第一级显示文本，数值太小时不显示文本
            return {
              content: brand,
            };
          }
        },
        {
          offset: 0,
          style: {
            textBaseline: 'middle',
            fill: '#000',
            shadowBlur: 10,
            shadowColor: '#fff',
          },
          content: (obj) => {
            if (obj.name !== 'root') {
              return obj.name;
            }
          },
        }
      );
    chart.render();
  });
