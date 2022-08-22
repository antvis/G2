import { deepMix } from '@antv/util';
import { ActionComponent as AC } from '../../types';
import { FisheyeFocusAction } from '../../../spec';

export type FisheyeFocusOptions = Omit<FisheyeFocusAction, 'type'>;

// TODO: add FisheyeXFocus & FisheyeYFocus
export const FisheyeFocus: AC<FisheyeFocusOptions> = (options) => {
  return (context) => {
    // Using the mouseX and mouseY as focusX and focusY.
    const { event, selection, shared, options: plotOptions } = context;
    const { updatedOptions = {} } = shared;
    const { offsetX, offsetY } = event;
    const mainLayer = selection.select('.main').node();
    const bbox = mainLayer.getBounds();
    const {
      min: [x, y],
      max: [x1, y1],
    } = bbox;

    // Skip if mouse position is out of plot area.
    const isOutX = offsetX < x || offsetX > x1;
    const isOutY = offsetY < y || offsetY > y1;
    const isOut = isOutX || isOutY;
    if (isOut) {
      shared.updatedOptions = deepMix({}, plotOptions);
      return context;
    }

    // Update focusX and focusY if mouse position is in plot area.
    const focusX = offsetX - x;
    const focusY = offsetY - y;

    const getUpdatedOptions = () => {
      const { coordinate = [] } = plotOptions;

      // Update if fisheye/fisheyeX/fisheyeY/fisheyeCircular exists.
      const index = coordinate.findIndex((d) => d.type.startsWith('fisheye'));

      if (index !== -1) {
        // Update fisheye coordinate if exists.
        const fisheye = coordinate[index];
        const newFisheye = {
          ...fisheye,
          ...options,
          type: 'fisheye',
          focusX,
          focusY,
          isVisual: true,
        };
        const newCoordinate = [...coordinate];
        newCoordinate.splice(index, 1, newFisheye);
        coordinate[index] = newFisheye;
        return {
          ...plotOptions,
          coordinate: newCoordinate,
        };
      } else {
        // Append cartesian and fisheye coordinate if fisheye dose not exist.
        return {
          ...plotOptions,
          coordinate: [
            ...coordinate,
            { type: 'fisheye', ...options, focusX, focusY, isVisual: true },
            { type: 'cartesian' },
          ],
        };
      }
    };
    shared.updatedOptions = deepMix(updatedOptions, getUpdatedOptions());
    return context;
  };
};

FisheyeFocus.props = {};
