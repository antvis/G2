import { Action, registerAction } from '../../../src/interaction';
import Context from '../../../src/interaction/context';
import { parseAction } from '../../../src/interaction/grammar-interaction';

describe('parse action', () => {
  it('not args', () => {
    const context = new Context(null);
    class CustomAction extends Action {
      name: 'hello'
      show() {}
    }
    registerAction('hello', CustomAction);
    const { action, methodName } = parseAction('hello:show', context);
    expect(action.name).toBe('hello');
    expect(methodName).toBe('show');
  });

  it('args', () => {
    const context = new Context(null);
    const { action, methodName, arg } = parseAction('hello:show', context, 'xinming');
    expect(action.name).toBe('hello');
    expect(methodName).toBe('show');
    expect(arg).toBe('xinming');
  });
});
