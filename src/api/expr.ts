import { compile } from '@antv/expr';

function compileExpression(expr: string) {
  if (!expr) return expr;
  const evaluator = compile(expr);

  return (...args) => {
    const paramNames = Array.from({ length: args.length }, (_, i) =>
      String.fromCharCode(97 + i),
    );

    const namedParams = Object.fromEntries(
      args.map((value, index) => [paramNames[index], value]),
    );

    // global is used to overview what can i get in props
    return evaluator({
      ...namedParams,
      global: { ...namedParams },
    });
  };
}

export function parseOptionsValueExpr(
  value: any,
  hash = new WeakMap<Record<any, any>, Record<any, any>>(),
): any {
  if (
    typeof value === 'string' &&
    value.trim() &&
    value.startsWith('{') &&
    value.endsWith('}')
  ) {
    return compileExpression(value.slice(1, -1));
  }

  if (value instanceof Date || value instanceof RegExp) {
    return value;
  }

  if (!value || typeof value !== 'object') {
    return value;
  }

  if (hash.has(value)) {
    return hash.get(value);
  }

  const parsedOptions = Array.isArray(value) ? [] : {};

  hash.set(value, parsedOptions);

  if (Array.isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      parsedOptions[i] = parseOptionsValueExpr(value[i], hash);
    }
  } else if (value && typeof value === 'object') {
    for (const key in value) {
      if (
        // Use `Object.hasOwn` if available. Keep compatibility with old versions.
        Object.hasOwn
          ? Object.hasOwn(value, key)
          : Object.prototype.hasOwnProperty.call(value, key)
      ) {
        parsedOptions[key] = parseOptionsValueExpr((value as any)[key], hash);
      }
    }
  }

  return parsedOptions;
}

export function parseOptionsExpr(options: any) {
  const whiteList = [
    'attr',
    'encode',
    'transform',
    'scale',
    'interaction',
    'labels',
    'animate',
    'coordinate',
    'axis',
    'legend',
    'slider',
    'scrollbar',
    'state',
    'tooltip',
  ];

  if (!options) return;

  for (const key of whiteList) {
    if (options[key] === undefined) continue;

    options[key] = parseOptionsValueExpr(options[key]);
  }
}

export function parseChildrenExprWithRecursion(children: any[]) {
  for (const child of children) {
    parseOptionsExpr(child);
    if (child?.children && Array.isArray(child.children)) {
      parseChildrenExprWithRecursion(child.children);
    }
  }
}
