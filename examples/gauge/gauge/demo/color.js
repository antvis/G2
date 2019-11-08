function creatData() {
  const data = [];
  let val = Math.random() * 6;
  val = val.toFixed(1);
  data.push({ value: val * 1 });
  return data;
}

const Shape = G2.Shape;
// 自定义Shape 部分
Shape.registerShape('point', 'pointer', {
  drawShape(cfg, group) {
    const center = this.parsePoint({ // 获取极坐标系下画布中心点
      x: 0,
      y: 0
    });
    // 绘制指针
    group.addShape('line', {
      attrs: {
        x1: center.x,
        y1: center.y,
        x2: cfg.x,
        y2: cfg.y,
        stroke: cfg.color,
        lineWidth: 5,
        lineCap: 'round'
      }
    });
    return group.addShape('circle', {
      attrs: {
        x: center.x,
        y: center.y,
        r: 9.75,
        stroke: cfg.color,
        lineWidth: 4.5,
        fill: '#fff'
      }
    });
  }
});

const color = [ '#0086FA', '#FFBF00', '#F5222D' ];
const chart = new G2.Chart({
  container: 'container',
  forceFit: true,
  height: 500,
  padding: [ 0, 0, 30, 0 ],
  animate: false
});
chart.source(creatData());

chart.coord('polar', {
  startAngle: -9 / 8 * Math.PI,
  endAngle: 1 / 8 * Math.PI,
  radius: 0.75
});
chart.scale('value', {
  min: 0,
  max: 6,
  tickInterval: 1,
  nice: false
});

chart.axis('1', false);
chart.axis('value', {
  zIndex: 2,
  line: null,
  label: {
    offset: -20,
    textStyle: {
      fontSize: 18,
      fill: '#CBCBCB',
      textAlign: 'center',
      textBaseline: 'middle'
    }
  },
  tickLine: {
    length: -24,
    stroke: '#fff',
    strokeOpacity: 1
  },
  grid: null
});
chart.legend(false);
chart.point().position('value*1')
  .shape('pointer')
  .color('value', val => {
    if (val < 2) {
      return color[0];
    } else if (val <= 4) {
      return color[1];
    } else if (val <= 6) {
      return color[2];
    }
  })
  .active(false);

draw(creatData());
setInterval(function() {
  draw(creatData());
}, 1000);

function draw(data) {
  const val = data[0].value;
  const lineWidth = 25;
  chart.guide().clear();
  // 绘制仪表盘背景
  chart.guide().arc({
    zIndex: 0,
    top: false,
    start: [ 0, 0.92 ],
    end: [ 6, 0.92 ],
    style: { // 底灰色
      stroke: '#CBCBCB',
      lineWidth
    }
  });

  val >= 2 && chart.guide().arc({
    zIndex: 1,
    start: [ 0, 0.92 ],
    end: [ val, 0.92 ],
    style: {
      stroke: color[0],
      lineWidth
    }
  });

  val >= 4 && chart.guide().arc({
    zIndex: 1,
    start: [ 2, 0.92 ],
    end: [ 4, 0.92 ],
    style: {
      stroke: color[1],
      lineWidth
    }
  });

  val > 4 && val <= 6 && chart.guide().arc({
    zIndex: 1,
    start: [ 4, 0.92 ],
    end: [ val, 0.92 ],
    style: {
      stroke: color[2],
      lineWidth
    }
  });

  val > 2 && val <= 4 && chart.guide().arc({
    zIndex: 1,
    start: [ 2, 0.92 ],
    end: [ val, 0.92 ],
    style: {
      stroke: color[1],
      lineWidth
    }
  });

  val < 2 && chart.guide().arc({
    zIndex: 1,
    start: [ 0, 0.92 ],
    end: [ val, 0.92 ],
    style: {
      stroke: color[0],
      lineWidth
    }
  });

  // 绘制指标数字
  chart.guide().html({
    position: [ '50%', '95%' ],
    html: '<div style="width: 300px;text-align: center;">'
      + '<p style="font-size: 20px; color: #545454;margin: 0;">完成率</p>'
      + '<p style="font-size: 36px;color: #545454;margin: 0;">' + val * 10 + '%</p>'
      + '</div>'
  });
  chart.changeData(data);
}
