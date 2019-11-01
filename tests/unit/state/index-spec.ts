import { getStateAction, registerStateAction, STATE_ACTIONS, StateManager } from '../../../src/state';

describe('State', () => {
  it('registerState', () => {
    registerStateAction('active', {
      init(stateManager, view) {},
      destroy(stateManager, view) {},
      name: 'active',
    });

    expect(STATE_ACTIONS.active).not.toBe(undefined);
    expect(STATE_ACTIONS.active.name).toBe('active');
  });

  it('getState', () => {
    expect(getStateAction('active')).not.toBe(undefined);
  });

  describe('StateManager', () => {
    const stateManager = new StateManager();

    it('Instantiation', () => {
      expect(stateManager.states).toEqual({});
    });

    it('setState()', () => {
      let stateChangeValue;
      stateManager.on('activechange', (obj) => {
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
  });
});
