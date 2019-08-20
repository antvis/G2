const GAP = 20;

export function defaultPosition(
  x: number, y: number,
  position: string,
  containerWidth: number, containerHeight: number,
  target?: any,
) {
  let newx = x;
  let newy = y;
  // todo any 是 Shape
  let rectWidth = 0;
  let rectHeight = 0;
  let gap = 20;

  if (target) {
    const rect = target.getBBox();
    rectWidth = rect.width;
    rectHeight = rect.height;
    newx = rect.x;
    newy = rect.y;
    gap = 5;
  }
  switch (position) {
    case 'inside':
      newx = newx + rectWidth / 2 - containerWidth / 2;
      newy = newy + rectHeight / 2 - containerHeight / 2;
      break;
    case 'top':
      newx = newx + rectWidth / 2 - containerWidth / 2;
      newy = newy - containerHeight - gap;
      break;
    case 'left':
      newx = newx - containerWidth - gap;
      newy = newy + rectHeight / 2 - containerHeight / 2;
      break;
    case 'right':
      newx = newx + rectWidth + gap;
      newy = newy + rectHeight / 2 - containerHeight / 2;
      break;
    case 'bottom':
    default:
      newx = newx + rectWidth / 2 - containerWidth / 2;
      newy = newy + rectHeight + gap;
      break;
  }
  return [ newx, newy ];
}

export function constraintPositionInBoundary(
  x: number, y: number,
  width: number, height: number,
  viewWidth: number, viewHeight: number,
) {
  let newx = x;
  let newy = y;
  if (newx + width + GAP > viewWidth) {
    newx -= width + GAP;
    newx = newx < 0 ? 0 : newx;
  } else if (newx + GAP < 0) {
    newx = GAP;
  } else {
    newx += GAP;
  }

  if (newy + height + GAP > viewHeight) {
    newy -= (height + GAP);
    newy = newy < 0 ? 0 : newy;
  } else if (newy + GAP < 0) {
    newy = GAP;
  } else {
    newy += GAP;
  }

  return [ newx, newy ];
}

export function constraintPositionInPanel(
  x: number, y: number,
  width: number, height: number,
  panelRange: any, onlyHorizontal: boolean,
) { // todo
  let newx = x;
  let newy = y;
  if (newx + width > panelRange.tr.x) {
    newx -= (width + 2 * GAP);
  }

  if (newx < panelRange.tl.x) {
    newx = panelRange.tl.x;
  }

  if (!onlyHorizontal) {
    if (newy + height > panelRange.bl.y) {
      newy -= height + 2 * GAP;
    }

    if (newy < panelRange.tl.y) {
      newy = panelRange.tl.y;
    }
  }
  return [ newx, newy ];
}
