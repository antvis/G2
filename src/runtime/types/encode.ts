import { TabularData, Primitive } from './common';

export type EncodeProps = Record<string, never>;

export type EncodeOptions = {
  value?: any;
};

export type EncodeComponent<O extends EncodeOptions = EncodeOptions> = {
  (options?: O): Encode;
  props: EncodeProps;
};

export type Encode = (data: TabularData) => Primitive[];

export type EncodeSpec = NormalizedEncodeSpec | PrimitiveEncodeSpec;

export type NormalizedEncodeSpec = {
  type?: string;
  value?: any;
  [key: string]: any;
};

export type FunctionEncodeSpec = (
  value: TabularData[number],
  index: number,
  array: TabularData,
) => Primitive;

export type PrimitiveEncodeSpec = Primitive | FunctionEncodeSpec;

export type ColumnValue = {
  type: 'column';
  value: Primitive[];
  field?: string;
};
