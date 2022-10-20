import { select } from '../../utils/selection';

// A WeakMap index origin style of each element by element.
const store = new WeakMap();

function elementActive(
  root,
  {
    elements = (root) => [], // given root node for chart, returns elements to be active
    store = new WeakMap(), // a WeakMap index original style of element
    ...style // active style
  } = {},
) {
  // Get elements by specified elements getter.
  const elementSet = new Set(elements(root));

  // Active element and store original style.
  const active = (e) => {
    const element = e.target;
    if (!elementSet.has(element)) return;
    const style0 = {};
    for (const [key, value] of Object.entries(style)) {
      style0[key] = element.getAttribute(key);
      element.setAttribute(key, value);
    }
    store.set(element, style0);
  };

  // Restore original style.
  const deactive = (e) => {
    const element = e.target;
    if (!elementSet.has(element)) return;
    const style0 = store.get(element);
    for (const [key, value] of Object.entries(style0)) {
      element.setAttribute(key, value);
    }
    store.delete(element);
  };

  root.addEventListener('pointerover', active);
  root.addEventListener('pointerout', deactive);

  return () => {
    root.removeEventListener('pointerover', active);
    root.removeEventListener('pointerout', deactive);
  };
}

export function ElementActive(options = { lineWidth: 1, color: 'black' }) {
  return (context) => {
    const { container } = context;
    return elementActive(container, {
      ...options,
      store,
      elements: (root) => select(root).selectAll('.element').nodes(),
    });
  };
}
