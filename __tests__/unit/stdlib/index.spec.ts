import { createLibrary } from '../../../src/stdlib';
import { Canvas } from '../../../src/renderer';
import { Cartesian, Polar, Transpose, Parallel } from '../../../src/coordinate';
import { Constant, Field, Transform } from '../../../src/encode';
import {
  Interval,
  Line,
  Point as PointGeometry,
  Text as TextGeometry,
} from '../../../src/geometry';
import {
  MaybeTuple,
  MaybeZeroX1,
  MaybeZeroY2,
  MaybeSeries,
  MaybeSplitPosition,
  MaybeStackY,
  MaybeKey,
  MaybeSize,
  MaybeZeroY1,
} from '../../../src/infer';
import { Category10, Category20 } from '../../../src/palette';
import {
  Linear,
  Ordinal,
  Band,
  Identity,
  Point,
  Time,
  Log,
  Pow,
} from '../../../src/scale';
import {
  Rect as RectShape,
  HollowRect,
  Line as LineShape,
  Smooth,
  Point as PointShape,
  HollowPoint,
  Text,
} from '../../../src/shape';
import {
  DodgeX,
  StackEnter,
  StackY,
  SplitPosition,
  Key,
} from '../../../src/statistic';
import { Light } from '../../../src/theme';
import {
  Fetch,
  SortBy,
  FilterBy,
  Pick,
  Rename,
  WordCloud,
} from '../../../src/transform';
import {
  AxisX,
  AxisY,
  LegendCategory,
  LegendContinuous,
} from '../../../src/component';
import { ScaleInY, FadeIn } from '../../../src/animation';

describe('stdlib', () => {
  it('createLibrary() should returns expected builtin', () => {
    expect(createLibrary()).toEqual({
      'renderer.canvas': Canvas,
      'coordinate.cartesian': Cartesian,
      'coordinate.polar': Polar,
      'coordinate.transpose': Transpose,
      'coordinate.parallel': Parallel,
      'encode.constant': Constant,
      'encode.field': Field,
      'encode.transform': Transform,
      'mark.interval': Interval,
      'mark.line': Line,
      'mark.point': PointGeometry,
      'mark.text': TextGeometry,
      'infer.maybeTuple': MaybeTuple,
      'infer.maybeZeroX1': MaybeZeroX1,
      'infer.maybeZeroY2': MaybeZeroY2,
      'infer.maybeSeries': MaybeSeries,
      'infer.maybeStackY': MaybeStackY,
      'infer.maybeSplitPosition': MaybeSplitPosition,
      'infer.maybeKey': MaybeKey,
      'infer.maybeSize': MaybeSize,
      'infer.maybeZeroY1': MaybeZeroY1,
      'palette.category10': Category10,
      'palette.category20': Category20,
      'scale.linear': Linear,
      'scale.ordinal': Ordinal,
      'scale.band': Band,
      'scale.identity': Identity,
      'scale.point': Point,
      'scale.time': Time,
      'scale.log': Log,
      'scale.pow': Pow,
      'shape.rect': RectShape,
      'shape.hollowRect': HollowRect,
      'shape.line': LineShape,
      'shape.smooth': Smooth,
      'shape.point': PointShape,
      'shape.hollowPoint': HollowPoint,
      'shape.text': Text,
      'statistic.stackY': StackY,
      'statistic.dodgeX': DodgeX,
      'statistic.stackEnter': StackEnter,
      'statistic.splitPosition': SplitPosition,
      'statistic.key': Key,
      'theme.light': Light,
      'transform.fetch': Fetch,
      'transform.sortBy': SortBy,
      'transform.filterBy': FilterBy,
      'transform.pick': Pick,
      'transform.rename': Rename,
      'transform.wordCloud': WordCloud,
      'component.axisX': AxisX,
      'component.axisY': AxisY,
      'component.legendCategory': LegendCategory,
      'component.legendContinuous': LegendContinuous,
      'animation.scaleInY': ScaleInY,
      'animation.fadeIn': FadeIn,
    });
  });
});
