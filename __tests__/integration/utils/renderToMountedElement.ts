import { Text, Group } from '@antv/g';
import { renderToMountedElement as r } from '../../../src';

export function renderToMountedElement(
  options,
  { canvas },
  resolve = () => {},
) {
  canvas.ready.then(() => {
    canvas.appendChild(
      new Text({
        style: {
          text: 'Other Elements Rendered By G',
          textBaseline: 'top',
        },
      }),
    );
    const group = new Group({});
    canvas.appendChild(group);
    r(options, { group }, resolve);
  });
  return canvas.getConfig().container;
}
