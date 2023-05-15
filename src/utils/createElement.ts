import { CustomElement, DisplayObject } from '@antv/g';

export type ElementDescriptor = {
  render(container: DisplayObject): void;
};

export function createElement<T = Record<string, any>>(
  descriptor: ElementDescriptor | ElementDescriptor['render'],
): new (T?) => DisplayObject {
  const render =
    typeof descriptor === 'function' ? descriptor : descriptor.render;
  return class extends CustomElement<T> {
    connectedCallback() {
      this.draw();
    }

    attributeChangedCallback() {
      this.draw();
    }

    draw() {
      render(this);
    }
  };
}
