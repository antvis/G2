import EE from '@antv/event-emitter';
import { Visibility } from '../../../src/core/visibility';

describe('Visibility', () => {
  it('Visibility', () => {
    const v = new Visibility();
    expect(v.visible).toBe(true);
    expect(v.destroyed).toBe(false);

    v.hide();
    expect(v.visible).toBe(false);

    v.show();
    expect(v.visible).toBe(true);

    v.toggle();
    expect(v.visible).toBe(false);

    v.toggle();
    expect(v.visible).toBe(true);

    v.destroy();
    expect(v.destroyed).toBe(true);
  });

  it('is a EE', () => {
    const v = new Visibility();

    expect(v).toBeInstanceOf(EE);
  });
});
