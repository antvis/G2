import { CompositionComponent as CC } from '../runtime';
import { FlexComposition } from '../spec';

export type FlexOptions = Omit<FlexComposition, 'type'>;

export const Flex: CC<FlexOptions> = () => {
  return (options) => {
    const {
      direction = 'row',
      children = [],
      flex = children.map(() => 1),
      padding = 0,
      data: flexData,
    } = options;
    const [mainStart, mainSize, crossSize, crossStart] =
      direction === 'col'
        ? ['y', 'height', 'width', 'x']
        : ['x', 'width', 'height', 'y'];

    const sum = flex.reduce((total, value) => total + value);
    const totalSize = options[mainSize] - padding * (children.length - 1);
    const sizes = flex.map((value) => totalSize * (value / sum));

    const newChildren = [];
    let next = options[mainStart] || 0;
    for (let i = 0; i < sizes.length; i += 1) {
      const { data = flexData, ...rest } = children[i];
      newChildren.push({
        [mainStart]: next,
        [mainSize]: sizes[i],
        [crossStart]: options[crossStart] || 0,
        [crossSize]: options[crossSize],
        data,
        ...rest,
      });
      next += sizes[i] + padding;
    }
    return newChildren;
  };
};

Flex.props = {};
