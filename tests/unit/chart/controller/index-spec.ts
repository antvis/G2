import { registerComponentController } from '../../../../src'; // 从 index.ts 引入，包含所有的 内置 Component
import {
  getComponentController,
  getComponentControllerNames,
  unregisterComponentController,
} from '../../../../src/chart/controller';
import Axis from '../../../../src/chart/controller/axis';
import { Title } from './title';

describe('plugin', () => {
  it('API', () => {
    expect(getComponentControllerNames()).toEqual(['axis', 'legend', 'tooltip', 'annotation', 'slider']);

    expect(getComponentController('title')).toBe(undefined);
    expect(getComponentController('axis')).toBe(Axis);

    registerComponentController('title', Title);
    expect(getComponentController('title')).toBe(Title);

    unregisterComponentController('title');
    expect(getComponentController('title')).toBe(undefined);
  });
});
