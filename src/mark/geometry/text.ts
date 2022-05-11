import { MarkComponent as MC } from '../../runtime';
import { baseChannels, baseInference } from '../common/utils';
import { PointMark } from '../common/text';
import { TextGeometry } from '../../spec';

export type TextOptions = Omit<TextGeometry, 'type'>;
export const Text: MC<TextOptions> = () => PointMark;

Text.props = {
  defaultShape: 'text',
  channels: [
    ...baseChannels(),
    { name: 'x', required: true },
    { name: 'y', required: true },
    { name: 'text', required: true, scale: 'identity' },
    { name: 'fontSize' },
    { name: 'rotate' },
  ],
  infer: [...baseInference()],
  shapes: ['text'],
};
