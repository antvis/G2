import { Band, Linear } from '@antv/scale';
import { AnnotationText } from '../../../../src/mark/annotation';
import { plot } from '../../geometry/helper';

describe('Annotation Text', () => {
  it('Text should has expected props', () => {
    expect(AnnotationText.props).toEqual({
      defaultShape: 'annotation.text',
      channels: [
        { name: 'color' },
        { name: 'shape' },
        { name: 'enterType' },
        { name: 'enterDelay' },
        { name: 'enterDuration' },
        { name: 'enterEasing' },
        { name: 'key', scale: 'identity' },
        { name: 'title', scale: 'identity' },
        { name: 'tooltip', scale: 'identity' },
        { name: 'x', required: true },
        { name: 'y', required: true },
        { name: 'text', required: true, scale: 'identity' },
        { name: 'fontSize' },
        { name: 'rotate' },
      ],
      infer: [
        { type: 'maybeTuple' },
        { type: 'maybeKey' },
        { type: 'maybeTitle' },
        { type: 'maybeTooltip' },
      ],
      shapes: ['annotation.text'],
    });
  });

  it('Text should transform values into points of anchor of text', () => {
    const [I, P] = plot({
      mark: AnnotationText({}),
      index: [0, 1, 2],
      channel: {
        x: [[0.2], [0.4], [0.6]],
        y: [[0.5], [0.2], [0.4]],
        text: ['a', 'b', 'c'],
      },
    });

    expect(I).toEqual([0, 1, 2]);
    expect(P).toEqual([[[120, 200]], [[240, 80]], [[360, 160]]]);
  });

  it('Text should skip non-band scale for x channel', () => {
    const [I, P] = plot({
      mark: AnnotationText({}),
      index: [0, 1, 2],
      scale: {
        x: new Linear({}),
      },
      channel: {
        x: [[0.2], [0.4], [0.6]],
        y: [[0.5], [0.2], [0.4]],
        text: ['a', 'b', 'c'],
      },
    });

    expect(I).toEqual([0, 1, 2]);
    expect(P).toEqual([[[120, 200]], [[240, 80]], [[360, 160]]]);
  });

  it('Text should apply offset X for band scale', () => {
    const [I, P] = plot({
      mark: AnnotationText({}),
      index: [0, 1, 2],
      scale: {
        x: new Band({ domain: ['a', 'b', 'c'], range: [0, 1] }),
      },
      channel: {
        x: [[0.2], [0.4], [0.6]],
        y: [[0.5], [0.2], [0.4]],
        text: ['a', 'b', 'c'],
      },
    });

    expect(I).toEqual([0, 1, 2]);
    expect(P).toEqual([
      [[220.00000000000003, 200]],
      [[340, 80]],
      [[459.99999999999994, 160]],
    ]);
  });
});
