import { CustomEvent, DisplayObject } from '@antv/g';
import { ELEMENT_CLASS_NAME } from '../../../src';
import { renderSync, assetElementStyle, assetElementsStyle } from './utils';
import { alphabetIntervalActive } from './alphabet-interval-active';

describe('alphabet-interval-active', () => {
  it('should hight hovered element', async () => {
    const options = alphabetIntervalActive();
    const document = await renderSync(options);
    const [e, ...E] = document.getElementsByClassName(
      ELEMENT_CLASS_NAME,
    ) as DisplayObject[];
    assetElementsStyle([e, ...E], 'fill', 'steelblue');
    e.dispatchEvent(new CustomEvent('pointerenter'));
    assetElementStyle(e, 'fill', 'red');
    assetElementsStyle(E, 'fill', 'steelblue');
    e.dispatchEvent(new CustomEvent('pointerleave'));
    assetElementStyle(e, 'fill', 'steelblue');
    assetElementsStyle(E, 'fill', 'steelblue');
  });
});
