import { deepMix } from '@antv/util';
import { ActionComponent as AC } from '../../types';
import { FisheyeFocusAction } from '../../../spec';

export type FisheyeFocusOptions = Omit<FisheyeFocusAction, 'type'>;

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
      const index = coordinate.findIndex((d) => d.type === 'fisheye');
      if (index !== -1) {
        // Update fisheye coordinate if exists.
        const fisheye = coordinate[index];
        const newFisheye = { ...fisheye, ...options, focusX, focusY };
        const newCoordinate = [...coordinate];
        newCoordinate.splice(index, 1, newFisheye);
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
            { type: 'cartesian' },
            { type: 'fisheye', ...options, focusX, focusY },
          ],
        };
      }
    };
    shared.updatedOptions = deepMix(updatedOptions, getUpdatedOptions());
    return context;
  };
};

FisheyeFocus.props = {};
