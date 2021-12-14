import * as G2 from '@antv/g2';

const LATEST_FLAG = 'LATEST_FLAG';

function getIntervalRectPath(points, isClosed = true) {
  const path = [];
  const firstPoint = points[0];
  path.push(['M', firstPoint.x, firstPoint.y]);
  for (let i = 1, len = points.length; i < len; i++) {
    path.push(['L', points[i].x, points[i].y]);
  }
  // 对于 shape="line" path 不应该闭合，否则会造成 lineCap 绘图属性失效
  if (isClosed) {
    path.push(['L', firstPoint.x, firstPoint.y]); // 需要闭合
    path.push(['z']);
  }
  return path;
}

G2.registerAnimation('label-update', (element, animateCfg, cfg) => {
  const startX = element.attr('x');
  const startY = element.attr('y');
  // @ts-ignore
  const finalX = cfg.toAttrs.x;
  // @ts-ignore
  const finalY = cfg.toAttrs.y;

  const labelContent = element.attr('text')
  // @ts-ignore
  const finalContent = cfg.toAttrs.text;

  const distanceX = finalX - startX;
  const distanceY = finalY - startY;
  const numberDiff = +finalContent - +labelContent;

  element.animate((ratio) => {
    const positionX = startX + distanceX * ratio;
    const positionY = startY + distanceY * ratio;
    const value = +labelContent + numberDiff * ratio

    return {
      x: positionX,
      y: positionY,
      text: value.toFixed(0),
    };
  }, animateCfg);
});

G2.registerShape('interval', 'blink-interval', {
  draw(cfg, container) {
    const group = container.addGroup();
    const path = this.parsePath(getIntervalRectPath(cfg.points));
    const { color, style = {}, defaultStyle } = cfg;
    const fillColor = color || style.fill || defaultStyle.fill;

    const height = path[1][2] - path[0][2];
    const width = path[3][1] - path[0][1];
    const x = path[0][1];
    const y = path[0][2];
    group.addShape('path', {
      attrs: {
        ...style,
        path,
        fill: fillColor,
        x,
        y,
        width,
        height,
      },
      name: 'interval',
    });

    const data = cfg.data;
    group.addShape('rect', {
      attrs: {
        x,
        y,
        width,
        height,
        fill: `l(90) 0:${fillColor} 1:rgba(255,255,255,0.23)`,
        opacity: data[LATEST_FLAG] ? 1 : 0,
      },
      name: 'blink-interval',
    });

    return group;
  },
});

G2.registerAnimation('appear-interval', (shape, animateCfg, cfg) => {
  const growInY = G2.getAnimation('scale-in-y');
  growInY(shape, animateCfg, cfg);

  const blinkShape = shape.getParent().findAllByName('blink-interval')[0];
  if (blinkShape) {
    const { height } = blinkShape.attr();
    blinkShape.attr('height', 0);
    blinkShape.animate(
      {
        height: height,
      },
      {
        duration: 1000,
        easing: 'easeQuadOut',
        repeat: true
      }
    );
  }
});

G2.registerAnimation('blink-interval', (element, animateCfg, cfg) => {
  const container = element.getParent();

  const shape = container.findAllByName('interval')[0];
  const blinkShape = container.findAllByName('blink-interval')[0];

  if (shape && cfg.toAttrs.path) {
    shape.animate(cfg.toAttrs, animateCfg);
  }

  if (blinkShape) {
    blinkShape.stopAnimate(true);
    blinkShape.attr({ x: cfg.toAttrs.x, y: cfg.toAttrs.y });
    blinkShape.attr({ height: 0, width: cfg.toAttrs.width });
    blinkShape.animate(
      {
        height: cfg.toAttrs.height,
      },
      {
        duration: 1000,
        easing: 'easeQuadOut',
        delay: 50,
        repeat: true,
      }
    );
  }
});

fetch('https://gw.alipayobjects.com/os/antfincdn/xXg6cUV0lV/column.json').then(data => data.json()).then(data => {
  const chart = new G2.Chart({
    container: 'container',
    autoFit: true,
    height: 500,
    padding: [20, 40]
  });

  chart.data(data.map((d, idx) => ({ ...d, [LATEST_FLAG]: idx === data.length - 1 })));
  chart.axis('month', {
    label: {
      autoHide: true,
      autoRotate: false,
    },
  });
  chart.scale('value', { nice: true })
  chart.interval()
    .position('month*value')
    .shape('blink-interval')
    .animate({
      appear: {
        animation: 'appear-interval',
      },
      update: {
        animation: 'blink-interval',
      }
    }).label('value', {
      content: (datum) => {
        if (datum[LATEST_FLAG]) {
          return datum.value;
        }
        return "";
      },
      animate: {
        update: {
          animation: "label-update",
          duration: 300,
          easing: "easeLinear",
        },
      },
    });

  chart.render();

  let timer = 0;

  const interval = setInterval(() => {
    const chartData = chart.getData();
    chart.changeData(chartData.map((d) => ({ ...d, value: d[LATEST_FLAG] ? d.value + (Math.random() * 50 | 0) : d.value })))

    timer++;
    if (timer > 500) {
      clearInterval(interval);
    }
  }, 2000);
});

