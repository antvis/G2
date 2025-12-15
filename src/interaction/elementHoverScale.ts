import { DisplayObject } from '@antv/g';
import { deepMix } from '@antv/util';
import { group } from '@antv/vendor/d3-array';
import { arc } from '@antv/vendor/d3-shape';
import { isPolar } from '../utils/coordinate';
import { getArcObject } from '../shape/utils';
import {
  createDatumof,
  createUseState,
  createValueof,
  mergeState,
  selectElementByData,
  selectG2Elements,
  selectPlotArea,
} from './utils';

/**
 * Scale up elements on hover.
 */
export function elementHoverScale(
  root: DisplayObject,
  {
    elements: elementsof,
    datum,
    groupKey = (element) => element,
    scaleFactor = 1.04,
    shadow = true,
    shadowColor = 'rgba(0, 0, 0, 0.4)',
    shadowBlur = 10,
    shadowOffsetX = 0,
    shadowOffsetY = 2,
    zIndex = 10,
    delay = 60,
    emitter,
    state = {},
    coordinate,
  }: Record<string, any>,
) {
  // Helper function to get current valid elements
  const getCurrentElements = () => {
    return elementsof(root) ?? [];
  };

  const initialElements = getCurrentElements();
  const valueof = createValueof(initialElements, datum);

  const elementStyle = deepMix(state, {
    active: {},
  });

  const useState = createUseState(elementStyle, initialElements);
  const { updateState, removeState, hasState } = useState(valueof);

  const originalStyles = new Map<DisplayObject, Record<string, any>>();

  let out;

  // Apply radial growth effect for polar coordinates by modifying the arc path
  const applyPolarRadialGrowth = (element: DisplayObject): boolean => {
    const data = (element as any).__data__;
    if (!data || !data.points || data.points.length < 4) return false;

    const { y, y1 } = data;
    if (y === undefined) return false;

    // Calculate current arc parameters and increase outer radius
    const arcObject = getArcObject(coordinate, data.points, [y, y1]);
    const newOuterRadius = arcObject.outerRadius * scaleFactor;

    // Generate new arc path with increased outer radius
    const arcGenerator = arc()
      .cornerRadius((element.style.radius || 0) as number)
      .padAngle(((element.style.inset || 0) * Math.PI) / 180);

    const newPath = arcGenerator({
      ...arcObject,
      outerRadius: newOuterRadius,
    } as any);

    if (!newPath) return false;

    element.attr('d', newPath);
    return true;
  };

  const applyHoverEffect = (element: DisplayObject) => {
    if (originalStyles.has(element)) return;

    const currentTransform = element.style.transform || '';

    // Save original styles
    originalStyles.set(element, {
      transform: currentTransform,
      d: element.attr('d') || '',
      zIndex: element.style.zIndex || 0,
      shadowColor: element.style.shadowColor || '',
      shadowBlur: element.style.shadowBlur || 0,
      shadowOffsetX: element.style.shadowOffsetX || 0,
      shadowOffsetY: element.style.shadowOffsetY || 0,
    });

    // Apply radial growth for polar coordinates, otherwise use scale transform
    const isPolarCoord = coordinate && isPolar(coordinate);
    const appliedRadialGrowth = isPolarCoord && applyPolarRadialGrowth(element);

    if (!appliedRadialGrowth) {
      const scaleTransform = `scale(${scaleFactor})`;
      element.style.transform = currentTransform.includes('translate')
        ? `${currentTransform} ${scaleTransform}`
        : scaleTransform;
    }

    // Apply visual effects
    element.style.zIndex = zIndex;

    if (shadow) {
      element.style.shadowColor = shadowColor;
      element.style.shadowBlur = shadowBlur;
      element.style.shadowOffsetX = shadowOffsetX;
      element.style.shadowOffsetY = shadowOffsetY;
    }
  };

  const removeHoverEffect = (element: DisplayObject) => {
    const original = originalStyles.get(element);
    if (!original) return;

    // Restore original path and styles
    if (original.d) element.attr('d', original.d);
    element.style.transform = original.transform;
    element.style.zIndex = original.zIndex;
    element.style.shadowColor = original.shadowColor;
    element.style.shadowBlur = original.shadowBlur;
    element.style.shadowOffsetX = original.shadowOffsetX;
    element.style.shadowOffsetY = original.shadowOffsetY;

    originalStyles.delete(element);
  };

  const pointerover = (event) => {
    const { nativeEvent = true } = event;
    const element = event.target;

    // Get current elements dynamically to handle chart updates (e.g., legend filter)
    const validElements = getCurrentElements();
    const currentElementSet = new Set(validElements);

    if (!currentElementSet.has(element)) return;
    if (out) clearTimeout(out);

    const currentKeyGroup = group(validElements, groupKey);
    const currentKey = groupKey(element);
    const currentGroup = currentKeyGroup.get(currentKey);

    if (!currentGroup) return;

    const groupSet = new Set(currentGroup);

    // Remove hover effects from elements not in current group
    for (const element of validElements) {
      if (!groupSet.has(element)) {
        removeState(element, 'active');
        removeHoverEffect(element);
      }
    }

    // Apply hover effects to current group
    for (const element of currentGroup) {
      if (!hasState(element, 'active')) updateState(element, 'active');
      applyHoverEffect(element as DisplayObject);
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

    // Remove hover effects and states from all valid elements
    for (const element of validElements) {
      removeState(element, 'active');
      removeHoverEffect(element);
    }

    if (nativeEvent) {
      emitter.emit('element:unhoverscale', { nativeEvent });
    }
  };

  const pointerout = () => {
    delay > 0 ? delayReset() : reset();
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
    for (const element of validElements) {
      removeHoverEffect(element);
    }
    originalStyles.clear();
  };
}

export function ElementHoverScale({
  delay,
  createGroup,
  scale: scaleFactorParam,
  shadow,
  shadowColor,
  shadowBlur,
  shadowOffsetX,
  shadowOffsetY,
  zIndex,
  ...rest
}) {
  return (context, _contexts, emitter) => {
    const { container, view, options } = context;
    const plotArea = selectPlotArea(container);
    const datumof = createDatumof(view);
    const { coordinate } = view;

    return elementHoverScale(plotArea, {
      elements: selectG2Elements,
      datum: datumof,
      groupKey: createGroup
        ? (element) => createGroup(view)(datumof(element))
        : undefined,
      state: mergeState(options, ['active']),
      scaleFactor: scaleFactorParam,
      shadow,
      shadowColor,
      shadowBlur,
      shadowOffsetX,
      shadowOffsetY,
      zIndex,
      delay,
      emitter,
      coordinate,
      ...rest,
    });
  };
}

ElementHoverScale.props = {
  reapplyWhenUpdate: true,
};
