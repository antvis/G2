import ListState from './list-state';

const STATUS_UNCHECKED = 'unchecked';

class ListFocus extends ListState {
  public toggle() {
    const triggerInfo = this.getTriggerListInfo();
    if (triggerInfo?.item) {
      const { list, item: clickedItem } = triggerInfo;
      const items = list.getItems();
      const checkedItems = items.filter((t) => !list.hasState(t, STATUS_UNCHECKED));
      for (const item of items) {
        if (item === clickedItem) {
          list.setItemState(item, STATUS_UNCHECKED, false);
        } else {
          const status = checkedItems.length > 1;
          list.setItemState(item, STATUS_UNCHECKED, status);
        }
      }
    }
  }
}

export default ListFocus;
