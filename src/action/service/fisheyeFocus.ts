import { ActionComponent as AC } from '../../runtime';
import { FisheyeFocusAction } from '../../spec';

export type FisheyeFocusOptions = Omit<FisheyeFocusAction, 'type'>;

export const FisheyeFocus: AC<FisheyeFocusOptions> = (options) => {
  return (context) => {
    // Using the mouseX and mouseY as focusX and focusY.
    const { event, selection, shared } = context;
    const { updater = (d) => d } = shared;
    const { offsetX, offsetY } = event;
    const mainLayer = selection.select('.main').node();
    const bbox = mainLayer.getBounds();
    const { min, max } = bbox;
    const [x, y] = min;
    const [x1, y1] = max;

    // Skip if mouse position is out of plot area.
    const isOutX = offsetX < x || offsetX > x1;
    const isOutY = offsetY < y || offsetY > y1;
    const isOut = isOutX || isOutY;
    if (isOut) return context;

    // Update focusX and focusY if mouse position is in plot area.
    const focusX = offsetX - x;
    const focusY = offsetY - y;
    const newUpdater = (plotOptions) => {
      const newOptions = updater(plotOptions);
      const { coordinate = [] } = plotOptions;
      const index = coordinate.findIndex((d) => d.type === 'fisheye');
      if (index !== -1) {
        // Update fisheye coordinate if exists.
        const fisheye = coordinate[index];
        const newFisheye = { ...fisheye, ...options, focusX, focusY };
        const newCoordinate = [...coordinate];
        newCoordinate.splice(index, 1, newFisheye);
        return {
          ...newOptions,
          coordinate: newCoordinate,
        };
      } else {
        // Append cartesian and fisheye coordinate if fisheye dose not exist.
        return {
          ...newOptions,
          coordinate: [
            ...coordinate,
            { type: 'cartesian' },
            { type: 'fisheye', ...options, focusX, focusY },
          ],
        };
      }
    };
    shared.updater = newUpdater;
    return context;
  };
};

FisheyeFocus.props = {};
