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
  | FilterAction
  | CursorAction
  | TooltipAction
  | RecordStateAction
  | RecordRegionAction
  | MaskAction
  | ButtonAction;

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
  | 'filter'
  | 'cursor'
  | 'tooltip'
  | 'recordState'
  | 'recordPoint'
  | 'recordRegion'
  | 'mask'
  | 'button'
  | CustomAction;

export type FisheyeFocusAction = {
  type?: 'fisheyeFocus';
} & Omit<FisheyeCoordinate, 'type'>;

export type SurfacePointSelectionAction = {
  type?: 'surfacePointSelection';
  trigger?: 'item' | 'axis';
};

export type ActiveElementAction = {
  type?: 'activeElement';
  color?: string;
  border?: number;
};

export type HighlightElementAction = {
  type?: 'highlightElement';
  color?: string;
};

export type CursorAction = {
  type?: 'cursor';
  cursor?: string;
};

export type PlotAction = {
  type?: 'plot';
};

export type FilterAction = {
  type?: 'filter';
  reset?: boolean;
};

export type TooltipAction = {
  type?: 'tooltip';
  showMarkers?: boolean;
  showCrosshairs?: boolean;
  crosshairs?: any;
  markers?: any;
};

export type ElementSelectionAction = {
  type?: 'elementSelection';
  from?: string;
  filterBy?: 'x' | 'color';
  toggle?: boolean;
  multiple?: boolean;
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

export type RecordStateAction = {
  type?: 'recordState';
  state?: string;
};

export type RecordPointAction = {
  type?: 'recordPoint';
  clear?: boolean;
  start?: boolean;
};

export type RecordRegionAction = {
  type?: 'recordRegion';
  dim?: 'x' | 'y';
};

export type MaskAction = {
  type?: 'mask';
  maskType?: 'rect' | 'polygon';
  fill?: string;
  fillOpacity?: number;
};

export type ButtonAction = {
  type?: 'button';
  position?: string;
  text?: string;
  textStyle?: {
    fontSize?: number;
    fill?: string;
  };
  fill?: string;
  stroke?: string;
  padding?: number[];
  hide?: boolean;
};

export type CustomAction = {
  type?: ActionComponent;
  [key: string]: any;
};
