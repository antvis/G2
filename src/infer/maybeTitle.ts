import { InferComponent as IC, InferredEncode } from '../runtime';

export type MaybeTitleOptions = Record<string, never>;

function inferEncode(encode: InferredEncode) {
  const { x, title } = encode;
  if (title !== undefined) return encode;
  if (x !== undefined) return { ...encode, title: x[0] };
  return encode;
}

/**
 * Produce title channel for tooltip.
 * Using x channel as default tooltip channel.
 */
export const MaybeTitle: IC<MaybeTitleOptions> = () => {
  return ({ encode, transform }) => ({
    encode: inferEncode(encode),
    transform,
  });
};

MaybeTitle.props = {};
