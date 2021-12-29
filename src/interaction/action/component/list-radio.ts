import ListState from './list-state';

const STATUS_SHOW = 'showRadio';

class ListRadio extends ListState {
  public show() {
    const triggerInfo = this.getTriggerListInfo();
    if (triggerInfo?.item) {
      const { list, item } = triggerInfo;
      list.setItemState(item, STATUS_SHOW, true);
    }
  }

  public hide() {
    const triggerInfo = this.getTriggerListInfo();
    if (triggerInfo?.item) {
      const { list, item } = triggerInfo;
      list.setItemState(item, STATUS_SHOW, false);
    }
  }
}

export default ListRadio;
