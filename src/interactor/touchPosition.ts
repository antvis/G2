import { InteractorComponent as IC } from '../runtime';

export type TouchPositionPotions = Record<string, unknown>;

export const TouchPosition: IC<TouchPositionPotions> = () => {
  return {
    actions: [
      { action: 'enter', events: ['plot:touchstart'] },
      { action: 'hover', events: ['plot:touchmove'] },
      { action: 'leave', events: ['plot:touchend'] },
    ],
  };
};
