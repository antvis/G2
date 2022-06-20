import {
  SurfacePointSelection,
  HighlightSelection,
  Tooltip,
  FisheyeFocus,
  Plot,
} from './action';
import { MousePosition, TouchPosition } from './interactor';
import { InteractionLibrary } from './types';

export function createInteractionLibrary(): InteractionLibrary {
  return {
    'action.surfacePointSelection': SurfacePointSelection,
    'action.highlightSelection': HighlightSelection,
    'action.tooltip': Tooltip,
    'action.fisheyeFocus': FisheyeFocus,
    'action.plot': Plot,
    'interactor.mousePosition': MousePosition,
    'interactor.touchPosition': TouchPosition,
  };
}
