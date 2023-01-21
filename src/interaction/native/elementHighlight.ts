import { DisplayObject } from '@antv/g';
import { group } from 'd3-array';
import { isPolar, isTranspose } from '../../utils/coordinate';
import { subObject } from '../../utils/helper';
import {
  createValueof,
  createDatumof,
  selectG2Elements,
  useState,
  renderLink,
  applyDefaultsHighlightedStyle,
  renderBackground,
  selectPlotArea,
  offsetTransform,
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
    offset = 0,
    ...rest
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
    ...subObject(rest, 'link'),
  });
  const [appendBackground, removeBackground, isBackground] = renderBackground({
    scale,
    coordinate,
    background,
    valueof,
    ...subObject(rest, 'background'),
  });
  const elementStyle = {
    ...(offset !== 0 && {
      // Apply translate to mock slice out.
      highlightedTransform: (_, i) => {
        return offsetTransform(elements[i], offset, coordinate);
      },
    }),
    ...rest,
  };
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
        if (!hasState(e, 'highlighted')) setState(e, 'highlighted');
      } else {
        setState(e, 'unhighlighted');
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
      removeState(e, 'unhighlighted', 'highlighted');
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

export function ElementHighlight({ delay, ...rest }) {
  return (context) => {
    const { container, view } = context;
    const { scale, coordinate } = view;
    const plotArea = selectPlotArea(container);
    return elementHighlight(plotArea, {
      ...applyDefaultsHighlightedStyle(rest),
      elements: selectG2Elements,
      datum: createDatumof(view),
      scale,
      coordinate,
      delay,
    });
  };
}
