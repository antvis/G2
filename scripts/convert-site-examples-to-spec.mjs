import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import ts from 'typescript';

const ROOT = process.cwd();
const EXAMPLES = path.join(ROOT, 'site/examples');
const DOCS = path.join(ROOT, 'site/docs');
const CODE_FENCE_LANGUAGES = new Set([
  '',
  'js',
  'javascript',
  'jsx',
  'ts',
  'typescript',
  'tsx',
]);
const FUNCTIONAL_API_COMPARISON_DOCS = new Set([
  'site/docs/manual/api/index.en.md',
  'site/docs/manual/api/index.zh.md',
  'site/docs/manual/introduction/experimental-spec-api.en.md',
  'site/docs/manual/introduction/experimental-spec-api.zh.md',
  'site/docs/manual/whats-new/migration-from-g2v4.en.md',
  'site/docs/manual/whats-new/migration-from-g2v4.zh.md',
]);
const DATA_FRAGMENT_DOCS = new Set(
  [
    'custom',
    'filter',
    'fold',
    'log',
    'pick',
    'rename',
    'slice',
    'sortBy',
  ].flatMap((name) =>
    ['en', 'zh'].map(
      (locale) => `site/docs/manual/core/data/${name}.${locale}.md`,
    ),
  ),
);

const COMPOSITION_CREATORS = new Set([
  'view',
  'spaceLayer',
  'spaceFlex',
  'facetRect',
  'repeatMatrix',
  'facetCircle',
  'timingKeyframe',
  'geoView',
  'geoPath',
]);

const MARK_CREATORS = new Set([
  'mark',
  'interval',
  'rect',
  'line',
  'point',
  'text',
  'cell',
  'area',
  'link',
  'image',
  'polygon',
  'box',
  'vector',
  'lineX',
  'lineY',
  'connector',
  'range',
  'rangeX',
  'rangeY',
  'path',
  'shape',
  'density',
  'heatmap',
  'wordCloud',
  'beeswarm',
  'boxplot',
  'gauge',
  'liquid',
  'forceGraph',
  'tree',
  'pack',
  'sankey',
  'chord',
  'treemap',
  'partition',
  'axisX',
  'axisY',
  'sunburst',
  'interval3D',
  'line3D',
  'point3D',
  'surface3D',
]);

const CREATORS = new Set([...COMPOSITION_CREATORS, ...MARK_CREATORS]);
const OBJECT_PROPS = new Set([
  'encode',
  'scale',
  'style',
  'animate',
  'coordinate',
  'interaction',
  'axis',
  'legend',
  'slider',
  'scrollbar',
  'state',
  'layout',
  'theme',
  'viewStyle',
]);
const ARRAY_PROPS = new Map([
  ['transform', 'transform'],
  ['label', 'labels'],
  ['labelTransform', 'labelTransform'],
]);
const VALUE_PROPS = new Set(['data', 'title']);
const BUILDER_METHODS = new Set([
  ...CREATORS,
  ...OBJECT_PROPS,
  ...ARRAY_PROPS.keys(),
  ...VALUE_PROPS,
  'tooltip',
  'attr',
  'call',
]);
const VIEW_KEYS = new Set([
  'width',
  'height',
  'depth',
  'padding',
  'paddingLeft',
  'paddingRight',
  'paddingBottom',
  'paddingTop',
  'inset',
  'insetLeft',
  'insetRight',
  'insetTop',
  'insetBottom',
  'margin',
  'marginLeft',
  'marginRight',
  'marginTop',
  'marginBottom',
  'autoFit',
  'theme',
  'title',
  'interaction',
]);

class Scope {
  constructor(parent = null) {
    this.parent = parent;
    this.bindings = new Map();
  }

  get(name) {
    if (this.bindings.has(name)) return this.bindings.get(name);
    return this.parent?.get(name);
  }

  set(name, value) {
    this.bindings.set(name, value);
  }
}

class ObjectValue {
  constructor() {
    this.base = null;
    this.entries = new Map();
  }

  setBase(value) {
    this.base = value;
    this.entries.clear();
  }

  setEntry(key, value) {
    if (this.entries.has(key)) this.entries.delete(key);
    this.entries.set(key, value);
  }

  render(indent) {
    if (this.entries.size === 0) return this.base ?? '{}';
    const lines = [];
    if (this.base !== null) lines.push(`...(${this.base}),`);
    for (const [key, value] of this.entries) lines.push(`${key}: ${value},`);
    return block(lines, indent);
  }
}

class ArrayValue {
  constructor() {
    this.base = null;
    this.items = [];
  }

  setArray(items) {
    this.base = null;
    this.items = [...items];
  }

  setBase(value) {
    this.base = value;
    this.items = [];
  }

  append(value) {
    this.items.push(value);
  }

  render(indent) {
    if (this.base !== null && this.items.length === 0) return this.base;
    const lines = [];
    if (this.base !== null) lines.push(`...(${this.base}),`);
    for (const item of this.items) lines.push(`${item},`);
    return arrayBlock(lines, indent);
  }
}

class SpecNode {
  constructor(type, kind, chart, parent = null) {
    this.type = type;
    this.kind = kind;
    this.chart = chart;
    this.parent = parent;
    this.children = [];
    this.props = new Map();
    this.spreads = [];
  }

  setProp(name, value) {
    if (this.props.has(name)) this.props.delete(name);
    this.props.set(name, value);
  }

  objectProp(name) {
    const current = this.props.get(name);
    if (current?.kind === 'object') return current.value;
    const value = new ObjectValue();
    this.setProp(name, { kind: 'object', value });
    return value;
  }

  arrayProp(name) {
    const current = this.props.get(name);
    if (current?.kind === 'array') return current.value;
    const value = new ArrayValue();
    this.setProp(name, { kind: 'array', value });
    return value;
  }
}

class ChartModel {
  constructor(name) {
    this.name = name;
    this.root = new SpecNode("'view'", 'composition', this);
    this.normalizedRoot = null;
    this.edits = [];
    this.unsupported = [];
    this.comments = [];
  }
}

function block(lines, indent) {
  const inner = ' '.repeat(indent + 2);
  const outer = ' '.repeat(indent);
  return `{\n${lines.map((line) => `${inner}${line}`).join('\n')}\n${outer}}`;
}

function arrayBlock(lines, indent) {
  const inner = ' '.repeat(indent + 2);
  const outer = ' '.repeat(indent);
  return `[\n${lines.map((line) => `${inner}${line}`).join('\n')}\n${outer}]`;
}

function unwrap(node) {
  let current = node;
  while (
    ts.isParenthesizedExpression(current) ||
    ts.isAsExpression(current) ||
    ts.isTypeAssertionExpression(current) ||
    ts.isNonNullExpression(current)
  ) {
    current = current.expression;
  }
  return current;
}

function flattenChain(expression) {
  const calls = [];
  let current = unwrap(expression);
  while (
    ts.isCallExpression(current) &&
    ts.isPropertyAccessExpression(current.expression)
  ) {
    calls.unshift({
      name: current.expression.name.text,
      args: [...current.arguments],
      node: current,
    });
    current = unwrap(current.expression.expression);
  }
  return { root: current, calls };
}

function isChartConstruction(node) {
  return (
    ts.isNewExpression(node) &&
    ts.isIdentifier(node.expression) &&
    node.expression.text === 'Chart'
  );
}

function raw(node, sourceFile) {
  return node.getText(sourceFile);
}

function propertyKey(node, sourceFile) {
  if (ts.isStringLiteralLike(node)) return JSON.stringify(node.text);
  if (ts.isNumericLiteral(node)) return JSON.stringify(node.text);
  return `[${raw(node, sourceFile)}]`;
}

function isStringArgument(node) {
  return (
    ts.isStringLiteralLike(node) || ts.isNoSubstitutionTemplateLiteral(node)
  );
}

function applyObjectProp(node, name, args, sourceFile) {
  const value = node.objectProp(name);
  if (args.length === 1 && !isStringArgument(args[0])) {
    value.setBase(raw(args[0], sourceFile));
    return;
  }
  if (args.length === 1) {
    value.setEntry(propertyKey(args[0], sourceFile), 'true');
    return;
  }
  value.setEntry(propertyKey(args[0], sourceFile), raw(args[1], sourceFile));
}

function applyArrayProp(node, name, args, sourceFile) {
  const value = node.arrayProp(name);
  const argument = args[0];
  if (ts.isArrayLiteralExpression(argument)) {
    value.setArray(argument.elements.map((item) => raw(item, sourceFile)));
  } else if (ts.isObjectLiteralExpression(argument)) {
    value.append(raw(argument, sourceFile));
  } else {
    value.setBase(raw(argument, sourceFile));
  }
}

function applyTooltip(node, args, sourceFile) {
  const argument = args[0];
  if (ts.isArrayLiteralExpression(argument)) {
    const value = new ObjectValue();
    value.setEntry('items', raw(argument, sourceFile));
    node.setProp('tooltip', { kind: 'object', value });
    return;
  }
  if (
    argument.kind === ts.SyntaxKind.FalseKeyword ||
    argument.kind === ts.SyntaxKind.NullKeyword
  ) {
    node.setProp('tooltip', { kind: 'raw', value: raw(argument, sourceFile) });
    return;
  }
  if (ts.isObjectLiteralExpression(argument)) {
    const hasTopLevelShape = argument.properties.some(
      (property) =>
        ts.isPropertyAssignment(property) &&
        ts.isIdentifier(property.name) &&
        (property.name.text === 'title' || property.name.text === 'items'),
    );
    if (hasTopLevelShape) {
      node.setProp('tooltip', {
        kind: 'raw',
        value: raw(argument, sourceFile),
      });
      return;
    }
  }
  let current = node.props.get('tooltip');
  if (current?.kind !== 'tooltipItems') {
    current = { kind: 'tooltipItems', items: [] };
    node.setProp('tooltip', current);
  }
  current.items.push(raw(argument, sourceFile));
}

function createChild(current, call, sourceFile) {
  const { name, args } = call;
  const type =
    name === 'mark' ? raw(args[0], sourceFile) : JSON.stringify(name);
  const kind = COMPOSITION_CREATORS.has(name) ? 'composition' : 'mark';
  const child = new SpecNode(type, kind, current.chart, current);
  current.children.push(child);
  if (args.length && name !== 'mark') {
    child.spreads.push(raw(args[0], sourceFile));
  }
  if (current === current.chart.root && kind === 'composition') {
    current.chart.normalizedRoot = child;
  }
  return child;
}

function evaluateChain(binding, calls, sourceFile) {
  let current = binding.node;
  const chart = binding.chart;
  for (let index = 0; index < calls.length; index++) {
    const call = calls[index];
    if (index > 0) {
      const previous = calls[index - 1];
      const gap = sourceFile.text.slice(
        previous.node.end,
        call.node.expression.name.getStart(sourceFile),
      );
      const comments = gap.match(/\/\/[^\n]*|\/\*[\s\S]*?\*\//g) ?? [];
      chart.comments.push(...comments.map((comment) => comment.trim()));
    }
    const { name, args } = call;
    if (CREATORS.has(name)) {
      current = createChild(current, call, sourceFile);
    } else if (OBJECT_PROPS.has(name)) {
      applyObjectProp(current, name, args, sourceFile);
    } else if (ARRAY_PROPS.has(name)) {
      applyArrayProp(current, ARRAY_PROPS.get(name), args, sourceFile);
    } else if (VALUE_PROPS.has(name)) {
      current.setProp(name, { kind: 'raw', value: raw(args[0], sourceFile) });
    } else if (name === 'tooltip') {
      applyTooltip(current, args, sourceFile);
    } else if (name === 'attr') {
      current.setProp(raw(args[0], sourceFile), {
        kind: 'raw',
        value: raw(args[1], sourceFile),
        literalKey: true,
      });
    } else if (name === 'call') {
      chart.unsupported.push({ node: call.node, reason: '.call(...)' });
      return null;
    } else {
      return null;
    }
  }
  return { chart, node: current };
}

function renderProperty(name, descriptor, indent, literalKey = false) {
  const key = literalKey ? name : name;
  if (descriptor.kind === 'raw') return `${key}: ${descriptor.value},`;
  if (descriptor.kind === 'object')
    return `${key}: ${descriptor.value.render(indent)},`;
  if (descriptor.kind === 'array')
    return `${key}: ${descriptor.value.render(indent)},`;
  if (descriptor.kind === 'tooltipItems') {
    const items = descriptor.items.map((item) => `${item},`);
    return `${key}: ${block(
      [`items: ${arrayBlock(items, indent + 2)},`],
      indent,
    )},`;
  }
  throw new Error(`Unknown descriptor kind: ${descriptor.kind}`);
}

function renderNode(node, indent = 0, extraProps = []) {
  const lines = [`type: ${node.type},`];
  for (const spread of node.spreads) lines.push(`...(${spread}),`);
  for (const [name, descriptor] of extraProps) {
    lines.push(renderProperty(name, descriptor, indent + 2));
  }
  for (const [name, descriptor] of node.props) {
    lines.push(
      renderProperty(
        descriptor.literalKey ? name : name,
        descriptor,
        indent + 2,
        descriptor.literalKey,
      ),
    );
  }
  if (node.children.length) {
    const children = node.children.map(
      (child) => `${renderNode(child, indent + 4)},`,
    );
    lines.push(`children: ${arrayBlock(children, indent + 2)},`);
  }
  return block(lines, indent);
}

function renderChartOptions(chart, indent) {
  let root = chart.root;
  let extras = [];
  if (chart.normalizedRoot && chart.root.children.length === 1) {
    root = chart.normalizedRoot;
    extras = [...chart.root.props].filter(
      ([name]) => VIEW_KEYS.has(name) && !root.props.has(name),
    );
  }
  const comments = [...new Set(chart.comments)];
  const prefix = comments.length ? `${comments.join('\n')}\n` : '';
  return `${prefix}${chart.name}.options(${renderNode(root, indent)});`;
}

function indentationAt(source, position) {
  const lineStart = source.lastIndexOf('\n', position - 1) + 1;
  return source.slice(lineStart, position).match(/^\s*/)?.[0].length ?? 0;
}

function collectFiles(inputs, docs) {
  if (inputs.length) {
    return inputs.map((input) => path.resolve(ROOT, input));
  }
  const files = [];
  const directory = docs ? DOCS : EXAMPLES;
  const visit = (directory) => {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      const absolute = path.join(directory, entry.name);
      if (entry.isDirectory()) visit(absolute);
      else if (
        entry.isFile() &&
        (docs
          ? entry.name.endsWith('.md') || entry.name.endsWith('.mdx')
          : entry.name.endsWith('.ts'))
      )
        files.push(absolute);
    }
  };
  visit(directory);
  return files.sort();
}

function transformSource(filename, source) {
  const sourceFile = ts.createSourceFile(
    filename,
    source,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS,
  );
  const charts = [];
  const unsupported = [];

  function visitStatements(statements, scope) {
    for (const statement of statements) {
      if (ts.isVariableStatement(statement)) {
        if (statement.declarationList.declarations.length !== 1) {
          visitChildren(statement, scope);
          continue;
        }
        const declaration = statement.declarationList.declarations[0];
        if (!ts.isIdentifier(declaration.name) || !declaration.initializer) {
          visitChildren(statement, scope);
          continue;
        }
        if (isChartConstruction(declaration.initializer)) {
          const chart = new ChartModel(declaration.name.text);
          charts.push(chart);
          scope.set(declaration.name.text, { chart, node: chart.root });
          continue;
        }
        const { root, calls } = flattenChain(declaration.initializer);
        const binding = ts.isIdentifier(root) ? scope.get(root.text) : null;
        if (
          binding &&
          calls.length &&
          calls.every((call) => BUILDER_METHODS.has(call.name))
        ) {
          const result = evaluateChain(binding, calls, sourceFile);
          if (result) {
            scope.set(declaration.name.text, result);
            result.chart.edits.push(statement);
            continue;
          }
        }
        visitChildren(statement, scope);
        continue;
      }

      if (ts.isExpressionStatement(statement)) {
        const { root, calls } = flattenChain(statement.expression);
        const binding = ts.isIdentifier(root) ? scope.get(root.text) : null;
        if (
          binding &&
          calls.length &&
          calls.every((call) => BUILDER_METHODS.has(call.name))
        ) {
          const result = evaluateChain(binding, calls, sourceFile);
          if (result) {
            result.chart.edits.push(statement);
            continue;
          }
        }
      }

      visitChildren(statement, scope);
    }
  }

  function visitChildren(node, scope) {
    if (ts.isBlock(node) || ts.isSourceFile(node)) {
      visitStatements(node.statements, new Scope(scope));
      return;
    }
    if (
      ts.isFunctionDeclaration(node) ||
      ts.isFunctionExpression(node) ||
      ts.isArrowFunction(node) ||
      ts.isMethodDeclaration(node)
    ) {
      if (node.body && ts.isBlock(node.body)) {
        visitStatements(node.body.statements, new Scope(scope));
      }
      return;
    }
    if (ts.isForOfStatement(node) || ts.isForStatement(node)) {
      const text = raw(node, sourceFile);
      if ([...CREATORS].some((name) => text.includes(`.${name}(`))) {
        unsupported.push({ node, reason: 'dynamic loop' });
        return;
      }
    }
    ts.forEachChild(node, (child) => visitChildren(child, scope));
  }

  visitStatements(sourceFile.statements, new Scope());

  for (const chart of charts) unsupported.push(...chart.unsupported);
  if (unsupported.length) {
    return {
      changed: false,
      source,
      unsupported: unsupported.map(({ node, reason }) => ({
        reason,
        line:
          sourceFile.getLineAndCharacterOfPosition(node.getStart()).line + 1,
      })),
    };
  }

  const replacements = [];
  for (const chart of charts) {
    if (!chart.edits.length) continue;
    const ordered = [...new Set(chart.edits)].sort(
      (a, b) => a.getStart() - b.getStart(),
    );
    const last = ordered.pop();
    const indent = indentationAt(source, last.getStart());
    replacements.push({
      start: last.getStart(),
      end: last.end,
      text: renderChartOptions(chart, indent),
    });
    for (const statement of ordered) {
      replacements.push({
        start: statement.getStart(),
        end: statement.end,
        text: '',
      });
    }
  }

  if (!replacements.length) return { changed: false, source, unsupported: [] };
  replacements.sort((a, b) => b.start - a.start);
  let output = source;
  for (const replacement of replacements) {
    output =
      output.slice(0, replacement.start) +
      replacement.text +
      output.slice(replacement.end);
  }
  return { changed: output !== source, source: output, unsupported: [] };
}

function markdownLineAt(source, position) {
  return source.slice(0, position).split('\n').length;
}

function hasChartBuilderCall(source) {
  return [...BUILDER_METHODS].some((name) =>
    new RegExp(`\\bchart\\.${name}\\s*\\(`).test(source),
  );
}

function transformFragment(filename, source) {
  const prelude = 'const chart = new Chart();\n';
  const result = transformSource(filename, `${prelude}${source}`);
  if (result.unsupported.length || !result.changed) return result;
  if (!result.source.startsWith(prelude)) {
    return {
      changed: false,
      source,
      unsupported: [{ line: 1, reason: 'fragment prelude was modified' }],
    };
  }
  return {
    changed: true,
    source: result.source.slice(prelude.length),
    unsupported: [],
  };
}

function transformMarkdown(filename, source) {
  const relative = path.relative(ROOT, filename);
  if (FUNCTIONAL_API_COMPARISON_DOCS.has(relative)) {
    return { changed: false, source, unsupported: [] };
  }

  const fence = /^(```+|~~~+)([^\n]*)\n([\s\S]*?)^\1\s*$/gm;
  const replacements = [];
  const unsupported = [];
  let match;

  while ((match = fence.exec(source))) {
    const info = match[2].trim();
    const language = info.split(/[\s|]/)[0] ?? '';
    if (!CODE_FENCE_LANGUAGES.has(language)) continue;

    const code = match[3];
    const fullExample = /\bnew\s+Chart\b/.test(code);
    const fragmentExample = DATA_FRAGMENT_DOCS.has(relative);
    if (!fullExample && !fragmentExample) continue;
    if (!hasChartBuilderCall(code)) continue;

    const blockLine = markdownLineAt(source, match.index);
    if (/\bchart\.options\s*\(/.test(code)) {
      const functionalLine = code
        .split('\n')
        .findIndex((line) =>
          [...BUILDER_METHODS].some((name) => line.includes(`chart.${name}(`)),
        );
      if (functionalLine !== -1) {
        unsupported.push({
          line: blockLine + functionalLine + 1,
          reason: 'mixed Functional API and Spec',
        });
      }
      continue;
    }

    const result = fullExample
      ? transformSource(filename, code)
      : transformFragment(filename, code);
    if (result.unsupported.length) {
      unsupported.push(
        ...result.unsupported.map(({ line, reason }) => ({
          line: blockLine + line,
          reason,
        })),
      );
      continue;
    }
    if (!result.changed) continue;

    const codeStart = match.index + match[0].indexOf(code);
    replacements.push({
      start: codeStart,
      end: codeStart + code.length,
      text: result.source,
    });
  }

  replacements.sort((a, b) => b.start - a.start);
  let output = source;
  for (const replacement of replacements) {
    output =
      output.slice(0, replacement.start) +
      replacement.text +
      output.slice(replacement.end);
  }
  return { changed: output !== source, source: output, unsupported };
}

function transformFile(filename) {
  const source = fs.readFileSync(filename, 'utf8');
  if (/\.mdx?$/.test(filename)) return transformMarkdown(filename, source);
  return transformSource(filename, source);
}

const args = process.argv.slice(2);
const write = args.includes('--write');
const docs = args.includes('--docs');
const inputs = args.filter((arg) => arg !== '--write' && arg !== '--docs');
const files = collectFiles(inputs, docs);
const changed = [];
const unsupported = [];

for (const filename of files) {
  const result = transformFile(filename);
  const relative = path.relative(ROOT, filename);
  if (result.unsupported.length) {
    unsupported.push({ file: relative, issues: result.unsupported });
    continue;
  }
  if (!result.changed) continue;
  changed.push(relative);
  if (write) fs.writeFileSync(filename, result.source);
}

console.log(
  `${write ? 'Converted' : 'Would convert'} ${changed.length} files.`,
);
for (const file of changed) console.log(file);
if (unsupported.length) {
  console.log(`Unsupported ${unsupported.length} files:`);
  for (const { file, issues } of unsupported) {
    console.log(
      `${file}: ${issues
        .map(({ line, reason }) => `${line} (${reason})`)
        .join(', ')}`,
    );
  }
}
