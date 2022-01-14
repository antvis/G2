import ListState from './list-state';

const STATUS_UNCHECKED = 'unchecked';

class ListFocus extends ListState {
  public toggle() {
    const triggerInfo = this.getTriggerListInfo();
    if (triggerInfo?.item) {
      const { list, item: clickedItem } = triggerInfo;
      const items = list.getItems();
      const checkedItems = items.filter((t) => !list.hasState(t, STATUS_UNCHECKED));
      const uncheckedItems = items.filter((t) => list.hasState(t, STATUS_UNCHECKED));
      const checkedItem = checkedItems[0]
      /**
       * 1. 初始化，全部 checked。此时，点击 radio, clickItem 进入聚焦
       * 2. 当前只选中一个
       *    2.1 且选中 item 等于 clickItem，退出聚焦，全部重新选中
       *    2.2 替换聚焦的 item
       * 3. 其它，同 2.2
       */
      if (items.length === checkedItems.length) {
        for (const item of items) list.setItemState(item, STATUS_UNCHECKED, item.id !== clickedItem.id);
      } else if (items.length - uncheckedItems.length === 1) {
        if (checkedItem.id === clickedItem.id) {
          for (const item of items) list.setItemState(item, STATUS_UNCHECKED, false);
        } else {
          for (const item of items) list.setItemState(item, STATUS_UNCHECKED, item.id !== clickedItem.id);
        }
      } else {
        for (const item of items) list.setItemState(item, STATUS_UNCHECKED, item.id !== clickedItem.id);
      }
    }
  }
}

export default ListFocus;
