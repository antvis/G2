import { Chart, registerShape } from '@antv/g2';

// 自定义Shape 部分
registerShape('point', 'pointer', {
  draw(cfg, container) {
    const group = container.addGroup();
    const center = this.parsePoint({ x: 0, y: 0 }); // 获取极坐标系下画布中心点
    // 绘制指针
    group.addShape('line', {
      attrs: {
        x1: center.x,
        y1: center.y,
        x2: cfg.x,
        y2: cfg.y,
        stroke: cfg.color,
        lineWidth: 5,
        lineCap: 'round',
      },
    });
    group.addShape('circle', {
      attrs: {
        x: center.x,
        y: center.y,
        r: 9.75,
        stroke: cfg.color,
        lineWidth: 4.5,
        fill: '#fff',
      },
    });

    return group;
  },
});

const data = [{ value: 5.6 }];
const chart = new Chart({
  container: 'container',
  height: 500,
  padding: [0, 0, 30, 0],
});
chart.data(data);
chart.scale('value', {
  min: 0,
  max: 9,
  tickInterval: 1,
  nice: false,
});
chart.coordinate('polar', {
  startAngle: (-9 / 8) * Math.PI,
  endAngle: (1 / 8) * Math.PI,
  radius: 0.75,
});

chart.axis('1', false);
chart.axis('value', {
  line: null,
  label: {
    offset: -16,
    style: {
      fontSize: 18,
      textAlign: 'center',
      textBaseline: 'middle',
    },
  },
  subTickLine: {
    count: 4,
    style: {
      stroke: '#fff',
      strokeOpacity: 1,
    },
    length: -8,
  },
  tickLine: {
    length: -17,
    style: {
      stroke: '#fff',
      strokeOpacity: 1,
    },
  },
  grid: null,
});
chart.legend(false);
chart
  .point()
  .position('value*1')
  .shape('pointer')
  .color('#1890FF');

// // 绘制仪表盘背景
// chart.annotation().arc({
//   top: false,
//   start: [0, 0.945],
//   end: [9, 0.945],
//   style: { // 底灰色
//     stroke: '#CBCBCB',
//     lineWidth: 18
//   }
// });
// // 绘制指标
// chart.annotation().arc({
//   zIndex: 1,
//   start: [0, 0.945],
//   end: [data[0].value, 0.945],
//   style: {
//     stroke: '#1890FF',
//     lineWidth: 18
//   }
// });
// // 绘制指标数字
// chart.annotation().text({
//   position: ['50%', '95%'],
//   content: '合格率'
//   // html: '<div style="width: 300px;text-align: center;">'
//   //   + '<p style="font-size: 20px; color: #545454;margin: 0;">合格率</p>'
//   //   + '<p style="font-size: 36px;color: #545454;margin: 0;">' + data[0].value * 10 + '%</p>'
//   //   + '</div>'
// });

chart.render();
