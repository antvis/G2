/**
 * @fileOverview Interaction
 * @author leungwensen@gmail.com
 */

const Interaction = require('@antv/interaction/lib');
const G2 = require('../core');
const View = require('../chart/view');

Interaction.helper.bindInteraction(G2, View);

G2.registerInteraction('brush', Interaction.Brush);
G2.registerInteraction('Brush', Interaction.Brush);
G2.registerInteraction('drag', Interaction.Drag);
G2.registerInteraction('Drag', Interaction.Drag);
G2.registerInteraction('zoom', Interaction.Zoom);
G2.registerInteraction('Zoom', Interaction.Zoom);
G2.registerInteraction('shape-select', Interaction.ShapeSelect);
G2.registerInteraction('ShapeSelect', Interaction.ShapeSelect);

module.exports = Interaction;
