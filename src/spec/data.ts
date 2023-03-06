import { DataTransform } from './dataTransform';

export type Data = FetchConnector | InlineConnector;

export type DataTypes = 'inline' | 'fetch';

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
