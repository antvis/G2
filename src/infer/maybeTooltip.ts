import { InferComponent as IC, InferredEncode } from '../runtime';

export type MaybeTooltipOptions = Record<string, never>;

function inferEncode(encode: InferredEncode) {
  const { y, tooltip, position } = encode;
  if (tooltip !== undefined) return encode;
  if (y !== undefined) return { ...encode, tooltip: [y[0]] };
  if (position !== undefined) return { ...encode, tooltip: position };
  return encode;
}

/**
 * Produces tooltip channel for tooltip.
 * Using y channel as default tooltip channel for non-parallel coordinate,
 * using position channel for others.
 * @todo More reasonable inference such as take color channel into account.
 */
export const MaybeTooltip: IC<MaybeTooltipOptions> = () => {
  return ({ encode, transform }) => ({
    encode: inferEncode(encode),
    transform,
  });
};

MaybeTooltip.props = {};
