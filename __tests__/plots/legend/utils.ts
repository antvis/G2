import { DisplayObject, CustomEvent } from '@antv/g';

export function step(
  element: DisplayObject,
  event,
  { skip = false, ...rest }: Record<string, any> = {},
) {
  return {
    skip,
    changeState: async () => {
      element.dispatchEvent(new CustomEvent(event, rest));
    },
  };
}
