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

  return [ data1, data2 ];
}

const Shape = G2.Shape;
Shape.registerShape('line', 'splitLine', {
  drawShape(cfg, container) {
    const type = cfg.origin[0]._origin.date;
    if (type === 'today') {
      const pointArrs = splitData(cfg.points);
      const path1 = [];
      for (let i = 0; i < pointArrs[0].length; i++) {
        let pre = 'L';
        if (i === 0) pre = 'M';
        path1.push([ pre, pointArrs[0][i].x, pointArrs[0][i].y ]);
      }
      const line1 = container.addShape('path', {
        attrs: {
          path: path1,
          stroke: '#1890ff',
          lineWidth: 2
        }
      });
      const path2 = [];
      for (let i = 0; i < pointArrs[1].length; i++) {
        let pre = 'L';
        if (i === 0) pre = 'M';
        path2.push([ pre, pointArrs[1][i].x, pointArrs[1][i].y ]);
      }
      container.addShape('path', {
        attrs: {
          path: path2,
          stroke: '#1890ff',
          lineWidth: 2,
          lineDash: [ 5, 2 ],
          opacity: 0.7
        }
      });

      return line1;

    }
    const path = [];
    for (let i = 0; i < cfg.points.length; i++) {
      let pre = 'L';
      if (i === 0) pre = 'M';
      path.push([ pre, cfg.points[i].x, cfg.points[i].y ]);
    }
    const line = container.addShape('path', {
      attrs: {
        path,
        stroke: '#ced4d9',
        lineWidth: 2
      }
    });
    return line;

    // end of if
  }
});

Shape.registerShape('point', 'breathPoint', {
  drawShape(cfg, container) {
    const data = cfg.origin._origin;
    const point = { x: cfg.x, y: cfg.y };
    if (data.time === '14.20' && data.date === 'today') {
      const decorator1 = container.addShape('circle', {
        attrs: {
          x: point.x,
          y: point.y,
          r: 10,
          fill: '#1890ff',
          opacity: 0.5
        }
      });
      const decorator2 = container.addShape('circle', {
        attrs: {
          x: point.x,
          y: point.y,
          r: 10,
          fill: '#1890ff',
          opacity: 0.5
        }
      });
      const decorator3 = container.addShape('circle', {
        attrs: {
          x: point.x,
          y: point.y,
          r: 10,
          fill: '#1890ff',
          opacity: 0.5
        }
      });
      decorator1.animate({
        r: 20,
        opacity: 0,
        repeat: true
      }, 1800, 'easeLinear');
      decorator2.animate({
        r: 20,
        opacity: 0,
        repeat: true
      }, 1800, 'easeLinear', () => { }, 600);
      decorator3.animate({
        r: 20,
        opacity: 0,
        repeat: true
      }, 1800, 'easeLinear', () => { }, 1200);
      container.addShape('circle', {
        attrs: {
          x: point.x,
          y: point.y,
          r: 6,
          fill: '#1890ff',
          opacity: 0.7
        }
      });
      container.addShape('circle', {
        attrs: {
          x: point.x,
          y: point.y,
          r: 1.5,
          fill: '#1890ff'
        }
      });
    }
  }
});

fetch('../data/cpu-data.json')
  .then(res => res.json())
  .then(data => {
    const chart = new G2.Chart({
      container: 'container',
      forceFit: true,
      height: 500,
      padding: [ 20, 100, 50, 50 ]
    });

    chart.axis('time', {
      label: {
        textStyle: {
          fill: '#aaaaaa'
        }
      }
    });
    chart.axis('cpu', {
      label: {
        textStyle: {
          fill: '#aaaaaa'
        }
      }
    });
    chart.tooltip({
      crosshairs: false
    });
    chart.legend({
      attachLast: true
    });

    chart.source(data, {
      time: {
        min: 13.00,
        max: 15.00
      },
      cpu: {
        max: 100,
        min: 0
      }
    });
    chart.line().position('time*cpu').shape('splitLine')
      .color('date', [ '#1890ff', '#ced4d9' ]);
    chart.point().position('time*cpu').shape('breathPoint');
    chart.guide().regionFilter({
      top: true,
      start: [ 'min', 105 ],
      end: [ 'max', 85 ],
      color: '#ff4d4f'
    });
    chart.guide().line({
      start: [ 'min', 85 ],
      end: [ 'max', 85 ],
      lineStyle: {
        stroke: '#595959',
        lineWidth: 1,
        lineDash: [ 3, 3 ]
      },
      text: {
        position: 'start',
        style: {
          fill: '#8c8c8c',
          fontSize: 15,
          fontWeight: 'normal'
        },
        content: '预警线 85%',
        offsetY: -5
      }
    });

    chart.render();
  });
