import { Chart } from '../../../src';
import { createInteraction, getInteraction, Interaction, registerInteraction } from '../../../src/interaction';
import { createDiv } from '../../util/dom';
import { getClientPoint, simulateMouseEvent } from '../../util/simulate';

describe('Interaction', () => {
  registerInteraction('activeLine', {
    start: [{ trigger: 'mousedown', action: 'element-active:active' }],
    end: [
      {
        trigger: 'click',
        action: 'element-active:reset',
        isEnable(context) {
          const event = context.event;
          if (event.target && event.target.get('element')) {
            return false;
          }
          return true;
        },
      },
    ],
  });

  it('getInteraction', () => {
    expect(getInteraction('test')).toBe(undefined);
  });

  it('registerInteraction', () => {
    expect(getInteraction('activeLine')).toBeDefined();
  });

  it('call', () => {
    const chart = new Chart({
      container: createDiv(),
      width: 400,
      height: 400,
      autoFit: false,
    });

    chart.data([
      { year: '1991', value: 13 },
      { year: '1992', value: 34 },
      { year: '1993', value: 5 },
      { year: '1994', value: 34 },
      { year: '1995', value: 20 },
      { year: '1996', value: 7 },
      { year: '1997', value: 23 },
      { year: '1998', value: 90 },
      { year: '1999', value: 3 },
    ]);
    chart.animate(false);
    chart
      .line({
        theme: {
          geometries: {
            line: {
              line: {
                active: {
                  line: { lineWidth: 4 },
                },
              },
            },
          },
        },
      })
      .position('year*value')
      .style({
        strokeOpacity: 0.2,
        lineWidth: 30,
      });
    chart.interaction('activeLine');
    chart.render();
    simulateMouseEvent(chart.canvas.get('el'), 'mousedown', getClientPoint(chart.canvas, 371, 249));

    const shape = chart.geometries[0].elements[0].shape;
    expect(shape.attr('lineWidth')).toBe(4);
  });

  it('new interaction by class', () => {
    class MyInteraction extends Interaction {
      public name = 'my-interaction';
    }
    const field = 'name';
    expect(createInteraction('test', null)).toBe(null);
    registerInteraction('my-interaction', MyInteraction);
    expect(getInteraction('my-interaction')).toBe(MyInteraction);
    const interaction = createInteraction('my-interaction', null);
    expect(interaction instanceof MyInteraction).toBe(true);
    expect(interaction[field]).toBe('my-interaction');
    delete Interaction['my-interaction'];
  });
});
