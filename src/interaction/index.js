/**
 * @fileOverview Interaction
 * @author leungwensen@gmail.com
 */
const G2 = require('../core');
const View = require('../chart/view');
const Util = require('../util');

const Interactions = {
  Base: require('./base'),
  Brush: require('./brush'),
  Drag: require('./drag'),
  ShapeSelect: require('./shapeSelect'),
  Zoom: require('./zoom')
};

G2._Interactions = {};
G2.registerInteraction = function(type, constructor) {
  G2._Interactions[type] = constructor;
};
G2.getInteraction = function(type) {
  return G2._Interactions[type];
};

// binding on View
View.prototype.getInteractions = function() {
  const me = this;
  if (!me._interactions) {
    me._interactions = {};
  }
  return me._interactions;
};
View.prototype._setInteraction = function(type, interaction) {
  const me = this;
  const interactions = me.getInteractions();
  if (interactions[type] && interactions[type] !== interaction) { // only one interaction for a key
    interactions[type].destroy();
  }
  interactions[type] = interaction;
};
View.prototype.clearInteraction = function(type) {
  const me = this;
  const interactions = me.getInteractions();
  if (type) {
    interactions[type] && interactions[type].destroy();
    delete interactions[type];
  } else {
    Util.each(interactions, (interaction, key) => {
      interaction.destroy();
      delete interactions[key];
    });
  }
};
View.prototype.interact = View.prototype.interaction = function(type, cfg) {
  const me = this;
  const Ctor = G2.getInteraction(type);
  const interaction = new Ctor(cfg, me);
  me._setInteraction(type, interaction);
  return me;
};

G2.registerInteraction('brush', Interactions.Brush);
G2.registerInteraction('Brush', Interactions.Brush);
G2.registerInteraction('drag', Interactions.Drag);
G2.registerInteraction('Drag', Interactions.Drag);
G2.registerInteraction('zoom', Interactions.Zoom);
G2.registerInteraction('Zoom', Interactions.Zoom);
G2.registerInteraction('shape-select', Interactions.ShapeSelect);
G2.registerInteraction('ShapeSelect', Interactions.ShapeSelect);

module.exports = Interactions;
