import { DisplayObject } from '@antv/g';
import { deepMix } from '@antv/util';
import { group } from '@antv/vendor/d3-array';
import {
  createDatumof,
  createFindElementByEvent,
  createUseState,
  createValueof,
  createXKey,
  mergeState,
  selectElementByData,
  selectG2Elements,
  selectPlotArea,
  VALID_FIND_BY_X_MARKS,
} from './utils';

/**
 * Scale up elements on hover.
 */
export function elementHoverScale(
  root: DisplayObject,
  {
    elements: elementsof,
    datum,
    groupKey: eleGroupKey = (d) => d,
    regionGroupKey = (d) => d,
    scaleFactor = 1.04,
    scaleOrigin = 'center center',
    shadow = true,
    shadowColor = 'rgba(0, 0, 0, 0.4)',
    shadowBlur = 10,
    shadowOffsetX = 0,
    shadowOffsetY = 2,
    zIndex = 10,
    delay = 60,
    coordinate,
    scale,
    emitter,
    state = {},
    region = false,
    regionEleFilter = (el) => VALID_FIND_BY_X_MARKS.includes(el.markType),
  }: Record<string, any>,
) {
  const groupKey = region ? regionGroupKey : eleGroupKey;
  const findElement = createFindElementByEvent({
    elementsof,
    root,
    coordinate,
    scale,
  });

  // Helper function to get current valid elements
  const getCurrentElements = () => {
    const allElements = elementsof(root) ?? [];
    return region ? allElements.filter(regionEleFilter) : allElements;
  };

  const initialElements = getCurrentElements();
  const valueof = createValueof(initialElements, datum);

  const elementStyle = deepMix(state, {
    active: {},
  });

  const useState = createUseState(elementStyle, initialElements);
  const { updateState, removeState, hasState } = useState(valueof);

  const originalStyles = new Map<DisplayObject, Record<string, any>>();
  const hoveredElements = new Set<DisplayObject>();

  let out;

  const applyHoverEffect = (element: DisplayObject) => {
    if (hoveredElements.has(element)) return;

    // Capture current state before applying effect
    const currentTransform = element.style.transform || '';
    const currentTransformOrigin = element.style.transformOrigin || '';

    originalStyles.set(element, {
      transform: currentTransform,
      transformOrigin: currentTransformOrigin,
      zIndex: element.style.zIndex || 0,
      shadowColor: element.style.shadowColor || '',
      shadowBlur: element.style.shadowBlur || 0,
      shadowOffsetX: element.style.shadowOffsetX || 0,
      shadowOffsetY: element.style.shadowOffsetY || 0,
    });

    const scaleTransform = `scale(${scaleFactor})`;

    if (currentTransform.includes('translate')) {
      element.style.transform = `${currentTransform} ${scaleTransform}`;
    } else {
      element.style.transformOrigin = scaleOrigin;
      element.style.transform = scaleTransform;
    }

    element.style.zIndex = zIndex;

    if (shadow) {
      element.style.shadowColor = shadowColor;
      element.style.shadowBlur = shadowBlur;
      element.style.shadowOffsetX = shadowOffsetX;
      element.style.shadowOffsetY = shadowOffsetY;
    }

    hoveredElements.add(element);
  };

  const removeHoverEffect = (element: DisplayObject) => {
    const original = originalStyles.get(element);
    if (!original) return;

    // Restore all original styles
    element.style.transform = original.transform;
    element.style.transformOrigin = original.transformOrigin;
    element.style.zIndex = original.zIndex;
    element.style.shadowColor = original.shadowColor;
    element.style.shadowBlur = original.shadowBlur;
    element.style.shadowOffsetX = original.shadowOffsetX;
    element.style.shadowOffsetY = original.shadowOffsetY;

    hoveredElements.delete(element);
    originalStyles.delete(element);
  };

  const pointerover = (event) => {
    const { nativeEvent = true } = event;
    let element = event.target;

    if (region) {
      element = findElement(event);
    }

    // Get current elements dynamically to handle chart updates (e.g., legend filter)
    const validElements = getCurrentElements();
    const currentElementSet = new Set(validElements);

    if (!currentElementSet.has(element)) return;
    if (out) clearTimeout(out);

    const currentKeyGroup = group(validElements, groupKey);
    const k = groupKey(element);
    const currentGroup = currentKeyGroup.get(k);
    const groupSet = new Set(currentGroup);

    // Remove hover effects from elements not in current group
    for (const e of validElements) {
      if (!groupSet.has(e)) {
        removeState(e, 'active');
        removeHoverEffect(e);
      }
    }

    // Apply hover effects to current group
    for (const e of currentGroup) {
      if (!hasState(e, 'active')) updateState(e, 'active');
      applyHoverEffect(e as DisplayObject);
    }

    // Emit events
    if (!nativeEvent) return;
    emitter.emit('element:hoverscale', {
      nativeEvent,
      data: {
        data: datum(element),
        group: currentGroup.map(datum),
      },
    });
  };

  const delayReset = () => {
    if (out) clearTimeout(out);
    out = setTimeout(() => {
      reset();
      out = null;
    }, delay);
  };

  const reset = (nativeEvent = true) => {
    const validElements = getCurrentElements();

    for (const e of validElements) {
      removeState(e, 'active');
      removeHoverEffect(e);
    }
    hoveredElements.clear();

    if (nativeEvent) {
      emitter.emit('element:unhoverscale', { nativeEvent });
    }
  };

  const pointerout = (event) => {
    let element = event.target;

    if (region) {
      element = findElement(event);
    }

    // Check if element is valid using current elements
    const validElements = getCurrentElements();
    const currentElementSet = new Set(validElements);

    if (!element || !currentElementSet.has(element)) {
      if (delay > 0) delayReset();
      else reset();
      return;
    }

    if (delay > 0) delayReset();
    else reset();
  };

  const pointerleave = () => {
    reset();
  };

  root.addEventListener('pointerover', pointerover);
  root.addEventListener('pointermove', pointerover);
  root.addEventListener('pointerout', pointerout);
  root.addEventListener('pointerleave', pointerleave);

  const onReset = (e) => {
    const { nativeEvent } = e;
    if (nativeEvent) return;
    reset(false);
  };

  const onHoverScale = (e) => {
    const { nativeEvent } = e;
    if (nativeEvent) return;

    const { data } = e.data;
    const currentElements = getCurrentElements();
    const element = selectElementByData(currentElements, data, datum);
    if (!element) return;

    pointerover({ target: element, nativeEvent: false });
  };

  emitter.on('element:hoverscale', onHoverScale);
  emitter.on('element:unhoverscale', onReset);

  return () => {
    root.removeEventListener('pointerover', pointerover);
    root.removeEventListener('pointermove', pointerover);
    root.removeEventListener('pointerout', pointerout);
    root.removeEventListener('pointerleave', pointerleave);
    emitter.off('element:hoverscale', onHoverScale);
    emitter.off('element:unhoverscale', onReset);

    // Clean up all hover effects from current elements
    const validElements = getCurrentElements();
    for (const e of validElements) {
      removeHoverEffect(e);
    }
    originalStyles.clear();
    hoveredElements.clear();
  };
}

export function ElementHoverScale({
  delay,
  createGroup,
  createRegionGroup,
  scale: scaleFactorParam,
  scaleOrigin,
  shadow,
  shadowColor,
  shadowBlur,
  shadowOffsetX,
  shadowOffsetY,
  zIndex,
  ...rest
}) {
  return (context, _, emitter) => {
    const { container, view, options } = context;
    const { coordinate, scale } = view;
    const plotArea = selectPlotArea(container);

    return elementHoverScale(plotArea, {
      elements: selectG2Elements,
      datum: createDatumof(view),
      groupKey: createGroup ? createGroup(view) : undefined,
      regionGroupKey: createRegionGroup
        ? createRegionGroup(view)
        : createXKey(view),
      coordinate,
      scale,
      state: mergeState(options, ['active']),
      scaleFactor: scaleFactorParam,
      scaleOrigin,
      shadow,
      shadowColor,
      shadowBlur,
      shadowOffsetX,
      shadowOffsetY,
      zIndex,
      delay,
      emitter,
      ...rest,
    });
  };
}

ElementHoverScale.props = {
  reapplyWhenUpdate: true,
};
