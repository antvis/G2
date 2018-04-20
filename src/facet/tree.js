/**
 * @fileOverview tree facets
 * @author dxq613@gmail.com
 */

const Base = require('./base');
const Util = require('../util');

const assign = Util.assign;

class Tree extends Base {
  getDefaultCfg() {
    const cfg = super.getDefaultCfg();
    cfg.type = 'tree';
    cfg.line = {
      lineWidth: 1,
      stroke: '#ddd'
    };
    cfg.lineSmooth = false;
    return cfg;
  }

  generateFacets(data) {
    const self = this;
    const fields = self.fields;
    if (!fields.length) {
      throw 'Please specify for the fields for facet!';
    }
    const rst = [];
    const root = self.getRootFacet(data);
    // if (self.showRoot) {
    rst.push(root);
    // }
    root.children = self.getChildFacets(data, 1, rst);
    self.setRegion(rst);
    return rst;
  }

  getRootFacet(data) {
    const self = this;
    const facet = {
      type: self.type,
      rows: self.getRows(),
      rowIndex: 0,
      colIndex: 0,
      colValue: self.rootTitle,
      data
    };
    return facet;
  }

  getRows() {
    return this.fields.length + 1;
  }

  // get child
  getChildFacets(data, level, arr) {
    const self = this;
    const fields = self.fields;
    const length = fields.length;
    if (length < level) {
      return;
    }
    const rst = [];
    const field = fields[level - 1];
    const values = self.getFieldValues(field, data);
    values.forEach(function(value, index) {
      const conditions = [
        { field, value, values }
      ];
      const filter = self.getFilter(conditions);
      const subData = data.filter(filter);
      if (subData.length) {
        const facet = {
          type: self.type,
          colValue: value,
          colField: field,
          colIndex: index,
          rows: self.getRows(),
          rowIndex: level,
          data: subData,
          children: self.getChildFacets(subData, level + 1, arr)
        };
        rst.push(facet);
        arr.push(facet);
      }
    });
    return rst;
  }

  // 设置 region
  setRegion(facets) {
    const self = this;
    self.forceColIndex(facets);
    facets.forEach(function(facet) {
      facet.region = self.getRegion(facet.rows, facet.cols, facet.colIndex, facet.rowIndex);
    });

  }

  // set column index of facets
  forceColIndex(facets) {
    const self = this;
    const leafs = [];
    let index = 0;
    facets.forEach(function(facet) {
      if (self.isLeaf(facet)) {
        leafs.push(facet);
        facet.colIndex = index;
        index++;
      }
    });

    leafs.forEach(function(facet) {
      facet.cols = leafs.length;
    });
    const maxLevel = self.fields.length;
    for (let i = maxLevel - 1; i >= 0; i--) {
      const levelFacets = self.getFacetsByLevel(facets, i);
     // var yIndex = maxLevel - i;
      for (let j = 0; j < levelFacets.length; j++) {
        const facet = levelFacets[j];
        if (!self.isLeaf(facet)) {
          facet.originColIndex = facet.colIndex;
          facet.colIndex = self.getRegionIndex(facet.children);
          facet.cols = leafs.length;
        }
      }
    }

  }

  // get facet use level
  getFacetsByLevel(facets, level) {
    const rst = [];
    facets.forEach(function(facet) {
      if (facet.rowIndex === level) {
        rst.push(facet);
      }
    });
    return rst;
  }

  // set facets region
  getRegion(rows, cols, xIndex, yIndex) {
    const xWidth = 1 / cols; // x轴方向的每个分面的偏移
    const yWidth = 1 / rows; // y轴方向的每个分面的偏移

    const start = {
      x: xWidth * xIndex,
      y: yWidth * yIndex
    };

    const end = {
      x: start.x + xWidth,
      y: start.y + yWidth * 2 / 3 // 预留1/3的空隙，方便添加连接线
    };
    return {
      start,
      end
    };
  }

  // if the facet has children , make it's column index in the middle of it's children
  getRegionIndex(children) {
    const first = children[0];
    const last = children[children.length - 1];
    return (last.colIndex - first.colIndex) / 2 + first.colIndex;
  }

  // is  a leaf without children
  isLeaf(facet) {
    return !facet.children || !facet.children.length;
  }

  setXAxis(xField, axes, facet) {
    // 当是最后一行或者下面没有 view 时文本不显示
    if (facet.rowIndex !== facet.rows - 1) {
      axes[xField].label = null;
      axes[xField].title = null;
    }
  }

  // 设置 y 坐标轴的文本、title 是否显示
  setYAxis(yField, axes, facet) {
    if (facet.originColIndex !== 0 && facet.colIndex !== 0) {
      axes[yField].title = null;
      axes[yField].label = null;
    }
  }

  // 绘制完成后
  onPaint() {
    super.onPaint();
    this.group.clear();
    if (this.facets && this.line) {
      this.drawLines(this.facets, this.group);
    }
  }

  drawLines(facets, group) {
    const self = this;
    const lineGroup = group.addGroup();
    facets.forEach(function(facet) {
      if (!self.isLeaf(facet)) {
        const children = facet.children;
        self._addFacetLines(facet, children, lineGroup);
      }
    });
  }

  // add lines with it's children
  _addFacetLines(facet, children, group) {
    const self = this;
    const view = facet.view;
    const region = view.getViewRegion();
    const start = {
      x: region.start.x + (region.end.x - region.start.x) / 2,
      y: region.start.y
    };

    children.forEach(function(subFacet) {
      const subRegion = subFacet.view.getViewRegion();
      const end = {
        x: subRegion.start.x + (subRegion.end.x - subRegion.start.x) / 2,
        y: subRegion.end.y
      };
      const middle1 = {
        x: start.x,
        y: start.y + (end.y - start.y) / 2
      };
      const middle2 = {
        x: end.x,
        y: middle1.y
      };
      self._drawLine([ start, middle1, middle2, end ], group);
    });
  }

  _getPath(points) {
    const self = this;
    const path = [];
    const smooth = self.lineSmooth;
    if (smooth) {
      path.push([ 'M', points[0].x, points[0].y ]);
      path.push([ 'C', points[1].x, points[1].y, points[2].x, points[2].y, points[3].x, points[3].y ]);
    } else {
      points.forEach(function(point, index) {
        if (index === 0) {
          path.push([ 'M', point.x, point.y ]);
        } else {
          path.push([ 'L', point.x, point.y ]);
        }
      });
    }

    return path;
  }

  // draw line width points
  _drawLine(points, group) {
    const self = this;
    const path = self._getPath(points);
    const line = self.line;
    group.addShape('path', {
      attrs: assign({
        path
      }, line)
    });
  }
}

module.exports = Tree;
