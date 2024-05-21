import { G2Spec, PLOT_CLASS_NAME } from '../../../src';
import { step } from './utils';

export async function changeSizePolarCrosshairsXY(): Promise<G2Spec> {
  const data = [
    { item: 'Design', type: 'a', score: 70 },
    { item: 'Design', type: 'b', score: 30 },
    { item: 'Development', type: 'a', score: 60 },
    { item: 'Development', type: 'b', score: 70 },
    { item: 'Marketing', type: 'a', score: 50 },
    { item: 'Marketing', type: 'b', score: 60 },
    { item: 'Users', type: 'a', score: 40 },
    { item: 'Users', type: 'b', score: 50 },
    { item: 'Test', type: 'a', score: 60 },
    { item: 'Test', type: 'b', score: 70 },
    { item: 'Language', type: 'a', score: 70 },
    { item: 'Language', type: 'b', score: 50 },
    { item: 'Technology', type: 'a', score: 50 },
    { item: 'Technology', type: 'b', score: 40 },
    { item: 'Support', type: 'a', score: 30 },
    { item: 'Support', type: 'b', score: 40 },
    { item: 'Sales', type: 'a', score: 60 },
    { item: 'Sales', type: 'b', score: 40 },
    { item: 'UX', type: 'a', score: 50 },
    { item: 'UX', type: 'b', score: 60 },
  ];

  return {
    type: 'view',
    coordinate: {
      type: 'polar',
    },
    scale: {
      x: { padding: 0.5, align: 0 },
      y: { tickCount: 5, domainMax: 80 },
    },
    autoFit: true,
    data,
    interaction: {
      legendFilter: false,
      elementPointMove: true,
      tooltip: {
        crosshairs: true,
        crosshairsStroke: 'red',
        crosshairsLineDash: [4, 4],
      },
    },
    axis: {
      x: {
        grid: true,
        gridStrokeWidth: 1,
        tick: false,
        gridLineDash: [0, 0],
      },
      y: {
        zIndex: 1,
        title: false,
        gridConnect: 'line',
        gridStrokeWidth: 1,
        gridLineDash: [0, 0],
      },
    },
    children: [
      {
        type: 'area',
        encode: {
          x: 'item',
          y: 'score',
          color: 'type',
          key: 'type',
        },
        style: {
          fillOpacity: 0.5,
        },
      },
      {
        type: 'line',
        encode: {
          x: 'item',
          y: 'score',
          color: 'type',
          key: 'type',
        },
        style: {
          lineWidth: 2,
        },
      },
    ],
  };
}

changeSizePolarCrosshairsXY.tooltip = true;

changeSizePolarCrosshairsXY.steps = ({ canvas }) => {
  const { document } = canvas;
  const [plot] = document.getElementsByClassName(PLOT_CLASS_NAME);
  return [
    step(plot, 'pointermove', {
      offsetX: 100,
      offsetY: 350,
    }),
    step(plot, 'pointermove', {
      offsetX: 176,
      offsetY: 350,
    }),
  ];
};
