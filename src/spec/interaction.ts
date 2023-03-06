import { InteractionComponent } from '../runtime';
import { FisheyeCoordinate } from './coordinateTransform';
import { TooltipItemValue } from './component';
import { AtheisticChanelTypes } from './mark';

export type Interaction =
  | ElementHighlightInteraction
  | ElementHighlightByColorInteraction
  | ElementHighlightByXInteraction
  | ElementSelectByColorInteraction
  | ElementSelectByXInteraction
  | ElementSelectInteraction
  | TooltipInteraction
  | FisheyeInteraction
  | ChartIndexInteraction
  | CustomInteraction
  | LegendFilterInteraction
  | LegendHighlightInteraction
  | BrushHighlightInteraction
  | BrushXHighlightInteraction
  | BrushYHighlightInteraction
  | BrushAxisHighlightInteraction
  | BrushFilterInteraction
  | BrushYFilterInteraction
  | BrushXFilterInteraction
  | SliderFilterInteraction
  | PoptipInteraction;

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
  | 'legendHighlight'
  | 'brushXHighlight'
  | 'brushYHighlight'
  | 'brushHighlight'
  | 'brushFilter'
  | 'brushXFilter'
  | 'brushYFilter'
  | 'sliderFilter'
  | 'poptip'
  | InteractionComponent;

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

export type BrushFilterInteraction = {
  type?: 'brushFilter';
  reverse?: boolean;
} & Record<`${'mask' | 'highlighted' | 'unhighlighted'}${any}`, any>;

export type BrushXFilterInteraction = {
  type?: 'brushXFilter';
  reverse?: boolean;
} & Record<`${'mask' | 'highlighted' | 'unhighlighted'}${any}`, any>;

export type BrushYFilterInteraction = {
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
  background?: boolean;
  offset?: number;
} & Record<
  `${'link' | 'highlighted' | 'unhighlighted' | 'background'}${any}`,
  any
>;

export type ElementSelectInteraction = {
  type?: 'elementSelect';
  single?: boolean;
  background?: true;
  offset?: number;
} & Record<`${'selected' | 'link' | 'unselected' | 'background'}${any}`, any>;

export type ElementSelectByColorInteraction = {
  type?: 'elementSelectByColor';
  single?: boolean;
  offset?: number;
} & Record<`${'selected' | 'link' | 'unselected'}${any}`, any>;

export type ElementSelectByXInteraction = {
  type?: 'elementSelectByX';
  single?: boolean;
  background?: true;
  offset?: number;
} & Record<`${'selected' | 'link' | 'unselected' | 'background'}${any}`, any>;

export type ElementHighlightByXInteraction = {
  type?: 'elementHighlightByX';
  x?: string;
  link?: boolean;
  background?: boolean;
  offset?: number;
} & Record<
  `${'link' | 'highlighted' | 'unhighlighted' | 'background'}${any}`,
  any
>;

export type ElementHighlightByColorInteraction = {
  type?: 'elementHighlightByColor';
  color?: string;
  background?: boolean;
  link?: boolean;
  offset?: number;
} & Record<
  `${'link' | 'highlighted' | 'unhighlighted' | 'background'}${any}`,
  any
>;

export type PoptipInteraction = {
  type?: 'poptip';
  offsetX?: number;
  offsetY?: number;
} & Record<`tip${any}`, any>;

export type LegendFilterInteraction = {
  type?: 'legendFilter';
  channel?: AtheisticChanelTypes;
  [key: string]: any; // @todo
} & Record<`${'marker' | 'label'}Unselected${any}`, any>;

export type LegendHighlightInteraction = {
  type?: 'legendHighlight';
  [key: string]: any; // @todo
} & Record<`${'marker' | 'label'}Unhighlighted${any}`, any>;

export type ChartIndexInteraction = {
  type?: 'chartIndex';
  wait?: number;
  leading?: boolean;
  trailing?: boolean;
} & Record<`${'rule' | 'label'}${any}`, any>;

export type SliderFilterInteraction = {
  type?: 'sliderFilter';
  wait?: number;
  leading?: boolean;
  trailing?: boolean;
};

export type TooltipInteraction = {
  type?: 'tooltip';
  shared?: boolean;
  series?: boolean;
  facet?: boolean;
  crosshairs?: boolean;
  render?: (
    event, // @todo
    options: { title: 'string'; items: TooltipItemValue[] },
  ) => HTMLElement | string;
};

export type FisheyeInteraction = {
  type?: 'fisheye';
  wait?: number;
  leading?: boolean;
  trailing?: boolean;
} & Omit<FisheyeCoordinate, 'type'>;

export type CustomInteraction = {
  type?: InteractionComponent;
  [key: string]: any;
};
