const Util = require('../util');
const Interaction = require('./base');
// const G2 = require('../core.js');

const BRUSH_TYPES = [ 'X', 'Y', 'XY', 'POLYGON' ];
const DEFAULT_TYPE = 'XY';

class Brush extends Interaction {
  getDefaultCfg() {
    const cfg = super.getDefaultCfg();
    return Util.mix({}, cfg, {
      type: DEFAULT_TYPE,
      startPoint: null,
      brushing: false,
      dragging: false,
      brushShape: null,
      container: null,
      polygonPath: null,
      style: {
        fill: '#C5D4EB',
        opacity: 0.3,
        lineWidth: 1,
        stroke: '#82A6DD'
      },
      draggable: false,
      dragOffX: 0,
      dragOffY: 0,
      inPlot: true,
      xField: null,
      yField: null
    });
  }

  constructor(cfg, view) {
    super(cfg, view);
    const me = this;
    me.filter = !me.draggable;
    me.type = me.type.toUpperCase();
    me.chart = view;

    if (!BRUSH_TYPES.includes(me.type)) {
      me.type = DEFAULT_TYPE;
    }
    const canvas = me.canvas;
    if (canvas) {
      let plotRange;
      canvas.get('children').map(child => {
        if (child.get('type') === 'plotBack') {
          plotRange = child.get('plotRange');
          return false;
        }
        return child;
      });
      me.plot = {
        start: plotRange.bl,
        end: plotRange.tr
      };
    }
    if (view) {
      const coord = view.get('coord');
      me.plot = {
        start: coord.start,
        end: coord.end
      };
      me.isTransposed = coord.isTransposed;
      const xScales = view._getScales('x');
      const yScales = view._getScales('y');
      me.xScale = me.xField ? xScales[me.xField] : view.getXScale();
      me.yScale = me.yField ? yScales[me.yField] : view.getYScales()[0];
    }
  }

  // onBurshstart() { }
  // onBrushmove() { }
  // onBrushend() {}
  // onDragstart() {}
  // onDragmove() {}
  // onDragend() {}

  start(ev) {
    const me = this;
    const { canvas, type, brushShape } = me;

    if (!type) return;

    const startPoint = { x: ev.offsetX, y: ev.offsetY };
    if (!startPoint.x) return;
    const isInPlot = me.plot && me.inPlot;
    const canvasDOM = canvas.get('canvasDOM');
    const pixelRatio = canvas.get('pixelRatio');

    if (me.selection) me.selection = null;

    if (me.draggable && brushShape && !brushShape.get('destroyed')) { // allow drag the brushShape
      if (brushShape.isHit(startPoint.x * pixelRatio, startPoint.y * pixelRatio)) {
        canvasDOM.style.cursor = 'move';
        me.selection = brushShape;
        me.dragging = true;
        if (type === 'X') {
          me.dragoffX = startPoint.x - brushShape.attr('x');
          me.dragoffY = 0;
        } else if (type === 'Y') {
          me.dragoffX = 0;
          me.dragoffY = startPoint.y - brushShape.attr('y');
        } else if (type === 'XY') {
          me.dragoffX = startPoint.x - brushShape.attr('x');
          me.dragoffY = startPoint.y - brushShape.attr('y');
        } else if (type === 'POLYGON') {
          const box = brushShape.getBBox();
          me.dragoffX = startPoint.x - box.minX;
          me.dragoffY = startPoint.y - box.minY;
        }

        if (isInPlot) {
          // me.selection.attr('clip', canvas.addShape('rect', {
          //   attrs: {
          //     x: this.plot.start.x,
          //     y: this.plot.end.y,
          //     width: this.plot.end.x - this.plot.start.x,
          //     height: this.plot.start.y - this.plot.end.y,
          //     fill: '#fff',
          //     fillOpacity: 0
          //   }
          // }));
        }
        me.onDragstart && me.onDragstart(ev);
      }
      me.prePoint = startPoint;
    }

    if (!me.dragging) { // brush start
      me.onBrushstart && me.onBrushstart(startPoint);
      let container = me.container;
      if (isInPlot) {
        const { start, end } = me.plot;
        if (startPoint.x < start.x || startPoint.x > end.x || startPoint.y < end.y || startPoint.y > start.y) return;
      }
      canvasDOM.style.cursor = 'crosshair';
      me.startPoint = startPoint;
      me.brushShape = null;
      me.brushing = true;

      if (!container) {
        container = canvas.addGroup({
          zIndex: 5 // upper
        });
        container.initTransform();
      } else {
        container.clear();
      }
      me.container = container;

      if (type === 'POLYGON') me.polygonPath = `M ${startPoint.x} ${startPoint.y}`;
    }
  }
  process(ev) {
    const me = this;
    const { brushing, dragging, type, plot, startPoint, xScale, yScale, canvas } = me;

    if (!brushing && !dragging) {
      return;
    }
    let currentPoint = {
      x: ev.offsetX,
      y: ev.offsetY
    };
    const canvasDOM = canvas.get('canvasDOM');

    if (brushing) {
      canvasDOM.style.cursor = 'crosshair';
      const { start, end } = plot;
      let polygonPath = me.polygonPath;
      let brushShape = me.brushShape;
      const container = me.container;
      if (me.plot && me.inPlot) {
        currentPoint = me._limitCoordScope(currentPoint);
      }

      let rectStartX;
      let rectStartY;
      let rectWidth;
      let rectHeight;

      if (type === 'Y') {
        rectStartX = start.x;
        rectStartY = (currentPoint.y >= startPoint.y) ? startPoint.y : currentPoint.y;
        rectWidth = Math.abs(start.x - end.x);
        rectHeight = Math.abs(startPoint.y - currentPoint.y);
      } else if (type === 'X') {
        rectStartX = (currentPoint.x >= startPoint.x) ? startPoint.x : currentPoint.x;
        rectStartY = end.y;
        rectWidth = Math.abs(startPoint.x - currentPoint.x);
        rectHeight = Math.abs(end.y - start.y);
      } else if (type === 'XY') {
        if (currentPoint.x >= startPoint.x) {
          rectStartX = startPoint.x;
          rectStartY = currentPoint.y >= startPoint.y ? startPoint.y : currentPoint.y;
        } else {
          rectStartX = currentPoint.x;
          rectStartY = currentPoint.y >= startPoint.y ? startPoint.y : currentPoint.y;
        }
        rectWidth = Math.abs(startPoint.x - currentPoint.x);
        rectHeight = Math.abs(startPoint.y - currentPoint.y);
      } else if (type === 'POLYGON') {
        polygonPath += `L ${currentPoint.x} ${currentPoint.y}`;
        me.polygonPath = polygonPath;
        if (!brushShape) {
          brushShape = container.addShape('path', {
            attrs: Util.mix(me.style, {
              path: polygonPath
            })
          });
        } else {
          !brushShape.get('destroyed') && brushShape.attr(Util.mix({}, brushShape._attrs, {
            path: polygonPath
          }));
        }
      }
      if (type !== 'POLYGON') {
        if (!brushShape) {
          brushShape = container.addShape('rect', {
            attrs: Util.mix(me.style, {
              x: rectStartX,
              y: rectStartY,
              width: rectWidth,
              height: rectHeight
            })
          });
        } else {
          !brushShape.get('destroyed') && brushShape.attr(Util.mix({}, brushShape._attrs, {
            x: rectStartX,
            y: rectStartY,
            width: rectWidth,
            height: rectHeight
          }));
        }
      }

      me.brushShape = brushShape;
    } else if (dragging) {
      canvasDOM.style.cursor = 'move';
      const selection = me.selection;
      if (selection && !selection.get('destroyed')) {
        if (type === 'POLYGON') {
          const prePoint = me.prePoint;
          me.selection.translate(currentPoint.x - prePoint.x, currentPoint.y - prePoint.y);
        } else {
          me.dragoffX && selection.attr('x', currentPoint.x - me.dragoffX);
          me.dragoffY && selection.attr('y', currentPoint.y - me.dragoffY);
        }
      }
    }

    me.prePoint = currentPoint;
    canvas.draw();
    const { data, shapes, xValues, yValues } = me._getSelected();
    const eventObj = {
      data,
      shapes
    };

    if (xScale) {
      eventObj[xScale.field] = xValues;
    }
    if (yScale) {
      eventObj[yScale.field] = yValues;
    }

    // 将框选的数据传递给 ev，供 onEnd 钩子使用
    Util.mix(ev, eventObj);

    eventObj.x = currentPoint.x;
    eventObj.y = currentPoint.y;

    me.onDragmove && me.onDragmove(eventObj);
    me.onBrushmove && me.onBrushmove(eventObj);
  }
  end(ev) {
    const me = this;

    if (!me.brushing && !me.dragging) {
      return;
    }
    const { data, shapes, xValues, yValues, canvas, type, startPoint, chart, container, xScale, yScale } = me;
    const { offsetX, offsetY } = ev;
    const canvasDOM = canvas.get('canvasDOM');
    canvasDOM.style.cursor = 'default';

    if (Math.abs(startPoint.x - offsetX) <= 1 && Math.abs(startPoint.y - offsetY) <= 1) { // 防止点击事件
      me.brushing = false;
      me.dragging = false;
      container.clear();
      canvas.draw();
      return;
    }

    const eventObj = {
      data,
      shapes
    };
    if (xScale) {
      eventObj[xScale.field] = xValues;
    }
    if (yScale) {
      eventObj[yScale.field] = yValues;
    }

    // 将框选的数据传递给 ev，供 onEnd 钩子使用
    Util.mix(ev, eventObj);

    eventObj.x = offsetX;
    eventObj.y = offsetY;

    if (me.dragging) {
      me.dragging = false;
      me.onDragend && me.onDragend(eventObj);
    } else if (me.brushing) {
      me.brushing = false;
      const brushShape = me.brushShape;
      let polygonPath = me.polygonPath;

      if (type === 'POLYGON') {
        polygonPath += 'z';

        brushShape && !brushShape.get('destroyed') && brushShape.attr(Util.mix({}, brushShape._attrs, {
          path: polygonPath
        }));
        me.polygonPath = polygonPath;
        canvas.draw();
      }


      if (me.onBrushend) {
        me.onBrushend(eventObj);
      } else if (chart && me.filter) {
        container.clear(); // clear the brush
        // filter data
        if ((!me.isTransposed && type === 'X') || (me.isTransposed && type === 'Y')) {
          xScale && chart.filter(xScale.field, val => {
            return xValues.indexOf(val) > -1;
          });
        } else if ((!me.isTransposed && type === 'Y') || (me.isTransposed && type === 'X')) {
          yScale && chart.filter(yScale.field, val => {
            return yValues.indexOf(val) > -1;
          });
        } else {
          xScale && chart.filter(xScale.field, val => {
            return xValues.indexOf(val) > -1;
          });
          yScale && chart.filter(yScale.field, val => {
            return yValues.indexOf(val) > -1;
          });
        }
        chart.repaint();
      }
    }
  }

  reset() {
    const me = this;
    const { chart, filter, brushShape, canvas } = me;
    if (chart && filter) {
      chart.get('options').filters = {};
      chart.repaint();
    }
    if (brushShape) {
      brushShape.destroy();
      canvas.draw();
    }
  }

  _limitCoordScope(point) {
    const { plot } = this;
    const { start, end } = plot;

    if (point.x < start.x) {
      point.x = start.x;
    }
    if (point.x > end.x) {
      point.x = end.x;
    }
    if (point.y < end.y) {
      point.y = end.y;
    }
    if (point.y > start.y) {
      point.y = start.y;
    }
    return point;
  }

  _getSelected() {
    const me = this;
    const { chart, xScale, yScale, brushShape, canvas } = me;
    const pixelRatio = canvas.get('pixelRatio');
    const selectedShapes = [];
    const xValues = [];
    const yValues = [];
    const selectedData = [];
    if (chart) {
      const geoms = chart.get('geoms');
      geoms.map(geom => {
        const shapes = geom.getShapes();
        shapes.map(shape => {
          let shapeData = shape.get('origin');
          if (!Array.isArray(shapeData)) { // 线图、区域图等
            shapeData = [ shapeData ];
          }

          shapeData.map(each => {
            if (brushShape.isHit(each.x * pixelRatio, each.y * pixelRatio)) {
              selectedShapes.push(shape);
              const origin = each._origin;
              selectedData.push(origin);
              xScale && xValues.push(origin[xScale.field]);
              yScale && yValues.push(origin[yScale.field]);
            }
            return each;
          });

          return shape;
        });
        return geom;
      });
    }
    me.shapes = selectedShapes;
    me.xValues = xValues;
    me.yValues = yValues;
    me.data = selectedData;
    canvas.draw();
    return {
      data: selectedData,
      xValues,
      yValues,
      shapes: selectedShapes
    };
  }
}

// G2.registerInteraction('brush', Brush);
// G2.registerInteraction('Brush', Brush);

module.exports = Brush;
