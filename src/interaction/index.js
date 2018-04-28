/**
 * @fileOverview Interaction
 * @author leungwensen@gmail.com
 */
// const Util = require('../util');
const View = require('../chart/view');
const G2 = require('../core.js');

const Interactions = {};

View.prototype.interact = function(/* type, cfg */) {
};

G2.__interactions = {};
G2.registerInteraction = function(type, constructor) {
  G2.__interactions[type] = constructor;
};

module.exports = Interactions;
