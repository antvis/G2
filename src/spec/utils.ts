import { Interaction } from './interaction';

export type Literal2Object<Literal extends { type?: any }> = Partial<{
  [Type in Literal['type']]: Literal extends { type?: Type }
    ? Omit<Literal, 'type'> | boolean
    : never;
}>;
