import { each } from '@antv/util';
import { IList, ListItem } from '../../../dependents';
import { clearList } from './list-highlight-util';
import ListState from './list-state';
const STATUS_UNACTIVE = 'inactive';
const STATUS_ACTIVE = 'active';
type MatchCallback = (item: ListItem) => boolean;

/**
 * highlight Action 的效果是 active 和 inactive 两个状态的组合
 * @class
 * @ignore
 */
class ListHighlight extends ListState {
  protected stateName: string = STATUS_ACTIVE;
  protected ignoreItemStates = ['unchecked']; // 当存在 unchecked 状态时不触发
  // 如果 item.name 匹配，则设置 highlight 以及取消
  protected setItemsState(list: IList, name: string, enable: boolean) {
    this.setHighlightBy(list, (item) => item.name === name, enable);
  }

  // 单个 item 设置状态
  protected setItemState(list: IList, item: ListItem, enable: boolean) {
    const items = list.getItems();
    this.setHighlightBy(list, (el) => el === item, enable);
  }

  // 根据条件设置 highlight
  private setHighlightBy(list: IList, callback: MatchCallback, enable: boolean) {
    const items = list.getItems();
    if (enable) {
      // 设置 highlight 时，保留之前已经 Highlight 的项
      each(items, (item) => {
        if (callback(item)) {
          if (list.hasState(item, STATUS_UNACTIVE)) {
            list.setItemState(item, STATUS_UNACTIVE, false);
          }
          list.setItemState(item, STATUS_ACTIVE, true);
        } else if (!list.hasState(item, STATUS_ACTIVE)) {
          list.setItemState(item, STATUS_UNACTIVE, true);
        }
      });
    } else {
      const activeItems = list.getItemsByState(STATUS_ACTIVE);
      let allCancel = true;
      // 检测 activeItems 是否要全部取消
      each(activeItems, (item) => {
        if (!callback(item)) {
          allCancel = false;
          return false;
        }
      });
      if (allCancel) {
        this.clear();
      } else {
        // 如果不是都要取消 highlight, 则设置匹配的 element 的状态为 unactive
        // 其他 element 状态不变
        each(items, (item) => {
          if (callback(item)) {
            if (list.hasState(item, STATUS_ACTIVE)) {
              list.setItemState(item, STATUS_ACTIVE, false);
            }
            list.setItemState(item, STATUS_UNACTIVE, true);
          }
        });
      }
    }
  }

  /**
   * highlight 图例项（坐标轴文本）
   */
  public highlight() {
    this.setState();
  }

  // 需要全部清理 active 和 unactive
  public clear() {
    const triggerInfo = this.getTriggerListInfo();
    if (triggerInfo) {
      clearList(triggerInfo.list);
    } else {
      // 如果不是 component 的事件触发，则所有满足触发条件的组件都清除该状态
      const components = this.getAllowComponents();
      each(components, (component) => {
        component.clearItemsState(STATUS_ACTIVE);
        component.clearItemsState(STATUS_UNACTIVE);
      });
    }
  }
}

export default ListHighlight;
