import { ColumnValue, NormalizedEncodeSpec } from './encode';
import { G2Library, G2Mark } from './options';

export type TransformContext = {
  library: G2Library;
};

export type TransformOptions = Record<string, any>;

export type TransformProps = Record<string, never>;

export type TransformComponent<O extends TransformOptions = TransformOptions> =
  {
    (options: O): Transform;
    props?: TransformProps;
  };

export type Transform = (
  I: number[],
  mark: G2Mark,
  context: TransformContext,
) => [number[], G2Mark] | Promise<[number[], G2Mark]>;

export type TransformSpec = {
  type?: string | TransformComponent;
  [key: string]: any;
};

export type ColumnOf = (data: any, encode: NormalizedEncodeSpec) => ColumnValue;
