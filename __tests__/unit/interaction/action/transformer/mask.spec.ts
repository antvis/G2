import { createContext } from '../../helper';
import { Mask } from '@/interaction/action/transformer/mask';

describe('Mask action', () => {
  it('Mask({...}) renders a mask component with resize handles.', async () => {
    const context = createContext({
      width: 100,
      height: 100,
      shared: { regions: [{ x1: 20, y1: 20, x2: 50, y2: 50 }] },
    });
    Mask({})(context);
  });

  it('Mask({...}) renders a mask component with custom options', async () => {
    const context = createContext({
      width: 100,
      height: 100,
      shared: { regions: [{ x1: 20, y1: 20, x2: 50, y2: 50 }] },
    });
    Mask({ fill: 'red', fillOpacity: 0.28 })(context);
  });

  it('Mask({...}) renders a x-mask component, which only has ew two directions resize handles.', async () => {
    const context = createContext({
      width: 100,
      height: 100,
      shared: { regions: [{ x1: 20, y1: 0, x2: 40, y2: 100 }] },
    });
    Mask({ maskType: 'rectX' })(context);
  });

  it('Mask({...}) renders a y-mask component, which only has ns two directions resize handles.', async () => {
    const context = createContext({
      width: 100,
      height: 100,
      shared: { regions: [{ x1: 0, y1: 10, x2: 100, y2: 30 }] },
    });
    Mask({ maskType: 'rectY' })(context);
  });

  it('Mask({...}) renders a polygon mask component, which is relied on shared.points variable.', async () => {
    const context = createContext({
      width: 100,
      height: 100,
      shared: {
        points: [
          [
            [10, 10],
            [20, 20],
            [30, 62],
            [80, 24],
          ],
        ],
      },
    });
    Mask({ maskType: 'polygon' })(context);
  });

  it('Mask({...}) renders multiple mask components.', async () => {
    const context = createContext({
      width: 100,
      height: 100,
      shared: {
        regions: [
          { x1: 20, y1: 20, x2: 40, y2: 50 },
          { x1: 60, y1: 42, x2: 80, y2: 60 },
        ],
      },
    });
    Mask({})(context);
  });
});
