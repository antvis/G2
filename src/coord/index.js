/**
 * @fileOverview the coordinate of G2
 * @author sima.zhang1990@gmail.com
 */
const Cartesian = require('./cartesian');
const Coord = require('./base');
Coord.Cartesian = Cartesian;
Coord.Rect = Cartesian;
Coord.Polar = require('./polar');
Coord.Helix = require('./helix');
Coord.Map = require('./map');

module.exports = Coord;
