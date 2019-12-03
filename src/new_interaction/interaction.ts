import { each, isFunction, isString } from '@antv/util';
import { View } from '../chart';
import { ActionCallback, IAction, IInteractionContext, LooseObject } from '../interface';
import { createAction, createCallbackAction } from './action/register';
import InteractionContext from './context';

const STEP_NAMES = {
  START: 'start',
  SHOW_ENABLE: 'showEnable',
  END: 'end',
  ROLLBACK: 'rollback',
  PROCESSING: 'processint',
};
/** 交互环节的定义 */
export interface InteractionStep {
  trigger: string;
  isEnable?: (context: IInteractionContext) => boolean;
  action: string | ActionCallback;
  callback?: (context: IInteractionContext) => void;
  actionObject?: ActionObject;
}

// 缓存 action 对象
interface ActionObject {
  action: IAction;
  methodName: string;
}

/** 交互的所有环节 */
export interface InteractionSteps {
  showEnable?: InteractionStep[];
  start?: InteractionStep[];
  processing?: InteractionStep[];
  end?: InteractionStep[];
  rollback?: InteractionStep[];
}

class Interaction {
  // view 或者 chart
  private view: View;
  // 存储的交互环节
  private steps: InteractionSteps;
  /** 当前执行到的阶段 */
  public currentStepName: string;
  private callbackCaches: LooseObject = {};
  /**
   * 当前交互的上下文
   */
  public context: IInteractionContext;
  constructor(view: View, steps: InteractionSteps) {
    this.steps = steps;
    this.view = view;
    this.initContext();
    this.bindEvents();
  }

  // 初始化上下文，并初始化 action
  private initContext() {
    const view = this.view;
    const context = new InteractionContext(view);
    this.context = context;
    const steps = this.steps;
    // 生成具体的 Action
    each(steps, (subSteps) => {
      each(subSteps, (step) => {
        if (isFunction(step.action)) {
          // 如果传入回调函数，则直接生成 CallbackAction
          step.actionObject = {
            action: createCallbackAction(step.action, context),
            methodName: 'execute',
          };
        } else if (isString(step.action)) {
          // 如果是字符串，则根据名称生成对应的 Action
          const arr = step.action.split(':');
          const actionName = arr[0];
          // 如果已经初始化过 action ，则直接引用之前的 action
          const action = context.getAction(actionName) || createAction(actionName, context);
          const methodName = arr[1];
          step.actionObject = {
            action,
            methodName,
          };
        } // 如果 action 既不是字符串，也不是函数，则不会生成 actionObject
      });
    });
  }

  // 是否允许指定阶段名称执行
  private isAllowStep(stepName: string): boolean {
    const currentStepName = this.currentStepName;
    const steps = this.steps;
    // 相同的阶段允许同时执行
    if (currentStepName === stepName) {
      return true;
    }

    if (stepName === STEP_NAMES.SHOW_ENABLE) {
      // 示能在整个过程中都可用
      return true;
    }

    if (stepName === STEP_NAMES.PROCESSING) {
      // 只有当前是 start 时，才允许 processing
      return currentStepName === STEP_NAMES.START;
    }

    if (stepName === STEP_NAMES.START) {
      // 如果当前是 processing，则无法 start，必须等待 end 后才能执行
      return currentStepName !== STEP_NAMES.PROCESSING;
    }

    if (stepName === STEP_NAMES.END) {
      return currentStepName === STEP_NAMES.PROCESSING || currentStepName === STEP_NAMES.START;
    }

    if (stepName === STEP_NAMES.ROLLBACK) {
      if (steps[STEP_NAMES.END]) {
        // 如果定义了 end, 只有 end 时才允许回滚
        return currentStepName === STEP_NAMES.END;
      } else if (currentStepName === STEP_NAMES.START) {
        // 如果未定义 end, 则判断是否是开始
        return true;
      }
    }
    return false;
  }

  // 具体的指定阶段是否允许执行
  private isAllowExcute(stepName: string, step: InteractionStep): boolean {
    if (this.isAllowStep(stepName)) {
      // 如果是允许的阶段，则验证 isEnable 方法
      if (step.isEnable) {
        return step.isEnable(this.context);
      }
      return true; // 如果没有 isEnable 则允许执行
    }
    return false;
  }

  // 执行完某个环节后
  private afterExecute(stepName: string) {
    // show enable 不计入正常的流程，其他情况则设置当前的 step
    if (stepName !== STEP_NAMES.SHOW_ENABLE) {
      this.currentStepName = stepName;
    }
  }

  // 获取 step 的回调函数，如果已经生成，则直接返回，如果未生成，则创建
  private getActionCallback(stepName: string, step: InteractionStep): (e: object) => void {
    const context = this.context;
    const callbackCaches = this.callbackCaches;
    const actionObject = step.actionObject;
    if (step.action && actionObject) {
      const key = stepName + step.trigger + step.action;
      if (!callbackCaches[key]) {
        // 动态生成执行的方法，执行对应 action 的名称
        callbackCaches[key] = (event) => {
          if (this.isAllowExcute(stepName, step)) {
            context.event = event;
            const { action, methodName } = actionObject;
            if (action[methodName]) {
              action[methodName]();
            }
            this.afterExecute(stepName);
            if (step.callback) {
              step.callback(context);
            }
          }
        };
      }
      return callbackCaches[key];
    } else {
      return null;
    }
  }
  // 清理绑定的事件
  private clearEvents() {
    const view = this.view;
    each(this.steps, (stepArr, stepName) => {
      each(stepArr, (step) => {
        const callback = this.getActionCallback(stepName, step);
        if (callback) {
          view.off(step.trigger, callback);
        }
      });
    });
  }

  // 绑定事件
  private bindEvents() {
    const view = this.view;
    each(this.steps, (stepArr, stepName) => {
      each(stepArr, (step) => {
        const callback = this.getActionCallback(stepName, step);
        if (callback) {
          // 如果存在 callback，才绑定，有时候会出现无 callback 的情况
          view.on(step.trigger, callback);
        }
      });
    });
  }
  // 清理资源
  public destroy() {
    this.clearEvents(); // 先清理事件
    this.steps = null;
    this.context.destroy();
    this.callbackCaches = null;
    this.context = null;
    this.view = null;
  }
}

export default Interaction;
