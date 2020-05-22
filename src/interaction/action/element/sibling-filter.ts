import { each } from '@antv/util';
import Action from '../base';
import { getElements, getMaskedElements, getSiblingMaskElements, getSilbings, isInRecords, isMask } from '../util';

/**
 * Sibling filter
 * @ignore
 */
class SiblingFilter extends Action {
  protected byRecord = false;
  /**
   * 过滤隐藏图形
   */
  public filter() {
    // 仅考虑 mask 导致的过滤
    if (isMask(this.context)) {
      if (this.byRecord) {
        this.filterByRecord();
      } else {
        this.filterByBBox();
      }
    }
  }
  // 根据框选的记录来做过滤
  private filterByRecord() {
    const view = this.context.view;
    const maskElements = getMaskedElements(this.context, 10);
    if (!maskElements) {
      return;
    }
    const xFiled = view.getXScale().field;
    const yField = view.getYScales()[0].field;
    const records = maskElements.map((el) => {
      return el.getModel().data;
    });
    const siblings = getSilbings(view);
    each(siblings, (sibling) => {
      const elements = getElements(sibling);
      each(elements, (el) => {
        const record = el.getModel().data;
        // records.includes(record) 不生效，应该是数据的引用被改了
        if (isInRecords(records, record, xFiled, yField)) {
          el.show();
        } else {
          el.hide();
        }
      });
    });
  }

  // 根据被框选的包围盒做过滤
  private filterByBBox() {
    const view = this.context.view;
    const siblings = getSilbings(view);
    each(siblings, (sibling) => {
      const maskElements = getSiblingMaskElements(this.context, sibling, 10);
      const elements = getElements(sibling);
      if (maskElements) {
        // mask 过小时返回为 null，不能是空数组，否则同未框选到混淆
        each(elements, (el) => {
          if (maskElements.includes(el)) {
            el.show();
          } else {
            el.hide();
          }
        });
      }
    });
  }

  /**
   * 清理所有隐藏的图形
   */
  public reset() {
    const siblings = getSilbings(this.context.view);
    each(siblings, (sibling) => {
      const elements = getElements(sibling);
      each(elements, (el) => {
        el.show();
      });
    });
  }
}

export default SiblingFilter;
