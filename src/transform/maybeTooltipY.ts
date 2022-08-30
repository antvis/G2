import { TransformComponent as TC } from '../runtime';
import { MaybeTooltip } from './maybeTooltip';

export type MaybeTooltipYOptions = Record<string, never>;

/**
 * Infer tooltip channel from y-position channel.
 */
export const MaybeTooltipY: TC<MaybeTooltipYOptions> = () => {
  return MaybeTooltip({ channel: 'y' });
};

MaybeTooltipY.props = {};
