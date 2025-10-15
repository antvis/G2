import { CustomEvent, DisplayObject } from '@antv/g';
import { isTranspose } from '../utils/coordinate';
import { SLIDER_CLASS_NAME } from './sliderFilter';
import { calculateSensitivityMultiplier } from './utils';

/**
 * SliderWheel interaction for mouse wheel/touchpad gestures on charts.
 */

/**
 * Get the real DOM canvas element from G2 container.
 * This helper function provides better type safety than using 'as any' directly.
 */
function getCanvasDOM(container: any): HTMLElement | null {
  try {
    const canvas = container.ownerDocument?.defaultView;
    if (!canvas || typeof canvas.getContextService !== 'function') {
      return null;
    }
    const dom = canvas.getContextService().getDomElement();
    return dom instanceof HTMLElement ? dom : null;
  } catch {
    return null;
  }
}

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

    // Get the real DOM canvas element to attach wheel listener
    const canvasDOM = getCanvasDOM(container);
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

    /**
     * Calculate zoom center based on mouse position relative to slider track.
     * @param mousePos - Mouse position (X or Y) relative to canvas
     * @param sliderPos - Slider position (X or Y)
     * @param trackLength - Length of slider track
     * @param v0 - Current selection start value [0-1]
     * @param v1 - Current selection end value [0-1]
     * @returns Normalized center position [0-1] clamped to current selection
     */
    const calculateZoomCenter = (
      mousePos: number,
      sliderPos: number,
      trackLength: number,
      v0: number,
      v1: number,
    ): number => {
      const relativePos = mousePos - sliderPos;
      const normalizedPosition = relativePos / trackLength;
      // Clamp to [0, 1] range first, then to current selection range
      const clamped = Math.max(0, Math.min(1, normalizedPosition));
      return Math.max(v0, Math.min(v1, clamped));
    };

    const handleWheel = (event: WheelEvent) => {
      // Early return if canvas DOM is not available
      if (!canvasDOM) return;

      // Check if the event target is within our canvas container
      const target = event.target as HTMLElement;
      if (!canvasDOM.contains(target)) {
        return;
      }

      // Get mouse position relative to canvas
      const canvasRect = canvasDOM.getBoundingClientRect();
      const mouseX = event.clientX - canvasRect.left;
      const mouseY = event.clientY - canvasRect.top;

      // Find all sliders that should respond to this event
      const activeSliders: DisplayObject[] = [];

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

        if (isModifierKeyActive(axisConfig, event)) {
          activeSliders.push(slider);
        }
      }

      // If no slider should handle this event, let it propagate
      if (activeSliders.length === 0) {
        return;
      }

      // Prevent page scroll since we have active sliders
      event.preventDefault();
      event.stopPropagation();

      // Process all active sliders
      for (const slider of activeSliders) {
        const {
          values,
          orientation,
          x: sliderX,
          y: sliderY,
          trackLength,
        } = (slider as any).attributes;
        const [v0, v1] = values;
        const range = v1 - v0;
        const isHorizontal = orientation === 'horizontal';

        // Calculate zoom center based on mouse position relative to slider
        const center = isHorizontal
          ? calculateZoomCenter(mouseX, sliderX, trackLength, v0, v1)
          : calculateZoomCenter(mouseY, sliderY, trackLength, v0, v1);

        const adaptiveSensitivity =
          wheelSensitivity * calculateSensitivityMultiplier(range);

        const delta = event.deltaY * adaptiveSensitivity;
        const zoomFactor = 1 + delta;
        const newRange = Math.max(
          safeMinRange,
          Math.min(1, range * zoomFactor),
        );

        // Calculate new range boundaries based on mouse position
        // The zoom should maintain the ratio of distances from center to edges
        const leftRatio = (center - v0) / range;
        const rightRatio = (v1 - center) / range;

        let newV0 = center - newRange * leftRatio;
        let newV1 = center + newRange * rightRatio;

        // Handle boundary conditions while trying to maintain mouse position as center
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

    // Listen on the real DOM canvas element with passive: false AND capture: true
    // Capture phase ensures we intercept BEFORE @antv/g-canvas's passive listener
    // This is the only way to preventDefault() before the passive listener receives it
    if (canvasDOM) {
      canvasDOM.addEventListener('wheel', handleWheel, {
        passive: false,
        capture: true,
      });
    }

    return () => {
      if (canvasDOM) {
        canvasDOM.removeEventListener('wheel', handleWheel, { capture: true });
      }
    };
  };
}

SliderWheel.props = {
  reapplyWhenUpdate: true,
};
