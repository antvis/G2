import { Chart, VIEW_CLASS_NAME } from '../../../src';
import { createNodeGCanvas } from '../../integration/utils/createNodeGCanvas';

function interactionOf(chart, name) {
  const { canvas } = chart.getContext();
  const [view] = canvas.document.getElementsByClassName(VIEW_CLASS_NAME);
  const nameInteraction = view['nameInteraction'];
  return nameInteraction.get(name);
}

function mockInteraction(chart, name, fn) {
  const interaction = interactionOf(chart, name);
  const { destroy } = interaction;
  const newDestroy = () => {
    destroy();
    fn();
  };
  interaction.destroy = newDestroy;
}

function createChart() {
  const chart = new Chart({
    canvas: createNodeGCanvas(640, 480),
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
    .encode('y', 'sold')
    .encode('color', 'genre');

  return chart;
}

describe('Clear Interaction', () => {
  it('chart.resize() should clear interaction.', async () => {
    const chart = createChart();
    await chart.render();

    const fn = jest.fn();
    mockInteraction(chart, 'tooltip', fn);

    // Update size to call destroy.
    await chart.changeSize(600, 600);
    expect(fn).toBeCalledTimes(1);
  });

  it('chart.clear() should clear interaction.', async () => {
    const chart = createChart();
    await chart.render();

    const fn = jest.fn();
    mockInteraction(chart, 'tooltip', fn);
    chart.clear();
    expect(fn).toBeCalledTimes(1);
  });

  it('chart.render() should overwrite prev interaction.', async () => {
    const chart = createChart();
    await chart.render();

    // Mock destroy of interaction.
    const fn = jest.fn();
    mockInteraction(chart, 'event', fn);

    // Rerender
    await chart.render();
    await chart.render();
    expect(fn).toBeCalledTimes(1);
  });
});

describe('Clear EventEmitter', () => {
  it('legendFilter.destroy() should clear legend:filter handler.', async () => {
    const chart = createChart();
    chart.legend('color', false);
    await chart.render();
    const { emitter } = chart.getContext();
    const { destroy } = interactionOf(chart, 'legendFilter');
    destroy();
    expect(emitter?.getEvents()['legend:filter']).toBeUndefined();
  });
});
