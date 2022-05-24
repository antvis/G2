import { TransformComponent as TC } from '../../runtime';
import { merge, column, field } from '../utils/helper';

export type MaybeArrayFieldOptions = Record<string, never>;

/**
 * Add zero constant encode for x channel.
 * This is useful for interval geometry.
 * @todo Take more channels into account.
 */
export const MaybeArrayField: TC<MaybeArrayFieldOptions> = () => {
  return merge(({ encode, columnOf, data, I }) => {
    const columns = Object.entries(encode)
      .filter(([key]) => {
        return (
          key.startsWith('x') ||
          key.startsWith('y') ||
          key.startsWith('position')
        );
      })
      .map(([key, value]) => [key, column(columnOf(data, value))] as const);

    const arrayColumns = columns
      .filter(([, value]) => {
        const { value: V } = value;
        return Array.isArray(V[0]);
      })
      .flatMap(([key, value]) => {
        const columns = [[key, new Array(I.length).fill(undefined)] as const];
        const { value: rows } = value;
        for (let i = 0; i < rows.length; i++) {
          const row = rows[i];
          if (Array.isArray(row)) {
            for (let j = 0; j < row.length; j++) {
              const column = columns[j] || [
                `${key}${j}`,
                new Array(I).fill(undefined),
              ];
              column[1][i] = row[j];
              columns[j] = column;
            }
          }
        }
        return columns.map(([k, v]) => [k, column(field(v, rows))]);
      });

    return {
      encode: Object.fromEntries([...columns, ...arrayColumns]),
    };
  });
};

MaybeArrayField.props = {
  type: 'inference',
};
