import { InteractorComponent as IC } from '../types';

export type MousePositionPotions = Record<string, unknown>;

export const MousePosition: IC<MousePositionPotions> = () => {
  return {
    actions: [
      { action: 'enter', events: ['plot:mouseenter'] },
      { action: 'hover', events: ['plot:mousemove'] },
      { action: 'leave', events: ['plot:mouseleave'] },
    ],
  };
};
