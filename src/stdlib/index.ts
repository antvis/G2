import { G2Library } from '../runtime';
import { Canvas } from '../renderer';

export function createLibrary(): G2Library {
  return {
    'renderer.canvas': Canvas,
  };
}
