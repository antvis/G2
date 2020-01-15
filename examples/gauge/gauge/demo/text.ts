import { Chart, registerShape } from '@antv/g2';

// 自定义Shape 部分
registerShape('point', 'pointer', {
  draw(cfg, container) {
    const group = container.addGroup({});
    // 获取极坐标系下画布中心点
    const center = this.parsePoint({ x: 0, y: 0 });
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

const data = [{ value: 6 }];
const chart = new Chart({
  container: 'container',
  autoFit: true,
  height: 500,
  padding: [0, 0, 30, 0],
});
chart.data(data);

chart.coordinate('polar', {
  startAngle: (-9 / 8) * Math.PI,
  endAngle: (1 / 8) * Math.PI,
  radius: 0.75,
});
chart.scale('value', {
  min: 0,
  max: 9,
  ticks: [2.25, 3.75, 5.25, 6.75],
});

chart.axis('1', false);
chart.axis('value', {
  line: null,
  label: {
    offset: -30,
    formatter: (val) => {
      if (val === '2.25') {
        return '差';
      } else if (val === '3.75') {
        return '中';
      } else if (val === '5.25') {
        return '良';
      }

      return '优';
    },
    style: {
      fontSize: 18,
      textAlign: 'center',
    },
  },
  tickLine: null,
  grid: null,
});
chart.legend(false);
chart
  .point()
  .position('value*1')
  .shape('pointer')
  .color('#1890FF');

// 绘制仪表盘刻度线
chart.annotation().line({
  start: [3, 0.905],
  end: [3.0035, 0.85],
  style: {
    stroke: '#19AFFA', // 线的颜色
    lineDash: null, // 虚线的设置
    lineWidth: 3,
  },
});
chart.annotation().line({
  start: [4.5, 0.905],
  end: [4.5, 0.85],
  style: {
    stroke: '#19AFFA', // 线的颜色
    lineDash: null, // 虚线的设置
    lineWidth: 3,
  },
});

chart.annotation().line({
  start: [6, 0.905],
  end: [6.0035, 0.85],
  style: {
    stroke: '#19AFFA', // 线的颜色
    lineDash: null, // 虚线的设置
    lineWidth: 3,
  },
});

// 绘制仪表盘背景
chart.annotation().arc({
  top: false,
  start: [0, 1],
  end: [9, 1],
  style: {
    stroke: '#CBCBCB',
    lineWidth: 18,
    lineDash: null,
  },
});

// 绘制指标
chart.annotation().arc({
  start: [0, 1],
  end: [data[0].value, 1],
  style: {
    stroke: '#1890FF',
    lineWidth: 20,
    lineDash: null,
  },
});
// 绘制指标数字
chart.annotation().text({
  position: ['50%', '85%'],
  content: '合格率',
  style: {
    fontSize: 20,
    fill: '#545454',
    textAlign: 'center',
  },
});
chart.annotation().text({
  position: ['50%', '90%'],
  content: `${data[0].value * 10} %`,
  style: {
    fontSize: 36,
    fill: '#545454',
    textAlign: 'center',
  },
  offsetY: 15,
});

chart.render();
