import { CoordinateComponent as CC } from '../runtime';

export type TransposeOptions = void;

export const Transpose: CC<TransposeOptions> = () => {
  return [
    ['transpose'],
    ['translate', 0.5, 0.5],
    ['reflect.x'],
    ['translate', -0.5, -0.5],
  ];
};

Transpose.props = {};
