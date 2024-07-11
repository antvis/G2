import { TransformContext } from './transform';

export type DataOptions = Record<string, any>;

export type DataProps = Record<string, never>;

export type DataComponent<O extends DataOptions = DataOptions> = {
  (options?: O, context?: TransformContext): Data;
  props: DataProps;
};

export type Data = (data: any) => any | Promise<any>;
