import {
  AxisLinear,
  AxisArc,
  AxisRadar,
  LegendContinuousBlock,
  LegendContinuousBlockSize,
  LegendContinuousSize,
} from '../component';
import { Mark, View } from '../composition';
import { LabelShape } from '../shape';
import { Event } from '../interaction/event';

// Some private visual components, they are not public to
// users, only for runtime.
export function builtinlib() {
  return {
    'component.axisRadar': AxisRadar,
    'component.axisLinear': AxisLinear,
    'component.axisArc': AxisArc,
    'component.legendContinuousBlock': LegendContinuousBlock,
    'component.legendContinuousBlockSize': LegendContinuousBlockSize,
    'component.legendContinuousSize': LegendContinuousSize,
    'interaction.event': Event,
    'composition.mark': Mark,
    'composition.view': View,
    'shape.label.label': LabelShape,
  } as const;
}
