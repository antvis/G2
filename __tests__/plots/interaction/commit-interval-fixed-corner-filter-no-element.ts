import { G2Spec } from '../../../src';
import { LEGEND_ITEMS_CLASS_NAME } from '../../../src/interaction/legendFilter';
import { commit } from '../../data/commit';
import { step } from './utils';

export function commitIntervalFixedCornerFilterNoElement(): G2Spec {
  return {
    type: 'interval',
    data: commit,
    encode: {
      x: 'name',
      y: 'value',
      color: 'name',
      size: 80,
    },
    style: {
      radiusTopLeft: 10,
      radiusTopRight: 20,
      radiusBottomRight: 30,
      radiusBottomLeft: 40,
    },
  };
}

commitIntervalFixedCornerFilterNoElement.steps = ({ canvas }) => {
  const { document } = canvas;
  const elements = document.getElementsByClassName(LEGEND_ITEMS_CLASS_NAME);
  const [e0, e1, e2] = elements;
  return [
    step(e0, 'click'),
    step(e0, 'click'),
    step(e1, 'click'),
    step(e2, 'click'),
  ];
};
