import { InferComponent as IC, InferredEncode } from '../runtime';

export type MaybeSizeOptions = Record<string, never>;

function constant(value: any) {
  return { type: 'constant', value };
}

function inferEncode({ size = constant(3), ...rest }: InferredEncode) {
  return { size, ...rest };
}

/**
 * Add const size encode.
 * This is useful for point geometry.
 */
export const MaybeSize: IC<MaybeSizeOptions> = () => {
  return ({ encode, transform }) => ({
    encode: inferEncode(encode),
    transform,
  });
};

MaybeSize.props = {};
