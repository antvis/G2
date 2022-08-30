import { DataComponent as DC } from '../runtime';
import { InlineConnector } from '../spec';

export type InlineOptions = Omit<InlineConnector, 'type'>;

export const Inline: DC<InlineOptions> = (options) => {
  const { value } = options;
  return () => value;
};

Inline.props = {};
