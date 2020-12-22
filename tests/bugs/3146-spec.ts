// 欢迎使用全新的 G2 4.0
import { Chart } from '../../src';
import { createDiv } from '../util/dom';

describe('#3146', () => {
  const chart = new Chart({
    container: createDiv(),
    width: 500,
    height: 500,
  });

  chart.data([
    { type: '分类一', value: 10 },
    { type: '分类二', value: 10 },
    { type: '分类三', value: 10 },
  ]);

  function render(labelCfg = {}) {
    chart.clear();
    chart.coordinate('theta');
    chart.interval().position('1*value').color('type').adjust('stack').label('type', labelCfg);
    chart.render();
  }

  it('pie label,style.fill 为 undefined 时，跟随旧逻辑，取默认色', () => {
    render();
    let labels = chart.geometries[0].labelsContainer.getChildren();
    expect((labels[0] as any).getChildByIndex(0).attr('fill')).toBe('#595959');

    render({ style: { fill: undefined } });
    labels = chart.geometries[0].labelsContainer.getChildren();
    expect((labels[0] as any).getChildByIndex(0).attr('fill')).toBe('#595959');

    render({ style: { fill: 'red' } });
    labels = chart.geometries[0].labelsContainer.getChildren();
    expect((labels[0] as any).getChildByIndex(0).attr('fill')).toBe('red');
  });

  it('当 pie.label.style.fill 设置为 null 时，映射为对应块的颜色', () => {
    const theme = chart.getTheme();
    render({ style: { fill: null } });
    let labels = chart.geometries[0].labelsContainer.getChildren();
    expect((labels[0] as any).getChildByIndex(0).attr('fill')).toBe(theme.colors10[0]);

    render((type) => ({
      style: { fill: type === '分类一' ? 'blue' : type === '分类二' ? undefined : null },
    }));
    labels = chart.geometries[0].labelsContainer.getChildren();
    expect((labels[0] as any).getChildByIndex(0).attr('fill')).toBe('blue');
    expect((labels[1] as any).getChildByIndex(0).attr('fill')).toBe('#595959');
    expect((labels[2] as any).getChildByIndex(0).attr('fill')).toBe(theme.colors10[2]);
  });

  it('修改主题色, 优先级 pieLabels > labels', () => {
    chart.theme({
      labels: {
        style: {
          fill: 'red',
        },
      },
    });
    render();
    let labels = chart.geometries[0].labelsContainer.getChildren();
    expect((labels[0] as any).getChildByIndex(0).attr('fill')).toBe('red');

    chart.theme({
      labels: {
        style: {
          fill: 'red',
        },
      },
      pieLabels: {
        style: {
          fill: 'green',
        },
      },
    });
    render();
    labels = chart.geometries[0].labelsContainer.getChildren();
    expect((labels[0] as any).getChildByIndex(0).attr('fill')).toBe('green');
  });
});
