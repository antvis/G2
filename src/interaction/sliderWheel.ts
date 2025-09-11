import { CustomEvent } from '@antv/g';
import { isTranspose } from '../utils/coordinate';
import { SLIDER_CLASS_NAME } from './sliderFilter';
import { calculateSensitivityMultiplier } from './utils';

/**
 * SliderWheel interaction for mouse wheel/touchpad gestures on charts.
 */

type SliderDirection = true | false | 'shift' | 'ctrl' | 'alt';

interface SliderWheelOptions {
  className?: string;
  setValue?: (component: any, values: [number, number]) => void;
  minRange?: number; // Minimum range (0.000001-1), auto-clamped
  wheelSensitivity?: number;
  x?: SliderDirection;
  y?: SliderDirection;
}

export function SliderWheel({
  className = SLIDER_CLASS_NAME,
  setValue = (component, values) => component.setValues(values),
  minRange = 0.01,
  wheelSensitivity = 0.05,
  x = true,
  y = true,
}: SliderWheelOptions = {}) {
  return (context) => {
    const { container, view } = context;
    const { coordinate } = view;
    const transposed = isTranspose(coordinate);
    const safeMinRange = Math.max(0.000001, Math.min(1, minRange));

    const sliders = container.getElementsByClassName(className);
    if (!sliders.length) return () => {};

    const isModifierKeyActive = (
      config: SliderDirection,
      event: WheelEvent,
    ): boolean => {
      if (config === true) return true;
      if (config === false) return false;
      if (config === 'shift')
        return event.shiftKey && !event.ctrlKey && !event.altKey;
      if (config === 'ctrl')
        return event.ctrlKey && !event.shiftKey && !event.altKey;
      if (config === 'alt')
        return event.altKey && !event.shiftKey && !event.ctrlKey;
      return false;
    };

    const triggerSliderValueChange = (
      slider: any,
      values: [number, number],
    ) => {
      setValue(slider, values);
      slider.dispatchEvent(
        new CustomEvent('valuechange', {
          detail: { value: values },
          nativeEvent: true,
        }),
      );
    };

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      event.stopPropagation();

      for (const slider of sliders) {
        const { values, orientation } = (slider as any).attributes;
        if (!values) continue;

        const isHorizontal = orientation === 'horizontal';
        const actualAxis = transposed
          ? isHorizontal
            ? 'y'
            : 'x'
          : isHorizontal
          ? 'x'
          : 'y';
        const axisConfig = actualAxis === 'x' ? x : y;

        if (!isModifierKeyActive(axisConfig, event)) continue;

        const [v0, v1] = values;
        const range = v1 - v0;
        const center = (v0 + v1) / 2;
        const adaptiveSensitivity =
          wheelSensitivity * calculateSensitivityMultiplier(range);

        const delta = event.deltaY * adaptiveSensitivity;
        const zoomFactor = 1 + delta;
        const newRange = Math.max(
          safeMinRange,
          Math.min(1, range * zoomFactor),
        );

        const halfRange = newRange / 2;
        let newV0 = center - halfRange;
        let newV1 = center + halfRange;

        if (newV0 < 0) {
          newV0 = 0;
          newV1 = Math.min(1, newRange);
        } else if (newV1 > 1) {
          newV1 = 1;
          newV0 = Math.max(0, 1 - newRange);
        }

        triggerSliderValueChange(slider, [newV0, newV1]);
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  };
}

SliderWheel.props = {
  reapplyWhenUpdate: true,
};
