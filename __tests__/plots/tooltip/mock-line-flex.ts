import { CustomEvent } from '@antv/g';
import { G2Spec, PLOT_CLASS_NAME } from '../../../src';

export function mockLineFlex(): G2Spec {
  return {
    type: 'spaceFlex',
    width: 928,
    height: 320,
    paddingLeft: 90,
    paddingBottom: 60,
    children: [
      {
        type: 'view',
        data: [
          { x: 1, y: 2 },
          { x: 2, y: 6 },
          { x: 3, y: 4 },
          { x: 4, y: 9 },
        ],
        axis: {
          x: { title: 'X', line: true, lineLineWidth: 1, grid: false },
          y: {
            title: 'Y',
            line: true,
            lineLineWidth: 1,
            grid: true,
            gridLineWidth: 2,
          },
        },
        children: [{ type: 'line', encode: { x: 'x', y: 'y' } }],
      },
      {
        type: 'view',
        data: [
          { x: 1, y: 3 },
          { x: 2, y: 6 },
          { x: 3, y: 7 },
          { x: 4, y: 9 },
        ],
        axis: {
          x: { title: 'X', line: true, lineLineWidth: 1, grid: false },
          y: {
            title: 'Y',
            line: true,
            lineLineWidth: 1,
            grid: true,
            gridLineWidth: 2,
          },
        },
        children: [{ type: 'line', encode: { x: 'x', y: 'y' } }],
      },
    ],
  };
}

mockLineFlex.steps = ({ canvas }) => {
  const { document } = canvas;
  const plot = document.getElementsByClassName(PLOT_CLASS_NAME)[1];
  return [
    {
      changeState: async () => {
        plot.dispatchEvent(
          // @ts-ignore
          new CustomEvent('pointermove', {
            offsetX: 600,
            offsetY: 50,
          }),
        );
      },
    },
  ];
};
