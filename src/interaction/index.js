/**
 * @fileOverview Interaction
 * @author leungwensen@gmail.com
 */

const Interaction = require('@antv/interaction/src');
const G2 = require('../core');
const View = require('../chart/view');

Interaction.helper.bindInteraction(G2, View);

G2.registerInteraction('brush', Interaction.Brush);
G2.registerInteraction('Brush', Interaction.Brush);
G2.registerInteraction('drag', Interaction.Drag);
G2.registerInteraction('Drag', Interaction.Drag);
G2.registerInteraction('zoom', Interaction.Zoom);
G2.registerInteraction('Zoom', Interaction.Zoom);

module.exports = Interaction;
