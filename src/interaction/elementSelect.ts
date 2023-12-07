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
  selectElementByData,
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
    emitter,
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
    document: root.ownerDocument,
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

  const clear = (nativeEvent = true) => {
    for (const e of elements) {
      removeState(e, 'selected', 'unselected');
      removeLink(e);
      removeBackground(e);
    }
    if (nativeEvent) emitter.emit('element:unselect', { nativeEvent: true });
    return;
  };

  const singleSelect = (event, element, nativeEvent = true) => {
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

      if (!nativeEvent) return;
      emitter.emit('element:select', {
        ...event,
        nativeEvent,
        data: {
          data: [datum(element), ...group.map(datum)],
        },
      });
    }
  };

  const multipleSelect = (event, element, nativeEvent = true) => {
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
    if (!nativeEvent) return;
    emitter.emit('element:select', {
      ...event,
      nativeEvent,
      data: {
        data: elements.filter((e) => hasState(e, 'selected')).map(datum),
      },
    });
  };

  const click = (event) => {
    const { target: element, nativeEvent = true } = event;
    // Click non-element shape, reset.
    // Such as the rest of content area(background).
    if (!elementSet.has(element)) return clear();
    if (single) return singleSelect(event, element, nativeEvent);
    return multipleSelect(event, element, nativeEvent);
  };

  root.addEventListener('click', click);

  const onSelect = (e) => {
    const { nativeEvent, data } = e;
    if (nativeEvent) return;
    const selectedData = single ? data.data.slice(0, 1) : data.data;
    for (const d of selectedData) {
      const element = selectElementByData(elements, d, datum);
      click({ target: element, nativeEvent: false });
    }
  };

  const onUnSelect = () => {
    clear(false);
  };

  emitter.on('element:select', onSelect);
  emitter.on('element:unselect', onUnSelect);

  return () => {
    for (const e of elements) removeLink(e);
    root.removeEventListener('click', click);
    emitter.off('element:select', onSelect);
    emitter.off('element:unselect', onUnSelect);
  };
}

export function ElementSelect({
  createGroup,
  background = false,
  link = false,
  ...rest
}) {
  return (context, _, emitter) => {
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
      emitter,
      ...rest,
    });
  };
}

ElementSelect.props = {
  reapplyWhenUpdate: true,
};
