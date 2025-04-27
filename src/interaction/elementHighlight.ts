import { DisplayObject } from '@antv/g';
import { deepMix } from '@antv/util';
import { group } from '@antv/vendor/d3-array';
import { subObject } from '../utils/helper';
import {
  createDatumof,
  createFindElementByEvent,
  createUseState,
  createValueof,
  createXKey,
  mergeState,
  offsetTransform,
  renderBackground,
  renderLink,
  selectElementByData,
  selectG2Elements,
  selectPlotArea,
  VALID_FIND_BY_X_MARKS,
} from './utils';

/**
 * highlight a group of elements.
 */
export function elementHighlight(
  root: DisplayObject,
  {
    elements: elementsof, // given the root of chart returns elements to be manipulated
    datum, // given each element returns the datum of it
    groupKey: eleGroupKey = (d) => d, // group elements by specified key
    regionGroupKey = (d) => d, // how to group elements when hover region
    link = false, // draw link or not
    background = false, // draw background or not
    delay = 60, // delay to unhighlighted element
    scale,
    coordinate,
    emitter,
    state = {},
    region = false,
    regionEleFilter = (el) => VALID_FIND_BY_X_MARKS.includes(el.markType), // some elements can not be highlighted by region, like shapes in pie.
  }: Record<string, any>,
) {
  const allElements = elementsof(root) ?? [];
  const elements = region ? allElements.filter(regionEleFilter) : allElements;
  const elementSet = new Set(elements);
  const groupKey = region ? regionGroupKey : eleGroupKey;
  const keyGroup = group(elements, groupKey);
  const findElement = createFindElementByEvent({
    elementsof,
    root,
    coordinate,
    scale,
  });

  const valueof = createValueof(elements, datum);
  const [appendLink, removeLink] = renderLink({
    elements,
    valueof,
    link,
    coordinate,
    ...subObject(state.active, 'link'),
  });
  const [appendBackground, removeBackground, isBackground] = renderBackground({
    document: root.ownerDocument,
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

  const useState = createUseState(elementStyle, elements);

  const { updateState, removeState, hasState } = useState(valueof);

  let out; // Timer for delaying unhighlighted.
  const pointerover = (event) => {
    const { nativeEvent = true } = event;
    let element = event.target;
    if (region) {
      element = findElement(event);
    }
    if (!elementSet.has(element)) return;
    if (out) clearTimeout(out);
    const k = groupKey(element);
    const group = keyGroup.get(k);
    const groupSet = new Set(group);
    for (const e of elements) {
      if (groupSet.has(e)) {
        if (!hasState(e, 'active')) updateState(e, 'active');
      } else {
        updateState(e, 'inactive');
        removeLink(e);
      }
      if (e !== element) removeBackground(e);
    }
    appendBackground(element);
    appendLink(group);

    // Emit events.
    if (!nativeEvent) return;
    emitter.emit('element:highlight', {
      nativeEvent,
      data: {
        data: datum(element),
        group: group.map(datum),
      },
    });
  };

  const delayUnhighlighted = () => {
    if (out) clearTimeout(out);
    out = setTimeout(() => {
      unhighlighted();
      out = null;
    }, delay);
  };

  const unhighlighted = (nativeEvent = true) => {
    for (const e of elements) {
      removeState(e, 'active', 'inactive');
      removeBackground(e);
      removeLink(e);
    }
    if (nativeEvent) {
      emitter.emit('element:unhighlight', { nativeEvent });
    }
  };

  const pointerout = (event) => {
    let element = event.target;
    if (region) {
      element = findElement(event);
    }
    if (!element) {
      if (delay > 0) delayUnhighlighted();
      else unhighlighted();
      return;
    }
    if (background && !isBackground(element)) return;
    if (!background && !elementSet.has(element)) return;
    if (delay > 0) delayUnhighlighted();
    else unhighlighted();
  };

  const pointerleave = () => {
    unhighlighted();
  };

  root.addEventListener('pointerover', pointerover);
  root.addEventListener('pointermove', pointerover);
  root.addEventListener('pointerout', pointerout);
  root.addEventListener('pointerleave', pointerleave);

  const onRest = (e) => {
    const { nativeEvent } = e;
    if (nativeEvent) return;
    unhighlighted(false);
  };

  const onHighlight = (e) => {
    const { nativeEvent } = e;
    if (nativeEvent) return;
    const { data } = e.data;
    const element = selectElementByData(elements, data, datum);
    if (!element) return;
    pointerover({ target: element, nativeEvent: false });
  };

  emitter.on('element:highlight', onHighlight);
  emitter.on('element:unhighlight', onRest);

  return () => {
    root.removeEventListener('pointerover', pointerover);
    root.removeEventListener('pointermove', pointerover);
    root.removeEventListener('pointerout', pointerout);
    root.removeEventListener('pointerleave', pointerleave);
    emitter.off('element:highlight', onHighlight);
    emitter.off('element:unhighlight', onRest);
    for (const e of elements) {
      removeBackground(e);
      removeLink(e);
    }
  };
}

export function ElementHighlight({
  delay,
  createGroup,
  createRegionGroup,
  background = false,
  link = false,
  ...rest
}) {
  return (context, _, emitter) => {
    const { container, view, options } = context;
    const { scale, coordinate } = view;
    const plotArea = selectPlotArea(container);

    return elementHighlight(plotArea, {
      elements: selectG2Elements,
      datum: createDatumof(view),
      groupKey: createGroup ? createGroup(view) : undefined,
      regionGroupKey: createRegionGroup
        ? createRegionGroup(view)
        : createXKey(view),
      coordinate,
      scale,
      state: mergeState(options, [
        ['active', background ? {} : { lineWidth: '1', stroke: '#000' }],
        'inactive',
      ]),
      background,
      link,
      delay,
      emitter,
      ...rest,
    });
  };
}

ElementHighlight.props = {
  reapplyWhenUpdate: true,
};
