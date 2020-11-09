import { Chart, registerShape } from '@antv/g2';

registerShape('point', 'pointer', {
  draw(cfg, group) {
    const point = cfg.points[0];
    const center = this.parsePoint({ x: 0, y: 0 });
    const target = this.parsePoint({ x: point.x, y: 0.9 });
    const dir_vec = { x: center.x - target.x, y: center.y - target.y };
    // normalize
    const length = Math.sqrt(dir_vec.x * dir_vec.x + dir_vec.y * dir_vec.y);
    dir_vec.x *= (1 / length);
    dir_vec.y *= (1 / length);
    // rotate dir_vector by -90 and scale
    const angle1 = -Math.PI / 2;
    const x_1 = Math.cos(angle1) * dir_vec.x - Math.sin(angle1) * dir_vec.y;
    const y_1 = Math.sin(angle1) * dir_vec.x + Math.cos(angle1) * dir_vec.y;
    // rotate dir_vector by 90 and scale
    const angle2 = Math.PI / 2;
    const x_2 = Math.cos(angle2) * dir_vec.x - Math.sin(angle2) * dir_vec.y;
    const y_2 = Math.sin(angle2) * dir_vec.x + Math.cos(angle2) * dir_vec.y;
    // polygon vertex
    const path = [
      ['M', target.x + x_1 * 1, target.y + y_1 * 1],
      ['L', center.x + x_1 * 3, center.y + y_1 * 3],
      ['L', center.x + x_2 * 3, center.y + y_2 * 3],
      ['L', target.x + x_2 * 1, target.y + y_2 * 1],
      ['Z']
    ];
    const tick = group.addShape('path', {
      attrs: {
        path,
        fill: cfg.color
      }
    });
    return tick;
  }
});


const data = [
  { type: '新注册', value: 0.42 },
  { type: '老用户', value: 0.68 },
  { type: '新订单用户', value: 0.21 }
];
const chart = new Chart({
  container: 'container',
  autoFit: true,
  height: 500,
});
chart.data(data);
chart.coordinate('polar', {
  startAngle: -10 / 8 * Math.PI,
  endAngle: 2 / 8 * Math.PI,
  radius: 0.75
});
chart.scale('value', {
  min: 0,
  max: 1,
  tickInterval: 1,
});
chart.axis(false);
chart.facet('rect', {
  fields: ['type'],
  showTitle: false,
  eachView: function eachView(view, facet) {
    const data = facet.data[0];
    // 指针
    view
      .point()
      .position('value*1')
      .shape('pointer')
      .color('#d8d8d8')
      .animate({
        appear: {
          animation: 'fade-in',
        },
      });
    // 仪表盘背景
    view.annotation().arc({
      top: false,
      start: [0, 1],
      end: [1, 1],
      style: {
        stroke: '#ebedf0',
        lineWidth: 10
      }
    });
    // 仪表盘前景
    view.annotation().arc({
      start: [0, 1],
      end: [data.value, 1],
      style: {
        stroke: '#1890ff',
        lineWidth: 10
      }
    });
    // 仪表盘信息
    const percent = parseInt(data.value * 100, 10);

    view.annotation().text({
      position: ['50%', '70%'],
      content: data.type,
      style: {
        fontSize: 14,
        fill: '#8c8c8c',
        fontWeight: 300,
        textAlign: 'center'
      },
      offsetX: 0
    });
    view.annotation().text({
      position: ['50%', '75%'],
      content: `${percent}%`,
      style: {
        fontSize: 34,
        fill: '#000',
        fontWeight: 500,
        textAlign: 'center'
      },
      offsetX: 0,
      offsetY: 10
    });
  }
});
chart.render();
