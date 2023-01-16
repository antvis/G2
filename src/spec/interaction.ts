import { InteractionComponent } from '../runtime';
import { ChannelTypes } from './geometry';
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
  | LegendFilterInteraction
  | BrushHighlightInteraction
  | BrushXHighlightInteraction
  | BrushYHighlightInteraction
  | BrushAxisHighlightInteraction
  | BrushFilter
  | BrushYFilter
  | BrushXFilter
  | SliderFilter;
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
  | 'brushXHighlight'
  | 'brushYHighlight'
  | 'brushHighlight'
  | 'brushFilter'
  | 'brushXFilter'
  | 'brushYFilter'
  | 'sliderFilter'
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
  brushKey?: string;
  reverse?: boolean;
  shared?: boolean;
  series?: boolean;
  facet?: boolean;
} & Record<`${'mask' | 'highlighted' | 'unhighlighted'}${any}`, any>;

export type BrushXHighlightInteraction = {
  type?: 'brushXHighlight';
  brushKey?: string;
  reverse?: boolean;
  shared?: boolean;
  series?: boolean;
  facet?: boolean;
} & Record<`${'mask' | 'highlighted' | 'unhighlighted'}${any}`, any>;

export type BrushYHighlightInteraction = {
  type?: 'brushYHighlight';
  brushKey?: string;
  reverse?: boolean;
  shared?: boolean;
  series?: boolean;
  facet?: boolean;
} & Record<`${'mask' | 'highlighted' | 'unhighlighted'}${any}`, any>;

export type BrushAxisHighlightInteraction = {
  type?: 'brushAxisHighlight';
  reverse?: boolean;
} & Record<`${'mask' | 'highlighted' | 'unhighlighted'}${any}`, any>;

export type BrushFilter = {
  type?: 'brushFilter';
  reverse?: boolean;
} & Record<`${'mask' | 'highlighted' | 'unhighlighted'}${any}`, any>;

export type BrushXFilter = {
  type?: 'brushXFilter';
  reverse?: boolean;
} & Record<`${'mask' | 'highlighted' | 'unhighlighted'}${any}`, any>;

export type BrushYFilter = {
  type?: 'brushYFilter';
  reverse?: boolean;
} & Record<`${'mask' | 'highlighted' | 'unhighlighted'}${any}`, any>;

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
  [key: string]: any; // @todo
} & Record<`${'marker' | 'label'}Unselected${any}`, any>;

export type ChartIndex = {
  type?: 'chartIndex';
  wait?: number;
  leading?: boolean;
  trailing?: boolean;
} & Record<`${'rule' | 'label'}${any}`, any>;

export type SliderFilter = {
  type?: 'sliderFilter';
  wait?: number;
  leading?: boolean;
  trailing?: boolean;
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
