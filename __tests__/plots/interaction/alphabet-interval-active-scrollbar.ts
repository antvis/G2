import { G2Spec, ELEMENT_CLASS_NAME } from '../../../src';
import { SLIDER_CLASS_NAME } from '../../../src/interaction/sliderFilter';
import { disableDelay, step } from './utils';
import { dispatchValueChange } from './appl-line-slider-filter';

export function alphabetIntervalActiveScrollbar(): G2Spec {
  return {
    type: 'interval',
    data: {
      type: 'fetch',
      value: 'data/alphabet.csv',
    },
    encode: {
      x: 'letter',
      y: 'frequency',
      color: 'steelblue',
    },
    scale: { x: { padding: 0.5 } },
    slider: { x: true },
    transform: [{ type: 'sortX', by: 'y', reverse: true }],
    state: { active: { fill: 'red' } },
    interaction: { elementHighlight: { background: true } },
  };
}

alphabetIntervalActiveScrollbar.steps = ({ canvas }) => {
  const { document } = canvas;
  const sliders = document.getElementsByClassName(SLIDER_CLASS_NAME);
  const [s1] = sliders;
  return [
    {
      changeState: () => {
        dispatchValueChange(s1);
      },
      skip: true,
    },
    {
      changeState: () => {
        const elements = document.getElementsByClassName(ELEMENT_CLASS_NAME);
        const [e] = elements;
        return step(e, 'pointerover').changeState();
      },
    },
  ];
};
