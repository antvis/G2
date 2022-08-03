import { ActionComponent as AC } from '../../types';
import { SurfacePointSelectionAction } from '../../../spec';

export type SurfacePointSelectionOptions = Omit<
  SurfacePointSelectionAction,
  'type'
>;

export const SurfacePointSelection: AC<SurfacePointSelectionOptions> = () => {
  return (context) => {
    const { event, shared } = context;
    const { target, offsetX, offsetY } = event;
    const { className } = target || {};

    shared.mouseX = offsetX;
    shared.mouseY = offsetY;

    if (className && className.includes('element')) {
      // @todo Replace with elementsFromPoint.
      shared.selectedElements = [target];
    } else {
      shared.selectedElements = [];
    }
    return context;
  };
};

SurfacePointSelection.props = {};
