import insertCss from 'insert-css';

insertCss(`
  .g2-label-item {
    font-size: 12px;
    color: #ffffff;
    text-shadow: 0px 0px 2px #595959;
  }
`);

const otherRatio = 6.67 / 100; // Other 的占比
const otherOffsetAngle = otherRatio * Math.PI; // other 占的角度的一半
const data = [
  { type: '微博', value: 93.33 },
  { type: '其他', value: 6.67 }
];
const other = [
  { type: '论坛', value: 1.77 },
  { type: '网站', value: 1.44 },
  { type: '微信', value: 1.12 },
  { type: '客户端', value: 1.05 },
  { type: '新闻', value: 0.81 },
  { type: '视频', value: 0.39 },
  { type: '博客', value: 0.37 },
  { type: '报刊', value: 0.17 }
];
const chart = new G2.Chart({
  container: 'container',
  forceFit: true,
  height: 500,
  padding: [ 0, 20, 0, 0 ]
});
chart.legend(false);
const view1 = chart.view({
  start: {
    x: 0,
    y: 0
  },
  end: {
    x: 0.5,
    y: 1
  }
});
view1.coord('theta', {
  radius: 0.7,
  startAngle: 0 + otherOffsetAngle,
  endAngle: Math.PI * 2 + otherOffsetAngle
});
view1.source(data);
view1.intervalStack().position('value').color('type', [ '#38c060', '#2593fc' ])
  .opacity(1)
  .label('value', function() {
    return {
      offset: -10,
      useHtml: true,
      htmlTemplate: (text, item) => {
        const d = item.point;
        const percent = text + '%';
        return '<span class="g2-label-item">' + d.type + '<br/>' + percent + '</span>';
      }
    };
  });

const view2 = chart.view({
  start: {
    x: 0.5,
    y: 0.1
  },
  end: {
    x: 1,
    y: 0.9
  }
});
view2.axis(false);
view2.source(other, {
  value: {
    nice: false
  }
});
view2.intervalStack().position('1*value').color('type', [ '#063d8a', '#0b53b0', '#1770d6', '#2593fc', '#47abfc', '#6dc1fc', '#94d6fd', '#bbe7fe' ])
  .label('value', {
    position: 'right',
    offsetX: 5,
    offsetY: 10,
    formatter: (text, item) => {
      const d = item.point;
      return d.type + ' ' + d.value + '%';
    }
  });
chart.render();
drawLinkArea();
chart.on('afterpaint', function() {
  drawLinkArea();
});

/* ---------绘制连接区间-----------*/
function drawLinkArea() {
  const canvas = chart.get('canvas');
  const container = chart.get('backPlot');
  const view1_coord = view1.get('coord');
  const center = view1_coord.center;
  const radius = view1_coord.radius;
  const interval_geom = chart.getAllGeoms()[1];
  const interval_container = interval_geom.get('shapeContainer');
  const interval_bbox = interval_container.getBBox();
  const view2_coord = view2.get('coord');
  // area points
  const pie_start1 = {
    x: center.x + Math.cos(Math.PI * 2 - otherOffsetAngle) * radius,
    y: center.y + Math.sin(Math.PI * 2 - otherOffsetAngle) * radius
  };
  const pie_start2 = {
    x: center.x + Math.cos(otherOffsetAngle) * radius,
    y: center.y + Math.sin(otherOffsetAngle) * radius
  };
  const interval_end1 = {
    x: interval_bbox.minX,
    y: view2_coord.end.y
  };
  const interval_end2 = {
    x: interval_bbox.minX,
    y: view2_coord.start.y
  };
  const path = [
    [ 'M', pie_start1.x, pie_start1.y ],
    [ 'L', pie_start2.x, pie_start2.y ],
    [ 'L', interval_end2.x, interval_end2.y ],
    [ 'L', interval_end1.x, interval_end1.y ],
    [ 'Z' ]
  ];
  container.addShape('path', {
    attrs: {
      path,
      fill: '#e9f4fe'
    }
  });
  canvas.draw();
}
