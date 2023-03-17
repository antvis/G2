import { CustomEvent } from '@antv/g';
import { ELEMENT_CLASS_NAME, PLOT_CLASS_NAME } from '../../../src';

export function seriesTooltipSteps(...points) {
  return ({ canvas }) => {
    const { document } = canvas;
    const plot = document.getElementsByClassName(PLOT_CLASS_NAME)[0];
    const steps = points.map(([x, y]) => ({
      changeState: async () => {
        plot.dispatchEvent(
          new CustomEvent('pointermove', {
            offsetX: x,
            offsetY: y,
          }),
        );
      },
    }));
    return steps;
  };
}

export function tooltipSteps(...index) {
  return ({ canvas }) => {
    const { document } = canvas;
    const elements = document.getElementsByClassName(ELEMENT_CLASS_NAME);
    const steps = index.map((i) => ({
      changeState: async () => {
        elements[i].dispatchEvent(new CustomEvent('pointerover'));
      },
    }));
    return steps;
  };
}

export function tooltipStepsByMarkType(markType, ...index) {
  return ({ canvas }) => {
    const { document } = canvas;
    const elements = document.findAll(
      (element) => element.markType === markType,
    );
    const steps = index.map((i) => ({
      changeState: async () => {
        elements[i].dispatchEvent(new CustomEvent('pointerover'));
      },
    }));
    return steps;
  };
}
