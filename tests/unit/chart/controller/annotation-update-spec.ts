import 'jest-extended';
import { COMPONENT_TYPE } from '../../../../src/constant';
import { Chart } from '../../../../src/index';
import { delay } from '../../../util/delay';
import { createDiv } from '../../../util/dom';

describe('annotation update', () => {
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

  chart.interval().position('月份*月均降雨量');
  chart.render();

  function getAnnotations() {
    return chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.ANNOTATION);
  }

  it('annotation add', async () => {
    let annotations = getAnnotations();
    expect(annotations.length).toBe(1);
    expect(annotations[0].component.get('type')).toBe('text');
    expect(annotations[0].component.get('animate')).toBe(true);
    expect(annotations[0].component.get('animateOption')).toBeDefined();

    const [text] = annotations;

    await delay(500);

    chart.annotation().line({
      start: { name: 'London', 月份: 'Jan.', 月均降雨量: 18.9 },
      end: { name: 'London', 月份: 'Mar.', 月均降雨量: 39.3 },
      animate: false,
    });
    chart.render(true);

    annotations = getAnnotations();
    expect(annotations.length).toBe(2);

    // 更新逻辑保持引用
    expect(annotations[0]).toBe(text);
    expect(annotations[0].component.get('animate')).toBe(true);
    expect(annotations[1].component.get('type')).toBe('line');
    expect(annotations[1].component.get('animate')).toBe(false);
    expect(annotations[1].component.get('animateOption')).toBeDefined();
  });

  it('legend update', async () => {
    const [text, line] = getAnnotations();

    await delay(1000);

    chart.changeData([
      { name: 'London', 月份: 'Jan.', 月均降雨量: 18.9 },
      { name: 'London', 月份: 'Feb.', 月均降雨量: 28.8 },
      { name: 'London', 月份: 'Mar.', 月均降雨量: 39.3 },
      { name: 'London', 月份: 'Apr.', 月均降雨量: 22.6 },
      { name: 'London', 月份: 'May.', 月均降雨量: 41.3 },
    ]);

    chart.render(true);

    const annotations = getAnnotations();
    expect(annotations.length).toBe(2);

    // 保持引用
    expect(annotations[0]).toBe(text);
    expect(annotations[1]).toBe(line);
  });

  it('legend delete', async () => {
    const [text, line] = getAnnotations();
    await delay(1000);

    chart.annotation().clear(true);

    chart.annotation().text({
      position: { name: 'London', 月份: 'May.', 月均降雨量: 41.3 },
      content: '第二个文本',
    });

    chart.render(true);

    const annotations = getAnnotations();
    expect(annotations.length).toBe(1);

    // 都被删除，没有引用
    expect(annotations[0]).not.toBe(text);
    expect(annotations[0]).not.toBe(line);

    expect(annotations[0].component.get('content')).toBe('第二个文本');
  });
});
