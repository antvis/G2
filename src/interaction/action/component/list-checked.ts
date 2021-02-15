import { each, some } from '@antv/util';
import { IList, ListItem } from '../../../dependents';
import ListState from './list-state';

const STATUS_UNCHECKED = 'unchecked';
const STATUS_CHECKED = 'checked';
type MatchCallback = (item: ListItem) => boolean;

/**
 * checked Action
 * 提供三个对外方法
 * 1. toggle 切换状态
 * 2. checked 选中
 * 3. reset 清除重置
 */
class ListChecked extends ListState {
  protected stateName: string = STATUS_CHECKED;

  // 单个 item 设置状态
  protected setItemState(list: IList, item: ListItem, enable: boolean) {
    this.setCheckedBy(list, (el) => el === item, enable);
  }

  // 根据条件设置 checked
  private setCheckedBy(list: IList, callback: MatchCallback, enable: boolean) {
    const items = list.getItems();
    if (enable) {
      // 设置 checked 时，保留之前已经 checked 的项
      each(items, (item) => {
        if (callback(item)) {
          if (list.hasState(item, STATUS_UNCHECKED)) {
            list.setItemState(item, STATUS_UNCHECKED, false);
          }
          list.setItemState(item, STATUS_CHECKED, true);
        } else if (!list.hasState(item, STATUS_CHECKED)) {
          list.setItemState(item, STATUS_UNCHECKED, true);
        }
      });
    }
  }

  /**
   * 切换状态.
   * 1. 当全部选中的时候 或者 当前 item 未选中时，进行激活操作
   * 2. 否则，重置
   * @override
   */
  public toggle() {
    const triggerInfo = this.getTriggerListInfo();
    if (triggerInfo && triggerInfo.item) {
      const { list, item } = triggerInfo;

      // 不知道 🤷‍♀️ 只认 unchecked status
      const allChecked = !some(list.getItems(), (t) => list.hasState(t, STATUS_UNCHECKED));

      // 
      if (allChecked || list.hasState(item, STATUS_UNCHECKED)) {
        this.setItemState(list, item, true);
      } else {
        this.reset();
      }
    }
  }

  /**
   * checked 图例项
   */
  public checked() {
    this.setState();
  }

  /**
   * 重置，需要全部清理 checked 和 unchecked
   */
  public reset() {
    const components = this.getAllowComponents();
    each(components, (component) => {
      component.clearItemsState(STATUS_CHECKED);
      component.clearItemsState(STATUS_UNCHECKED);
    });
  }
}

export default ListChecked;
