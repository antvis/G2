import { DisplayObject } from '@antv/g';

export function traverseElements(
  element: DisplayObject,
  visitor: (el: DisplayObject) => void,
) {
  visitor(element);
  if (element.tagName === 'g') {
    const { childNodes = [] } = element as DisplayObject;
    for (const child of childNodes) {
      traverseElements(child as DisplayObject, visitor);
    }
  }
}
