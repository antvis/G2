import { chartAxisBreaks as render } from '../plots/api/chart-axis-breaks';
import { createNodeGCanvas } from './utils/createNodeGCanvas';
import { kebabCase } from './utils/kebabCase';
import { sleep } from './utils/sleep';
import './utils/useSnapshotMatchers';

describe('chart.options.axis.y.breaks', () => {
  const dir = `${__dirname}/snapshots/api/${kebabCase(render.name)}`;
  const canvas = createNodeGCanvas(800, 500);
  const { finished, chart } = render({
    canvas,
    container: document.createElement('div'),
  });

  it('applies breaks on y-axis when chart({ axis.y.breaks: true })', async () => {
    await finished;
    await sleep(20);
    expect(canvas).toMatchDOMSnapshot(dir, 'step0');
  });

  it('updates breaks when filtering: exclude "Shooter"', async () => {
    chart.emit('legend:filter', {
      data: {
        channel: 'color',
        values: ['Sports', 'Strategy', 'Other'],
      },
    });
    await sleep(500);
    expect(canvas).toMatchDOMSnapshot(dir, 'step1');
  });

  it('updates breaks when filtering: exclude "Shooter" and "Other"', async () => {
    chart.emit('legend:filter', {
      data: {
        channel: 'color',
        values: ['Sports', 'Strategy'],
      },
    });
    await sleep(500);
    expect(canvas).toMatchDOMSnapshot(dir, 'step2');
  });

  afterAll(() => {
    canvas?.destroy();
  });
});
