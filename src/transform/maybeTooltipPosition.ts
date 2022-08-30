import { TransformComponent as TC } from '../runtime';
import { MaybeTooltip } from './maybeTooltip';

export type MaybeTooltipPositionOptions = Record<string, never>;

/**
 * Infer tooltip channel from position channel.
 * This is useful for parallel coordinates.
 */
export const MaybeTooltipPosition: TC<MaybeTooltipPositionOptions> = () => {
  return MaybeTooltip({ channel: 'position' });
};

MaybeTooltipPosition.props = {};
