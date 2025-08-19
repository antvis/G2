import { chartEmitTooltipShow as render } from '../plots/api/chart-emit-tooltip-show';
import { createNodeGCanvas } from './utils/createNodeGCanvas';

describe('chart.emit tooltip with line', () => {
  const canvas = createNodeGCanvas(800, 400);
  const container = document.createElement('div');
  const { finished, chart } = render({
    canvas,
    container,
  });

  it('chart.on("tooltip:show") should return expected data X.', async () => {
    await finished;
    const tooltipData: HTMLElement | null =
      container.querySelector('.tooltip-content');

    expect(tooltipData?.innerText).toEqual(
      `{"title":"1997","items":[{"value":7,"color":"#1783FF","name":"value"}],"data":{"x":"1997"}}`,
    );
  });

  afterAll(() => {
    canvas?.destroy();
  });
});
