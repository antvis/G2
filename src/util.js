/**
 * @fileOverview The util method based on the lodash.
 * @author dxq613@gmail.com
 * @see https://github.com/lodash/lodash
 */

import { each } from 'lodash';

function mix(dist, obj) {
  for (const k in obj) {
    if (obj.hasOwnProperty(k) && k !== 'constructor' && obj[k] !== undefined) {
      dist[k] = obj[k];
    }
  }
}

export default {
  each,
  mix(dist, obj1, obj2, obj3) {
    if (obj1) {
      mix(dist, obj1);
    }

    if (obj2) {
      mix(dist, obj2);
    }

    if (obj3) {
      mix(dist, obj3);
    }
    return dist;
  }
};
