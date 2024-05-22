import { G2Spec, PLOT_CLASS_NAME } from '../../../src';
import { SLIDER_CLASS_NAME } from '../../../src/interaction/sliderFilter';
import { dispatchValueChange } from './appl-line-slider-filter';
import { step } from './utils';

export function stocksLineSlider(): G2Spec {
  return {
    type: 'view',
    data: {
      type: 'fetch',
      value: 'data/stocks.csv',
    },
    encode: {
      x: 'date',
      y: 'price',
      color: 'symbol',
    },
    children: [
      {
        type: 'line',
        tooltip: { items: [{ channel: 'y', valueFormatter: '.1f' }] },
        slider: { x: { formatter: () => '' } },
      },
      {
        type: 'point',
        tooltip: false,
      },
    ],
    interaction: {
      tooltip: {
        crosshairsLineWidth: 10,
        body: false,
      },
    },
  };
}

stocksLineSlider.steps = ({ canvas }) => {
  const { document } = canvas;
  const [s1] = document.getElementsByClassName(SLIDER_CLASS_NAME);
  const [plot] = document.getElementsByClassName(PLOT_CLASS_NAME);
  return [
    {
      changeState: () => {
        dispatchValueChange(s1, [0.1, 1]);
      },
      skip: true,
    },
    step(plot, 'pointermove', {
      offsetX: 50,
      offsetY: 200,
    }),
  ];
};

stocksLineSlider.tooltip = true;
