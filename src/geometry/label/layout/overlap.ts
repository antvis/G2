import { each } from '@antv/util';
import { BBox, IGroup, IShape } from '../../../dependents';
import { LabelItem } from '../interface';

const MAX_TIMES = 100;

/** @ignore */
interface Bitmap {
  [key: number]: {
    [key: number]: boolean;
  };
}

/** @ignore */
interface GreedyCfg {
  readonly xGap?: number;
  readonly yGap?: number;
}

/**
 * @ignore
 * Greedy 贪婪算法
 */
class Greedy {
  public readonly xGap: number;
  /** optimizing for text overlapping detection: use a min text height as gap */
  public readonly yGap: number;

  private bitmap: Bitmap = {};

  constructor(cfg: GreedyCfg = {}) {
    const { xGap = 1, yGap = 8 } = cfg;
    this.xGap = xGap;
    this.yGap = yGap;
  }

  public hasGap(bbox: BBox): boolean {
    let hasGap = true;
    const bitmap = this.bitmap;
    const minX = Math.round(bbox.minX);
    const maxX = Math.round(bbox.maxX);
    const minY = Math.round(bbox.minY);
    const maxY = Math.round(bbox.maxY);
    for (let i = minX; i <= maxX; i += 1) {
      if (!bitmap[i]) {
        bitmap[i] = {};
        continue;
      }
      if (i === minX || i === maxX) {
        for (let j = minY; j <= maxY; j++) {
          if (bitmap[i][j]) {
            hasGap = false;
            break;
          }
        }
      } else {
        if (bitmap[i][minY] || bitmap[i][maxY]) {
          hasGap = false;
          break;
        }
      }
    }
    return hasGap;
  }

  public fillGap(bbox: BBox): void {
    const bitmap = this.bitmap;
    const minX = Math.round(bbox.minX);
    const maxX = Math.round(bbox.maxX);
    const minY = Math.round(bbox.minY);
    const maxY = Math.round(bbox.maxY);
    // filling grid
    for (let i = minX; i <= maxX; i += 1) {
      if (!bitmap[i]) {
        bitmap[i] = {};
      }
    }
    for (let i = minX; i <= maxX; i += this.xGap) {
      for (let j = minY; j <= maxY; j += this.yGap) {
        bitmap[i][j] = true;
      }
      bitmap[i][maxY] = true;
    }

    // filling y edges
    if (this.yGap !== 1) {
      for (let i = minY; i <= maxY; i += 1) {
        bitmap[minX][i] = true;
        bitmap[maxX][i] = true;
      }
    }

    // filling x edges
    if (this.xGap !== 1) {
      for (let i = minX; i <= maxX; i += 1) {
        bitmap[i][minY] = true;
        bitmap[i][maxY] = true;
      }
    }
  }

  public destroy(): void {
    this.bitmap = {};
  }
}

function spiralFill(label: IShape, greedy: Greedy, maxTimes: number = MAX_TIMES) {
  const dt = -1;
  const { x, y } = label.attr();
  const bbox = label.getCanvasBBox();
  const maxDelta = Math.sqrt(bbox.width * bbox.width + bbox.height * bbox.height);
  let dxdy;
  let t = -dt;
  let dx = 0;
  let dy = 0;
  const f = (param: number) => {
    const nt = param * 0.1;
    return [nt * Math.cos(nt), nt * Math.sin(nt)];
  };

  if (greedy.hasGap(bbox)) {
    greedy.fillGap(bbox);
    return true;
  }
  let canFill = false;
  let times = 0;
  const accessedCache = {};
  while (Math.min(Math.abs(dx), Math.abs(dy)) < maxDelta && times < maxTimes) {
    dxdy = f((t += dt));
    dx = ~~dxdy[0];
    dy = ~~dxdy[1];
    if ((!dx && !dy) || accessedCache[`${dx}-${dy}`]) {
      continue;
    }
    label.attr({ x: x + dx, y: y + dy });
    if (dx + dy < 0) {
      label.attr('textAlign', 'right');
    }
    times++;
    if (greedy.hasGap(label.getCanvasBBox())) {
      greedy.fillGap(label.getCanvasBBox());
      canFill = true;
      accessedCache[`${dx}-${dy}`] = true;
      break;
    }
  }
  return canFill;
}

/*
 *  根据如下规则尝试放置label
 *                5
 *        ------------------
 *        |    1   |   0   |
 *    8   —————————4————————   7
 *        |    2   |   3   |
 *        ——————————————————
 *                 6
 */
function adjustLabelPosition(label: IShape, x: number, y: number, index: number) {
  const { width, height } = label.getCanvasBBox();
  const attrs = {
    x,
    y,
    textAlign: 'center',
  };
  switch (index) {
    case 0:
      attrs.y -= height + 1;
      attrs.x += 1;
      attrs.textAlign = 'left';
      break;
    case 1:
      attrs.y -= height + 1;
      attrs.x -= 1;
      attrs.textAlign = 'right';
      break;
    case 2:
      attrs.y += height + 1;
      attrs.x -= 1;
      attrs.textAlign = 'right';
      break;
    case 3:
      attrs.y += height + 1;
      attrs.x += 1;
      attrs.textAlign = 'left';
      break;
    case 5:
      attrs.y -= height * 2 + 2;
      break;
    case 6:
      attrs.y += height * 2 + 2;
      break;
    case 7:
      attrs.x += width + 1;
      attrs.textAlign = 'left';
      break;
    case 8:
      attrs.x -= width + 1;
      attrs.textAlign = 'right';
      break;
    default:
      break;
  }
  label.attr(attrs);
  return label.getCanvasBBox();
}

/**
 * @ignore
 * label 防遮挡布局：在不改变 label 位置的情况下对相互重叠的 label 进行调整。
 * 不同于 'overlap' 类型的布局，该布局不会对 label 的位置进行偏移调整。
 * @param labels 参与布局调整的 label 数组集合
 */
export function fixedOverlap(items: LabelItem[], labels: IGroup[], shapes: IShape[] | IGroup[], region: BBox) {
  const greedy = new Greedy();
  each(labels, (label: IGroup) => {
    const labelShape = label.find((shape) => shape.get('type') === 'text') as IShape;
    if (!spiralFill(labelShape, greedy)) {
      label.remove(true);
    }
  });
  greedy.destroy();
}

/**
 * @ignore
 * label 防遮挡布局：为了防止 label 之间相互覆盖同时保证尽可能多 的 label 展示，通过尝试将 label 向**四周偏移**来剔除放不下的 label
 * @param labels 参与布局调整的 label 数组集合
 */
export function overlap(items: LabelItem[], labels: IGroup[], shapes: IShape[] | IGroup[], region: BBox) {
  const greedy = new Greedy();
  each(labels, (label: IGroup) => {
    const labelShape = label.find((shape) => shape.get('type') === 'text') as IShape;
    const { x, y } = labelShape.attr();
    let canFill = false;
    for (let i = 0; i <= 8; i++) {
      const bbox = adjustLabelPosition(labelShape, x, y, i);
      if (greedy.hasGap(bbox)) {
        greedy.fillGap(bbox);
        canFill = true;
        break;
      }
    }
    if (!canFill) {
      label.remove(true);
    }
  });

  greedy.destroy();
}
