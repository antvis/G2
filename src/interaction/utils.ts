import { least } from 'd3-array';
import { Selection } from '../utils/selection';

export function getAllElements(selection: Selection) {
  return selection
    .selectAll('.element')
    .nodes()
    .map((element) => {
      const { __data__: datum } = element;
      const {
        seriesX = [],
        seriesY = [],
        seriesTooltip = [],
        seriesTitle = [],
      } = datum;

      if (seriesX.length) {
        return seriesX.map((_, i) => {
          return {
            ...element,
            __data__: {
              ...datum,
              x: seriesX[i],
              y: seriesY[i],
              title: seriesTitle[i],
              tooltip: seriesTooltip[i],
            },
          };
        });
      }
      return element;
    })
    .flat();
}

export function getClosestElement(
  elements: any[],
  scale: any,
  tick: number,
  dim = 'x',
): any | null {
  let value = tick;
  // Discrete scale.
  if (scale.getRange) {
    const range = scale.getRange();
    for (let i = 0; i < range.length; i++) {
      const v = range[i];
      const invertedValue = scale.invert(v);
      const bandW = scale.getBandWidth(invertedValue);
      const step = scale.getStep(invertedValue);
      const gap = (step - bandW) / 2;

      if (tick >= v - gap && tick < v + bandW + gap) {
        value = v;
        break;
      }
    }
  }

  if (value) {
    return least(elements, ({ __data__: data }) => (data[dim] - value) ** 2);
  }

  return null;
}
