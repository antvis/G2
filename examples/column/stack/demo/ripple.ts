import { Chart, Util } from '@antv/g2';

const data = [
  { type: '分类一', sold: 275 },
  { type: '分类二', sold: 115 },
  { type: '分类三', sold: 120 },
  { type: '分类四', sold: 350 },
];

const chart = new Chart({
  container: 'container', // 指定图表容器 ID
  autoFit: true,
  height: 500,
  padding: [0, 80, 60, 0],
});

chart.data(data);

chart.coordinate('polar', {
  radius: 0.85, // 为了美观，缩小下坐标系半径
}); // 配置坐标系
chart.axis(false); // 不展示坐标轴
chart.legend({
  marker: {
    symbol: 'square', // 改变图例 marker 的形状
  },
}); // 配置图例

chart.tooltip({
  showMarkers: false, // 关闭 tooltip marker
});

const interval = chart
  .interval()
  .position('1*sold')
  .adjust('stack')
  .color('type', ['#40a9ff', '#1890ff', '#096dd9', '#0050b3'])
  .state({
    active: {
      style: {
        stroke: null,
        fillOpacity: 0.65,
      },
    }, // 修改 active 样式
  });

chart.interaction('element-active');
chart.animate(false);

chart.on('afterrender', () => {
  // label 绘制图层
  const foregroundGroup = chart.foregroundGroup;
  let labelGroup = foregroundGroup.findById('customLabels');
  if (labelGroup) {
    labelGroup.clear();
  } else {
    labelGroup = chart.foregroundGroup.addGroup({
      capture: false,
      id: 'customLabels'
    });
  }
  const offset = 30; // 拐点折线的长度
  const textOffset = 8;
  const elements = interval.elements;
  const coordinate = chart.getCoordinate();
  const center = coordinate.getCenter();
  const radius = coordinate.getRadius();

  const count = elements.length;
  let preWidth = 0;
  let firstPoint1; // 第一个 label 的第一个点
  let firstPoint2; // 第一个 label 的拐点

  for (let i = 0; i < count; i++) {
    const label = labelGroup.addGroup();
    const element = elements[i];
    const originData = element.getData();
    const mappingData = element.getModel();
    if (i === count - 1) {
      // 最后一个图形 label 横着长
      label.addShape('path', {
        attrs: {
          path: [
            ['M', center.x, center.y],
            ['L', center.x + radius + offset, center.y],
          ],
          stroke: mappingData.color,
          lineWidth: 1,
        },
      });
      label.addShape('text', {
        attrs: {
          x: center.x + radius + offset + textOffset,
          y: center.y,
          text: originData.type + originData.sold,
          textBaseline: 'middle',
          fill: '#000',
        },
      });
    } else {
      const nextElement = elements[i + 1];
      const nextBBox = nextElement.getBBox();
      const bbox = element.getBBox();
      // 第一个点
      const width = bbox.maxX - nextBBox.maxX;
      const pointRadius = radius - preWidth - (width / 2);
      const point1 = Util.polarToCartesian(center.x, center.y, pointRadius, - 3 * Math.PI / 8 + (Math.PI / 8) * i);
      let point2;
      if (i === 0) {
        point2 = {
          x: bbox.maxX,
          y: bbox.minY
        };
        firstPoint2 = point2;
        firstPoint1 = point1;
      } else {
        point2 = {
          x: Math.min(firstPoint2.x + point1.x - firstPoint1.x, elements[0].getBBox().maxX),
          y: firstPoint2.y + point1.y - firstPoint1.y,
        };
      }

      const point3 = {
        x: point2.x + offset,
        y: point2.y
      };
      label.addShape('path', {
        attrs: {
          path: [
            ['M', point1.x, point1.y],
            ['L', point2.x, point2.y],
            ['L', point3.x, point3.y],
          ],
          stroke: mappingData.color,
          lineWidth: 1,
        },
      });
      label.addShape('text', {
        attrs: {
          x: point3.x + textOffset, // 加个偏移量
          y: point3.y,
          text: originData.type + ': ' + originData.sold,
          textBaseline: 'middle',
          fill: '#000',
        },
      });
      preWidth += width;
    }
  }
});

chart.render();
