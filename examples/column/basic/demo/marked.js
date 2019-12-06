import { Chart, registerShape } from '@antv/g2';

const data = [
  { name: 'MODIFY', value: 138, washaway: 0.21014492753623193 },
  { name: 'PRERELEASE', value: 109, washaway: 0.5596330275229358 },
  { name: 'RELEASING', value: 48, washaway: 0 },
];

const colorSet = {
  MODIFY: '#4FAAEB',
  PRERELEASE: '#9AD681',
  RELEASING: '#FED46B',
};

registerShape('interval', 'textInterval', {
  draw(cfg, container) {
    const points = this.parsePoints(cfg.points); // 将0-1空间的坐标转换为画布坐标
    const origin = cfg.data;
    const value = origin.value;
    container.addShape('text', {
      attrs: {
        text: value,
        textAlign: 'center',
        x: points[1].x + cfg.size / 2,
        y: points[1].y,
        fontFamily: 'PingFang SC',
        fontSize: 12,
        fill: '#BBB',
      },
    });
    return container.addShape('polygon', {
      attrs: {
        points: points.map((point) => [point.x, point.y]),
        fill: cfg.color,
      },
    });
  },
});

registerShape('interval', 'fallFlag', {
  getPoints({ x, y, y0, size }) {
    return [
      { x: x + size, y: y0 + size },
      { x, y },
    ];
  },
  draw(cfg, container) {
    const origin = cfg.data;
    if (_.isEqual(origin, data[data.length - 1])) {
      return;
    }

    const points = this.parsePoints(cfg.points); // 将0-1空间的坐标转换为画布坐标
    const p1 = points[0];
    const width = 9;
    const washaway = origin.washaway;
    container.addShape('text', {
      attrs: {
        text: `${(washaway * 100).toFixed(1)} %`,
        x: p1.x - width / 2 - 14,
        y: p1.y - 14,
        fontFamily: 'PingFang SC',
        fontSize: 12,
        fill: '#BBB',
      },
    });
    return container.addShape('image', {
      attrs: {
        x: p1.x - 16,
        y: p1.y - 16,
        img: 'https://zos.alipayobjects.com/rmsportal/JuBdciUyUAkewNAetxtS.png',
        width: 32,
        height: 32,
      },
    });
  },
});

const chart = new Chart({
  container: 'container',
  height: 500,
});

chart.legend(false);
chart.data(data);
chart.scale({
  value: {
    alias: '访问数',
  },
  name: {
    alias: '步骤名称',
  },
});

chart.axis('name', {
  title: null,
});

chart
  .interval()
  .position('name*value')
  .shape('textInterval')
  .color('name', (value) => colorSet[value])
  .size(30);

chart
  .interval()
  .position('name*value')
  .color('#E4E4E4')
  .shape('fallFlag');

chart.render();
