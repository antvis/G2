import { G2Spec } from '../../../src';

export function intervalLegendMultipleScale(): G2Spec {
  return {
    autoFit: true,
    type: 'view',
    height: 250,
    paddingRight: 15,
    data: [
      { month: 'Jan', city: 'Tokyo', temperature: 7 },
      { month: 'Jan', city: 'London', temperature: 3.9 },
      { month: 'Feb', city: 'Tokyo', temperature: 6.9 },
      { month: 'Feb', city: 'London', temperature: 4.2 },
      { month: 'Mar', city: 'Tokyo', temperature: 9.5 },
      { month: 'Mar', city: 'London', temperature: 5.7 },
      { month: 'Apr', city: 'Tokyo', temperature: 14.5 },
      { month: 'Apr', city: 'London', temperature: 8.5 },
      { month: 'May', city: 'Tokyo', temperature: 18.4 },
      { month: 'May', city: 'London', temperature: 11.9 },
      { month: 'Jun', city: 'Tokyo', temperature: 21.5 },
      { month: 'Jun', city: 'London', temperature: 15.2 },
      { month: 'Jul', city: 'Tokyo', temperature: 25.2 },
      { month: 'Jul', city: 'London', temperature: 17 },
      { month: 'Aug', city: 'Tokyo', temperature: 26.5 },
      { month: 'Aug', city: 'London', temperature: 16.6 },
      { month: 'Sep', city: 'Tokyo', temperature: 23.3 },
      { month: 'Sep', city: 'London', temperature: 14.2 },
      { month: 'Oct', city: 'Tokyo', temperature: 18.3 },
      { month: 'Oct', city: 'London', temperature: 10.3 },
      { month: 'Nov', city: 'Tokyo', temperature: 13.9 },
      { month: 'Nov', city: 'London', temperature: 6.6 },
      { month: 'Dec', city: 'Tokyo', temperature: 9.6 },
      { month: 'Dec', city: 'London', temperature: 4.8 },
    ],
    children: [
      {
        type: 'line',
        encode: {
          x: 'month',
          y: 'temperature',
          color: 'city',
          series: 'city',
        },
      },
      {
        type: 'link',
        data: [{ x: 'Jan', x1: 'Sep', y: 7, y1: 23.3 }],
        encode: {
          x: ['x', 'x1'],
          y: ['y', 'y1'],
          color: () => 'Link',
        },
        scale: {
          color: {
            range: ['#000000'],
            key: 'Link',
          },
        },
      },
    ],
  };
}

intervalLegendMultipleScale.steps = ({ canvas }) => {
  const { document } = canvas;
  const linkLegend = document.getElementsByClassName('g2-legend-item')[2];
  const normalLegend = document.getElementsByClassName('g2-legend-item')[0];

  return [
    {
      changeState: async () => {
        linkLegend?.dispatchEvent(
          new CustomEvent('click', {
            offsetX: 5,
            offsetY: 5,
          }),
        );
      },
    },
    {
      changeState: async () => {
        normalLegend?.dispatchEvent(
          new CustomEvent('click', {
            offsetX: 5,
            offsetY: 5,
          }),
        );
      },
    },
  ];
};
