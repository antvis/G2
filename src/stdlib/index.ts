import { G2Library } from '../runtime';
import { Canvas } from '../renderer';
import { Cartesian, Polar, Transpose, Parallel } from '../coordinate';
import { Constant, Field, Transform } from '../encode';
import { Interval, Line, Point as PointGeometry } from '../geometry';
import {
  MaybeTuple,
  MaybeZeroX1,
  MaybeZeroY2,
  MaybeSeries,
  MaybeStackY,
  MaybeSplitPosition,
  MaybeKey,
  MaybeSize,
  MaybeZeroY1,
} from '../infer';
import { Category10, Category20 } from '../palette';
import {
  Linear,
  Ordinal,
  Band,
  Identity,
  Point,
  Time,
  Log,
  Pow,
} from '../scale';
import {
  Rect as RectShape,
  HollowRect,
  Line as LineShape,
  Smooth,
  Point as PointShape,
  HollowPoint,
} from '../shape';
import { DodgeX, StackY, StackEnter, SplitPosition, Key } from '../statistic';
import { Light } from '../theme';
import { Fetch, FilterBy, SortBy, Pick } from '../transform';
import { AxisX, AxisY, LegendCategory, LegendContinuous } from '../component';
import { ScaleInY, FadeIn } from '../animation';

export function createLibrary(): G2Library {
  return {
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
    'component.axisX': AxisX,
    'component.axisY': AxisY,
    'component.legendCategory': LegendCategory,
    'component.legendContinuous': LegendContinuous,
    'animation.scaleInY': ScaleInY,
    'animation.fadeIn': FadeIn,
  };
}
