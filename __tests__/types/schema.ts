import type { G2Spec } from '../../src';
import { suggestSchemaFixes, validate } from '../../src/schema';

type RootExports = typeof import('../../src');
type HasValidate = 'validate' extends keyof RootExports ? true : false;
const hasValidate: HasValidate = false;

const result = validate({
  type: 'line',
  data: [{ time: '2025-01-01', value: 10 }],
  encode: { x: 'time', y: 'value' },
});

if (result.ok) {
  const spec: G2Spec = result.value;
  void spec;
} else {
  result.diagnostics.forEach((diagnostic) => {
    const keyword: string = diagnostic.keyword;
    const path: string = diagnostic.path;
    void keyword;
    void path;
  });
}

suggestSchemaFixes({ type: 'intervel' }).forEach((suggestion) => {
  const path: string = suggestion.path;
  const patch = suggestion.patch;
  void path;
  void patch;
});

void hasValidate;
