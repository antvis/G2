import { createInteractionLibrary } from '../../../src/interaction/stdlib';
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
  Mask,
  RecordPoint,
  RecordRegion,
  RecordState,
  Cursor as CursorAction,
} from '../../../src/interaction/action';
import {
  MousePosition,
  TouchPosition,
} from '../../../src/interaction/interactor';

describe('createInteractionLibrary', () => {
  it('createInteractionLibrary() returns expected action and interactor', () => {
    expect(createInteractionLibrary()).toEqual({
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
    });
  });
});
