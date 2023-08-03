import { CustomEvent } from '@antv/g';
import { G2Spec } from '../../../src';
import { SLIDER_CLASS_NAME } from '../../../src/interaction/sliderFilter';

export function mockAreaSliderFilterLabel(): G2Spec {
  return {
    type: 'area',
    data: [
      { year: '1991', value: 15468 },
      { year: '1992', value: 16100 },
      { year: '1993', value: 15900 },
      { year: '1994', value: 17409 },
      { year: '1995', value: 17000 },
      { year: '1996', value: 31056 },
      { year: '1997', value: 31982 },
      { year: '1998', value: 32040 },
      { year: '1999', value: 33233 },
    ],
    encode: {
      x: 'year',
      y: 'value',
    },
    labels: [{ text: 'value' }],
    slider: { x: true },
    style: { fillOpacity: 0.4 },
  };
}

export function dispatchValueChange(slider, values = [0.25, 0.75]) {
  slider.update({ values });
  slider.dispatchEvent(
    new CustomEvent('valuechange', {
      detail: {
        value: [0.25, 0.75],
      },
    }),
  );
}

mockAreaSliderFilterLabel.steps = ({ canvas }) => {
  const { document } = canvas;
  const sliders = document.getElementsByClassName(SLIDER_CLASS_NAME);
  const [s1] = sliders;
  return [
    {
      changeState: () => {
        dispatchValueChange(s1);
      },
    },
  ];
};
