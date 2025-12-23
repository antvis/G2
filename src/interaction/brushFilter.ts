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
    if (x === x1 && y === y1) return;
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

export function BrushFilter({
  hideX = true,
  hideY = true,
  history = false,
  ...rest
}) {
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
    const brushHistory = [];
    const { scale, coordinate } = view;
    const updateScale = (options, domainX, domainY) => {
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
    };
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

        setState('brushFilter', (options) =>
          updateScale(options, domainX, domainY),
        );
        if (history) {
          brushHistory.push({
            domain: selection,
            view: newView,
          });
        }
        // Emit event.
        emitter.emit('brush:filter', {
          ...event,
          data: {
            ...(history ? { history: brushHistory } : {}),
            selection: [domainX, domainY],
          },
        });
        const newState = await update();
        newView = newState.view;
        filtering = false;
        filtered = true;
      },
      reset: async (event) => {
        if (filtering || !filtered) return;
        event.nativeEvent = true;

        // Restore previous brush state
        if (brushHistory.length > 1) {
          brushHistory.pop();

          // Get the last brush state
          const { domain, view: lastView } =
            brushHistory[brushHistory.length - 1];

          const [domainX, domainY] = domain;
          newView = lastView;

          // update scale
          setState('brushFilter', (options) =>
            updateScale(options, domainX, domainY),
          );

          emitter.emit('brush:filter', {
            ...event,
            data: {
              ...(history ? { history: brushHistory } : {}),
              selection: [domainX, domainY],
            },
          });

          await update();
        } else {
          // Reset to initial state
          brushHistory.length = 0;
          emitter.emit('brush:filter', {
            ...event,
            data: {
              ...(history ? { history: brushHistory } : {}),
              selection: [
                scale.x.getOptions().domain,
                scale.y.getOptions().domain,
              ],
            },
          });
          setState('brushFilter');
          newView = view;
          filtered = false;
          await update();
        }
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
