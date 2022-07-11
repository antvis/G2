import {
  SurfacePointSelection,
  ActiveElement,
  Tooltip,
  FisheyeFocus,
  ElementSelection,
  HighlightElement,
  LegendItemSelection,
  TriggerInfoSelection,
  SetItemState as SetItemStateAction,
  RecordState,
  RecordPoint,
  RecordRegion,
  Cursor as CursorAction,
  Plot,
  Filter,
  Mask,
  Button,
} from './action';
import { MousePosition, TouchPosition } from './interactor';
import { InteractionLibrary } from './types';

export function createInteractionLibrary(): InteractionLibrary {
  return {
    'action.surfacePointSelection': SurfacePointSelection,
    'action.elementSelection': ElementSelection,
    'action.recordState': RecordState,
    'action.recordPoint': RecordPoint,
    'action.recordRegion': RecordRegion,
    'action.activeElement': ActiveElement,
    'action.highlightElement': HighlightElement,
    'action.legendItemSelection': LegendItemSelection,
    'action.triggerInfoSelection': TriggerInfoSelection,
    'action.setItemState': SetItemStateAction,
    'action.tooltip': Tooltip,
    'action.fisheyeFocus': FisheyeFocus,
    'action.plot': Plot,
    'action.filter': Filter,
    'action.cursor': CursorAction,
    'action.mask': Mask,
    'action.button': Button,
    'interactor.mousePosition': MousePosition,
    'interactor.touchPosition': TouchPosition,
  };
}
