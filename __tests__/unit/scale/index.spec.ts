import {
  Linear as LinearScale,
  Band as BandScale,
  Ordinal as OrdinalScale,
  Identity as IdentityScale,
} from '@antv/scale';
import { Linear, Band, Ordinal, Identity } from '../../../src/scale';

describe('scale', () => {
  it('Scale({..}) returns @antv/scale instance', () => {
    expect(Linear()).toBeInstanceOf(LinearScale);
    expect(Band()).toBeInstanceOf(BandScale);
    expect(Ordinal()).toBeInstanceOf(OrdinalScale);
    expect(Identity()).toBeInstanceOf(IdentityScale);
  });
});
