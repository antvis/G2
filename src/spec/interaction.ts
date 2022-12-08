import { ChannelTypes } from 'spec';
import { InteractionComponent } from '../runtime';
import { ActiveRegionAction, PoptipAction, TooltipAction } from './action';
import { FisheyeCoordinate } from './coordinate';

export type Interaction =
  | ElementHighlightInteraction
  | ElementHighlightByColorInteraction
  | ElementHighlightByXInteraction
  | ElementSelectByColorInteraction
  | ElementSelectByXInteraction
  | ElementSelectInteraction
  | TooltipInteraction
  | FisheyeInteraction
  | ChartIndex
  | CustomInteraction
  | LegendFilterInteraction;
// | ElementListHighlightInteraction
// | LegendActiveInteraction
// | LegendHighlightInteraction

// | BrushInteraction
// | BrushHighlightInteraction
// | BrushVisibleInteraction
// | ActiveRegionInteraction
// | EllipsisTextInteraction

export type InteractionTypes =
  | 'elementHighlight'
  | 'elementHighlightByX'
  | 'elementHighlightByColor'
  | 'fisheye'
  | 'chartIndex'
  | 'elementSelect'
  | 'elementSelectByX'
  | 'elementSelectByColor'
  | 'fisheye'
  | 'tooltip'
  | 'legendFilter'
  | InteractionComponent;
// | 'elementListHighlight'
// | 'legendActive'
// | 'legendHighlight'
// | 'tooltip'
// | 'brush'
// | 'brushHighlight'
// | 'brushVisible'

// | 'activeRegion'
// | 'ellipsisText'

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

export type ElementHighlightInteraction = {
  type?: 'elementHighlight';
  // @todo: Style supported by G.
  link?: boolean;
} & Record<`${'link' | 'highlighted' | 'unhighlighted'}${any}`, any>;

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

export type ElementHighlightByXInteraction = {
  type?: 'elementHighlightByX';
  x?: string;
  link?: boolean;
} & Record<`${'link' | 'highlighted' | 'unhighlighted'}${any}`, any>;

export type ElementHighlightByColorInteraction = {
  type?: 'elementHighlightByColor';
  color?: string;
} & Record<`${'link' | 'highlighted' | 'unhighlighted'}${any}`, any>;

export type LegendFilterInteraction = {
  type?: 'legendFilter';
  channel?: ChannelTypes;
} & Record<`${'marker' | 'label'}Unselected${any}`, any>;

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
  series?: boolean;
  facet?: boolean;
  // @todo
  item?: any;
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
