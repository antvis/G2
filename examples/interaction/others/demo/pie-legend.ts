import { Chart } from '@antv/g2';

const data = [
  { item: '事例一', count: 40, percent: 0.4 },
  { item: '事例二', count: 21, percent: 0.21 },
  { item: '事例三', count: 17, percent: 0.17 },
  { item: '事例四', count: 13, percent: 0.13 },
  { item: '事例五', count: 9, percent: 0.09 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
  height: 500,
});

chart.coordinate('theta', {
  radius: 0.75,
  innerRadius: 0.5,
});

chart.data(data);

chart.scale('percent', {
  formatter: val => {
    val = val * 100 + '%';
    return val;
  },
});

chart.tooltip(false);

// 声明需要进行自定义图例字段： 'item'
chart.legend('item', {
  position: 'right',                                  // 配置图例显示位置
  custom: true,                                       // 关键字段，告诉 G2，要使用自定义的图例
  items: data.map((obj, index) => {
    return {
      name: obj.item,                                 // 对应 itemName
      value: obj.percent,                             // 对应 itemValue
      marker: {
        symbol: 'square',                             // marker 的形状
        style: {
          r: 5,                                       // marker 图形半径
          fill: chart.getTheme().colors10[index],     // marker 颜色，使用默认颜色，同图形对应
        },
      },                                              // marker 配置
    };
  }),
  itemValue: {
    style: {
      fill: '#999',
    },                                               // 配置 itemValue 样式
    formatter: val => `${val * 100}%`                // 格式化 itemValue 内容
  },
});

chart
  .interval()
  .adjust('stack')
  .position('percent')
  .color('item')
  .style({
    fillOpacity: 1,
  })
  .state({
    active: {
      style: element => {
        const shape = element.shape;
        return {
          lineWidth: 10,
          stroke: shape.attr('fill'),
          strokeOpacity: shape.attr('fillOpacity'),
        };
      },
    },
  });

// 移除图例点击过滤交互
chart.removeInteraction('legend-filter');
chart.interaction('element-active');

chart.render();

// 监听 element 上状态的变化来动态更新 Annotation 信息
chart.on('element:statechange', (ev) => {
  const { state, stateStatus, element } = ev.gEvent.originalEvent;

  // 本示例只需要监听 active 的状态变化
  if (state === 'active') {
    const data = element.getData();
    if (stateStatus) {
      // 更新 Annotation
      updateAnnotation(data);
    } else {
      // 隐藏 Annotation
      clearAnnotation();
    }
  }
});

// 绘制 annotation
let lastItem;
function updateAnnotation(data) {
  if (data.item !== lastItem) {
    chart.annotation().clear(true);
    chart
      .annotation()
      .text({
        position: ['50%', '50%'],
        content: data.item,
        style: {
          fontSize: 20,
          fill: '#8c8c8c',
          textAlign: 'center',
        },
        offsetY: -20,
      })
      .text({
        position: ['50%', '50%'],
        content: data.count,
        style: {
          fontSize: 28,
          fill: '#8c8c8c',
          textAlign: 'center',
        },
        offsetX: -10,
        offsetY: 20,
      })
      .text({
        position: ['50%', '50%'],
        content: '台',
        style: {
          fontSize: 20,
          fill: '#8c8c8c',
          textAlign: 'center',
        },
        offsetY: 20,
        offsetX: 20,
      });
    chart.render(true);
    lastItem = data.item;
  }
}

// 清空 annotation
function clearAnnotation() {
  chart.annotation().clear(true);
  chart.render(true);
  lastItem = null;
}
