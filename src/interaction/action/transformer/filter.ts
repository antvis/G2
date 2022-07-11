import { ActionComponent as AC } from '../../types';
import { FilterAction } from '../../../spec';

export type FilterOptions = Omit<FilterAction, 'type'>;

/**
 * @todo filterBy `x` and `y`, now is only compare `x`
 */
export const Filter: AC<FilterOptions> = (options) => {
  const { reset } = options;
  return (context) => {
    const { shared, scale, options: plotOptions } = context;

    const { selectedElements } = shared;

    if (!shared.originTransform) {
      shared.originTransform = plotOptions.marks[0].transform || [];
    }

    const { x: scaleX } = scale;
    const isBandScale = !!scaleX.getBandWidth;

    // [todo] get original `x` value by other method.
    const data = selectedElements.map((element) => element.__data__.title);
    const min = Math.min.apply(null, data);
    const max = Math.max.apply(null, data);

    const getUpdatedOptions = () => {
      if (reset) {
        plotOptions.marks[0].transform = shared.originTransform;
      } else if (data.length > 0) {
        const transform = [...shared.originTransform];
        const { field: xField } = scaleX.getOptions();
        transform.push({
          type: 'filterBy',
          fields: [xField],
          callback: (x) =>
            isBandScale ? data.includes(x) : x >= min && x <= max,
        });

        plotOptions.marks[0].transform = transform;
      }

      return plotOptions;
    };

    shared.updatedOptions = getUpdatedOptions();

    return context;
  };
};

Filter.props = {};
