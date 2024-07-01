import type { TooltipStyleProps } from '@antv/component';
import { BBox, InteractionComponent } from '../runtime';
import { FisheyeCoordinate } from './coordinateTransform';
import { TooltipItemValue } from './component';

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

export type BrushHighlightInteraction = {
  type?: 'brushHighlight';
  brushKey?: string;
  reverse?: boolean;
  series?: boolean;
  facet?: boolean;
} & Record<`${'mask'}${any}`, any>;

export type BrushXHighlightInteraction = {
  type?: 'brushXHighlight';
  brushKey?: string;
  reverse?: boolean;
  series?: boolean;
  facet?: boolean;
} & Record<`${'mask'}${any}`, any>;

export type BrushYHighlightInteraction = {
  type?: 'brushYHighlight';
  brushKey?: string;
  reverse?: boolean;
  series?: boolean;
  facet?: boolean;
} & Record<`${'mask'}${any}`, any>;

export type BrushAxisHighlightInteraction = {
  type?: 'brushAxisHighlight';
  reverse?: boolean;
  brushKey?: string;
} & Record<`${'mask'}${any}`, any>;

export type BrushFilterInteraction = {
  type?: 'brushFilter';
  reverse?: boolean;
} & Record<`${'mask'}${any}`, any>;

export type BrushXFilterInteraction = {
  type?: 'brushXFilter';
  reverse?: boolean;
} & Record<`${'mask'}${any}`, any>;

export type BrushYFilterInteraction = {
  type?: 'brushYFilter';
  reverse?: boolean;
} & Record<`${'mask'}${any}`, any>;

export type ElementHighlightInteraction = {
  type?: 'elementHighlight';
  // @todo: Style supported by G.
  link?: boolean;
  background?: boolean;
  offset?: number;
} & Record<`${'link' | 'background'}${any}`, any>;

export type ElementSelectInteraction = {
  type?: 'elementSelect';
  single?: boolean;
  background?: boolean;
  offset?: number;
} & Record<`${'link' | 'background'}${any}`, any>;

export type ElementSelectByColorInteraction = {
  type?: 'elementSelectByColor';
  single?: boolean;
  offset?: number;
  background?: boolean;
} & Record<`${'link' | 'background'}${any}`, any>;

export type ElementSelectByXInteraction = {
  type?: 'elementSelectByX';
  single?: boolean;
  background?: boolean;
  offset?: number;
} & Record<`${'link' | 'background'}${any}`, any>;

export type ElementHighlightByXInteraction = {
  type?: 'elementHighlightByX';
  link?: boolean;
  background?: boolean;
  offset?: number;
  delay?: number;
} & Record<`${'link' | 'background'}${any}`, any>;

export type ElementHighlightByColorInteraction = {
  type?: 'elementHighlightByColor';
  color?: string;
  background?: boolean;
  link?: boolean;
  offset?: number;
  delay?: number;
} & Record<`${'link' | 'background'}${any}`, any>;

export type PoptipInteraction = {
  type?: 'poptip';
  offsetX?: number;
  offsetY?: number;
} & Record<`tip${any}`, any>;

export type LegendFilterInteraction = {
  type?: 'legendFilter';
};

export type LegendHighlightInteraction = {
  type?: 'legendHighlight';
};

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
  body?: boolean;
  crosshairs?: boolean;
  marker?: boolean;
  groupName?: boolean;
  disableNative?: boolean;
  offset?: [number, number];
  position?: TooltipStyleProps['position'];
  bounding?: BBox;
  mount?: string | HTMLElement;
  css?: Record<string, any>; // @todo
  enterable?: boolean;
  sort?: (d: TooltipItemValue) => any;
  filter?: (d: TooltipItemValue) => any;
  render?: (
    event, // @todo
    options: { title: 'string'; items: TooltipItemValue[] },
  ) => HTMLElement | string;
} & Record<`crosshairs${any}`, any> &
  Record<`marker${any}`, any>;

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
