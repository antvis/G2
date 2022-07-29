import { Coordinate } from '@antv/coord';
import { Cartesian } from '../../../src/coordinate';
import { InteractionContext } from '../../../src/interaction';
import { Canvas } from '../../../src/renderer';
import { select } from '../../../src/utils/selection';
import { createDiv } from '../../utils/dom';

export function createContext({
  x = 0,
  y = 0,
  width = 600,
  height = 400,
  transform = [],
  shared = {},
}): InteractionContext {
  const coordinate = new Coordinate({
    x,
    y,
    width,
    height,
    transformations: [...transform.flat(), Cartesian()[0]],
  });

  const canvas = Canvas({ width, height, container: createDiv() });
  const mainLayer = select(canvas.document.documentElement)
    .append('rect')
    .attr('className', 'main');
  const selectionLayer = select(canvas.document.documentElement)
    .append('rect')
    .attr('className', 'selection');
  const transientLayer = select(canvas.document.documentElement)
    .append('rect')
    .attr('className', 'transient');
  return {
    scale: {},
    coordinate,
    theme: {},
    markState: new Map(),
    components: [],
    layout: {},
    key: 'id',
    frame: false,
    selection: mainLayer,
    selectionLayer,
    transientLayer,
    shared,
  };
}
