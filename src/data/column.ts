import { DataComponent as DC } from '../runtime';
import { ColumnConnector } from '../spec';

export type ColumnOptions = Omit<ColumnConnector, 'type'>;

/**
 * Convert column-major format data to row-major format.
 * Column-major: { col1: [val1, val2, ...], col2: [val1, val2, ...] }
 * Row-major: [{ col1: val1, col2: val1, ... }, { col1: val2, col2: val2, ... }]
 */
export const Column: DC<ColumnOptions> = (options) => {
  const { value } = options;
  return () => {
    if (!value || typeof value !== 'object') {
      return value;
    }

    // Get the column names
    const columns = Object.keys(value);
    if (columns.length === 0) {
      return [];
    }

    // Get the first column's length (all columns should have the same length)
    const firstColumn = value[columns[0]];
    if (!Array.isArray(firstColumn)) {
      return value;
    }

    const rowCount = firstColumn.length;
    const rows: Record<string, any>[] = [];

    // Convert column-major to row-major
    for (let i = 0; i < rowCount; i++) {
      const row: Record<string, any> = {};
      for (const column of columns) {
        row[column] = value[column][i];
      }
      rows.push(row);
    }

    return rows;
  };
};

Column.props = {};
