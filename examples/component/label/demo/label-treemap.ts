import DataSet from '@antv/data-set';
import { Chart } from '@antv/g2';

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/mobile.json')
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
      padding: 0,
      localRefresh: false,
    });
    chart.coordinate().scale(1, -1); // 习惯性最小的在最下面
    chart.data(nodes);
    chart.axis(false);
    chart.legend(false);
    chart.tooltip(false);
    chart
      .polygon()
      .position('x*y')
      .color('brand')
      .style({
        lineWidth: 0.5,
        stroke: 'rgba(255,255,255,0.65)',
      })
      .tooltip('name*brand*value')
      .label(
        'brand*depth*name',
        (brand, depth, name) => {
          if (depth > 1 || name === '其他') {
            // 只有第一级显示文本，数值太小时不显示文本
            return {
              content: name,
              style: {
                shadowColor: 'rgba(0,0,0,0.5)',
                shadowBlur: 3,
              },
              offset: 0,
            };
          }
          return null;
        },
        {
          layout: {
            type: 'limit-in-shape',
          },
        }
      );
    chart.render();
  });
