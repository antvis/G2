import { throttle, deepMix } from '@antv/util';
import { selectPlotArea, mousePosition } from './utils';

function maybeCoordinate(options) {
  const { coordinate = {} } = options;
  const { transform = [] } = coordinate;
  const fisheye = transform.find((d) => d.type === 'fisheye');
  if (fisheye) return fisheye;
  const newFisheye = { type: 'fisheye' };
  transform.push(newFisheye);
  coordinate.transform = transform;
  options.coordinate = coordinate;
  return newFisheye;
}

/**
 * @todo Bind abstract data or data index.
 */
export function Fisheye({
  wait = 30,
  leading,
  trailing = false,
}: Record<string, any>) {
  return (context) => {
    const { options, update, setState, container } = context;
    const plotArea = selectPlotArea(container);

    const updateFocus = throttle(
      (event) => {
        const focus = mousePosition(plotArea, event);
        if (!focus) {
          setState('fisheye');
          update();
          return;
        }
        setState('fisheye', (options) => {
          // Clone options and mutate it.
          // Disable animation.
          const clonedOptions = deepMix({}, options, {
            interaction: { tooltip: { preserve: true } },
          });
          for (const mark of clonedOptions.marks) mark.animate = false;
          const [x, y] = focus;
          const fisheye = maybeCoordinate(clonedOptions);
          fisheye.focusX = x;
          fisheye.focusY = y;
          fisheye.visual = true;
          return clonedOptions;
        });
        update();
      },
      wait,
      { leading, trailing },
    ) as (...args: any[]) => void;

    // Bind events.
    plotArea.addEventListener('pointerenter', updateFocus);
    plotArea.addEventListener('pointermove', updateFocus);
    plotArea.addEventListener('pointerleave', updateFocus);

    return () => {
      plotArea.removeEventListener('pointerenter', updateFocus);
      plotArea.removeEventListener('pointermove', updateFocus);
      plotArea.removeEventListener('pointerleave', updateFocus);
    };
  };
}
