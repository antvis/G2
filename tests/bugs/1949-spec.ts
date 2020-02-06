import { Chart, registerShape } from '../../src';
import { COMPONENT_TYPE } from '../../src/constant';
import { CPU_DATA } from '../util/data';
import { createDiv } from '../util/dom';

function splitData(data) {
  const marker = data.length - Math.floor(data.length * 0.4);
  const data1 = [];
  const data2 = [];
  for (let i = 0; i < data.length; i++) {
    const d = data[i];
    if (i <= marker) {
      data1.push(d);
    } else {
      data2.push(d);
    }
  }
  data1.push(data2[0]);

  return [data1, data2];
}

registerShape('line', 'split-line', {
  draw(cfg: any, container) {
    const type = cfg.data[0].date;
    if (type === 'today') {
      const pointArrs = splitData(cfg.points);
      const path1 = [];
      for (let i = 0; i < pointArrs[0].length; i++) {
        let pre = 'L';
        if (i === 0) {
          pre = 'M';
        }
        path1.push([pre, pointArrs[0][i].x, pointArrs[0][i].y]);
      }
      const line1 = container.addShape('path', {
        attrs: {
          path: path1,
          stroke: '#1890ff',
          lineWidth: 2,
        },
      });
      const path2 = [];
      for (let i = 0; i < pointArrs[1].length; i++) {
        let pre = 'L';
        if (i === 0) {
          pre = 'M';
        }
        path2.push([pre, pointArrs[1][i].x, pointArrs[1][i].y]);
      }
      container.addShape('path', {
        attrs: {
          path: path2,
          stroke: '#1890ff',
          lineWidth: 2,
          lineDash: [5, 2],
          opacity: 0.7,
        },
      });

      return container;
    }
    const path = [];
    for (let i = 0; i < cfg.points.length; i++) {
      let pre = 'L';
      if (i === 0) {
        pre = 'M';
      }
      path.push([pre, cfg.points[i].x, cfg.points[i].y]);
    }
    const line = container.addShape('path', {
      attrs: {
        path,
        stroke: '#ced4d9',
        lineWidth: 2,
      },
    });
    return line;
  },
});

registerShape('point', 'breath-point', {
  draw(cfg: any, container) {
    const data = cfg.data;
    const point = { x: cfg.x, y: cfg.y };
    if (data.time === '14.20' && data.date === 'today') {
      const decorator1 = container.addShape('circle', {
        attrs: {
          x: point.x,
          y: point.y,
          r: 10,
          fill: '#1890ff',
          opacity: 0.5,
        },
      });
      const decorator2 = container.addShape('circle', {
        attrs: {
          x: point.x,
          y: point.y,
          r: 10,
          fill: '#1890ff',
          opacity: 0.5,
        },
      });
      const decorator3 = container.addShape('circle', {
        attrs: {
          x: point.x,
          y: point.y,
          r: 10,
          fill: '#1890ff',
          opacity: 0.5,
        },
      });
      decorator1.animate(
        {
          r: 20,
          opacity: 0,
        },
        {
          duration: 1800,
          easing: 'easeLinear',
          repeat: true,
        }
      );
      decorator2.animate(
        {
          r: 20,
          opacity: 0,
        },
        {
          duration: 1800,
          easing: 'easeLinear',
          repeat: true,
          delay: 600,
        }
      );
      decorator3.animate(
        {
          r: 20,
          opacity: 0,
        },
        {
          duration: 1800,
          easing: 'easeLinear',
          repeat: true,
          delay: 1200,
        }
      );
      container.addShape('circle', {
        attrs: {
          x: point.x,
          y: point.y,
          r: 6,
          fill: '#1890ff',
          opacity: 0.7,
        },
      });
      container.addShape('circle', {
        attrs: {
          x: point.x,
          y: point.y,
          r: 1.5,
          fill: '#1890ff',
        },
      });
    }
  },
});

describe('#1949', () => {
  const chart = new Chart({
    container: createDiv(),
    height: 500,
    width: 500,
  });

  chart.data(CPU_DATA);

  chart.scale({
    cpu: {
      max: 100,
      min: 0,
    },
  });

  chart.axis('time', {
    label: {
      style: {
        fill: '#aaaaaa',
      },
    },
  });

  chart.axis('cpu', {
    label: {
      style: {
        fill: '#aaaaaa',
      },
    },
  });

  chart
    .line()
    .position('time*cpu')
    .color('date', ['#1890ff', '#ced4d9'])
    .shape('split-line');
  chart
    .point()
    .position('time*cpu')
    .shape('breath-point');
  chart.annotation().regionFilter({
    top: true,
    start: ['min', 85],
    end: ['max', 105],
    color: '#ff4d4f',
  });
  chart.annotation().line({
    start: ['min', 85],
    end: ['max', 85],
    style: {
      stroke: '#595959',
      lineWidth: 1,
      lineDash: [3, 3],
    },
    text: {
      position: 'start',
      style: {
        fill: '#8c8c8c',
        fontSize: 15,
        fontWeight: 'normal',
      },
      content: '预警线 85%',
      offsetY: -5,
    },
  });

  it('regionFilter rendered', () => {
    chart.render();
    const regionFilter = chart
      .getComponents()
      .filter((co) => co.type === COMPONENT_TYPE.ANNOTATION && co.extra?.type === 'regionFilter')[0].component;

    expect(regionFilter).toBeDefined();
    expect(regionFilter.get('type')).toEqual('regionFilter');
    expect(regionFilter.get('shapes')).toHaveLength(4);
  });
});
