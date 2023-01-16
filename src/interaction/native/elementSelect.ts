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
 * Active a group of elements.
 */
export function elementSelect(
  root: DisplayObject,
  {
    elements: elementsof, // given the root of chart returns elements to be manipulated
    datum, // given each element returns the datum of it
    groupKey = (d) => d, // group elements by specified key
    link = false, // draw link or not
    single = false, // single select or not
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
  const { setState, removeState, hasState } = useState(rest, valueof);
  const clear = () => {
    for (const e of elements) removeState(e, 'selected', 'unselected');
    if (link) removeLink();
    return;
  };

  const singleSelect = (element) => {
    // Clear states if clicked selected element.
    if (hasState(element, 'selected')) clear();
    else {
      const k = groupKey(element);
      const group = keyGroup.get(k);
      const groupSet = new Set(group);
      for (const e of elements) {
        if (groupSet.has(e)) setState(e, 'selected');
        else setState(e, 'unselected');
      }
      // Remove all links and append link for this group.
      if (link) {
        removeLink();
        appendLink(group);
      }
    }
  };

  const multipleSelect = (element) => {
    const k = groupKey(element);
    const group = keyGroup.get(k);
    const groupSet = new Set(group);
    if (!hasState(element, 'selected')) {
      const hasSelectedGroup = group.some((e) => hasState(e, 'selected'));
      for (const e of elements) {
        if (groupSet.has(e)) setState(e, 'selected');
        else if (!hasState(e, 'selected')) setState(e, 'unselected');
      }
      // Append link for each group only once.
      if (!hasSelectedGroup && link) appendLink(group, k);
    } else {
      // If there is no selected elements after resetting this group,
      // clear the states.
      const hasSelected = elements.some(
        (e) => !groupSet.has(e) && hasState(e, 'selected'),
      );
      if (!hasSelected) return clear();
      // If there are still some selected elements after resetting this group,
      // only remove the link.
      for (const e of group) setState(e, 'unselected');
      if (link) removeLink(k);
    }
  };

  const click = (event) => {
    const { target: element } = event;
    // Click non-element shape, reset.
    // Such as the rest of content area(background).
    if (!elementSet.has(element)) return clear();
    if (single) return singleSelect(element);
    return multipleSelect(element);
  };

  root.addEventListener('click', click);

  return () => {
    root.removeEventListener('click', click);
    removeLink();
  };
}

export function ElementSelect(options) {
  return (context) => {
    const { container, view } = context;
    return elementSelect(container, {
      ...applyDefaultsHighlightedStyle(options),
      elements: selectG2Elements,
      datum: createDatumof(view),
    });
  };
}
