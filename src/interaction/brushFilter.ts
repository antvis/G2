import { deepMix } from '@antv/util';
import { subObject } from '../utils/helper';
import { selectionOf } from '../utils/scale';
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
    emitter,
    scale,
    coordinate,
    selection,
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
    event.nativeEvent = true;
    filter(selection(x, y, x1, y1), event);
    brush.remove();
  }

  // Reset when dblclick.
  function click(e) {
    if (isDblclick(e)) {
      e.nativeEvent = true;
      reset(e);
    }
  }

  const onFilter = ({ nativeEvent, data }) => {
    if (nativeEvent) return;
    const { selection } = data;
    filter(selection, { nativeEvent: false });
  };
  emitter.on('brush:filter', onFilter);

  return () => {
    brush.destroy();
    emitter.off('brush:filter', onFilter);
    root.removeEventListener('click', click);
  };
}

export function BrushFilter({ hideX = true, hideY = true, ...rest }) {
  return (target, viewInstances, emitter) => {
    const { container, view, options: viewOptions, update, setState } = target;
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

    const { scale, coordinate } = view;
    return brushFilter(plotArea, {
      brushRegion: (x, y, x1, y1) => [x, y, x1, y1],
      selection: (x, y, x1, y1) => {
        const { scale, coordinate } = newView;
        return selectionOf(x, y, x1, y1, scale, coordinate);
      },
      filter: async (selection, event) => {
        // Avoid redundant filter.
        if (filtering) return;
        filtering = true;

        // Update the domain of x and y scale to filter data.
        const [domainX, domainY] = selection;

        setState('brushFilter', (options) => {
          const { marks } = options;
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
                // Set nice to false to avoid modify domain.
                scale: {
                  x: { domain: domainX, nice: false },
                  y: { domain: domainY, nice: false },
                },
              },
            ),
          );

          return {
            ...viewOptions,
            marks: newMarks,
            clip: true, // Clip shapes out of plot area.
          };
        });

        // Emit event.
        emitter.emit('brush:filter', {
          ...event,
          data: { selection: [domainX, domainY] },
        });

        const newState = await update();
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
        emitter.emit('brush:filter', {
          ...event,
          data: { selection: [domainX, domainY] },
        });
        filtered = false;
        newView = view;
        setState('brushFilter');
        update();
      },
      extent: undefined,
      emitter,
      scale,
      coordinate,
      ...defaultOptions,
      ...rest,
    });
  };
}
