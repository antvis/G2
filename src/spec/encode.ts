import { EncodeComponent, Primitive } from '../runtime';

export type Encode =
  | ConstantEncode
  | FieldEncode
  | TransformEncode
  | ConstantEncode['value']
  | FieldEncode['value']
  | TransformEncode['value'];

export type EncodeTypes = 'constant' | 'field' | 'transform' | EncodeComponent;

export type ConstantEncode = {
  type?: 'constant';
  value?: any;
};

export type FieldEncode = {
  type?: 'field';
  value: string;
};

export type TransformEncode = {
  type?: 'transform';
  value?: (
    value: Record<string, Primitive>,
    index: number,
    array: Record<string, Primitive>[],
  ) => Primitive;
};

export type CustomEncode = {
  type?: EncodeComponent;
  [key: string]: any;
};
