import { getComponent, getComponentNames, registerComponent, unregisterComponent } from '../../../../src/chart/plugin';
import { Axis } from '../../../../src/chart/plugin/axis';
import { Title } from './title';

describe('plugin', () => {
  it('API', () => {
    expect(getComponentNames()).toEqual(['axis', 'legend', 'tooltip', 'annotation']);

    expect(getComponent('title')).toBe(undefined);
    expect(getComponent('axis')).toBe(Axis);

    registerComponent('title', Title);
    expect(getComponent('title')).toBe(Title);

    unregisterComponent('title');
    expect(getComponent('title')).toBe(undefined);
  });
});
