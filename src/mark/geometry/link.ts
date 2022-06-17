import { MarkComponent as MC } from '../../runtime';
import { LinkGeometry } from '../../spec';
import {
  baseGeometryChannels,
  basePostInference,
  basePreInference,
} from '../utils';
import { Edge } from './edge';

export type LinkOptions = Omit<LinkGeometry, 'type'>;

/**
 * Convert value for each channel to link shapes. Same with edge.
 */
export const Link: MC<LinkOptions> = (...args) => {
  return Edge(...args);
};

Link.props = {
  defaultShape: 'link',
  channels: [
    ...baseGeometryChannels(),
    { name: 'x', required: true },
    { name: 'y', required: true },
  ],
  preInference: [...basePreInference()],
  postInference: [
    ...basePostInference(),
    { type: 'maybeTitleX' },
    { type: 'maybeTooltipY' },
  ],
  shapes: ['link'],
};
