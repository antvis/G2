import { G2Spec } from '../spec';
import { G2Library } from '../runtime';
import { Runtime, RuntimeOptions } from './runtime';
import { MarkOf, CompositionOf as Of } from './types';
import { MarkNode } from './mark';
import { CompositionNode } from './composition';

type BuiltinComposition = {
  'composition.mark': any;
  'composition.view': any;
};

export type CompositionOf<Library> = Of<
  Library,
  (composite?) => CompositionAPI<Library>
>;

export type CompositionAPI<Library> = CompositionNode<
  CompositionOf<Library> & MarkOf<Library, (composite?) => MarkNode>
> &
  MarkOf<Library, (composite?) => MarkNode> &
  CompositionOf<Library>;

export type API<Spec, Library> = Runtime<Spec> &
  MarkOf<Library, (composite?) => MarkNode> &
  CompositionOf<Library & BuiltinComposition>;

export function extend<
  Spec extends G2Spec = G2Spec,
  Library extends G2Library = G2Library,
>(
  Runtime: new (options: RuntimeOptions) => Runtime<Spec>,
  library: Library,
): new (options?: RuntimeOptions) => API<Spec, Library> {
  class Chart extends Runtime {
    constructor(options: Omit<RuntimeOptions, 'lib'>) {
      super({ ...options, lib: library });
    }
  }
  return Chart as any;
}
