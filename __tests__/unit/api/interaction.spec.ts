import { VIEW_CLASS_NAME, Chart } from '../../../src';

describe('Interaction', () => {
  it('should clear interaction after resize', async () => {
    const chart = new Chart({});

    chart.data({
      value: [
        { genre: 'Sports', sold: 275 },
        { genre: 'Strategy', sold: 115 },
        { genre: 'Action', sold: 120 },
        { genre: 'Shooter', sold: 350 },
        { genre: 'Other', sold: 150 },
      ],
    });

    chart
      .interval()
      .encode('x', 'genre')
      .encode('y', 'sold')
      .encode('color', 'genre');

    chart.interaction('tooltip');
    await chart.render();

    const { canvas } = chart.getContext();
    const fn = jest.fn();

    // Update interaction hook.
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

    // Update size to call destroy.
    await chart.changeSize(600, 600);
    expect(fn).toBeCalledTimes(1);
  });
});
