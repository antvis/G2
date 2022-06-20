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

    // @todo Replace with elementsFromPoint.
    // Currently is not support in @antv/g.
    if (className && className.includes('element')) {
      shared.selectedElements = [target];
      shared.mouseX = offsetX;
      shared.mouseY = offsetY;
    } else {
      shared.selectedElements = [];
    }
    return context;
  };
};

SurfacePointSelection.props = {};
