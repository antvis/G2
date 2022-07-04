import { Coordinate, Vector2 } from '@antv/coord';
import { Primitive } from 'd3-array';
import { Channel } from './common';
import { Scale } from './component';
import { TransformSpec } from './transform';

// @todo Remove any.
export type MarkOptions = Record<string, any>;

export type MarkComponent<O extends MarkOptions = MarkOptions> = {
  (options?: O): Mark;
  props: MarkProps;
};

export type MarkProps = {
  defaultShape: string;
  defaultLabelShape?: string;
  channels: Channel[];
  preInference?: TransformSpec[];
  postInference?: TransformSpec[];
  shapes: string[];
};

export type Mark = (
  I: number[],
  scale: Record<string, Scale>,
  channel: MarkChannel,
  coordinate: Coordinate,
) => [I: number[], point2d: Vector2[][], series?: number[][]];

export type MarkChannel = Record<string, Primitive[]>;
