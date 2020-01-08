import { clone, isPlainObject, lowerCase, mix } from '@antv/util';
import { View } from '../chart';
import { LooseObject } from '../interface';
import GrammarInteraction, { InteractionSteps } from './grammar-interaction';
import { InteractonConstructor } from './interaction';

const Interactions: LooseObject = {};

/**
 * Gets interaction by name
 * @param name the name of interaction
 * @returns the interaction which extends [[Interaction]] or [[InteractionSteps]]
 */
export function getInteraction(name: string): InteractionSteps | InteractonConstructor {
  return Interactions[lowerCase(name)];
}

/**
 * Register interaction
 * @param name the registered interaciton name
 * @param interaction the interaction which extends [[Interaction]] or [[InteractionSteps]]
 */
export function registerInteraction(name: string, interaction: InteractionSteps | InteractonConstructor) {
  Interactions[lowerCase(name)] = interaction;
}

/**
 *
 * @param name the registered interaciton name
 * @param view the view applied interaction
 * @param cfg the interaction cfg
 */
export function createInteraction(name: string, view: View, cfg?: LooseObject) {
  const interaciton = getInteraction(name);
  if (!interaciton) {
    return null;
  }
  if (isPlainObject(interaciton)) {
    // 如果不 clone 则会多个 interaction 实例共享 step 的定义
    const steps = mix(clone(interaciton), cfg) as InteractionSteps;
    return new GrammarInteraction(view, steps);
  } else {
    const cls = interaciton as InteractonConstructor;
    return new cls(view, cfg);
  }
}

export { default as Interaction } from './interaction';
export { Action, registerAction } from './action';
