import { ActionComponent } from '../runtime';
import { FisheyeCoordinate } from './coordinate';

export type Action =
  | FisheyeFocusAction
  | CustomAction
  | SurfacePointSelectionAction
  | LegendSelectionAction
  | HighlightSelectionAction
  | HighlightLegendSelectionAction
  | PlotAction
  | TooltipAction;

export type ActionTypes =
  | 'fisheyeFocus'
  | 'surfacePointSelection'
  | 'highlightSelection'
  | 'legendSelection'
  | 'plot'
  | 'tooltip'
  | CustomAction;

export type FisheyeFocusAction = {
  type?: 'fisheyeFocus';
} & Omit<FisheyeCoordinate, 'type'>;

export type SurfacePointSelectionAction = {
  type?: 'surfacePointSelection';
};

export type HighlightSelectionAction = {
  type?: 'highlightSelection';
  color?: string;
};

export type HighlightLegendSelectionAction = {
  type?: 'highlightLegendSelection';
  color?: string;
};

export type PlotAction = {
  type?: 'plot';
};

export type TooltipAction = {
  type?: 'tooltip';
};

export type LegendSelectionAction = {
  type?: 'legendSelection';
};

export type CustomAction = {
  type?: ActionComponent;
  [key: string]: any;
};
