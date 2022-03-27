import { G2Library } from '../runtime';
import { Canvas } from '../renderer';
import { Cartesian, Polar, Transpose, Parallel } from '../coordinate';
import { Constant, Field, Transform } from '../encode';
import { Interval, Line } from '../geometry';
import {
  MaybeTuple,
  MaybeZeroX1,
  MaybeZeroY2,
  MaybeSeries,
  MaybeStackY,
  MaybeSplitPosition,
} from '../infer';
import { Category10, Category20 } from '../palette';
import { Linear, Ordinal, Band, Identity, Point, Time } from '../scale';
import {
  Rect as RectShape,
  HollowRect,
  Line as LineShape,
  Smooth,
} from '../shape';
import { DodgeX, StackY, StackEnter, SplitPosition } from '../statistic';
import { Light } from '../theme';
import { Fetch, FilterBy, SortBy } from '../transform';
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
    'infer.maybeTuple': MaybeTuple,
    'infer.maybeZeroX1': MaybeZeroX1,
    'infer.maybeZeroY2': MaybeZeroY2,
    'infer.maybeSeries': MaybeSeries,
    'infer.maybeStackY': MaybeStackY,
    'infer.maybeSplitPosition': MaybeSplitPosition,
    'palette.category10': Category10,
    'palette.category20': Category20,
    'scale.linear': Linear,
    'scale.ordinal': Ordinal,
    'scale.band': Band,
    'scale.identity': Identity,
    'scale.point': Point,
    'scale.time': Time,
    'shape.rect': RectShape,
    'shape.hollowRect': HollowRect,
    'shape.line': LineShape,
    'shape.smooth': Smooth,
    'statistic.stackY': StackY,
    'statistic.dodgeX': DodgeX,
    'statistic.stackEnter': StackEnter,
    'statistic.splitPosition': SplitPosition,
    'theme.light': Light,
    'transform.fetch': Fetch,
    'transform.sortBy': SortBy,
    'transform.filterBy': FilterBy,
    'component.axisX': AxisX,
    'component.axisY': AxisY,
    'component.legendCategory': LegendCategory,
    'component.legendContinuous': LegendContinuous,
    'animation.scaleInY': ScaleInY,
    'animation.fadeIn': FadeIn,
  };
}
