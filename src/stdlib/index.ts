import { G2Library } from '../runtime';
import { Canvas } from '../renderer';
import { Cartesian, Polar, Transpose } from '../coordinate';
import { Constant, Field, Transform } from '../encode';
import { Interval } from '../geometry';
import { MaybeTuple, MaybeZeroX1, MaybeZeroY2 } from '../infer';
import { Category10, Category20 } from '../palette';
import { Linear, Ordinal, Band, Identity } from '../scale';
import { ShapeRect, ShapeHollowRect } from '../shape';
import { DodgeX, StackY } from '../statistic';
import { Light } from '../theme';
import { Fetch, SortBy } from '../transform';
import { AxisX, AxisY, LegendCategory, LegendContinuous } from '../component';

export function createLibrary(): G2Library {
  return {
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
  };
}
