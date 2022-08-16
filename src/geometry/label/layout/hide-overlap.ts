import { get, each } from '@antv/util';
import { BBox, IGroup, IShape } from '../../../dependents';
import { intersect } from '../../../util/collision-detect';
import { LabelItem } from '../interface';
import { getLabelBackgroundInfo } from '../util';
import { createWorker } from '../util/createWorker';
import { code as layoutCode } from './worker/hide-overlap';

type Item = {
  x: number;
  y: number;
  width: number;
  height: number;
  rotation?: number;
  visible?: boolean;
};

const layout = (items: Item[]): Item[] => {
  const boxes = items.slice();
  for (let i = 0; i < boxes.length; i++) {
    const box1 = boxes[i];
    if (box1.visible) {
      for (let j = i + 1; j < boxes.length; j++) {
        const box2 = boxes[j];
        if (box1 !== box2 && box2.visible) {
          if (intersect(box1, box2)) {
            box2.visible = false;
          }
        }
      }
    }
  }
  return boxes;
};

const cache: Map<string, any> = new Map();
const worker = createWorker(layoutCode);

/**
 * label 防遮挡布局：在不改变 label 位置的情况下对相互重叠的 label 进行隐藏（非移除）
 * 不同于 'overlap' 类型的布局，该布局不会对 label 的位置进行偏移调整。
 * @param labels 参与布局调整的 label 数组集合
 */
export async function hideOverlap(
  labelItems: LabelItem[],
  labels: IGroup[],
  shapes: IShape[] | IGroup[],
  region: BBox
) {
  const boxes = labels.map((d, idx) => ({
    ...getLabelBackgroundInfo(d, labelItems[idx], get(labelItems[idx], 'background.padding')),
    visible: true,
  }));
  const memoKey = JSON.stringify(boxes);
  const cb = (items: Item[]) => {
    cache.set(memoKey, items);
    each(items, ({ visible }, idx) => {
      const labelShape = labels[idx];
      if (visible) {
        labelShape?.show();
      } else {
        labelShape?.hide();
      }
    });
    return items;
  };
  if (cache.get(memoKey)) {
    cb(cache.get(memoKey));
  } else if (worker) {
    // Do layout in worker.
    try {
      const params = JSON.stringify({ type: 'hide-overlap', items: boxes });
      const res = await worker.post(params, () => cb(layout(boxes)));
      cb(Array.isArray(res.data) ? res.data : []);
    } catch (e) {
      console.error(e);
      cb(layout(boxes));
    }
  } else {
    // Normal layout in main thread.
    cb(layout(boxes));
  }
}
