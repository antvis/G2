import { DisplayObject } from '@antv/g';
import { group } from 'd3-array';
import { subObject } from '../../utils/helper';
import {
  createValueof,
  createDatumof,
  selectG2Elements,
  useState,
  renderLink,
  applyDefaultsHighlightedStyle,
} from './utils';

/**
 * highlight a group of elements.
 */
export function elementHighlight(
  root: DisplayObject,
  {
    elements: elementsof, // given the root of chart returns elements to be manipulated
    datum, // given each element returns the datum of it
    groupKey = (d) => d, // group elements by specified key
    link = false, // draw link or not
    ...rest
  }: Record<string, any>,
) {
  const elements = elementsof(root);
  const elementSet = new Set(elements);
  const keyGroup = group(elements, groupKey);
  const valueof = createValueof(elements, datum);
  const [appendLink, removeLink] = renderLink(root, {
    elements,
    valueof,
    ...subObject(rest, 'link'),
  });
  const { setState, removeState } = useState(rest, valueof);

  const pointerover = (event) => {
    const { target: element } = event;
    if (!elementSet.has(element)) return;
    const k = groupKey(element);
    const group = keyGroup.get(k);
    const groupSet = new Set(group);
    for (const e of elements) {
      if (groupSet.has(e)) setState(e, 'highlighted');
      else setState(e, 'unhighlighted');
    }
    if (link) appendLink(group);
  };

  const pointerout = (event) => {
    const { target: element } = event;
    if (!elementSet.has(element)) return;
    for (const e of elements) removeState(e, 'unhighlighted', 'highlighted');
    if (link) removeLink();
  };

  root.addEventListener('pointerover', pointerover);
  root.addEventListener('pointerout', pointerout);

  return () => {
    root.removeEventListener('pointerover', pointerover);
    root.removeEventListener('pointerout', pointerout);
  };
}

export function ElementHighlight(options) {
  return (context) => {
    const { container, view } = context;
    return elementHighlight(container, {
      ...applyDefaultsHighlightedStyle(options),
      elements: selectG2Elements,
      datum: createDatumof(view),
    });
  };
}
