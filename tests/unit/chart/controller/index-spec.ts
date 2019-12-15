import { registerController } from '../../../../src'; // 从 index.ts 引入，包含所有的 内置 Component
import { getController, getControllerNames, unregisterController } from '../../../../src/chart/controller';
import Axis from '../../../../src/chart/controller/axis';
import { Title } from './title';

describe('plugin', () => {
  it('API', () => {
    expect(getControllerNames()).toEqual(['axis', 'legend', 'tooltip', 'annotation']);

    expect(getController('title')).toBe(undefined);
    expect(getController('axis')).toBe(Axis);

    registerController('title', Title);
    expect(getController('title')).toBe(Title);

    unregisterController('title');
    expect(getController('title')).toBe(undefined);
  });
});
