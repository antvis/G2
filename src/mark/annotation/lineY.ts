import { Vector } from '@antv/coord';
import { MarkComponent as MC, Vector2 } from '../../runtime';
import { AnnotationLineY } from '../../spec';

export type LineYOptions = Omit<AnnotationLineY, 'type'>;
export const LineY: MC<LineYOptions> = () => {
  return (index, scale, value, coordinate) => {
    const { x: X } = value;

    const P = Array.from(index, (i) => {
      const p1 = [X[i], 1] as Vector;
      const p2 = [X[i], 0] as Vector;
      return [p1, p2].map((d) => coordinate.map(d)) as Vector2[];
    });

    return [index, P];
  };
};

LineY.props = {
  defaultShape: 'annotation.line',
  channels: [
    { name: 'enterType' },
    { name: 'enterDelay' },
    { name: 'enterDuration' },
    { name: 'enterEasing' },
    { name: 'key', scale: 'identity' },
    { name: 'x', required: true },
    { name: 'shape' },
<<<<<<< HEAD
    { name: 'size' },
    { name: 'color' },
=======
>>>>>>> ea25c31fa (feat(annotation): support lineX, lineY annotation)
  ],
  infer: [{ type: 'maybeTuple' }],
  shapes: ['annotation.line'],
};
