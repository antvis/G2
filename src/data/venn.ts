import { DataComponent as DC } from '../runtime';
import { VennDataTransform } from '../spec';
import { intersectionAreaPath, scaleSolution, venn } from './utils/venn';

export type VennOptions = Omit<VennDataTransform, 'type'>;

type VennData = {
  key?: string;
  sets: string[];
  size: number;
};

/**
 * Layout venn data, get the path string for each set.
 */
export const Venn: DC<VennOptions> = (options) => {
  const {
    sets = 'sets',
    size = 'size',
    as = ['key', 'path'],
    padding = 0,
  } = options;
  const [key, path] = as;
  return (data) => {
    // Transform the data, venn layout use `sets` and `size` field.
    // Sort data, avoid data occlusion.
    const vennData: VennData[] = data
      .map((d) => ({
        ...d,
        sets: d[sets],
        size: d[size],
        [key]: d.sets.join('&'),
      }))
      .sort((a, b) => a.sets.length - b.sets.length);

    // Layout venn data.
    const solution = venn(vennData);

    let circles;

    return vennData.map((datum) => {
      const setsValue = datum[sets];
      const pathFunc = ({ width, height }) => {
        circles = circles
          ? circles
          : scaleSolution(solution, width, height, padding);
        const setCircles = setsValue.map((set) => circles[set]);
        return intersectionAreaPath(setCircles);
      };

      return { ...datum, [path]: pathFunc };
    });
  };
};

Venn.props = {};
