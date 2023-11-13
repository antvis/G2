import { G2Spec } from '../../../src';

export function aaplIntervalDateEncodeX(): G2Spec {
  return {
    type: 'interval',
    height: 720,
    data: {
      type: 'fetch',
      value: 'data/aapl.csv',
      transform: [{ type: 'slice', start: 0, end: 10 }],
    },
    encode: {
      x: 'date',
      y: 'close',
    },
  };
}

// Make the local ci and online ci covert Date object to consistent string.
let toString;
aaplIntervalDateEncodeX.before = () => {
  toString = Date.prototype.toString;
  Date.prototype.toString = Date.prototype.toUTCString;
};

aaplIntervalDateEncodeX.after = () => {
  Date.prototype.toString = toString;
};
