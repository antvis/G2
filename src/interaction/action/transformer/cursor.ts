import { ActionComponent as AC } from '../../types';
import { CursorAction } from '../../../spec';

export type CursorOptions = Omit<CursorAction, 'type'>;

export const Cursor: AC<CursorOptions> = (options) => {
  const { cursor } = options;
  return (context) => {
    const { selection } = context;

    // @ts-ignore
    const canvas = selection.node().getRootNode().defaultView;
    const dom = canvas.getContextService().getDomElement();
    dom.style.cursor = cursor;

    return context;
  };
};

Cursor.props = {};
