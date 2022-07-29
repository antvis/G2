import { InteractionComponent } from '../runtime';
import { ActiveRegionAction, TooltipAction } from './action';
import { FisheyeCoordinate } from './coordinate';

export type Interaction =
  | ElementActiveInteraction
  | ElementSelectedInteraction
  | ElementHighlightInteraction
  | ElementHighlightByXInteraction
  | ElementHighlightByColorInteraction
  | ElementListHighlightInteraction
  | LegendActiveInteraction
  | LegendHighlightInteraction
  | TooltipInteraction
  | FisheyeInteraction
  | BrushInteraction
  | BrushHighlightInteraction
  | BrushVisibleInteraction
  | ActiveRegionInteraction
  | CustomInteraction;

export type InteractionTypes =
  | 'elementActive'
  | 'elementHighlight'
  | 'elementHighlightByColor'
  | 'elementHighlightByX'
  | 'elementListHighlight'
  | 'legendActive'
  | 'legendHighlight'
  | 'tooltip'
  | 'brush'
  | 'brushHighlight'
  | 'brushVisible'
  | 'fisheye'
  | 'activeRegion'
  | InteractionComponent;

export type BrushInteraction = {
  type?: 'brush';
  brushType?: 'rect' | 'rectX' | 'rectY' | 'polygon';
};

export type BrushHighlightInteraction = {
  type?: 'brushHighlight';
  brushType?: 'rect' | 'rectX' | 'rectY' | 'polygon';
};

export type BrushVisibleInteraction = {
  type?: 'brushVisible';
  brushType?: 'rect' | 'rectX' | 'rectY' | 'polygon';
};

export type ElementActiveInteraction = {
  type?: 'elementActive';
  color?: string;
};

export type ElementSelectedInteraction = {
  type?: 'elementSelected';
  color?: string;
  border?: number;
  singleMode?: boolean;
};

export type ElementHighlightInteraction = {
  type?: 'elementHighlight';
  color?: string;
};

export type ElementHighlightByXInteraction = {
  type?: 'elementHighlightByX';
  color?: string;
};

export type ElementHighlightByColorInteraction = {
  type?: 'elementHighlightByColor';
  color?: string;
};

export type ElementListHighlightInteraction = {
  type?: 'elementListHighlight';
};

export type LegendActiveInteraction = {
  type?: 'legendActive';
};

export type LegendHighlightInteraction = {
  type?: 'legendHighlight';
};

export type TooltipInteraction = Omit<TooltipAction, 'type'> & {
  type?: 'tooltip';
  shared?: boolean;
};

export type FisheyeInteraction = {
  type?: 'fisheye';
} & Omit<FisheyeCoordinate, 'type'>;

export type ActiveRegionInteraction = {
  type?: 'activeRegion';
} & Omit<ActiveRegionAction, 'type' | 'clear'>;

export type CustomInteraction = {
  type?: InteractionComponent;
  [key: string]: any;
};
