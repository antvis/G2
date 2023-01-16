import { Chart, VIEW_CLASS_NAME } from '../../../src';
import { createDiv } from '../../utils/dom';

describe('Interaction', () => {
  it('interaction should be destroy before rerendering', (done) => {
    const chart = new Chart({
      container: createDiv(),
    });

    let rerendered = false;
    let resized = false;
    const fn = jest.fn();
    chart.on('afterrender', () => {
      if (rerendered && resized) return;
      if (!rerendered) {
        rerendered = true;
        const { canvas } = chart.context();
        // @ts-ignore
        const [view] = canvas.document.getElementsByClassName(VIEW_CLASS_NAME);
        const nameInteraction = view['nameInteraction'];
        const interaction = nameInteraction.get('tooltip');
        const { destroy } = interaction;
        const newDestroy = () => {
          destroy();
          fn();
        };
        interaction.destroy = newDestroy;
        chart.changeSize(600, 600);
        return;
      }
      if (!resized) {
        resized = true;
        expect(fn).toBeCalledTimes(1);
        done();
      }
    });

    chart
      .interval()
      .data([
        { genre: 'Sports', sold: 275 },
        { genre: 'Strategy', sold: 115 },
        { genre: 'Action', sold: 120 },
        { genre: 'Shooter', sold: 350 },
        { genre: 'Other', sold: 150 },
      ])
      .encode('x', 'genre')
      .encode('y', 'sold');

    chart.interaction({ type: 'tooltip' });
    chart.render();
  });
});
