import { deepMix } from '@antv/util';
import { subObject } from '../utils/helper';
import { invert, domainOf } from '../utils/scale';
import { brush as createBrush } from './brushHighlight';
import { selectPlotArea } from './utils';

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
  function brushcreated(x, y, x1, y1, event) {
    filter(x, y, x1, y1, event);
    brush.remove();
  }

  // Reset when dblclick.
  function click(e) {
    if (isDblclick(e)) reset(e);
  }

  return () => {
    brush.destroy();
    root.removeEventListener('click', click);
  };
}

export function BrushFilter({ hideX = true, hideY = true, ...rest }) {
  return (target, viewInstances, emitter) => {
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
      filter: async (x, y, x1, y1, event) => {
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
        const domainX = domainOf(scaleX, [p0[0], p1[0]]);
        const domainY = domainOf(scaleY, [p0[1], p1[1]]);
        const newMarks = marks.map((mark) =>
          deepMix(
            {
              // Hide label to keep smooth transition.
              axis: {
                ...(hideX && { x: { transform: [{ type: 'hide' }] } }),
                ...(hideY && { y: { transform: [{ type: 'hide' }] } }),
              },
            },
            mark,
            {
              scale: {
                x: { domain: domainX },
                y: { domain: domainY },
              },
            },
          ),
        );

        // Emit event.
        event.data = event.data || {};
        event.data.selection = [domainX, domainY];
        emitter.emit('brush:filter', event);

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
      reset: (event) => {
        if (filtering || !filtered) return;

        // Emit event.
        const { scale } = view;
        const { x: scaleX, y: scaleY } = scale;
        const domainX = scaleX.getOptions().domain;
        const domainY = scaleY.getOptions().domain;
        event.data = event.data || {};
        event.data.selection = [domainX, domainY];
        emitter.emit('brush:filter', event);

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
