import { DisplayObject } from '@antv/g';
import { deepMix } from '@antv/util';
import { group } from 'd3-array';
import { subObject } from '../utils/helper';
import {
  createDatumof,
  createValueof,
  mergeState,
  offsetTransform,
  renderBackground,
  renderLink,
  selectG2Elements,
  selectPlotArea,
  useState,
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
    background = false, // draw background or not
    delay = 60, // delay to unhighlighted element
    scale,
    coordinate,
    state = {},
  }: Record<string, any>,
) {
  const elements = elementsof(root);
  const elementSet = new Set(elements);
  const keyGroup = group(elements, groupKey);
  const valueof = createValueof(elements, datum);
  const [appendLink, removeLink] = renderLink({
    elements,
    valueof,
    link,
    coordinate,
    ...subObject(state.active, 'link'),
  });
  const [appendBackground, removeBackground, isBackground] = renderBackground({
    scale,
    coordinate,
    background,
    valueof,
    ...subObject(state.active, 'background'),
  });

  const elementStyle = deepMix(state, {
    active: {
      ...(state.active?.offset && {
        //Apply translate to mock slice out.
        transform: (...params) => {
          const value = state.active.offset(...params);
          const [, i] = params;
          return offsetTransform(elements[i], value, coordinate);
        },
      }),
    },
  });

  const { setState, removeState, hasState } = useState(elementStyle, valueof);

  let out; // Timer for delaying unhighlighted.
  const pointerover = (event) => {
    const { target: element } = event;
    if (!elementSet.has(element)) return;
    if (out) clearTimeout(out);
    const k = groupKey(element);
    const group = keyGroup.get(k);
    const groupSet = new Set(group);
    for (const e of elements) {
      if (groupSet.has(e)) {
        if (!hasState(e, 'active')) setState(e, 'active');
      } else {
        setState(e, 'inactive');
        removeLink(e);
      }
      if (e !== element) removeBackground(e);
    }
    appendBackground(element);
    appendLink(group);
  };

  const delayUnhighlighted = () => {
    if (out) clearTimeout(out);
    out = setTimeout(() => {
      unhighlighted();
      out = null;
    }, delay);
  };

  const unhighlighted = () => {
    for (const e of elements) {
      removeState(e, 'active', 'inactive');
      removeBackground(e);
      removeLink(e);
    }
  };

  const pointerout = (event) => {
    const { target: element } = event;
    if (background && !isBackground(element)) return;
    if (!background && !elementSet.has(element)) return;
    if (delay > 0) delayUnhighlighted();
    else unhighlighted();
  };

  const pointerleave = () => {
    unhighlighted();
  };

  root.addEventListener('pointerover', pointerover);
  root.addEventListener('pointerout', pointerout);
  root.addEventListener('pointerleave', pointerleave);

  return () => {
    root.removeEventListener('pointerover', pointerover);
    root.removeEventListener('pointerout', pointerout);
    root.removeEventListener('pointerleave', pointerleave);
    for (const e of elements) {
      removeBackground(e);
      removeLink(e);
    }
  };
}

export function ElementHighlight({
  delay,
  createGroup,
  background = false,
  link = false,
  ...rest
}) {
  return (context) => {
    const { container, view, options } = context;
    const { scale, coordinate } = view;
    const plotArea = selectPlotArea(container);
    return elementHighlight(plotArea, {
      elements: selectG2Elements,
      datum: createDatumof(view),
      groupKey: createGroup ? createGroup(view) : undefined,
      coordinate,
      scale,
      state: mergeState(options, [
        ['active', background ? {} : { lineWidth: '1', stroke: '#000' }],
        'inactive',
      ]),
      background,
      link,
      delay,
      ...rest,
    });
  };
}
