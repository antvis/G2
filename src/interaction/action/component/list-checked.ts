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
    // 不能通过 el === item 来判断
    // list-highlight 会增加 active 状态，会生成新的对象
    this.setCheckedBy(list, (el) => el.id === item.id, enable);
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
      const items = list.getItems();

      // 最开始都没有都没有 STATUS_CHECKED，不能通过其来判断是否是 checked
      // 所以只能通过判断有没有 STATUS_UNCHECKED 来判断
      const allChecked = !some(items, (t) => list.hasState(t, STATUS_UNCHECKED));

      // 这个地方很奇怪很坑！
      // 触发事件的 item 和 list 里面对应的 clickedItem 的状态不一样
      // clickedItem 的状态才是对的
      const clickedItem = items.find((d) => d.id === item.id);

      if (allChecked || list.hasState(clickedItem, STATUS_UNCHECKED)) {
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
