import { createInteractionLibrary } from '@/interaction/stdlib';
import {
  SurfacePointSelection,
  ActiveElement,
  Tooltip,
  FisheyeFocus,
  Plot,
  ElementSelection,
  HighlightElement,
  LegendItemSelection,
  TriggerInfoSelection,
  SetItemState as SetItemStateAction,
  Button,
  Filter,
  FilterElement,
  Mask,
  RecordPoint,
  RecordRegion,
  RecordState,
  Cursor as CursorAction,
  RecordCurrentPoint,
  Move,
  ActiveRegion,
  Poptip,
  RecordTip,
} from '@/interaction/action';
import { MousePosition, TouchPosition } from '@/interaction/interactor';

describe('createInteractionLibrary', () => {
  it('createInteractionLibrary() returns expected action and interactor', () => {
    expect(createInteractionLibrary()).toEqual({
      'action.surfacePointSelection': SurfacePointSelection,
      'action.elementSelection': ElementSelection,
      'action.recordState': RecordState,
      'action.recordPoint': RecordPoint,
      'action.recordCurrentPoint': RecordCurrentPoint,
      'action.recordRegion': RecordRegion,
      'action.recordTip': RecordTip,
      'action.activeElement': ActiveElement,
      'action.highlightElement': HighlightElement,
      'action.legendItemSelection': LegendItemSelection,
      'action.triggerInfoSelection': TriggerInfoSelection,
      'action.setItemState': SetItemStateAction,
      'action.tooltip': Tooltip,
      'action.poptip': Poptip,
      'action.fisheyeFocus': FisheyeFocus,
      'action.plot': Plot,
      'action.filter': Filter,
      'action.filterElement': FilterElement,
      'action.cursor': CursorAction,
      'action.mask': Mask,
      'action.button': Button,
      'action.move': Move,
      'action.activeRegion': ActiveRegion,
      'interactor.mousePosition': MousePosition,
      'interactor.touchPosition': TouchPosition,
    });
  });
});
