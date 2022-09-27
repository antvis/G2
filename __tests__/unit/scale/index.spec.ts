import {
  Linear as LinearScale,
  Band as BandScale,
  Ordinal as OrdinalScale,
  Identity as IdentityScale,
  Point as PointScale,
  Time as TimeScale,
  Log as LogScale,
  Pow as PowScale,
  Threshold as ThresholdScale,
  Quantile as QuantileScale,
  Quantize as QuantizeScale,
  Sqrt as SqrtScale,
} from '@antv/scale';
import {
  Linear,
  Band,
  Ordinal,
  Identity,
  Point,
  Time,
  Log,
  Pow,
  Threshold,
  Quantile,
  Quantize,
  Sqrt,
} from '../../../src/scale';

describe('scale', () => {
  it('Scale({..}) returns @antv/scale instance', () => {
    expect(Linear()).toBeInstanceOf(LinearScale);
    expect(Band()).toBeInstanceOf(BandScale);
    expect(Ordinal()).toBeInstanceOf(OrdinalScale);
    expect(Identity()).toBeInstanceOf(IdentityScale);
    expect(Point()).toBeInstanceOf(PointScale);
    expect(Time()).toBeInstanceOf(TimeScale);
    expect(Log()).toBeInstanceOf(LogScale);
    expect(Pow()).toBeInstanceOf(PowScale);
    expect(Threshold()).toBeInstanceOf(ThresholdScale);
    expect(Quantile()).toBeInstanceOf(QuantileScale);
    expect(Quantize()).toBeInstanceOf(QuantizeScale);
    expect(Sqrt()).toBeInstanceOf(SqrtScale);
  });
});
