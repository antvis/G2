import { ActionComponent as AC } from '../../types';
import { CursorAction } from '../../../spec';

export type CursorOptions = Omit<CursorAction, 'type'>;

export const Cursor: AC<CursorOptions> = (options) => {
  const { cursor } = options;
  return (context) => {
    const { selection, event } = context;
    const { target } = event;

    // @ts-ignore
    const canvas = selection.node().getRootNode().defaultView;
    const dom = canvas.getContextService().getDomElement();
    dom.style.cursor = cursor || target.style?.cursor;

    return context;
  };
};

Cursor.props = {};
