import { throttle } from '@antv/util';
import { group } from 'd3-array';
import { composeAsync } from '../utils/helper';
import {
  G2View,
  G2Library,
  G2ActionOptions,
  G2InteractionOptions,
  G2InteractorOptions,
} from './types/options';
import {
  Action,
  ActionComponent,
  Interaction,
  InteractionComponent,
  InteractorComponent,
  Interactor,
} from './types/component';
import { MaybeArray, G2ViewDescriptor } from './types/common';
import { useLibrary } from './library';

export function applyInteraction(
  options: G2View,
  view: G2ViewDescriptor,
  update: any,
  library: G2Library,
) {
  const [useInteraction] = useLibrary<
    G2InteractionOptions,
    InteractionComponent,
    Interaction
  >('interaction', library);
  const [useAction] = useLibrary<G2ActionOptions, ActionComponent, Action>(
    'action',
    library,
  );
  const [useInteractor] = useLibrary<
    G2InteractorOptions,
    InteractorComponent,
    Interactor
  >('interactor', library);

  const { interaction: partialInteraction = [] } = options;
  const interactions = inferInteraction(partialInteraction);
  const { scale, selection, coordinate, theme } = view;

  for (const options of interactions) {
    const {
      start = [],
      end = [],
      interactors: interactorsOptions = [],
    } = useInteraction(options);
    const steps = [...start, ...end];

    // A Map from high-level events to low-level events.
    const interactors = interactorsOptions.map(useInteractor);
    const interactorEvent = group(
      interactors.flatMap(({ actions }) =>
        actions.flatMap(({ action, events }) => events.map((e) => [e, action])),
      ),
      (d) => d[1],
    );

    for (const { trigger, action, throttle: throttleOptions } of steps) {
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
          handler({
            event,
            scale,
            coordinate,
            theme,
            selection,
            shared: {},
            update,
          });
        });
      }
    }
  }
}

function inferInteraction(
  interaction: G2InteractionOptions[] = [],
): G2InteractionOptions[] {
  return [...interaction, { type: 'tooltip' }];
}

function normalizeOptions(options: MaybeArray<string | Record<string, any>>) {
  return [options].flat(1).map((option) => {
    return typeof option === 'object' ? option : { type: option };
  });
}
