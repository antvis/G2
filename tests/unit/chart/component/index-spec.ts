import { registerComponent } from '../../../../src'; // 从 index.ts 引入，包含所有的 内置 Component
import { getComponent, getComponentNames, unregisterComponent } from '../../../../src/chart/component';
import Axis from '../../../../src/chart/component/axis';
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
