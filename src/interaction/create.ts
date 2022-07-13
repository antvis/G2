import { DisplayObject } from '@antv/g';
import { group } from 'd3-array';
import { throttle } from '@antv/util';
import { G2ViewInstance, InteractionComponent as IC } from '../runtime';
import { composeAsync, error } from '../utils/helper';
import { select } from '../utils/selection';
import { createInteractionLibrary } from './stdlib';
import {
  InteractionDescriptor,
  InteractionLibrary,
  InteractionNamespaces,
  InteractionOptions,
  InteractionStep,
  InteractionValue,
  Interactor,
  InteractorComponent,
  InteractorOptions,
  InteractionComponent,
  Action,
  ActionOptions,
  ActionComponent,
  G2Event,
} from './types';

export function createInteraction<T>(
  interaction: (options: T) => InteractionDescriptor,
  library = createInteractionLibrary(),
): IC<T> {
  const [useInteractor] = useLibrary<
    InteractorOptions,
    InteractorComponent,
    Interactor
  >('interactor', library);
  const [useAction] = useLibrary<ActionOptions, ActionComponent, Action>(
    'action',
    library,
  );

  return (options: T) => {
    const descriptor = interaction(options);
    const {
      start = [],
      end = [],
      interactors: interactorsOptions = [],
    } = descriptor;
    const steps = [...start, ...end];

    // A Map from high-level events to low-level events.
    const interactors = interactorsOptions.map(useInteractor);
    const interactorEvent = group(
      interactors.flatMap(({ actions }) =>
        actions.flatMap(({ action, events }) => events.map((e) => [e, action])),
      ),
      (d) => d[1],
    );

    return (target, viewInstances) => {
      // Every interaction has its own standalone context.
      const context = createInteractionContext(target, viewInstances);

      const { selection } = context;
      for (const {
        trigger,
        isEnable = () => true,
        action,
        throttle: throttleOptions,
      } of steps) {
        // Compose async actions to a single action.
        const actions = normalizeOptions(action).map(useAction);
        const throttler = throttleOptions
          ? (d) => throttle(d, throttleOptions.wait, throttleOptions)
          : (d) => d;
        const handler = throttler(composeAsync(actions));

        // Bind low-level events with composed action.
        const events = interactorEvent.get(trigger) || [[trigger]];
        for (const [event] of events) {
          const [className, eventName] = event.split(':');
          selection.selectAll(`.${className}`).on(eventName, (event) => {
            const ctx = { event, ...context };
            if (isEnable(ctx)) {
              handler(ctx);
            }
          });
        }
      }
    };
  };
}

function createInteractionContext(
  target: G2ViewInstance,
  viewInstances: G2ViewInstance[],
) {
  const { view, update, container, options } = target;
  const selection = select(container);

  // Selection layer is for showing selected marks.
  const selectionLayer = selection
    .select('.plot')
    .append('g')
    .attr('className', 'selection')
    .style('fill', 'transparent');

  // Transient layer is for showing transient graphical
  //  elements produced by interaction.
  const transientLayer = selection
    .select('.plot')
    .append('g')
    .attr('className', 'transparent')
    .style('fill', 'transparent');

  return {
    ...view,
    update,
    options,
    selection,
    selectionLayer,
    transientLayer,
    viewInstances,
    shared: {},
  };
}

function normalizeOptions(options: InteractionStep['action']) {
  return [options].flat(1).map((option) => {
    return typeof option === 'object' ? option : { type: option };
  });
}

function useLibrary<
  O extends InteractionOptions,
  C extends InteractionComponent,
  V extends InteractionValue,
>(
  namespace: InteractionNamespaces,
  library: InteractionLibrary,
): [(options: O) => V, (type: O['type']) => C] {
  const create = (type: O['type']) => {
    if (typeof type !== 'string') return type;
    const key = `${namespace}.${type}`;
    return library[key] || error(`Unknown Component: ${key}`);
  };
  const use = (options: O) => {
    const { type, ...rest } = options;
    return create(type)({ ...rest });
  };
  return [use, create];
}
