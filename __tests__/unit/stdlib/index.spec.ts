import { createLibrary } from '../../../src/stdlib';
import { Canvas } from '../../../src/renderer';
import { Cartesian, Polar, Transpose } from '../../../src/coordinate';
import { Constant, Field, Transform } from '../../../src/encode';
import { Interval } from '../../../src/geometry';
import { MaybeTuple, MaybeZeroX1, MaybeZeroY2 } from '../../../src/infer';
import { Category10, Category20 } from '../../../src/palette';
import { Linear, Ordinal, Band, Identity } from '../../../src/scale';
import { ShapeRect, ShapeHollowRect } from '../../../src/shape';
import { DodgeX, StackY } from '../../../src/statistic';
import { Light } from '../../../src/theme';
import { Fetch, SortBy } from '../../../src/transform';
import {
  AxisX,
  AxisY,
  LegendCategory,
  LegendContinuous,
} from '../../../src/component';

describe('stdlib', () => {
  it('createLibrary() should returns expected builtin', () => {
    expect(createLibrary()).toEqual({
      'renderer.canvas': Canvas,
      'coordinate.cartesian': Cartesian,
      'coordinate.polar': Polar,
      'coordinate.transpose': Transpose,
      'encode.constant': Constant,
      'encode.field': Field,
      'encode.transform': Transform,
      'mark.interval': Interval,
      'infer.maybeTuple': MaybeTuple,
      'infer.maybeZeroX1': MaybeZeroX1,
      'infer.maybeZeroY2': MaybeZeroY2,
      'palette.category10': Category10,
      'palette.category20': Category20,
      'scale.linear': Linear,
      'scale.ordinal': Ordinal,
      'scale.band': Band,
      'scale.identity': Identity,
      'shape.rect': ShapeRect,
      'shape.hollowRect': ShapeHollowRect,
      'statistic.stackY': StackY,
      'statistic.dodgeX': DodgeX,
      'theme.light': Light,
      'transform.fetch': Fetch,
      'transform.sortBy': SortBy,
      'component.axisX': AxisX,
      'component.axisY': AxisY,
      'component.legendCategory': LegendCategory,
      'component.legendContinuous': LegendContinuous,
    });
  });
});
