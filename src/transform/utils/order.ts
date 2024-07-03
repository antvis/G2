import { group, ascending, maxIndex, Primitive } from 'd3-array';
import { defined } from '../../utils/helper';
import { TabularData, G2Mark } from '../../runtime';
import { indexOf } from '../../utils/array';
import { columnOf } from './helper';

export type IndexComparatorFactory = (
  data: TabularData,
  Y: Primitive[],
  S: Primitive[],
) => IndexComparator;

export type IndexComparator = (i: number, j: number) => number;

export type Order =
  | 'value'
  | 'sum'
  | 'series'
  | 'maxIndex'
  | string[]
  | ((data: Record<string, Primitive>) => Primitive);

export function createGroups(
  groupBy: string | string[],
  I: number[],
  mark: G2Mark,
): number[][] {
  const { encode } = mark;
  if (groupBy === null) return [I];
  const G = normalizeGroupBy(groupBy)
    .map((k) => [k, columnOf(encode, k)?.[0]] as const)
    .filter(([, column]) => defined(column));
  const key = (i: number) => G.map(([, V]) => V[i]).join('-');
  return Array.from(group(I, key).values());
}

export function normalizeComparator(
  order: Order,
): IndexComparatorFactory | null {
  if (Array.isArray(order)) return createFieldsOrder(order);
  if (typeof order === 'function') return createFunctionOrder(order);
  if (order === 'series') return createSeriesOrder;
  if (order === 'value') return createValueOrder;
  if (order === 'sum') return createSumOrder;
  if (order === 'maxIndex') return createMaxIndexOrder;
  return null;
}

export function applyOrder(groups: number[][], comparator: IndexComparator) {
  for (const group of groups) {
    group.sort(comparator);
  }
}

export function domainOf(value: Primitive[], scale: Record<string, any>) {
  return scale?.domain || Array.from(new Set(value));
}

function normalizeGroupBy(groupBy: string | string[]): string[] {
  if (Array.isArray(groupBy)) return groupBy;
  return [groupBy];
}

function createSeriesOrder(
  data: TabularData,
  Y: Primitive[],
  S: Primitive[],
): IndexComparator {
  return ascendingComparator((i: number) => S[i]);
}

function createFunctionOrder(
  order: (data: Record<string, Primitive>) => Primitive,
): IndexComparatorFactory {
  return (data, Y, S) => {
    return ascendingComparator((i) => order(data[i]));
  };
}

function createFieldsOrder(order: string[]): IndexComparatorFactory {
  return (data, Y, S) => {
    return (i, j) =>
      order.reduce(
        (eq, f) => (eq !== 0 ? eq : ascending(data[i][f], data[j][f])),
        0,
      );
  };
}

function createValueOrder(
  data: TabularData,
  Y: Primitive[],
  S: Primitive[],
): IndexComparator {
  return ascendingComparator((i: number) => Y[i]);
}

function createSumOrder(
  data: TabularData,
  Y: Primitive[],
  S: Primitive[],
): IndexComparator {
  const I = indexOf(data);
  const groups = Array.from(group(I, (i) => S[+i]).entries());
  const seriesSum = new Map(
    groups.map(([k, GI]) => [k, GI.reduce((s, i) => s + +Y[i])] as const),
  );
  return ascendingComparator((i: number) => seriesSum.get(S[i]));
}

function createMaxIndexOrder(
  data: TabularData,
  Y: Primitive[],
  S: Primitive[],
): IndexComparator {
  const I = indexOf(data);
  const groups = Array.from(group(I, (i) => S[+i]).entries());
  const seriesMaxIndex = new Map(
    groups.map(([k, GI]) => [k, maxIndex(GI, (i) => Y[i])] as const),
  );
  return ascendingComparator((i: number) => seriesMaxIndex.get(S[i]));
}

function ascendingComparator(order: (i: number) => any): IndexComparator {
  return (i, j) => ascending(order(i), order(j));
}
