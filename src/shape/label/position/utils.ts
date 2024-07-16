import { sort } from 'd3-array';

// Optimize antiCollision from: https://github.com/antvis/G2/blob/master/src/geometry/label/layout/pie/util.ts
export function dodgeY(
  labels: Record<string, any>[],
  options: Record<string, any> = {},
) {
  const { labelHeight = 14, height } = options;

  // Sort labels by y and init boxes (one box for each label)
  const sortedLabels = sort(labels, (d) => d.y);
  const n = sortedLabels.length;
  const boxes = new Array(n);
  for (let i = 0; i < n; i++) {
    const label = sortedLabels[i];
    const { y } = label;
    boxes[i] = { y, y1: y + labelHeight, labels: [y] };
  }

  // Merge boxes until no overlapping boxes or only one box left.
  // All the boxes should start higher than 0, but maybe higher than height.
  let overlap = true;
  while (overlap) {
    overlap = false;
    // Scan backward because boxes maybe deleted.
    for (let i = boxes.length - 1; i > 0; i--) {
      const box = boxes[i];
      const preBox = boxes[i - 1];
      if (preBox.y1 > box.y) {
        overlap = true;
        preBox.labels.push(...box.labels);
        boxes.splice(i, 1);

        // Compute new y1 to contain the current box.
        preBox.y1 += box.y1 - box.y;

        // Make sure the new box is in the range of [0, height].
        const newHeight = preBox.y1 - preBox.y;
        preBox.y1 = Math.max(Math.min(preBox.y1, height), newHeight);
        preBox.y = preBox.y1 - newHeight;
      }
    }
  }

  let i = 0;
  for (const box of boxes) {
    const { y, labels } = box;
    let prevY = y - labelHeight;
    for (const curY of labels) {
      const label = sortedLabels[i++];
      const expectedY = prevY + labelHeight;
      const dy = expectedY - curY;
      label.connectorPoints[0][1] -= dy;
      label.y = prevY + labelHeight;
      prevY += labelHeight;
    }
  }
}

export function hideAndDodgeY(
  unsorted: Record<string, any>[],
  options: Record<string, any>,
) {
  const labels = sort(unsorted, (d) => d.y);
  const { height, labelHeight = 14 } = options;
  const maxCount = Math.ceil(height / labelHeight);
  if (labels.length <= maxCount) return dodgeY(labels, options);
  const filtered = [];
  for (let i = 0; i < labels.length; i++) {
    // Hide labels out of range.
    if (i < labels.length - maxCount) {
      labels[i].opacity = 0;
      labels[i].connector = false;
    } else filtered.push(labels[i]);
  }
  dodgeY(filtered, options);
}
