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

export function dispatchPointermove(element) {
  const bounds = element.getRenderBounds() ?? element.getBounds();
  const {
    min: [x0, y0],
    max: [x1, y1],
  } = bounds;
  const mx = (x0 + x1) / 2;
  const my = (y0 + y1) / 2;
  element.dispatchEvent(
    new CustomEvent('pointermove', { offsetX: mx, offsetY: my }),
  );
}

export function tooltipSteps(...index) {
  return ({ canvas }) => {
    const { document } = canvas;
    const elements = document.getElementsByClassName(ELEMENT_CLASS_NAME);
    const steps = index.map((i) => ({
      changeState: async () => dispatchPointermove(elements[i]),
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
        elements[i].dispatchEvent(new CustomEvent('pointermove'));
      },
    }));
    return steps;
  };
}
