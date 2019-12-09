import { Chart } from '../../../src/index';
import Action from '../../../src/interaction/action/base';
import { createAction, createCallbackAction, registerAction } from '../../../src/interaction/action/register';
import Context from '../../../src/interaction/context';
import Interaction from '../../../src/interaction/grammar-interaction';
import { createDiv } from '../../util/dom';

class CustomAction extends Action {
  public readonly name = 'custom';
  public running: boolean = false;
  public isReset: boolean = false;
  public start() {
    this.running = true;
    this.isReset = false;
  }
  public end() {
    this.running = false;
  }
  public reset() {
    this.running = false;
    this.isReset = true;
  }
}
registerAction('custom', CustomAction); // 注册
describe('create action test', () => {
  it('create action', () => {
    const context = new Context(null);
    const action = createAction('custom', context);
    expect(action.name).toBe('custom');
    expect(action.context).toBe(context);
    expect(context.getAction('custom')).toBe(action);
    action.destroy();
    expect(context.getAction('custom')).toBe(undefined);
    context.destroy();
  });

  it('create callback action', () => {
    const context = new Context(null);
    expect(context.actions.length).toBe(0);
    const action = createCallbackAction((c) => {
      c.cache('a', 'a1');
    }, context);
    expect(context.actions.length).toBe(1);
    action.execute();
    expect(context.cache('a')).toBe('a1');
    context.destroy();
    expect(action.context).toBe(null);
  });
});
describe('Interaction test', () => {
  const chart = new Chart({
    container: createDiv(),
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
    { year: '1996', value: 7 },
    { year: '1997', value: 23 },
    { year: '1998', value: 90 },
    { year: '1999', value: 3 },
  ]);
  chart.animate(false);
  chart.tooltip(false);
  chart.interval().position('year*value');
  chart.render();

  describe('test simple interaction', () => {
    const interaction = new Interaction(chart, {
      start: [{ trigger: 'mouseenter', action: 'custom:start' }],
      end: [{ trigger: 'mouseleave', action: 'custom:end' }],
    });

    it('init interaction', () => {
      interaction.init();
      const context = interaction.context;
      expect(context.actions.length).toBe(1);
      expect(context.getAction('custom')).not.toBe(undefined);
      expect(context.actions[0].name).toBe('custom');
    });

    it('start', () => {
      const context = interaction.context;
      const action = context.getAction('custom') as CustomAction;
      expect(action.running).toBe(false);
      const eventObject = {
        x: 332,
        y: 337,
      };
      chart.emit('mouseenter', eventObject);
      expect(context.event).toBe(eventObject);
      expect(action.running).toBe(true);
    });
    it('end', () => {
      const context = interaction.context;
      const action = context.getAction('custom') as CustomAction;
      expect(action.running).toBe(true);
      const eventObject = {
        x: 332,
        y: 337,
      };
      chart.emit('mouseleave', eventObject);
      expect(context.event).toBe(eventObject);
      expect(action.running).toBe(false);
    });
    it('first emit end', () => {
      interaction.currentStepName = null; // 未进行
      const context = interaction.context;
      const action = context.getAction('custom') as CustomAction;
      expect(action.running).toBe(false);
      action.running = true;
      chart.emit('mouseleave', {}); // 未开始时，不执行结束
      expect(action.running).toBe(true);
      chart.emit('mouseenter', {});
      chart.emit('mouseleave', {});
      expect(action.running).toBe(false);
    });
    it('destroy', () => {
      const context = interaction.context;
      const action = context.getAction('custom') as CustomAction;
      interaction.destroy();
      expect(context.actions).toBe(null);
      expect(action.context).toBe(null);
    });
  });

  describe('with rollback', () => {
    it('no end', () => {
      const interaction = new Interaction(chart, {
        start: [{ trigger: 'mouseenter', action: 'custom:start' }],
        rollback: [{ trigger: 'click', action: 'custom:reset' }],
      });
      interaction.init();
      const context = interaction.context;
      const action = context.getAction('custom') as CustomAction;
      const eventObject = {};
      chart.emit('click', eventObject);
      expect(context.event).toBe(null);
      expect(action.isReset).toBe(false);
      chart.emit('mouseenter', eventObject);
      expect(context.event).toBe(eventObject);
      expect(action.running).toBe(true);
      expect(action.isReset).toBe(false);
      chart.emit('click', eventObject);
      expect(action.isReset).toBe(true);
      interaction.destroy();
    });
    it('with end', () => {
      const interaction = new Interaction(chart, {
        start: [{ trigger: 'mouseenter', action: 'custom:start' }],
        end: [{ trigger: 'mouseleave', action: 'custom:end' }],
        rollback: [{ trigger: 'click', action: 'custom:reset' }],
      });
      interaction.init();
      const context = interaction.context;
      const action = context.getAction('custom') as CustomAction;
      const eventObject = {};
      chart.emit('mouseleave', eventObject);
      expect(action.running).toBe(false);
      chart.emit('click', eventObject);
      expect(action.running).toBe(false);
      expect(action.isReset).toBe(false);

      // 跳过 end ，无法触发 rollback
      chart.emit('mouseenter', eventObject);
      expect(action.running).toBe(true);
      chart.emit('click', eventObject);
      expect(action.running).toBe(true);
      expect(action.isReset).toBe(false);

      // 只有执行了 end，才能 rollback
      chart.emit('mouseleave', eventObject);
      expect(action.running).toBe(false);
      chart.emit('click', eventObject);
      expect(action.isReset).toBe(true);
      interaction.destroy();
    });

    it('isEnable', () => {
      let enable = false;
      const interaction = new Interaction(chart, {
        start: [
          {
            trigger: 'mouseenter',
            isEnable() {
              return enable;
            },
            action: 'custom:start',
          },
        ],
        end: [{ trigger: 'mouseleave', action: 'custom:end' }],
      });
      interaction.init();
      const context = interaction.context;
      const action = context.getAction('custom') as CustomAction;
      const eventObject = {};
      chart.emit('mouseenter', eventObject);
      expect(action.running).toBe(false);
      enable = true;
      chart.emit('mouseenter', eventObject);
      expect(action.running).toBe(true);
      interaction.destroy();
    });

    it('callback', () => {
      let called = false;
      const interaction = new Interaction(chart, {
        start: [{ trigger: 'mouseenter', action: 'custom:start' }],
        end: [
          {
            trigger: 'mouseleave',
            action: 'custom:end',
            callback() {
              called = true;
            },
          },
        ],
      });
      interaction.init();
      const eventObject = {};
      chart.emit('mouseenter', eventObject);
      expect(called).toBe(false);
      chart.emit('mouseleave', eventObject);
      expect(called).toBe(true);
      interaction.destroy();
    });

    it('action is funciton', () => {
      const interaction = new Interaction(chart, {
        start: [
          {
            trigger: 'mouseenter',
            action: (c) => {
              c.cache('test', true);
            },
          },
        ],
        end: [
          {
            trigger: 'mouseleave',
            action: (c) => {
              c.cache('test', false);
            },
          },
        ],
      });
      interaction.init();
      const context = interaction.context;
      const eventObject = {};
      chart.emit('mouseenter', eventObject);
      expect(context.cache('test')).toBe(true);

      chart.emit('mouseleave', eventObject);
      expect(context.cache('test')).toBe(false);
      interaction.destroy();
    });
  });
  /*
  describe('active', () => {
    class CustomActive extends Action {
      public active() {
        const context = this.context;
        const event = context.event;
        const target = event.target;
        const element = target.get('element');
        element.setState('active', true);
      }
      public reset() {
        const context = this.context;
        const event = context.event;
        const target = event.target;
        const element = target.get('element');
        element.setState('active', false);
      }
    }
    registerAction('custom-active', CustomActive); // 注册
    // 手工测试
    const interaction = new Interaction(chart, {
      start: [
        {trigger: 'interval:mouseenter', action:'custom-active:active'}
      ],
      end: [
        {trigger: 'interval:mouseleave', action: 'custom-active:reset'}
      ],
    });
    interaction.init();
  });
*/
  afterAll(() => {
    chart.destroy();
  });
});
