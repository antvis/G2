import { createContext } from '../../helper';
import { Button } from '@/interaction/action/transformer/button';

describe('Button action', () => {
  it('Button({...}) renders a button component', async () => {
    const context = createContext({ width: 200, height: 100 });
    Button({})(context);
  });

  it('Button({...}) renders a button component with custom options', async () => {
    const context = createContext({ width: 200, height: 100 });
    Button({
      text: 'Hello',
      textStyle: { fontSize: 12, fill: 'red' },
      fill: 'pink',
      stroke: 'green',
      padding: [2, 4],
      radius: 0,
    })(context);
  });

  it('Button({...}) renders a button component with specified position', async () => {
    const context = createContext({ width: 200, height: 100 });
    Button({ position: 'top-left' })(context);
  });
});
