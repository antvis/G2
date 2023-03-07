import { DisplayObject } from '@antv/g';
import { group } from 'd3-array';
import { deepMix } from '@antv/util';
import { subObject } from '../utils/helper';
import {
  createValueof,
  createDatumof,
  selectG2Elements,
  useState,
  renderLink,
  renderBackground,
  selectPlotArea,
  offsetTransform,
  mergeState,
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
    coordinate,
    background = false,
    scale,
    state = {},
  }: Record<string, any>,
) {
  const elements = elementsof(root);
  const elementSet = new Set(elements);
  const keyGroup = group(elements, groupKey);
  const valueof = createValueof(elements, datum);
  const [appendLink, removeLink] = renderLink({
    link,
    elements,
    valueof,
    coordinate,
    ...subObject(state.selected, 'link'),
  });

  const [appendBackground, removeBackground] = renderBackground({
    background,
    coordinate,
    scale,
    valueof,
    ...subObject(state.selected, 'background'),
  });

  const elementStyle = deepMix(state, {
    selected: {
      ...(state.selected?.offset && {
        //Apply translate to mock slice out.
        transform: (...params) => {
          const value = state.selected.offset(...params);
          const [, i] = params;
          return offsetTransform(elements[i], value, coordinate);
        },
      }),
    },
  });

  const { setState, removeState, hasState } = useState(elementStyle, valueof);

  const clear = () => {
    for (const e of elements) {
      removeState(e, 'selected', 'unselected');
      removeLink(e);
      removeBackground(e);
    }
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
        else {
          setState(e, 'unselected');
          removeLink(e);
        }
        if (e !== element) removeBackground(e);
      }
      appendLink(group);
      appendBackground(element);
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
      if (!hasSelectedGroup && link) appendLink(group);
      appendBackground(element);
    } else {
      // If there is no selected elements after resetting this group,
      // clear the states.
      const hasSelected = elements.some(
        (e) => !groupSet.has(e) && hasState(e, 'selected'),
      );
      if (!hasSelected) return clear();
      // If there are still some selected elements after resetting this group,
      // only remove the link.
      for (const e of group) {
        setState(e, 'unselected');
        removeLink(e);
        removeBackground(e);
      }
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
    for (const e of elements) {
      removeLink(e);
    }
  };
}

export function ElementSelect({
  createGroup,
  background = false,
  link = false,
  ...rest
}) {
  return (context) => {
    const { container, view, options } = context;
    const { coordinate, scale } = view;
    const plotArea = selectPlotArea(container);
    return elementSelect(plotArea, {
      elements: selectG2Elements,
      datum: createDatumof(view),
      groupKey: createGroup ? createGroup(view) : undefined,
      coordinate,
      scale,
      state: mergeState(options, [
        ['selected', background ? {} : { lineWidth: '1', stroke: '#000' }],
        'unselected',
      ]),
      background,
      link,
      ...rest,
    });
  };
}
