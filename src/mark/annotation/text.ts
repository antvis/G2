import { MarkComponent as MC } from '../../runtime';
import { AnnotationText as AnnotationTextProps } from '../../spec';
import {
  basePostInference,
  baseAnnotationChannels,
  basePreInference,
} from '../utils';
import { Text } from '../geometry/text';

export type AnnotationTextOptions = Omit<AnnotationTextProps, 'type'>;

export const AnnotationText: MC<AnnotationTextOptions> = () => {
  return Text();
};

AnnotationText.props = {
  defaultShape: 'annotation.text',
  defaultLabelShape: 'label',
  channels: [
    ...baseAnnotationChannels(),
    { name: 'x', required: true },
    { name: 'y', required: true },
    { name: 'text', required: true, scale: 'identity' },
    { name: 'fontSize' },
    { name: 'rotate' },
  ],
  preInference: [...basePreInference()],
  postInference: [...basePostInference()],
  shapes: ['annotation.text', 'annotation.badge'],
};
