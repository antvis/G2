import { InteractionComponent } from '../runtime';
import { ActiveRegionAction, PoptipAction, TooltipAction } from './action';
import { FisheyeCoordinate } from './coordinate';

export type Interaction =
  | ElementActiveInteraction
  | ElementActiveByColorInteraction
  | ElementActiveByXInteraction
  | ElementSelectInteraction
  | ElementListHighlightInteraction
  | LegendActiveInteraction
  | LegendHighlightInteraction
  | TooltipInteraction
  | FisheyeInteraction
  | ChartIndex
  | BrushInteraction
  | BrushHighlightInteraction
  | BrushVisibleInteraction
  | ActiveRegionInteraction
  | EllipsisTextInteraction
  | ElementSelectByColorInteraction
  | ElementSelectByXInteraction
  | CustomInteraction;

export type InteractionTypes =
  | 'elementActive'
  | 'elementActiveByX'
  | 'elementActiveByColor'
  | 'fisheye'
  | 'chartIndex'
  | 'elementSelect'
  | 'elementSelectByX'
  | 'elementSelectByColor'
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
} & Record<`${'link' | 'active' | 'inactive'}${any}`, any>;

export type ElementSelectInteraction = {
  type?: 'elementSelect';
  single?: boolean;
} & Record<`${'selected' | 'link' | 'unselected'}${any}`, any>;

export type ElementSelectByColorInteraction = {
  type?: 'elementSelectByColor';
  single?: boolean;
} & Record<`${'selected' | 'link' | 'unselected'}${any}`, any>;

export type ElementSelectByXInteraction = {
  type?: 'elementSelectByX';
  single?: boolean;
} & Record<`${'selected' | 'link' | 'unselected'}${any}`, any>;

export type ElementActiveByXInteraction = {
  type?: 'elementActiveByX';
  x?: string;
  link?: boolean;
} & Record<`${'link' | 'active' | 'inactive'}${any}`, any>;

export type ElementActiveByColorInteraction = {
  type?: 'elementActiveByColor';
  color?: string;
} & Record<`${'link' | 'active' | 'inactive'}${any}`, any>;

export type ChartIndex = {
  type?: 'chartIndex';
  wait?: number;
  leading?: boolean;
  trailing?: boolean;
} & Record<`${'rule' | 'label'}${any}`, any>;

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
  wait?: number;
  leading?: boolean;
  trailing?: boolean;
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
