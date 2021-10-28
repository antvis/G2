import { PaddingCalCtor } from '../layout/padding-cal';
import { View } from '../view';

/**
 * 默认的 syncViewPadding 逻辑
 * @param chart
 * @param views
 * @param PC: PaddingCalCtor
 */
export function defaultSyncViewPadding(chart: View, views: View[], PC: PaddingCalCtor) {
  const syncPadding = PC.instance();

  // 所有的 view 的 autoPadding 指向同一个引用
  views.forEach((v: View) => {
    v.autoPadding = syncPadding.max(v.autoPadding.getPadding());
  });
}
