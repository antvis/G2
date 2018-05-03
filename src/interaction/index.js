/**
 * @fileOverview Interaction
 * @author leungwensen@gmail.com
 */
const View = require('../chart/view');
const G2 = require('../core.js');
const Util = require('../util');

G2.__Interactions = {};
G2.registerInteraction = function(type, constructor) {
  G2.__Interactions[type] = constructor;
};
G2.getInteraction = function(type) {
  return G2.__Interactions[type];
};

View.prototype.getInteractions = function() {
  const me = this;
  if (!me.__interactions) {
    me.__interactions = {};
  }
  return me.__interactions;
};

View.prototype.setInteraction = function(type, interact) {
  const me = this;
  const interactions = me.getInteractions();
  interactions[type] = interactions[type] || [];
  interactions[type].push(interact);
};

View.prototype.clearInteraction = function(type) {
  const me = this;
  const interactions = me.getInteractions();
  if (type) {
    (interactions[type] || []).forEach(interact => {
      interact.clear();
    });
  } else {
    Util.each(interactions, collection => {
      (collection || []).forEach(interact => {
        interact.clear();
      });
    });
  }
};
View.prototype.interact = function(type, cfg) {
  const me = this;
  const Interaction = G2.getInteraction[type];
  const interact = new Interaction(cfg);
  interact.execute();
  me.setInteraction(type, interact);
};

module.exports = G2.__interactions;
