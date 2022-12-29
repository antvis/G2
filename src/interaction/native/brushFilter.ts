import { deepMix } from '@antv/util';
import { bisectLeft, sort } from 'd3-array';
import { subObject } from '../../utils/helper';
import { selectPlotArea } from './utils';
import { brush as createBrush } from './brushHighlight';

// Mock dblclick events.
function dblclick(interval = 300) {
  let preTimeStamp = null;
  return (e) => {
    const { timeStamp } = e;
    if (preTimeStamp !== null && timeStamp - preTimeStamp < interval) {
      preTimeStamp = timeStamp;
      return true;
    }
    preTimeStamp = timeStamp;
    return false;
  };
}

export function brushFilter(
  root,
  {
    filter,
    reset,
    brushRegion,
    extent: optionalExtent,
    reverse,
    series = false,
    ...rest
  },
) {
  const brushStyle = subObject(rest, 'mask');
  const { width: rootWidth, height: rootHeight } = root.getBBox();
  const extent = optionalExtent
    ? optionalExtent
    : [0, 0, rootWidth, rootHeight];
  const isDblclick = dblclick();

  const brush = createBrush(root, {
    ...brushStyle,
    extent,
    brushRegion,
    reverse,
    brushcreated,
  });

  root.addEventListener('click', click);

  // Filter when brush created.
  function brushcreated(x, y, x1, y1) {
    filter(x, y, x1, y1);
    brush.remove();
  }

  // Reset when dblclick.
  function click(e) {
    if (isDblclick(e)) reset();
  }

  return () => {
    brush.destroy();
    root.removeEventListener('dblclick', click);
  };
}

function isOrdinalScale(scale) {
  return scale.getBandWidth;
}

function constrain(x, lo, hi) {
  return Math.min(hi, Math.max(lo, x));
}

function invert(scale, x, start) {
  if (!isOrdinalScale(scale)) return scale.invert(x);
  const { adjustedRange } = scale;
  const { domain } = scale.getOptions();
  const offset = start ? -1 : 0;
  const step = scale.getStep();
  const range = start ? adjustedRange : adjustedRange.map((d) => d + step);
  // R[i0 - 1] < x <= R[i0]
  const i0 = bisectLeft(range, x);
  const i1 = constrain(i0 + offset, 0, domain.length - 1);
  return domain[i1];
}

function domainOf(scale, values) {
  if (!isOrdinalScale(scale)) return sort(values);
  const { domain } = scale.getOptions();
  const [v1, v2] = values;
  const start = domain.indexOf(v1);
  const end = domain.indexOf(v2);
  return domain.slice(start, end + 1);
}

export function BrushFilter({ ...rest }) {
  return (target, viewInstances) => {
    const { container, view, options: viewOptions, update } = target;
    const plotArea = selectPlotArea(container);
    const defaultOptions = {
      maskFill: '#777',
      maskFillOpacity: '0.3',
      maskStroke: '#fff',
      unhighlightedOpacity: 0.5,
      reverse: false,
    };

    let filtered = false;
    let filtering = false;
    let newView = view;

    return brushFilter(plotArea, {
      brushRegion: (x, y, x1, y1) => [x, y, x1, y1],
      filter: async (x, y, x1, y1) => {
        // Avoid redundant filter.
        if (filtering) return;
        filtering = true;

        // Invert visual range to abstract domain.
        const { scale, coordinate } = newView;
        const { x: scaleX, y: scaleY } = scale;
        const abstractDomain = (point, start) => {
          const [x, y] = coordinate.invert(point);
          return [invert(scaleX, x, start), invert(scaleY, y, start)];
        };
        const p0 = abstractDomain([x, y], true);
        const p1 = abstractDomain([x1, y1], false);

        // Update the domain of x and y scale to filter data.
        const { marks } = viewOptions;
        const newMarks = marks.map((mark) =>
          deepMix({}, mark, {
            scale: {
              x: { domain: domainOf(scaleX, [p0[0], p1[0]]) },
              y: { domain: domainOf(scaleY, [p0[1], p1[1]]) },
            },
          }),
        );

        // Rerender and update view.
        const newOptions = {
          ...viewOptions,
          marks: newMarks,
          clip: true, // Clip shapes out of plot area.
        };
        const newState = await update(newOptions);
        newView = newState.view;
        filtering = false;
        filtered = true;
      },
      reset: () => {
        if (filtering || !filtered) return;
        filtered = false;
        newView = view;
        update(viewOptions);
      },
      extent: undefined,
      ...defaultOptions,
      ...rest,
    });
  };
}
