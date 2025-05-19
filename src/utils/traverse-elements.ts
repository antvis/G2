import { DisplayObject } from '@antv/g';

export function traverseElements(
  element: DisplayObject,
  visitor: (el: DisplayObject) => boolean | void,
): boolean {
  if (visitor(element)) return true;
  if (element.tagName === 'g') {
    const { childNodes = [] } = element;
    for (const child of childNodes) {
      if (traverseElements(child as DisplayObject, visitor)) return true;
    }
  }

  return false;
}
