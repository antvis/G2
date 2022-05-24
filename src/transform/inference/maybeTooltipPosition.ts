import { TransformComponent as TC } from '../../runtime';
import { MaybeTooltip } from './maybeTooltip';

export type MaybeTooltipPositionOptions = Record<string, never>;

/**
 * Add zero constant encode for x channel.
 * This is useful for interval geometry.
 */
export const MaybeTooltipPosition: TC<MaybeTooltipPositionOptions> = () => {
  return MaybeTooltip({ channel: 'position' });
};

MaybeTooltipPosition.props = {
  category: 'inference',
};
