import { TransformComponent as TC } from '../../runtime';
import { MaybeTooltip } from './maybeTooltip';

export type MaybeTooltipYOptions = Record<string, never>;

/**
 * Add zero constant encode for x channel.
 * This is useful for interval geometry.
 */
export const MaybeTooltipY: TC<MaybeTooltipYOptions> = () => {
  return MaybeTooltip({ channel: 'y' });
};

MaybeTooltipY.props = {
  type: 'inference',
};
