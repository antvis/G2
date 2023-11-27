import { createXKey } from './utils';
import { ElementHighlight } from './elementHighlight';

export function ElementHighlightByX(options) {
  return ElementHighlight({ ...options, createGroup: createXKey });
}

ElementHighlightByX.props = {
  reapplyWhenUpdate: true,
};
