import { Line, Text } from '@antv/g';
import { deepMix, throttle } from '@antv/util';
import {
  max,
  min,
  rollup,
  sort,
  bisectCenter,
  bisector,
  group,
} from 'd3-array';
import { G2Element } from 'utils/selection';
import { subObject } from '../utils/helper';
import {
  ELEMENT_CLASS_NAME,
  G2Mark,
  G2MarkState,
  LABEL_CLASS_NAME,
} from '../runtime';
import { selectPlotArea, mousePosition } from './utils';

function maybeTransform(options) {
  const { transform = [] } = options;
  const normalizeY = transform.find((d) => d.type === 'normalizeY');
  if (normalizeY) return normalizeY;
  const newNormalizeY = { type: 'normalizeY' };
  transform.push(newNormalizeY);
  options.transform = transform;
  return newNormalizeY;
}

function markValue(
  markState: Map<G2Mark, G2MarkState>,
  markName: string,
  channels: string[],
) {
  const [value] = Array.from(markState.entries())
    .filter(([mark]) => mark.type === markName)
    .map(([mark]) => {
      const { encode } = mark;
      const channel = (name) => {
        const channel = encode[name];
        return [name, channel ? channel.value : undefined];
      };
      return Object.fromEntries(channels.map(channel));
    });
  return value;
}

/**
 * @todo Perf
 */
export function ChartIndex({
  wait = 20,
  leading,
  trailing = false,
  labelFormatter = (date) => `${date}`,
  ...style
}: Record<string, any>) {
  return (context) => {
    const { view, container, update, setState } = context;
    const { markState, scale, coordinate } = view;

    // Get line mark value, exit if it is not existed.
    const value = markValue(markState, 'line', ['x', 'y', 'series']);
    if (!value) return;

    // Prepare channel value.
    const { y: Y, x: X, series: S = [] } = value;
    const I = Y.map((_, i) => i);
    const sortedX: number[] = sort(I.map((i) => X[i]));

    // Prepare shapes.
    const plotArea = selectPlotArea(container);
    const lines = container.getElementsByClassName(ELEMENT_CLASS_NAME);
    const labels = container.getElementsByClassName(
      LABEL_CLASS_NAME,
    ) as G2Element[];

    // The format of label key: `${elementKey}-index`,
    // group labels by elementKey.
    const keyofLabel = (d) => d.__data__.key.split('-')[0];
    const keyLabels = group(labels, keyofLabel);

    const rule = new Line({
      style: {
        x1: 0,
        y1: 0,
        x2: 0,
        y2: plotArea.getAttribute('height'),
        stroke: 'black',
        lineWidth: 1,
        ...subObject(style, 'rule'),
      },
    });
    const text = new Text({
      style: {
        x: 0,
        y: plotArea.getAttribute('height'),
        text: '',
        fontSize: 10,
        ...subObject(style, 'label'),
      },
    });
    rule.append(text);
    plotArea.appendChild(rule);

    // Get the closet date to the rule.
    const dateByFocus = (coordinate, scaleX, focus) => {
      const [normalizedX] = coordinate.invert(focus);
      const date = scaleX.invert(normalizedX);
      return sortedX[bisectCenter(sortedX, date)];
    };

    // Update rule and label content.
    const updateRule = (focus, date) => {
      rule.setAttribute('x1', focus[0]);
      rule.setAttribute('x2', focus[0]);
      text.setAttribute('text', labelFormatter(date));
    };

    // Store the new inner state alter rerender the view.
    let newView;

    // Rerender the view to update basis for each line.
    const updateBasisByRerender = async (focus) => {
      // Find the closetDate to the rule.
      const { x: scaleX } = scale;
      const date = dateByFocus(coordinate, scaleX, focus);

      updateRule(focus, date);

      setState('chartIndex', (options) => {
        // Clone options and get line mark.
        const clonedOptions = deepMix({}, options);
        const lineMark = clonedOptions.marks.find((d) => d.type === 'line');

        // Update domain of y scale for the line mark.
        const r = (I: number[]) => max(I, (i) => +Y[i]) / min(I, (i) => +Y[i]);
        const k = max(rollup(I, r, (i) => S[i]).values());
        const domainY = [1 / k, k];
        deepMix(lineMark, {
          scale: { y: { domain: domainY } },
        });
        // Update normalize options.
        const normalizeY = maybeTransform(lineMark);
        normalizeY.groupBy = 'color';
        normalizeY.basis = (I, Y) => {
          const i = I[bisector((i) => X[+i]).center(I, date)];
          return Y[i];
        };
        // Disable animation.
        for (const mark of clonedOptions.marks) mark.animate = false;
        return clonedOptions;
      });

      const newState = await update('chartIndex');
      newView = newState.view;
    };

    // Only apply translate to update basis for each line.
    // If performance is ok, there is no need to use this
    // strategy to update basis.
    const updateBasisByTranslate = (focus) => {
      // Find the closetDate to the rule.
      const { scale, coordinate } = newView;
      const { x: scaleX, y: scaleY } = scale;
      const date = dateByFocus(coordinate, scaleX, focus);

      updateRule(focus, date);

      // Translate mark and label for better performance.
      for (const line of lines) {
        // Compute transform in y direction.
        const { seriesIndex: SI, key } = line.__data__;
        const i = SI[bisector((i) => X[+i]).center(SI, date)];
        const p0 = [0, scaleY.map(1)]; // basis point
        const p1 = [0, scaleY.map(Y[i] / Y[SI[0]])];
        const [, y0] = coordinate.map(p0);
        const [, y1] = coordinate.map(p1);
        const dy = y0 - y1;
        line.setAttribute('transform', `translate(0, ${dy})`);

        // Update line and related label.
        const labels = keyLabels.get(key) || [];
        for (const label of labels) {
          // @todo Replace with style.transform.
          // It now has unexpected behavior.
          label.setAttribute('dy', dy);
        }
      }
    };

    const updateBasis = throttle(
      (event) => {
        const focus = mousePosition(plotArea, event);
        if (!focus) return;
        updateBasisByTranslate(focus);
      },
      wait,
      { leading, trailing },
    ) as (...args: any[]) => void;

    updateBasisByRerender([0, 0]);

    plotArea.addEventListener('pointerenter', updateBasis);
    plotArea.addEventListener('pointermove', updateBasis);
    plotArea.addEventListener('pointerleave', updateBasis);

    return () => {
      rule.remove();
      plotArea.removeEventListener('pointerenter', updateBasis);
      plotArea.removeEventListener('pointermove', updateBasis);
      plotArea.removeEventListener('pointerleave', updateBasis);
    };
  };
}

ChartIndex.props = {
  reapplyWhenUpdate: true,
};
