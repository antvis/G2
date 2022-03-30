import { Coordinate } from '@antv/coord';
import { DisplayObject } from '@antv/g';
import { Cartesian } from '../../../src/coordinate';
import { Canvas } from '../../../src/renderer';

import {
  CoordinateTransform,
  Mark,
  Shape,
  Scale,
  ChannelValue,
  Theme,
} from '../../../src/runtime';

type Options = {
  index: number[];
  mark: Mark;
  scale?: Record<string, Scale>;
  container: string | HTMLElement;
  channel: {
    x?: number[][];
    y?: number[][];
    shape?: Shape[];
    color?: string[];
    [key: string]: ChannelValue | Shape[];
  };
  theme?: Theme;
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  transform?: CoordinateTransform[];
};

export function plot({
  index,
  mark,
  scale = {},
  channel,
  container,
  theme = {
    defaultColor: '#5B8FF9',
    defaultSize: 1,
  },
  x = 0,
  y = 0,
  width = 600,
  height = 400,
  transform = [],
}: Options): DisplayObject[] {
  const coordinate = new Coordinate({
    width,
    height,
    x,
    y,
    transformations: [...transform.flat(), Cartesian()[0]],
  });
  const shapes = mark(index, scale, channel, coordinate, theme);
  const canvas = Canvas({ width, height, container });
  for (const shape of shapes) {
    canvas.appendChild(shape);
  }
  return shapes;
}
