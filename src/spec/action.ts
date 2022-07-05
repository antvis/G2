import { ActionComponent } from '../interaction';
import { FisheyeCoordinate } from './coordinate';

export type Action =
  | FisheyeFocusAction
  | CustomAction
  | SurfacePointSelectionAction
  | ActiveElementAction
  | HighlightElementAction
  | TriggerInfoSelectionAction
  | LegendItemSelectionAction
  | SetItemStateAction
  | PlotAction
  | TooltipAction;

export type ActionTypes =
  | 'fisheyeFocus'
  | 'surfacePointSelection'
  | 'elementSelection'
  | 'activeElement'
  | 'highlightElement'
  | 'triggerInfoSelection'
  | 'legendItemSelection'
  | 'setItemState'
  | 'plot'
  | 'tooltip'
  | CustomAction;

export type FisheyeFocusAction = {
  type?: 'fisheyeFocus';
} & Omit<FisheyeCoordinate, 'type'>;

export type SurfacePointSelectionAction = {
  type?: 'surfacePointSelection';
};

export type ActiveElementAction = {
  type?: 'activeElement';
  color?: string;
};

export type HighlightElementAction = {
  type?: 'highlightElement';
  color?: string;
};

export type PlotAction = {
  type?: 'plot';
};

export type TooltipAction = {
  type?: 'tooltip';
  hide?: boolean;
};

export type ElementSelectionAction = {
  type?: 'elementSelection';
  from?: string;
  filterBy?: 'x' | 'color';
};

export type TriggerInfoSelectionAction = {
  type?: 'triggerInfoSelection';
  multiple?: boolean;
};

export type LegendItemSelectionAction = {
  type?: 'legendItemSelection';
  from?: 'selectedElements' | 'triggerInfo';
};

export type SetItemStateAction = {
  type?: 'setItemState';
  color?: string;
  items?: string[];
  state?: string;
};

export type CustomAction = {
  type?: ActionComponent;
  [key: string]: any;
};
