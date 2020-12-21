import { IList } from '@antv/component';
import { each } from '@antv/util';

const STATUS_UNACTIVE = 'inactive';
const STATUS_ACTIVE = 'active';

/**
 * 清理图例的 Highlight 效果
 * @param list 列表组件，图例或者坐标轴
 * @ignore
 */
export function clearList(list: IList) {
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
