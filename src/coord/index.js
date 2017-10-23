/**
 * @fileOverview the entry of coordinate
 * @author sima.zhang1990@gmail.com
 */
const Coord = require('./base');
Coord.Cartesian = require('./cartesian');
Coord.Rect = Coord.Cartesian;
Coord.Polar = require('./polar');
Coord.Helix = require('./helix');

module.exports = Coord;
