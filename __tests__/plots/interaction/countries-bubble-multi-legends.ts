import { G2Spec } from '../../../src';
import { LEGEND_ITEMS_CLASS_NAME } from '../../../src/interaction/legendFilter';
import { SLIDER_CLASS_NAME } from '../../../src/interaction/sliderFilter';
import { dispatchValueChange } from './appl-line-slider-filter';
import { step } from './utils';

export function countriesBubbleMultiLegends(): G2Spec {
  return {
    type: 'point',
    padding: 'auto',
    data: {
      type: 'fetch',
      value: 'data/countries.json',
    },
    encode: {
      x: 'change in female rate',
      y: 'change in male rate',
      size: 'pop',
      color: 'continent',
      shape: 'point',
    },
    scale: {
      color: { range: ['#ffd500', '#82cab2', '#193442', '#d18768', '#7e827a'] },
      x: { nice: true },
      y: { nice: true },
      size: { range: [4, 30] },
    },
    style: { stroke: '#bbb', fillOpacity: 0.8 },
    slider: {
      x: { labelFormatter: (d) => d.toFixed(1) },
      y: { labelFormatter: (d) => d.toFixed(1) },
    },
  };
}

countriesBubbleMultiLegends.steps = ({ canvas }) => {
  const { document } = canvas;
  const elements = document.getElementsByClassName(LEGEND_ITEMS_CLASS_NAME);
  const [e0] = elements;
  const sliders = document.getElementsByClassName(SLIDER_CLASS_NAME);
  const [s1] = sliders;
  return [
    step(e0, 'click'),
    {
      changeState: () => {
        dispatchValueChange(s1);
      },
    },
  ];
};
