import {
  Linear as LinearScale,
  Band as BandScale,
  Ordinal as OrdinalScale,
} from '@antv/scale';
import { Linear, Band, Ordinal } from '../../../src/scale';

describe('scale', () => {
  it('Scale({..}) returns @antv/scale instance', () => {
    expect(Linear()).toBeInstanceOf(LinearScale);
    expect(Band()).toBeInstanceOf(BandScale);
    expect(Ordinal()).toBeInstanceOf(OrdinalScale);
  });
});
