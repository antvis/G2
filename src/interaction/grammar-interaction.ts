import { each, isArray, isFunction, isString, debounce, throttle } from '@antv/util';
import { View } from '../chart';
import { ActionCallback, IAction, IInteractionContext, LooseObject } from '../interface';
import { createAction, createCallbackAction } from './action/register';
import InteractionContext from './context';
import Interaction from './interaction';

// 将字符串转换成 action
export function parseAction(actionStr: string, context: IInteractionContext, arg?: any): ActionObject {
  const arr = actionStr.split(':');
  const actionName = arr[0];
  // 如果已经初始化过 action ，则直接引用之前的 action
  const action = context.getAction(actionName) || createAction(actionName, context);
  if (!action) {
    throw new Error(`There is no action named ${actionName}`);
  }
  const methodName = arr[1];
  return {
    action,
    methodName,
    arg,
  };
}

// 执行 Action
function executeAction(actionObject: ActionObject) {
  const { action, methodName, arg } = actionObject;
  if (action[methodName]) {
    action[methodName](arg);
  } else {
    throw new Error(`Action(${action.name}) doesn't have a method called ${methodName}`);
  }
}

const STEP_NAMES = {
  START: 'start',
  SHOW_ENABLE: 'showEnable',
  END: 'end',
  ROLLBACK: 'rollback',
  PROCESSING: 'processing',
};

/** 交互环节的定义 */
export interface InteractionStep {
  /**
   * 触发事件，支持 view，chart 的各种事件，也支持 document、window 的事件
   */
  trigger: string;
  /**
   * 是否可以触发 action
   * @param context - 交互的上下文
   */
  isEnable?: (context: IInteractionContext) => boolean;
  /**
   * 反馈，支持三种方式：
   * - action:method : action 的名字和方法的组合
   * - [’action1:method1‘, ’action2:method‘]
   * - ActionCallback: 回调函数
   */
  action: string | string[] | ActionCallback;
  /**
   * 反馈，具体 action method 的参数：
   * - 当传递多个 action 时，args 必须是一个数组
   */
  arg?: any | any[];
  /**
   * 回调函数，action 执行后执行
   */
  callback?: (context: IInteractionContext) => void;
  /**
   * @private
   * 不需要用户传入，通过上面的属性计算出来的属性
   */
  actionObject?: ActionObject | ActionObject[];
  /**
   * 在一个环节内是否只允许执行一次
   */
  once?: boolean;
  /**
   * 是否增加节流
   */
  throttle?: ThrottleOption;
  /**
   * 是否延迟
   */
  debounce?: DebounceOption;
}

// action 执行时支持 debounce 和 throttle，可以参考：https://css-tricks.com/debouncing-throttling-explained-examples/
/**
 * debounce 的配置
 */
export interface DebounceOption {
  /**
   * 等待时间
   */
  wait: number;
  /**
   * 是否马上执行
   */
  immediate?: boolean;
}

/**
 * throttle 的配置
 */
export interface ThrottleOption {
  /**
   * 等待时间
   */
  wait: number;
  /**
   * 马上就执行
   */
  leading?: boolean;
  /**
   * 执行完毕后再执行一次
   */
  trailing?: boolean;
}

/** 缓存 action 对象，仅用于当前文件 */
interface ActionObject {
  /**
   * 缓存的 action
   */
  action: IAction;
  /**
   * action 的方法
   */
  methodName: string;
  /**
   * 用户传递的 action 方法的参数
   */
  arg?: any;
}

/** 交互的所有环节 */
export interface InteractionSteps {
  /**
   * 显示交互可以进行
   */
  showEnable?: InteractionStep[];
  /**
   * 交互开始
   */
  start?: InteractionStep[];
  /**
   * 交互持续
   */
  processing?: InteractionStep[];
  /**
   * 交互结束
   */
  end?: InteractionStep[];
  /**
   * 交互回滚
   */
  rollback?: InteractionStep[];
}

/**
 * 支持语法的交互类
 */
export default class GrammarInteraction extends Interaction {
  // 存储的交互环节
  private steps: InteractionSteps;
  /** 当前执行到的阶段 */
  public currentStepName: string;
  /**
   * 当前交互的上下文
   */
  public context: IInteractionContext;

  private callbackCaches: LooseObject = {};
  // 某个触发和反馈在本环节是否执行或
  private emitCaches: LooseObject = {};

  constructor(view: View, steps: InteractionSteps) {
    super(view, steps);
    this.steps = steps;
  }

  /**
   * 初始化
   */
  public init() {
    this.initContext();
    super.init();
  }

  /**
   * 清理资源
   */
  public destroy() {
    super.destroy(); // 先清理事件
    this.steps = null;
    if (this.context) {
      this.context.destroy();
      this.context = null;
    }

    this.callbackCaches = null;
    this.view = null;
  }

  /**
   * 绑定事件
   */
  protected initEvents() {
    each(this.steps, (stepArr, stepName) => {
      each(stepArr, (step) => {
        const callback = this.getActionCallback(stepName, step);
        if (callback) {
          // 如果存在 callback，才绑定，有时候会出现无 callback 的情况
          this.bindEvent(step.trigger, callback);
        }
      });
    });
  }

  /**
   * 清理绑定的事件
   */
  protected clearEvents() {
    each(this.steps, (stepArr, stepName) => {
      each(stepArr, (step) => {
        const callback = this.getActionCallback(stepName, step);
        if (callback) {
          this.offEvent(step.trigger, callback);
        }
      });
    });
  }

  // 初始化上下文，并初始化 action
  private initContext() {
    const view = this.view;
    const context = new InteractionContext(view);
    this.context = context;
    const steps = this.steps;
    // 生成具体的 Action
    each(steps, (subSteps: InteractionStep[]) => {
      each(subSteps, (step: InteractionStep) => {
        if (isFunction(step.action)) {
          // 如果传入回调函数，则直接生成 CallbackAction
          step.actionObject = {
            action: createCallbackAction(step.action, context),
            methodName: 'execute',
          };
        } else if (isString(step.action)) {
          // 如果是字符串
          step.actionObject = parseAction(step.action, context, step.arg);
        } else if (isArray(step.action)) {
          // 如果是数组
          const actionArr = step.action;
          const argArr = isArray(step.arg) ? step.arg : [step.arg];
          step.actionObject = [];
          each(actionArr, (actionStr, idx) => {
            (step.actionObject as ActionObject[]).push(parseAction(actionStr, context, argArr[idx]));
          });
        }
        // 如果 action 既不是字符串，也不是函数，则不会生成 actionObject
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
  private isAllowExecute(stepName: string, step: InteractionStep): boolean {
    if (this.isAllowStep(stepName)) {
      const key = this.getKey(stepName, step);
      // 如果是在本环节内仅允许触发一次，同时已经触发过，则不允许再触发
      if (step.once && this.emitCaches[key]) {
        return false;
      }
      // 如果是允许的阶段，则验证 isEnable 方法
      if (step.isEnable) {
        return step.isEnable(this.context);
      }
      return true; // 如果没有 isEnable 则允许执行
    }
    return false;
  }

  private enterStep(stepName: string) {
    this.currentStepName = stepName;
    this.emitCaches = {}; // 清除所有本环节触发的缓存
  }

  // 执行完某个触发和反馈（子环节）
  private afterExecute(stepName: string, step) {
    // show enable 不计入正常的流程，其他情况则设置当前的 step
    if (stepName !== STEP_NAMES.SHOW_ENABLE && this.currentStepName !== stepName) {
      this.enterStep(stepName);
    }
    const key = this.getKey(stepName, step);
    // 一旦执行，则缓存标记为，一直保持到跳出改环节
    this.emitCaches[key] = true;
  }
  // 获取某个环节的唯一的键值
  private getKey(stepName, step) {
    return stepName + step.trigger + step.action;
  }

  // 获取 step 的回调函数，如果已经生成，则直接返回，如果未生成，则创建
  private getActionCallback(stepName: string, step: InteractionStep): (e: object) => void {
    const context = this.context;
    const callbackCaches = this.callbackCaches;
    const actionObject = step.actionObject;
    if (step.action && actionObject) {
      const key = this.getKey(stepName, step);
      if (!callbackCaches[key]) {
        // 动态生成执行的方法，执行对应 action 的名称
        const actionCallback = (event) => {
          context.event = event; // 保证检测时的 event
          if (this.isAllowExecute(stepName, step)) {
            // 如果是数组时，则依次执行
            if (isArray(actionObject)) {
              each(actionObject, (obj: ActionObject) => {
                context.event = event; // 可能触发新的事件，保证执行前的 context.event 是正确的
                executeAction(obj);
              });
            } else {
              context.event = event; // 保证执行前的 context.event 是正确的
              executeAction(actionObject);
            }
            this.afterExecute(stepName, step);
            if (step.callback) {
              context.event = event; // 保证执行前的 context.event 是正确的
              step.callback(context);
            }
          } else {
            // 如果未通过验证，则事件不要绑定在上面
            context.event = null;
          }
        };
        // 如果设置了 debounce
        if (step.debounce) {
          callbackCaches[key] = debounce(actionCallback, step.debounce.wait, step.debounce.immediate);
        } else if (step.throttle) {
          // 设置 throttle
          callbackCaches[key] = throttle(actionCallback, step.throttle.wait, {
            leading: step.throttle.leading,
            trailing: step.throttle.trailing,
          });
        } else {
          // 直接设置
          callbackCaches[key] = actionCallback;
        }
      }
      return callbackCaches[key];
    }
    return null;
  }

  private bindEvent(eventName, callback) {
    const nameArr = eventName.split(':');
    if (nameArr[0] === 'window') {
      window.addEventListener(nameArr[1], callback);
    } else if (nameArr[0] === 'document') {
      document.addEventListener(nameArr[1], callback);
    } else {
      this.view.on(eventName, callback);
    }
  }

  private offEvent(eventName, callback) {
    const nameArr = eventName.split(':');
    if (nameArr[0] === 'window') {
      window.removeEventListener(nameArr[1], callback);
    } else if (nameArr[0] === 'document') {
      document.removeEventListener(nameArr[1], callback);
    } else {
      this.view.off(eventName, callback);
    }
  }
}
