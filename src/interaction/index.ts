import { lowerCase } from '@antv/util';
import { InteractionConstructor } from './base';

export const Interactions: Record<string, InteractionConstructor> = {};

/**
 * Gets interaction by name
 * @param name the name of interaction
 * @returns the interaction which extends [[Interaction]]
 */
export function getInteraction(name: string): InteractionConstructor {
  return Interactions[lowerCase(name)];
}

/**
 * Register interaction
 * @param name the registered interaciton name
 * @param interaction the interaction which extends [[Interaction]]
 */
export function registerInteraction(name: string, interaction: InteractionConstructor) {
  Interactions[lowerCase(name)] = interaction;
}

export { default as Interaction, InteractionConstructor } from './base';
