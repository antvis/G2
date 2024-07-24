import { G2Spec } from '../../../src';
import { LEGEND_ITEMS_CLASS_NAME } from '../../../src/interaction/legendFilter';
import { step } from './utils';

export function changeSizePolarCrosshairsXYNoElements(): G2Spec {
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

changeSizePolarCrosshairsXYNoElements.steps = ({ canvas }) => {
  const { document } = canvas;
  const elements = document.getElementsByClassName(LEGEND_ITEMS_CLASS_NAME);
  const [e0, e1] = elements;
  return [
    step(e0, 'click'),
    step(e0, 'click'),
    step(e1, 'click'),
    step(e0, 'click'),
  ];
};
