import { InferComponent as IC } from 'runtime';

export type MaybeStackYOptions = void;

export const MaybeStackY: IC<MaybeStackYOptions> = () => {
  return (encodings) => {
    const { color } = encodings;
    if (Array.isArray(color) || color instanceof Date) return encodings;
    // Assume color channel grouping data into series if it is a field channel.
    if (typeof color === 'object' && color.type === 'field') {
      return {
        ...encodings,
        // $statistic is a special key which can't be specified by users.
        // It is only for inferring statistic.
        $statistic: [{ type: 'stackY' }],
      };
    }
    return encodings;
  };
};

MaybeStackY.props = {};
