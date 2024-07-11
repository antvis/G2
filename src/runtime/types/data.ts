import { G2Context } from './options';

export type DataOptions = Record<string, any>;

export type DataProps = Record<string, never>;

export type DataComponent<O extends DataOptions = DataOptions> = {
  (options?: O, context?: G2Context): Data;
  props: DataProps;
};

export type Data = (data: any) => any | Promise<any>;
