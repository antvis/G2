/**
 * @fileOverview Facet 的入口
 * @author dxq613@gmail.com
 */

const Facets = {};

Facets.Rect = require('./rect');
Facets.List = require('./list');
Facets.Circle = require('./circle');
Facets.Tree = require('./tree');
Facets.Mirror = require('./mirror');
Facets.Matrix = require('./matrix');

module.exports = Facets;
