import { ActionComponent as AC } from '../../runtime';
import { SurfacePointSelectionAction } from '../../spec';

export type SurfacePointSelectionOptions = Omit<
  SurfacePointSelectionAction,
  'type'
>;

export const SurfacePointSelection: AC<SurfacePointSelectionOptions> = () => {
  return (context) => {
    const { event } = context;
    const { target, offsetX, offsetY } = event;
    const { className } = target || {};

    // @todo Replace with elementsFromPoint.
    // Currently is not support in @antv/g.
    if (className && className.endsWith('element')) {
      context.selectedElements = [target];
      context.mouseX = offsetX;
      context.mouseY = offsetY;
    }
    return context;
  };
};

SurfacePointSelection.props = {};
