import { Chart } from '../../../../src/index';
import { createAction } from '../../../../src/interaction/action/register';
import ButtonAction from '../../../../src/interaction/action/view/button';
import Context from '../../../../src/interaction/context';
import { createDiv } from '../../../util/dom';

describe('test button action', () => {
  const chart = new Chart({
    container: createDiv(),
    width: 400,
    height: 400,
    autoFit: false,
  });
  const data = [
    { year: '1991', value: 13 },
    { year: '1992', value: 34 },
    { year: '1993', value: 5 },
    { year: '1994', value: 34 },
  ];
  chart.data(data);
  chart.animate(false);
  chart.tooltip(false);
  chart
    .interval()
    .position('year*value')
    .color('year');
  chart.render();
  const context = new Context(chart);
  const action = new ButtonAction(context, {
    text: 'my button',
    style: {
      fill: 'red',
    },
    activeStyle: {
      fill: 'blue',
    },
  });
  let buttonGroup;
  it('init', () => {
    // @ts-ignore
    const config = action.getButtonCfg();
    expect(config.name).toBe('button');
    expect(config.style.fill).toBe('red');
    // @ts-ignore
    expect(action.buttonCfg.style.fill).toBe('red');
  });

  it('show button', () => {
    action.show();
    // @ts-ignore
    buttonGroup = action.buttonGroup;
    expect(buttonGroup).not.toBe(null);
    const matrix = buttonGroup.getMatrix();
    expect(matrix).not.toBe(null);
    expect(matrix[6]).toBeLessThan(320);
    expect(matrix[6]).toBeGreaterThan(300);
    expect(buttonGroup.get('visible')).toBe(true);
    const text = buttonGroup.getLast();
    expect(text.attr('text')).toBe('my button');
  });

  it('active', () => {
    const buttonShape = buttonGroup.getFirst();
    expect(buttonShape.attr('fill')).toBe('red');
    buttonGroup.emit('mouseenter', {
      target: buttonGroup.getFirst(),
    });

    expect(buttonShape.attr('fill')).toBe('blue');
    buttonGroup.emit('mouseleave', {
      target: buttonGroup.getFirst(),
    });
    expect(buttonShape.attr('fill')).toBe('red');
  });

  it('hide', () => {
    action.hide();
    expect(buttonGroup.get('visible')).toBe(false);
  });

  it('view resize', () => {
    chart.changeSize(500, 400);
    action.show();
    const matrix = buttonGroup.getMatrix();
    expect(matrix).not.toBe(null);
    expect(matrix[6]).toBeLessThan(420);
    expect(matrix[6]).toBeGreaterThan(400);
  });

  it('destroy', () => {
    action.destroy();
    expect(buttonGroup.destroyed).toBe(true);
  });

  it('create reset button', () => {
    const resetButtonAction = createAction('reset-button', context) as ButtonAction;
    resetButtonAction.show();
    // @ts-ignore
    buttonGroup = resetButtonAction.buttonGroup;
    const text = buttonGroup.getLast();
    expect(text.attr('text')).toBe('reset');
    resetButtonAction.destroy();
  });

  afterAll(() => {
    context.destroy();
    chart.destroy();
  });
});
