
const Geom = require('./base');
Geom.Point = require('./point');
Geom.PointJitter = Geom.Point.Jitter;
Geom.PointStack = Geom.Point.Stack;
Geom.Path = require('./path');
Geom.Line = require('./line');
Geom.LineStack = Geom.Line.Stack;
Geom.Interval = require('./interval');
Geom.IntervalStack = Geom.Interval.Stack;
Geom.IntervalDodge = Geom.Interval.Dodge;
Geom.IntervalSymmetric = Geom.Interval.Symmetric;

Geom.Area = require('./area');
Geom.AreaStack = Geom.Area.Stack;
Geom.Polygon = require('./polygon');
Geom.Schema = require('./schema');
Geom.SchemaDodge = Geom.Schema.Dodge;
Geom.Edge = require('./edge');
Geom.Heatmap = require('./heatmap');
Geom.Venn = require('./venn');
Geom.Violin = require('./violin');

module.exports = Geom;
