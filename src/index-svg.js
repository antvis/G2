const G2 = require('./core');

// geoms
require('./geom/area');
require('./geom/edge');
require('./geom/heatmap');
require('./geom/interval');
require('./geom/line');
require('./geom/path');
require('./geom/point');
require('./geom/polygon');
require('./geom/schema');
require('./geom/venn');

// facets
require('./facet/index');

// interaction
require('./interaction/index');

module.exports = G2;
