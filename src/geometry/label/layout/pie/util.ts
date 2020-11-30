import { PolarLabelItem } from '../../interface';

/**
 * 碰撞检测算法
 */
export function antiCollision(
  items: PolarLabelItem[],
  labelHeight: number,
  plotRange: { minY: number; maxY: number; minX: number; maxX: number }
) {
  const labels = items.filter((item) => !item.invisible);

  // sorted by y, mutable
  labels.sort((a, b) => a.y - b.y);
  // adjust y position of labels to avoid overlapping
  let overlapping = true;
  const startY = plotRange.minY;
  const endY = plotRange.maxY;
  let totalHeight = Math.abs(startY - endY);
  let i;

  let maxY = 0;
  let minY = Number.MIN_VALUE;
  const boxes = labels.map((label) => {
    if (label.y > maxY) {
      maxY = label.y;
    }
    if (label.y < minY) {
      minY = label.y;
    }
    return {
      content: label.content,
      size: labelHeight,
      targets: [label.y - startY],
      pos: null,
    };
  });

  minY -= startY;
  if (maxY - startY > totalHeight) {
    totalHeight = maxY - startY;
  }

  while (overlapping) {
    /* eslint no-loop-func: 0 */
    boxes.forEach((box) => {
      const target = (Math.min.apply(minY, box.targets) + Math.max.apply(minY, box.targets)) / 2;
      box.pos = Math.min(Math.max(minY, target - box.size / 2), totalHeight - box.size);
      box.pos = Math.max(0, box.pos);
    });

    // detect overlapping and join boxes
    overlapping = false;
    i = boxes.length;
    while (i--) {
      if (i > 0) {
        const previousBox = boxes[i - 1];
        const box = boxes[i];
        if (previousBox.pos + previousBox.size > box.pos) {
          // overlapping
          previousBox.size += box.size;
          previousBox.targets = previousBox.targets.concat(box.targets);

          // overflow, shift up
          if (previousBox.pos + previousBox.size > totalHeight) {
            previousBox.pos = totalHeight - previousBox.size;
          }
          boxes.splice(i, 1); // removing box
          overlapping = true;
        }
      }
    }
  }

  i = 0;
  // step 4: normalize y and adjust x
  boxes.forEach((b) => {
    let posInCompositeBox = startY + labelHeight / 2; // middle of the label
    b.targets.forEach(() => {
      labels[i].y = b.pos + posInCompositeBox;
      posInCompositeBox += labelHeight;
      i++;
    });
  });
}
