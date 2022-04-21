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

const layout = (items: Item[]): Promise<Item[]> => {
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
  return Promise.resolve(boxes);
}

/**
 * label 防遮挡布局：在不改变 label 位置的情况下对相互重叠的 label 进行隐藏（非移除）
 * 不同于 'overlap' 类型的布局，该布局不会对 label 的位置进行偏移调整。
 * @param labels 参与布局调整的 label 数组集合
 */
export function hideOverlap(labelItems: LabelItem[], labels: IGroup[], shapes: IShape[] | IGroup[], region: BBox) {
  // todo 添加 label rank
  return new Promise((resolve) => {
    const boxes = labels.map((d, idx) => ({
      ...getLabelBackgroundInfo(d, labelItems[idx], get(labelItems[idx], 'background.padding')),
      visible: true,
    }));
    const cb = (items: Item[]) => {
      each(items, ({ visible }, idx) => {
        const labelShape = labels[idx];
        if (visible) {
          labelShape?.show()
        } else {
          labelShape?.hide();
        }
      });
      return resolve(items);
    }
    console.log('intersect 2', intersect(boxes[2], boxes[3]), labels[2].getChildByIndex(1)?.attr('text'));

    // Do layout in worker.
    if (window.Worker) {
      const worker = createWorker(layoutCode);
      worker.postMessage(JSON.stringify({ type: 'hide-overlap', items: boxes }));
      worker.onmessage = (e) => cb(Array.isArray(e.data) ? e.data : []);
      worker.onmessageerror = (e) => {
        // Normal layout in main thread.
        layout(boxes).then(items => cb(items));
      };
    } else {
      console.warn('[AntV G2] Web worker is not available');
      // Normal layout in main thread.
      layout(boxes).then(items => cb(items));
    }
  });
}
