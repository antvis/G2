import { DisplayObject, Group } from '@antv/g';
import {
  G2BaseComponent,
  G2ViewDescriptor,
  G2ViewTree,
  G2ViewInstance,
} from '../runtime';
import { Selection } from '../utils/selection';

export type InteractionDescriptor = {
  interactors?: InteractorOptions[];
  start?: InteractionStep[];
  end?: InteractionStep[];
};

export type InteractionStep = {
  trigger: string;
  action: ActionOptions | ActionOptions[];
  isEnable?: (InteractionContext) => boolean;
  throttle?: { wait?: number; leading?: boolean; trailing: boolean };
};

export type InteractorOptions = {
  type: string | InteractorComponent;
  [key: string]: any;
};

export type ActionOptions = {
  type: string | ActionComponent;
  [key: string]: any;
};

export type InteractionContext = {
  event?: G2Event;
  options?: G2ViewTree;
  update?: G2ViewInstance['update'];
  shared?: Record<string, any>;
  selection?: Selection;
  selectionLayer?: Selection;
  transientLayer?: Selection;
  viewDescriptors?: G2ViewInstance[];
} & G2ViewDescriptor;

export type Action = (options: InteractionContext) => InteractionContext;

export type ActionComponent<O = Record<string, unknown>> = G2BaseComponent<
  Action,
  O
>;

export type InteractorAction = { action?: string; events: string[] };

export type Interactor = {
  actions?: InteractorAction[];
};

export type InteractorComponent<O = Record<string, unknown>> = G2BaseComponent<
  Interactor,
  O
>;

export type G2Event = Omit<Event, 'target'> & {
  target: DisplayObject;
  currentTarget: DisplayObject;
  offsetY: number;
  offsetX: number;
};

export type InteractionNamespaces = 'action' | 'interactor';

export type InteractionLibrary = Record<
  `${InteractionNamespaces}.${string}`,
  G2BaseComponent
>;

export type InteractionComponent = ActionComponent | InteractorComponent;

export type InteractionOptions = InteractorOptions | ActionOptions;

export type InteractionValue = Action | Interactor;
