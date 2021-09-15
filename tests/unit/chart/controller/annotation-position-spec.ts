import 'jest-extended';
import { COMPONENT_TYPE } from '../../../../src/constant';
import { Chart } from '../../../../src/index';
import { delay } from '../../../util/delay';
import { createDiv } from '../../../util/dom';

describe('annotation position', () => {
  const container = createDiv();
  const chart = new Chart({
    container,
    height: 500,
    width: 600,
    autoFit: false,
    padding: 0,
  });

  chart.data([
    { name: 'London', 月份: 'Jan.', 月均降雨量: 18.9 },
    { name: 'London', 月份: 'Feb.', 月均降雨量: 28.8 },
    { name: 'London', 月份: 'Mar.', 月均降雨量: 39.3 },
    { name: 'London', 月份: 'Apr.', 月均降雨量: 22.6 },
  ]);

  chart.annotation().text({
    position: { name: 'London', 月份: 'Feb.', 月均降雨量: 28.8 },
    content: '第一个文本',
  });

  chart.annotation().text({
    position: ['50%', '50%'],
    content: '第二个文本',
  });

  chart.annotation().text({
    position: ['30%', 39.3],
    content: '第三个文本',
  });

  chart.interval().position('月份*月均降雨量');
  chart.render();

  function getAnnotations() {
    return chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.ANNOTATION);
  }

  it('position 1', async () => {
    const annotations = getAnnotations();
    // @ts-ignore
    const { x, y } = annotations[0].component.cfg;
    // @ts-ignore
    expect(x).toEqual(chart.getXScale().scale('Feb.') * chart.getCoordinate().width);
    // @ts-ignore
    expect(y).toEqual((1 - chart.getYScales()[0].scale(28.8)) * chart.getCoordinate().height);
  });

  it('position 2', async () => {
    const annotations = getAnnotations();
    // @ts-ignore
    const { x, y } = annotations[1].component.cfg;
    // @ts-ignore
    expect(x).toEqual(0.5 * chart.getCoordinate().width);
    // @ts-ignore
    expect(y).toEqual((1 - 0.5) * chart.getCoordinate().height);
  });

  it('position 3', async () => {
    const annotations = getAnnotations();
    // @ts-ignore
    const { x, y } = annotations[2].component.cfg;
    // @ts-ignore
    expect(x).toEqual(0.3 * chart.getCoordinate().width);
    // @ts-ignore
    expect(y).toEqual((1 - chart.getYScales()[0].scale(39.3)) * chart.getCoordinate().height);
  });
});
