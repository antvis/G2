export type DataOptions = Record<string, any>;

export type DataProps = Record<string, never>;

export type DataComponent<O extends DataOptions = DataOptions> = {
  (options?: O): Data;
  props: DataProps;
};

export type Data = (data: any) => any | Promise<any>;
