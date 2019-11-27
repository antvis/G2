/**
 * @fileOverview Interaction
 * @author leungwensen@gmail.com
 */
import G2 from '../core';

import Chart from '../chart/chart';
import Util from '../util';
import Base from './base';
import Brush from './brush';
import Drag from './drag';
import ScrollBar from './scroll-bar';
import ShapeSelect from './shape-select';
import Slider from './slider';
import Zoom from './zoom';

const Interactions = {
  Base,
  Brush,
  Drag,
  ScrollBar,
  ShapeSelect,
  Slider,
  Zoom
};

G2._Interactions = {};
G2.registerInteraction = (type, constructor) => {
  G2._Interactions[type] = constructor;
};
G2.getInteraction = type => G2._Interactions[type];

// binding on View
Chart.prototype.getInteractions = function() {
  const me = this;
  if (!me._interactions) {
    me._interactions = {};
  }
  return me._interactions;
};
Chart.prototype._setInteraction = function(type, interaction) {
  const me = this;
  const interactions = me.getInteractions();
  if (interactions[type] && interactions[type] !== interaction) { // only one interaction for a key
    interactions[type].destroy();
  }
  interactions[type] = interaction;
};
Chart.prototype.clearInteraction = function(type) {
  const me = this;
  const interactions = me.getInteractions();
  if (type) {
    if (interactions[type]) {
      interactions[type]._reset();
      interactions[type].destroy();
    }
    delete interactions[type];
  } else {
    Util.each(interactions, (interaction, key) => {
      interaction._reset();
      interaction.destroy();
      delete interactions[key];
    });
  }
};
Chart.prototype.interact = Chart.prototype.interaction = function(type, cfg) {
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
G2.registerInteraction('scroll-bar', Interactions.ScrollBar);
G2.registerInteraction('ScrollBar', Interactions.ScrollBar);
G2.registerInteraction('shape-select', Interactions.ShapeSelect);
G2.registerInteraction('ShapeSelect', Interactions.ShapeSelect);
G2.registerInteraction('slider', Interactions.Slider);
G2.registerInteraction('Slider', Interactions.Slider);

export default Interactions;
