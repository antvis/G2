import { InteractionComponent } from '../runtime';
import { TooltipAction } from './action';
import { FisheyeCoordinate } from './coordinate';

export type Interaction =
  | ElementActiveInteraction
  | ElementHighlightInteraction
  | ElementHighlightByXInteraction
  | ElementHighlightByColorInteraction
  | ElementListHighlightInteraction
  | LegendActiveInteraction
  | LegendHighlightInteraction
  | TooltipInteraction
  | FisheyeInteraction
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
  | 'fisheye'
  | InteractionComponent;

export type ElementActiveInteraction = {
  type?: 'elementActive';
  color?: string;
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

export type CustomInteraction = {
  type?: InteractionComponent;
  [key: string]: any;
};
