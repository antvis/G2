import { issue6551 as render } from '../plots/bugfix/issue-6551';
import { createNodeGCanvas } from './utils/createNodeGCanvas';
import { sleep } from './utils/sleep';
import './utils/useSnapshotMatchers';

describe('issue6551', () => {
  const canvas = createNodeGCanvas(800, 500);

  it('issue6551.render() tooltip style should render as expected', async () => {
    const { finished, chart } = render({ canvas });
    await finished;
    await sleep(20);
    const dir = `${__dirname}/snapshots/bugfix`;
    await expect(canvas).toMatchDOMSnapshot(dir, render.name);
    await expect(JSON.stringify(chart.value.interaction.tooltip.css)).toEqual(
      '{".g2-tooltip":{"background-color":"rgba(0, 0, 0, 0.50)","border-radius":" 2px !important","box-shadow":"0px 10px 20px 0px rgba(0, 0, 0, 0.50) !important"},".g2-tooltip-title":{"border-bottom":"0.5px solid #0F445B","color":"#fff"},".g2-tooltip-list-item-name-label":{"color":"#fff","font-size":"10px"},".g2-tooltip-list-item-value":{"color":"#fff","font-size":"10px"}}',
    );
  });

  afterAll(() => {
    canvas?.destroy();
  });
});
