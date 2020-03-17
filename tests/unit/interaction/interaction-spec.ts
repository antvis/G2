import { Chart } from '../../../src/index';
import Action from '../../../src/interaction/action/base';
import {
  createAction,
  createCallbackAction,
  getActionClass,
  registerAction,
  unregisterAction,
} from '../../../src/interaction/action/register';
import Context from '../../../src/interaction/context';
import Interaction from '../../../src/interaction/grammar-interaction';
import { createDiv, simulateMouseEvent } from '../../util/dom';

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
  it('getActionClass', () => {
    expect(getActionClass('custom')).toBe(CustomAction);
    expect(getActionClass('test11')).toBe(undefined);
  });
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
    { year: '1996', value: 7 },
    { year: '1997', value: 23 },
    { year: '1998', value: 90 },
    { year: '1999', value: 3 },
  ]);
  chart.animate(false);
  chart.legend('year', {
    position: 'right-bottom',
  });
  chart.tooltip(false);
  chart
    .interval()
    .position('year*value')
    .color('year');

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
      action.running = false; // 反复执行
      chart.emit('mouseenter', eventObject);
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

  describe('once', () => {
    it('single start', () => {
      const interaction = new Interaction(chart, {
        start: [{ trigger: 'mouseenter', action: 'custom:start', once: true }],
      });
      interaction.init();
     
      const context = interaction.context;
      const action = context.getAction('custom') as CustomAction;
      const eventObject = {};
      chart.emit('mouseenter', eventObject);
      expect(action.running).toBe(true);
      action.running = false;
      chart.emit('mouseenter', eventObject);
      expect(action.running).toBe(false);
      interaction.destroy();
    });
    it('start and end', () => {
      const interaction = new Interaction(chart, {
        start: [{ trigger: 'mouseenter', action: 'custom:start', once: true }],
        end: [{ trigger: 'mouseleave', action: 'custom:end', once: true }],
      });
      interaction.init();
      const context = interaction.context;
      const action = context.getAction('custom') as CustomAction;
      const eventObject = {};
      chart.emit('mouseenter', eventObject);
      expect(action.running).toBe(true);
      chart.emit('mouseleave', eventObject);
      expect(action.running).toBe(false);
      chart.emit('mouseenter', eventObject);
      expect(action.running).toBe(true);
      // 反复执行
      chart.emit('mouseleave', eventObject);
      expect(action.running).toBe(false);
      action.running = true;
      chart.emit('mouseleave', eventObject);
      expect(action.running).toBe(true);
    });

    it('start, end, rollback', () => {
      const interaction = new Interaction(chart, {
        start: [{ trigger: 'mouseenter', action: 'custom:start'}],
        end: [{ trigger: 'mouseleave', action: 'custom:end', once: true }],
        rollback: [{trigger: 'click', action: 'custom:reset', once: true}]
      });
      
      interaction.init();
      const context = interaction.context;
      const action = context.getAction('custom') as CustomAction;
      const eventObject = {};
      chart.emit('mouseenter', eventObject);
      expect(action.running).toBe(true);
      action.running = false;
      chart.emit('mouseenter', eventObject);
      expect(action.running).toBe(true);
      chart.emit('click', eventObject);
      expect(action.isReset).toBe(false);

      chart.emit('mouseleave', eventObject);
      expect(action.running).toBe(false);
      chart.emit('click', eventObject);
      expect(action.isReset).toBe(true);
      action.isReset = false;
      chart.emit('click', eventObject);
      expect(action.isReset).toBe(false);
    });
  });

  describe('context test', () => {
    const context = new Context(chart);
    it('cache', () => {
      expect(context.cache('a')).toBe(undefined);
      expect(context.cache('a', 'a1'));
      expect(context.cache('a')).toBe('a1');
      context.cache();
    });

    it('add, remove', () => {
      const action = createAction('element-active', context);
      expect(context.getAction('element-active')).toBe(action);
      context.removeAction(action);
      expect(context.getAction('element-active')).toBe(undefined);
      context.removeAction(action);
    });

    it('isInView', () => {
      context.event = {
        x: 61,
        y: 308,
      };
      expect(context.isInPlot()).toBe(true);
      context.event = {
        x: 61,
        y: 384,
      };
      expect(context.isInPlot()).toBe(false);
      const rect = div.getBoundingClientRect();
      context.event = {
        target: div,
        clientX: rect.left - 10,
        clientY: rect.top - 10,
      };
      expect(context.isInPlot()).toBe(false);
      context.event = {
        target: div,
        clientX: rect.left + 61,
        clientY: rect.top + 308,
      };
      expect(context.isInPlot()).toBe(true);
      context.event = {
        target: div,
        clientX: rect.left + 61,
        clientY: rect.top + 384,
      };
      expect(context.isInPlot()).toBe(false);
      context.event = {
        
      };
      expect(context.isInPlot()).toBe(false);
      context.event = null;
      expect(context.isInPlot()).toBe(false);
    });

    it('isInComponent', () => {
      context.event = {
        x: 61,
        y: 308,
      };
      expect(context.isInComponent('axis')).toBe(false);
      context.event = {
        x: 61,
        y: 384,
      };
      expect(context.isInComponent('axis')).toBe(true);
      expect(context.isInComponent('legend')).toBe(false);
      context.event = {
        x: 374,
        y: 281,
      };
      expect(context.isInComponent('legend')).toBe(true);
    });

    it('isInShape', () => {
      context.event = {
        x: 374,
        y: 281,
        target: null
      };
      expect(context.isInShape('mask')).toBe(false);
      const canvas = chart.getCanvas();
      const shape = canvas.addShape('circle', {
        name: 'mask',
        attrs: {
          x: 374,
          y: 281,
          r: 10
        }
      });
      context.event = {
        x: 374,
        y: 281,
        gEvent: {
          shape: shape
        }
      };
      expect(context.getCurrentShape()).toBe(shape);
      expect(context.getCurrentPoint()).toEqual({
        x: 374,
        y: 281,
      });
      expect(context.isInShape('mask')).toBe(true);
    });
  });

  describe('test complex action', () => {
    it('action array, no error', () => {
      const interaction = new Interaction(chart, {
        start: [{ trigger: 'mouseenter', action: ['custom:start', 'custom:end'] }],
      });
      interaction.init();
      const context = interaction.context;
      const action = context.getAction('custom') as CustomAction;
      expect(action.running).toBe(false);
      const eventObject = {
        x: 332,
        y: 337,
      };
      chart.emit('mouseenter', eventObject);
      expect(action.running).toBe(false);
      interaction.destroy();
    });

    it('trigger is window', () => {
      let called = false;
      const interaction = new Interaction(chart, {
        start: [
          {
            trigger: 'mouseenter',
            action() {
              called = true;
            },
          },
        ],
        end: [
          {
            trigger: 'window:mouseup',
            action() {
              called = false;
            },
          },
        ],
        rollback: [
          {
            trigger: 'document:dblclick',
            action() {
              called = true;
            },
          },
        ],
      });

      interaction.init();
      const eventObject = {
        x: 332,
        y: 337,
      };
      chart.emit('mouseenter', eventObject);
      expect(called).toBe(true);
      const el = chart.getCanvas().get('el') as HTMLElement;
      const rect = el.getBoundingClientRect();
      simulateMouseEvent(window, 'mouseup', {
        clientX: rect.top + 10,
        clientY: rect.left + 10,
      });
      expect(called).toBe(false);

      simulateMouseEvent(document, 'dblclick', {
        target: div,
        clientX: rect.top + 10,
        clientY: rect.left + 10,
      });
      expect(called).toBe(true);
      interaction.destroy();
      // 测试事件是否已经移除
      simulateMouseEvent(window, 'mouseup', {
        target: div,
        clientX: rect.top + 10,
        clientY: rect.left + 10,
      });
      expect(called).toBe(true);
    });

    it('no action', () => {
      const interaction = new Interaction(chart, {
        start: [{ trigger: 'mouseenter', action: 'test:start' }],
      });
      expect(() => {
        interaction.init();
      }).toThrow();
      interaction.destroy();
    });

    it('no method', () => {
      const interaction = new Interaction(chart, {
        start: [{ trigger: 'mouseenter', action: 'custom:test' }],
      });
      interaction.init();

      const context = interaction.context;
      expect(context.actions.length).toBe(1);
      const eventObject = {
        x: 332,
        y: 337,
      };
      expect(() => {
        chart.emit('mouseenter', eventObject);
      }).toThrow();
      interaction.destroy();
    });

    it('action is array error', () => {
      const interaction = new Interaction(chart, {
        start: [{ trigger: 'mouseenter', action: ['test:start', 'custom:start'] }],
      });
      expect(() => {
        interaction.init();
      }).toThrow();
      interaction.destroy();
    });

    it('action array, method error', () => {
      const interaction = new Interaction(chart, {
        start: [{ trigger: 'mouseenter', action: ['custom:start', 'custom:test'] }],
      });
      interaction.init();
      const eventObject = {
        x: 332,
        y: 337,
      };
      expect(() => {
        chart.emit('mouseenter', eventObject);
      }).toThrow();
      interaction.destroy();
    });
  });

  describe('interaction debounce or throttle', () => {
    it('no debounce, no throttle', () => {
      let count = 0;
      const interaction = new Interaction(chart, {
        start: [{ trigger: 'mouseenter', action: () => {
          count ++;
        }}],
      });
      interaction.init();
      const eventObject = {
        x: 332,
        y: 337,
      };
      chart.emit('mouseenter', eventObject);
      chart.emit('mouseenter', eventObject);
      chart.emit('mouseenter', eventObject);
      expect(count).toBe(3);
      interaction.destroy();
    });
    it('debounce, immediate = false', (done) => {
      let count = 0;
      const interaction = new Interaction(chart, {
        start: [{ trigger: 'mouseenter', action: () => {
          count ++;
        }, debounce: {wait: 20}}],
      });
      interaction.init();
      const eventObject = {
        x: 332,
        y: 337,
      };
      chart.emit('mouseenter', eventObject);
      chart.emit('mouseenter', eventObject);
      chart.emit('mouseenter', eventObject);
      expect(count).toBe(0);
      setTimeout(() => {
        expect(count).toBe(1);
        interaction.destroy();
        done();
      }, 25);
    });
    it('debounce, immediate = true', (done) => {
      let count = 0;
      const interaction = new Interaction(chart, {
        start: [{ trigger: 'mouseenter', action: () => {
          count ++;
        }, debounce: {wait: 20, immediate: true}}],
      });
      interaction.init();
      const eventObject = {
        x: 332,
        y: 337,
      };
      chart.emit('mouseenter', eventObject);
      chart.emit('mouseenter', eventObject);
      chart.emit('mouseenter', eventObject);
      expect(count).toBe(1);
      setTimeout(() => {
        expect(count).toBe(1);
        interaction.destroy();
        done();
      }, 25);
    });

    it('throttle', (done) => {
      let count = 0;
      const interaction = new Interaction(chart, {
        start: [{ trigger: 'mouseenter', action: () => {
          count ++;
        }, throttle: {wait: 20}}],
      });
      interaction.init();
      const eventObject = {
        x: 332,
        y: 337,
      };
      chart.emit('mouseenter', eventObject);
      chart.emit('mouseenter', eventObject);
      chart.emit('mouseenter', eventObject);
      expect(count).toBe(1);
      setTimeout(() => {
        expect(count).toBe(2);
        interaction.destroy();
        done();
      }, 25);
    });

    it('throttle trailing = false', (done) => {
      let count = 0;
      const interaction = new Interaction(chart, {
        start: [{ trigger: 'mouseenter', action: () => {
          count ++;
        }, throttle: {wait: 20, trailing: false}}],
      });
      interaction.init();
      const eventObject = {
        x: 332,
        y: 337,
      };
      chart.emit('mouseenter', eventObject);
      chart.emit('mouseenter', eventObject);
      chart.emit('mouseenter', eventObject);
      expect(count).toBe(1);
      setTimeout(() => {
        expect(count).toBe(1);
        interaction.destroy();
        done();
      }, 25);
    });

    it('throttle leading = false', (done) => {
      let count = 0;
      const interaction = new Interaction(chart, {
        start: [{ trigger: 'mouseenter', action: () => {
          count ++;
        }, throttle: {wait: 20, leading: false}}],
      });
      interaction.init();
      const eventObject = {
        x: 332,
        y: 337,
      };
      chart.emit('mouseenter', eventObject);
      chart.emit('mouseenter', eventObject);
      chart.emit('mouseenter', eventObject);
      expect(count).toBe(0);
      setTimeout(() => {
        expect(count).toBe(1);
        interaction.destroy();
        done();
      }, 25);
    });
  });
  afterAll(() => {
    unregisterAction('custom');
    chart.destroy();
  });
});


