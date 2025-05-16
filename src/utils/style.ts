import type { DisplayObject, BaseStyleProps } from '@antv/g';
import { traverseElements } from './traverse-elements';

const defaultStyle: BaseStyleProps = {
  visibility: 'visible',
  opacity: 1,
  fillOpacity: 1,
  strokeOpacity: 1,
};

export function getStyle(element: DisplayObject, key: string) {
  const result: Partial<Record<string, any>> = {};
  traverseElements(element, (el) => {
    if (el.tagName !== 'g' && el.style?.[key] !== undefined) {
      result[key] = el.style[key];
    }
  });

  return result[key] ?? defaultStyle[key];
}

export function setStyle(
  element: DisplayObject,
  key: string,
  value: any,
  recursive: boolean,
) {
  element.style[key] = value;
  if (recursive) {
    element.children.forEach((child: DisplayObject) =>
      setStyle(child, key, value, recursive),
    );
  }
}

export function hide(element: DisplayObject) {
  setStyle(element, 'visibility', 'hidden', true);
}

export function show(element: DisplayObject) {
  setStyle(element, 'visibility', 'visible', true);
}
