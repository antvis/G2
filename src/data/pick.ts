import { DataComponent as DC } from '../runtime';
import { PickTransform } from '../spec';

export type PickOptions = Omit<PickTransform, 'type'>;

function pick(v: any, fields: string[] = []) {
  return fields.reduce((datum, field) => {
    // Pick the data deeply.
    if (field in v) {
      datum[field] = v[field];
    }
    return datum;
  }, {});
}

/**
 * Immutable data pick by specified fields.
 */
export const Pick: DC<PickOptions> = (options) => {
  const { fields } = options;
  return (data) => data.map((d) => pick(d, fields));
};

Pick.props = {};
