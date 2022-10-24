import { InteractionComponent } from '../runtime';
import { ActiveRegionAction, PoptipAction, TooltipAction } from './action';
import { FisheyeCoordinate } from './coordinate';

export type Interaction =
  | ElementActiveInteraction
  | ElementActiveByColorInteraction
  | ElementActiveByXInteraction
  | ElementSelectedInteraction
  | ElementListHighlightInteraction
  | LegendActiveInteraction
  | LegendHighlightInteraction
  | TooltipInteraction
  | FisheyeInteraction
  | BrushInteraction
  | BrushHighlightInteraction
  | BrushVisibleInteraction
  | ActiveRegionInteraction
  | EllipsisTextInteraction
  | CustomInteraction;

export type InteractionTypes =
  | 'elementActive'
  | 'elementActiveByX'
  | 'elementActiveByColor'
  | 'elementListHighlight'
  | 'legendActive'
  | 'legendHighlight'
  | 'tooltip'
  | 'brush'
  | 'brushHighlight'
  | 'brushVisible'
  | 'fisheye'
  | 'activeRegion'
  | 'ellipsisText'
  | InteractionComponent;

export type BrushInteraction = {
  type?: 'brush';
  brushType?: 'rect' | 'rectX' | 'rectY' | 'polygon';
};

export type BrushHighlightInteraction = {
  type?: 'brushHighlight';
  brushType?: 'rect' | 'rectX' | 'rectY' | 'polygon';
  multiple?: boolean;
};

export type BrushVisibleInteraction = {
  type?: 'brushVisible';
  brushType?: 'rect' | 'rectX' | 'rectY' | 'polygon';
};

export type ElementActiveInteraction = {
  type?: 'elementActive';
  // @todo: Style supported by G.
  link?: boolean;
  [key: string]: any;
} & Record<`${'link' | 'selected' | 'unselected'}${any}`, any>;

export type ElementSelectedInteraction = {
  type?: 'elementSelected';
  color?: string;
  border?: number;
  singleMode?: boolean;
};

export type ElementActiveByXInteraction = {
  type?: 'elementActiveByX';
  x?: string;
  link?: boolean;
} & Record<`${'link' | 'selected' | 'unselected'}${any}`, any>;

export type ElementActiveByColorInteraction = {
  type?: 'elementActiveByColor';
  color?: string;
} & Record<`${'link' | 'selected' | 'unselected'}${any}`, any>;

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

export type EllipsisTextInteraction = {
  type?: 'ellipsisText';
} & Omit<PoptipAction, 'type'>;

export type CustomInteraction = {
  type?: InteractionComponent;
  [key: string]: any;
};
