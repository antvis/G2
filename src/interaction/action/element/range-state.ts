import { each } from '@antv/util';
import Element from '../../../geometry/element/';
import {
  getElements,
  getIntersectElements,
  getMaskedElements,
  getSiblingMaskElements,
  getSilbings,
  isInRecords,
  isMask,
} from '../util';
import StateBase from './state-base';

/**
 * @ignore
 * 区域设置状态的基础 Action
 */
class ElementRangeState extends StateBase {
  private startPoint = null;
  private endPoint = null;
  private isStarted: boolean = false;
  /**
   * 是否作用于当前 view 的 siblings，默认是 false 仅作用于自己
   */
  protected effectSiblings = false;
  /**
   * 是否受 element 的数据影响，还是受包围盒的影响
   */
  protected effectByRecord = false;
  // 获取当前的位置
  private getCurrentPoint() {
    const event = this.context.event;
    return {
      x: event.x,
      y: event.y,
    };
  }

  /**
   * 开始，记录开始选中的位置
   */
  public start() {
    this.clear(); // 开始的时候清理之前的状态
    this.startPoint = this.getCurrentPoint();
    this.isStarted = true;
  }

  private getIntersectElements() {
    let elements = null;
    if (isMask(this.context)) {
      elements = getMaskedElements(this.context, 10);
    } else {
      const startPoint = this.startPoint;
      const endPoint = this.isStarted ? this.getCurrentPoint() : this.endPoint;
      // 如果没有开始，则不允许范围设置状态，保护性质
      if (!startPoint || !endPoint) {
        return;
      }
      // 计算框选区域
      const box = {
        minX: Math.min(startPoint.x, endPoint.x),
        minY: Math.min(startPoint.y, endPoint.y),
        maxX: Math.max(startPoint.x, endPoint.x),
        maxY: Math.max(startPoint.y, endPoint.y),
      };
      // this.clear(); // 不全部清理，会导致闪烁
      const view = this.context.view;
      elements = getIntersectElements(view, box);
    }
    return elements;
  }
  /**
   * 选中
   */
  public setStateEnable(enable: boolean) {
    if (this.effectSiblings && !this.effectByRecord) {
      this.setSiblingsState(enable);
    } else {
      const allElements = getElements(this.context.view);
      const elements = this.getIntersectElements();
      if (elements && elements.length) {
        if (this.effectByRecord) {
          this.setSiblingsStateByRecord(elements, enable);
        } else {
          this.setElementsState(elements, enable, allElements);
        }
      } else {
        this.clear();
      }
    }
  }
  // 根据选中的 element 的数据进行设置状态
  private setSiblingsStateByRecord(elements, enable) {
    const view = this.context.view;
    const siblings = getSilbings(view);
    const records = elements.map((el) => {
      return el.getModel().data;
    });
    const xFiled = view.getXScale().field;
    const yField = view.getYScales()[0].field;
    each(siblings, (sibling) => {
      const allElements = getElements(sibling);
      const effectElements = allElements.filter((el) => {
        const record = el.getModel().data;
        return isInRecords(records, record, xFiled, yField);
      });
      this.setElementsState(effectElements, enable, allElements);
    });
  }

  // 设置兄弟 view 的状态
  private setSiblingsState(enable: boolean) {
    const view = this.context.view;
    const siblings = getSilbings(view);
    if (isMask(this.context)) {
      // 受 mask 影响
      each(siblings, (sibling) => {
        const allElements = getElements(sibling);
        const effectElements = getSiblingMaskElements(this.context, sibling, 10);
        if (effectElements && effectElements.length) {
          this.setElementsState(effectElements, enable, allElements);
        } else {
          this.clearViewState(sibling);
        }
      });
    }
  }

  protected setElementsState(elements: Element[], enable, allElements: Element[]) {
    each(allElements, (el) => {
      if (!elements.includes(el)) {
        this.setElementState(el, false);
      } else {
        this.setElementState(el, enable);
      }
    });
  }

  /**
   * 结束
   */
  public end() {
    this.isStarted = false;
    this.endPoint = this.getCurrentPoint();
  }

  // 复写 clear
  public clear() {
    const view = this.context.view;
    // 判断是否影响 siblings
    if (this.effectSiblings) {
      const siblings = getSilbings(view);
      each(siblings, (sibling) => {
        this.clearViewState(sibling);
      });
    } else {
      this.clearViewState(view);
    }
  }
}

export default ElementRangeState;
