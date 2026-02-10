import { DataTransform } from './dataTransform';

export type Data = FetchConnector | InlineConnector | ColumnConnector;

export type DataTypes = 'inline' | 'fetch' | 'column';

export type FetchConnector = {
  type?: 'fetch';
  value?: string;
  format?: 'json' | 'csv';
  // Useful when format is 'csv'.
  delimiter?: string;
  /** Automatically infer the data to Javascript type  */
  autoType?: boolean;
  transform?: DataTransform[];
};

export type InlineConnector =
  | {
      type?: 'inline';
      value?: any;
      transform?: DataTransform[];
    }
  | any;

export type ColumnConnector = {
  type?: 'column';
  value?: Record<string, any[]>;
  transform?: DataTransform[];
};
