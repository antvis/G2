import StateManager from '../../../src/chart/state-manager';

describe('StateManager', () => {
  const stateManager = new StateManager();

  it('Instantiation', () => {
    expect(stateManager.states).toEqual({});
  });

  it('setState()', () => {
    let stateChangeValue;
    stateManager.on('active', (obj) => {
      stateChangeValue = obj;
    });

    stateManager.setState('active', 1);
    expect(stateChangeValue).toEqual({
      name: 'active',
      value: 1,
      preValue: undefined,
    });
  });

  it('getState()', () => {
    expect(stateManager.getState('active')).toBe(1);
  });

  it('destroy', () => {
    stateManager.destroy();
    expect(stateManager.states).toBe(null);
  });
});
