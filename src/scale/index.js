/**
 * @fileOverview Scale entry, used to reference all the scales
 * @author dxq613@gmail.com
 */

const Util = require('../util');
const Base = require('./base');
Base.Linear = require('./linear');
Base.Identity = require('./identity');
Base.Cat = require('./category');
Base.Time = require('./time');
Base.TimeCat = require('./time-cat');
Base.Log = require('./log');
Base.Pow = require('./pow');

for (const k in Base) {
  if (Base.hasOwnProperty(k)) {
    const methodName = Util.lowerFirst(k);
    Base[methodName] = function(cfg) {
      return new Base[k](cfg);
    };
  }
}

const CAT_ARR = [ 'cat', 'timeCat' ];

Base.isCategory = function(type) {
  return CAT_ARR.indexOf(type) >= 0;
};

module.exports = Base;
