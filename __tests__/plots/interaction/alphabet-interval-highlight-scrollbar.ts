import { G2Spec, ELEMENT_CLASS_NAME } from '../../../src';
import { disableDelay, step } from './utils';

export function alphabetIntervalHighlightScrollbar(): G2Spec {
  return {
    type: 'interval',
    data: {
      type: 'fetch',
      value: 'data/alphabet.csv',
    },
    transform: [{ type: 'sortX', by: 'y', reverse: true, slice: 5 }],
    encode: {
      x: 'letter',
      y: 'frequency',
    },
    axis: {
      y: { labelFormatter: '.0%' },
    },
    interaction: {
      elementHighlight: { background: true },
    },
    scrollbar: {
      x: { ratio: 0.5 },
    },
  };
}

alphabetIntervalHighlightScrollbar.preprocess = disableDelay;

alphabetIntervalHighlightScrollbar.steps = ({ canvas }) => {
  const { document } = canvas;
  const elements = document.getElementsByClassName(ELEMENT_CLASS_NAME);
  const [firstElement] = elements;

  return [
    // 鼠标hover第一个柱子
    step(firstElement, 'pointerover'),
  ];
};
