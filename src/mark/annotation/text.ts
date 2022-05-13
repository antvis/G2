import { MarkComponent as MC } from '../../runtime';
import { AnnotationText as AnnotationTextProps } from '../../spec';
import { Text } from '../geometry/text';

export type AnnotationTextOptions = Omit<AnnotationTextProps, 'type'>;
export const AnnotationText: MC<AnnotationTextOptions> = () => {
  return Text();
};

AnnotationText.props = {
  ...Text.props,
  defaultShape: 'annotation.text',
  shapes: ['annotation.text', 'annotation.badge'],
};
