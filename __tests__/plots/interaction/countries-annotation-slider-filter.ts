import { G2Spec } from '../../../src';
import { SLIDER_CLASS_NAME } from '../../../src/interaction/sliderFilter';
import { dispatchValueChange } from './appl-line-slider-filter';

export function countriesAnnotationSliderFilter(): G2Spec {
  return {
    type: 'view',
    data: {
      type: 'fetch',
      value: 'data/countries.json',
    },
    children: [
      { type: 'lineX', data: [0] },
      { type: 'lineY', data: [0] },
      {
        type: 'range',
        data: [
          { x: [-25, 0], y: [-30, 0], region: '1' },
          { x: [-25, 0], y: [0, 20], region: '2' },
          { x: [0, 5], y: [-30, 0], region: '2' },
          { x: [0, 5], y: [0, 20], region: '1' },
        ],
        encode: { x: 'x', y: 'y' },
        style: {
          fillOpacity: 0.2,
          fill: (d) => (d.region === '1' ? '#d8d0c0' : '#a3dda1'),
        },
      },
      {
        type: 'point',
        encode: {
          x: 'change in female rate',
          y: 'change in male rate',
          size: 'pop',
          color: 'continent',
          shape: 'point',
        },
        scale: {
          color: {
            range: ['#ffd500', '#82cab2', '#193442', '#d18768', '#7e827a'],
          },
          x: { nice: true },
          y: { nice: true },
          size: { range: [4, 30] },
        },
        legend: { size: false },
        style: { stroke: '#bbb', fillOpacity: 0.8 },
        axis: { x: { title: 'Female' }, y: { title: 'Male' } },
        slider: {
          x: { labelFormatter: (d) => d.toFixed(1) },
          y: { labelFormatter: (d) => d.toFixed(1) },
        },
        tooltip: {
          items: [
            { channel: 'x', valueFormatter: '.1f' },
            { channel: 'y', valueFormatter: '.1f' },
          ],
        },
      },
      {
        type: 'text',
        style: {
          text: 'Population',
          x: '100%',
          y: '100%',
          dx: -10,
          dy: -10,
          textAlign: 'end',
          fontSize: 50,
          textBaseline: 'bottom',
        },
      },
    ],
  };
}

countriesAnnotationSliderFilter.steps = ({ canvas }) => {
  const { document } = canvas;
  const sliders = document.getElementsByClassName(SLIDER_CLASS_NAME);
  const [s1, s2] = sliders;
  return [
    {
      changeState: () => {
        dispatchValueChange(s1);
      },
    },
    {
      changeState: () => {
        dispatchValueChange(s2);
      },
    },
  ];
};
