
fetch('../data/mobile.json')
  .then(res => res.json())
  .then(mobiles => {
    const { DataView } = DataSet;
    // 会通过子节点累加 value 值，所以设置为 0
    mobiles.forEach(function(mobile) {
      mobile.value = null;
    });
    const data = {
      name: 'root',
      children: mobiles
    };
    const dv = new DataView();
    dv.source(data, {
      type: 'hierarchy'
    }).transform({
      field: 'value',
      type: 'hierarchy.treemap',
      tile: 'treemapResquarify',
      as: [ 'x', 'y' ]
    });
    const nodes = dv.getAllNodes();
    nodes.map(function(node) {
      node.name = node.data.name;
      if (!node.data.brand && node.parent) {
        node.brand = node.parent.data.brand;
      } else {
        node.brand = node.data.brand;
      }
      // node.value = node.data.value;
      return node;
    });
    const chart = new G2.Chart({
      container: 'container',
      forceFit: true,
      height: 500,
      padding: 0,
      animate: false
    });
    chart.coord().scale(1, -1); // 习惯性最小的在最下面
    chart.source(nodes);
    chart.scale({
      x: {
        nice: false
      },
      y: {
        nice: false
      }
    });
    chart.axis(false);
    chart.legend(false);
    chart.tooltip({
      showTitle: false
    });
    chart.polygon().position('x*y')
      .color('brand')
      .tooltip('name*value', function(name, value) {
        return {
          name,
          value
        };
      })
      .style({
        lineWidth: 1,
        stroke: '#fff'
      })
      .label('brand*depth*value', function(brand, depth, value) {
        if (depth === 1 && value > 0.2) { // 只有第一级显示文本，数值太小时不显示文本
          return brand;
        }
      }, {
        offset: 0,
        textStyle: {
          textBaseline: 'middle',
          fill: '#000',
          shadowBlur: 10,
          shadowColor: '#fff'
        },
        formatter(val) {
          if (val !== 'root') {
            return val;
          }
        }
      });
    chart.render();
  });
