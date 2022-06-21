import {
  SurfacePointSelection,
  HighlightSelection,
  Tooltip,
  FisheyeFocus,
  Plot,
  ElementSelection,
  Highlight,
  LegendItemSelection,
  TriggerInfoSelection,
  SetItemState as SetItemStateAction,
} from './action';
import { MousePosition, TouchPosition } from './interactor';
import { InteractionLibrary } from './types';

export function createInteractionLibrary(): InteractionLibrary {
  return {
    'action.surfacePointSelection': SurfacePointSelection,
    'action.elementSelection': ElementSelection,
    'action.highlightSelection': HighlightSelection,
    'action.highlight': Highlight,
    'action.legendItemSelection': LegendItemSelection,
    'action.triggerInfoSelection': TriggerInfoSelection,
    'action.setItemState': SetItemStateAction,
    'action.tooltip': Tooltip,
    'action.fisheyeFocus': FisheyeFocus,
    'action.plot': Plot,
    'interactor.mousePosition': MousePosition,
    'interactor.touchPosition': TouchPosition,
  };
}
