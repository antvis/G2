import { each } from '@antv/util';
const STATUS_UNACTIVE = 'inactive';
const STATUS_ACTIVE = 'active';

export function clearList(list) {
  const items = list.getItems();
  each(items, (item) => {
    if (list.hasState(item, STATUS_ACTIVE)) {
      list.setItemState(item, STATUS_ACTIVE, false);
    }
    if (list.hasState(item, STATUS_UNACTIVE)) {
      list.setItemState(item, STATUS_UNACTIVE, false);
    }
  });
}
