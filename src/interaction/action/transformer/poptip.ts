import { HTML } from '@antv/g';
import { maybeAppend } from '../../../component/utils';
import { ActionComponent as AC } from '../../types';
import { PoptipAction } from '../../../spec';

export type PoptipOptions = Omit<PoptipAction, 'type'>;

const getInnerHTML = (content = '', style = '') => `<div style="
background-color:rgba(0,0,0,0.75);color:#fff;width:max-content;padding:4px;font-size:12px;border-radius:2.5px;
box-shadow:0 3px 6px -4px rgba(0,0,0,0.12), 0 6px 16px 0 rgba(0,0,0,0.08), 0 9px 28px 8px rgba(0,0,0,0.05);${
  style || ''
}
">${content || ''}</div>`;

export const Poptip: AC<PoptipOptions> = (options = {}) => {
  const { htmlStyle } = options;
  return (context) => {
    const { transientLayer, selection, shared } = context;
    const { mouseX, mouseY, tip: content } = shared;

    const plot = selection.select('.plot').node();
    const [x1, y1] = plot.getBounds().min;
    const [offsetX, offsetY] = [8, 8];
    let x = mouseX - x1 + offsetX;
    let y = mouseY - y1 + offsetY;
    if (options.x !== undefined) x = options.x - x1;
    if (options.y !== undefined) y = options.y - y1;

    maybeAppend(
      transientLayer.node(),
      '.tip-popover',
      () =>
        new HTML({
          className: 'tip-popover',
          style: {
            innerHTML: getInnerHTML('', htmlStyle),
            visibility: 'hidden',
          },
        }),
    )
      .style('x', x)
      .style('y', y)
      .style('innerHTML', getInnerHTML(content, htmlStyle))
      .style('visibility', content ? 'visible' : 'hidden');

    return context;
  };
};

Poptip.props = {};
