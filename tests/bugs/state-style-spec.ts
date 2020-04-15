import { Chart, registerShape } from '../../src';
import { createDiv } from '../util/dom';

describe('State style', () => {
  it('state style', () => {
    function getFillAttrs(cfg) {
      return {
        ...cfg.defaultStyle,
        ...cfg.style,
        fill: cfg.color,
        fillOpacity: cfg.opacity,
      };
    }
    function getRectPath(points) {
      const path = [];
      for (let i = 0; i < points.length; i++) {
        const point = points[i];
        if (point) {
          const action = i === 0 ? 'M' : 'L';
          path.push([action, point.x, point.y]);
        }
      }
      const first = points[0];
      path.push(['L', first.x, first.y]);
      path.push(['z']);
      return path;
    }

    // 顶边带圆角
    registerShape('interval', 'top', {
      draw(cfg, container) {
        const attrs = getFillAttrs(cfg);
        let path = getRectPath(cfg.points);
        path = this.parsePath(path); // 将 0 - 1 的值转换为画布坐标
        const radius = (path[2][1] - path[1][1]) / 2;
        const temp = [];
        temp.push(['M', path[0][1], path[0][2]]);
        temp.push(['L', path[1][1], path[1][2] + radius]);
        temp.push(['A', radius, radius, 90, 0, 1, path[1][1] + radius, path[1][2]]);
        temp.push(['L', path[2][1] - radius, path[2][2]]);
        temp.push(['A', radius, radius, 90, 0, 1, path[2][1], path[2][2] + radius]);
        temp.push(['L', path[3][1], path[3][2]]);
        temp.push(['Z']);

        const group = container.addGroup();
        group.addShape('path', {
          attrs: {
            ...attrs,
            path: temp,
          },
        });

        return group;
      },
    });

    // 底边带圆角
    registerShape('interval', 'bottom', {
      draw(cfg, container) {
        const attrs = getFillAttrs(cfg);
        let path = getRectPath(cfg.points);
        path = this.parsePath(path);
        const radius = (path[2][1] - path[1][1]) / 2;
        const temp = [];
        temp.push(['M', path[0][1] + radius, path[0][2]]);
        temp.push(['A', radius, radius, 90, 0, 1, path[0][1], path[0][2] - radius]);
        temp.push(['L', path[1][1], path[1][2]]);
        temp.push(['L', path[2][1], path[2][2]]);
        temp.push(['L', path[3][1], path[3][2] - radius]);
        temp.push(['A', radius, radius, 90, 0, 1, path[3][1] - radius, path[3][2]]);
        temp.push(['Z']);

        const group = container.addGroup();
        group.addShape('path', {
          attrs: {
            ...attrs,
            path: temp,
          },
        });

        return group;
      },
    });

    const data = [
      { year: '2014', type: 'Sales', sales: 1000 },
      { year: '2015', type: 'Sales', sales: 1170 },
      { year: '2016', type: 'Sales', sales: 660 },
      { year: '2017', type: 'Sales', sales: 1030 },
      { year: '2014', type: 'Expenses', sales: 400 },
      { year: '2015', type: 'Expenses', sales: 460 },
      { year: '2016', type: 'Expenses', sales: 1120 },
      { year: '2017', type: 'Expenses', sales: 540 },
      { year: '2014', type: 'Profit', sales: 300 },
      { year: '2015', type: 'Profit', sales: 300 },
      { year: '2016', type: 'Profit', sales: 300 },
      { year: '2017', type: 'Profit', sales: 350 },
    ];

    const chart = new Chart({
      container: createDiv(),
      width: 400,
      height: 300,
      padding: 50,
    });

    chart.data(data);
    chart.scale({
      sales: {
        max: 2400,
        tickInterval: 600,
        nice: true,
      },
    });

    const interval = chart
      .interval()
      .position('year*sales')
      .color('type')
      .size(35)
      .shape('type', (val) => {
        if (val === 'Profit') {
          // 顶部圆角
          return 'bottom';
        } else if (val === 'Sales') {
          // 底部圆角
          return 'top';
        }
      })
      .style({
        stroke: '#545454',
        lineWidth: 2,
      })
      .adjust('stack');
    chart.interaction('element-highlight-by-color');
    chart.render();

    const element = interval.elements[0];
    // @ts-ignore
    const activeStyle = element.getStateStyle('active');
    expect(activeStyle).toEqual(interval.theme.geometries.interval.rect.active.style);
  });
});
