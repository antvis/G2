import { MousePosition, TouchPosition } from '@/interaction/interactor';

describe('interactor', () => {
  it('MousePosition() returns expected defaults', () => {
    expect(MousePosition()).toEqual({
      actions: [
        { action: 'enter', events: ['plot:mouseenter'] },
        { action: 'hover', events: ['plot:mousemove'] },
        { action: 'leave', events: ['plot:mouseleave'] },
      ],
    });
  });

  it('TouchPosition() returns expected defaults', () => {
    expect(TouchPosition()).toEqual({
      actions: [
        { action: 'enter', events: ['plot:touchstart'] },
        { action: 'hover', events: ['plot:touchmove'] },
        { action: 'leave', events: ['plot:touchend'] },
      ],
    });
  });
});
