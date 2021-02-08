import { Chart } from '../../../src/index';
import Action from '../../../src/interaction/action/base';
import { createAction, getActionClass, registerAction } from '../../../src/interaction/action/register';
import Context from '../../../src/interaction/context';
import Interaction from '../../../src/interaction/grammar-interaction';
import { createDiv } from '../../util/dom';

class GreetAction extends Action {
  public readonly name = 'greet';
  public who: string = '';
  public greetings: string = '';

  public init() {
    super.init();
    this.who = this.cfg?.who;
  }

  public start(behavior: string) {
    if (behavior === 'greet') {
      this.greet(this.who);
    } else {
      this.goodbye(this.who);
    }
  }

  public greet(who: string) {
    this.who = who;
    this.greetings = `say hello to ${who}`;
  }
  public goodbye(who: string) {
    if (this.who === who) {
      this.reset();
    }
  }
  public reset() {
    this.who = this.cfg?.who;
    this.greetings = '';
  }
}

describe('create action test', () => {
  it('getActionClass', () => {
    expect(getActionClass('greet')).toBe(GreetAction);
    expect(getActionClass('test11')).toBe(undefined);
  });

  it('create action', () => {
    const context = new Context(null);
    const action = createAction('greet', context);
    const action1 = createAction('greet', context);
    expect(action.name).toBe('greet');
    expect(action1.name).toBe('greet');
    expect(action.context).toBe(context);
    // 一次只能找到一个
    expect(context.getAction('greet')).toBe(action);
    context.removeAction(action);
    expect(context.getAction('greet')).toBe(action1);

    action.destroy();
    action1.destroy();
    context.destroy();
  });

  it('trigger action, with arg', () => {
    const context = new Context(null);
    const action = createAction('greet', context) as GreetAction;
    action.init();
    action.greet('xm');
    expect(action.greetings).toBe('say hello to xm');
    // 无法 say goodbye
    action.goodbye('wm');
    expect(action.greetings).toBe('say hello to xm');
    action.goodbye('xm');
    expect(action.greetings).toBe('');

    action.destroy();
  });
});

describe('Interaction test', () => {
  const div = createDiv();
  const chart = new Chart({
    container: div,
    width: 400,
    height: 400,
    autoFit: false,
  });

  chart.data([
    { year: '1991', value: 13 },
    { year: '1992', value: 34 },
    { year: '1993', value: 5 },
    { year: '1994', value: 34 },
    { year: '1995', value: 20 },
  ]);
  chart.interval().position('year*value').color('year');
  chart.render();

  // 注册, 初始化带上配置
  registerAction('greet', GreetAction, { who: 'xm' });

  const interaction = new Interaction(chart, {
    // 交互指定 action 的行为
    start: [
      { trigger: 'mouseenter', action: 'greet:start', arg: 'greet' },
      { trigger: 'click', action: 'greet:greet' },
      { trigger: 'dblclick', action: ['greet:greet', 'greet:goodbye'], arg: ['xm', 'wm'] },
    ],
    processing: [{ trigger: 'mousedown', action: 'greet:start', arg: 'goodbye' }],
    end: [{ trigger: 'mouseleave', action: 'greet:reset' }],
  });
  interaction.init();
  const context = interaction.context;
  const action = context.getAction('greet') as GreetAction;

  it('init interaction', () => {
    expect(context.actions.length).toBe(1);
    expect(context.getAction('greet')).not.toBe(undefined);
    expect(context.actions[0].name).toBe('greet');
    expect(action.who).toBe('xm');
  });

  it('start - processing', () => {
    chart.emit('mouseenter', {});
    expect(action.greetings).toBe('say hello to xm');
    chart.emit('mousedown', {});
    expect(action.greetings).toBe('');
  });

  it('start - end', () => {
    action.greet('xm');
    expect(action.greetings).toBe('say hello to xm');
    chart.emit('mouseleave', {});
    expect(action.greetings).toBe('');
  });

  it('trigger without arg', () => {
    chart.emit('click', {});
    expect(action.who).toBe(undefined);
    expect(action.greetings).toBe('say hello to undefined');
  });

  // 注册, 初始化带上配置
  registerAction('greet2', GreetAction);
  const interaction2 = new Interaction(chart, {
    // 交互指定 action 的行为
    start: [
      { trigger: 'mouseenter', action: ['greet2:greet', 'greet2:goodbye'], arg: ['xm', 'wm'] },
      { trigger: 'click', action: ['greet2:greet'], arg: ['wm'] },
      { trigger: 'dblclick', action: ['greet2:goodbye'], arg: ['wm'] },
    ],
    end: [{ trigger: 'mouseleave', action: 'greet2:reset' }],
  });
  interaction2.init();
  const context2 = interaction2.context;
  const action2 = context2.getAction('greet2') as GreetAction;

  it('trigger multiple action', () => {
    chart.emit('mouseenter', {});
    expect(action2.who).toBe('xm');
    // greet 和 goodbye 参数不同，不能说再见
    expect(action2.greetings).toBe('say hello to xm');

    chart.emit('click', {});
    expect(action2.who).toBe('wm');

    chart.emit('dblclick', {});
    expect(action2.who).toBe(undefined);
    expect(action2.greetings).toBe('');
  });

  afterAll(() => {
    interaction2.destroy();
    action2.destroy();
    interaction.destroy();
    action.destroy();
    chart.destroy();
  });
});
