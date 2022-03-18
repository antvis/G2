import { EncodeOptions, EncodeComponent } from '../runtime/types/component';
import { ConstantOptions, FieldOptions, TransformOptions } from '../encode';

export type Encode = ConstantEncode | FieldEncode | TransformEncode;

export type EncodeTypes = 'constant' | 'field' | 'transform';

export type BaseEncode<T extends EncodeTypes, O extends EncodeOptions> =
  | O['value']
  | ({ type?: T | EncodeComponent } & O);

export type ConstantEncode = BaseEncode<'constant', ConstantOptions>;
export type FieldEncode = BaseEncode<'field', FieldOptions>;
export type TransformEncode = BaseEncode<'transform', TransformOptions>;
