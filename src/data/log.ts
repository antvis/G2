import { DataComponent as DC } from '../runtime';
import { LogDataTransform } from '../spec';

export type LogDataOptions = Omit<LogDataTransform, 'type'>;

/**
 * Console.log the data section for dev debugger.
 */
export const Log: DC<LogDataOptions> = () => {
  return (data) => {
    console.log('G2 data section:', data);
    return data;
  };
};

Log.props = {};
