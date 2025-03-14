import { Chart } from '@antv/g2';

const chart = new Chart({ container: 'container', height: 350 });
const shapeList = ['bowtie', 'smooth', 'hv', 'rect', 'hollowPoint'];
const data = [
  { genre: 'Sports', sold: 50 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
];
chart.options({
  type: 'interval',
  data,
  encode: { x: 'genre', y: 'sold', color: 'genre' },
  legend: {
    color: {
      size: 100,
      itemWidth: 120,
      // itemMarker
      itemMarker: (d, index) => shapeList[index],
      // itemLabel
      itemLabelFill: 'red',
      // itemValue
      itemValueText: (d, index) => data[index]['sold'],
      // itemBackground
      itemBackgroundFill: (d) => d.color,
      itemBackgroundFillOpacity: 0.2,
    },
  },
});

chart.render();
