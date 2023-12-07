import { createColorKey } from './utils';
import { ElementHighlight } from './elementHighlight';

export function ElementHighlightByColor(options) {
  return ElementHighlight({ ...options, createGroup: createColorKey });
}

ElementHighlightByColor.props = {
  reapplyWhenUpdate: true,
};
