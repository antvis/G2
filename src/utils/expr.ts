import { compile } from '@antv/expr';
import { mapValues } from '@antv/util';
import { lru } from './lru';

// Whitelist of properties that can contain expressions.
export const EXPR_WHITE_LIST = ['style', 'encode', 'labels', 'children'];

/**
 * Compiles an expression string into a function.
 * @param expr Expression string to compile.
 * @returns Compiled function or original string if empty.
 */
const compileExpression = lru(
  (expr: string): (() => any) | string => {
    const evaluator = compile(expr);

    return (...args) => {
      const paramNames = Array.from({ length: args.length }, (_, i) =>
        String.fromCharCode(97 + i),
      );

      const namedParams = Object.fromEntries(
        args.map((value, index) => [paramNames[index], value]),
      );

      // global is used to overview what can i get in props.
      return evaluator({
        ...namedParams,
        global: { ...namedParams },
      });
    };
  },
  (expr) => expr,
  128,
);

/**
 * Processes options object to convert expressions to functions.
 * @param options Options object to process.
 * @param isSpecRoot Whether the options is the root of the spec.
 * @returns Processed options object with expressions converted to functions.
 */
export function parseOptionsExpr(options: any, isSpecRoot = true): any {
  if (Array.isArray(options)) {
    return options.map((_, i) => parseOptionsExpr(options[i], isSpecRoot));
  }

  if (typeof options === 'object' && options) {
    return mapValues(options, (value, key) => {
      // if options is root and the key is in the white list, parse the expression.
      if (isSpecRoot && EXPR_WHITE_LIST.includes(key)) {
        return parseOptionsExpr(value, key === 'children');
      }
      if (!isSpecRoot) {
        return parseOptionsExpr(value, false);
      }
      return value;
    });
  }

  // if options is a string and is a valid expression.
  if (typeof options === 'string') {
    const trimmed = options.trim();
    if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
      return compileExpression(trimmed.slice(1, -1));
    }
  }

  return options;
}
