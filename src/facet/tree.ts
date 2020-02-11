/**
 * Create By Bruce Too
 * On 2020-02-10
 */
import * as _ from '@antv/util';
import { AxisCfg } from '../chart/interface';
import View from '../chart/view';
import { Datum } from '../interface';
import { Facet } from './facet';
import { Condition, TreeCfg, TreeData } from './interface';

export default class Tree extends Facet<TreeCfg, TreeData>{

  protected afterEachView(view: View, facet: TreeData) {
  }

  protected beforeEachView(view: View, facet: TreeData) {
  }

  protected getDefaultCfg() {
    return _.deepMix({}, super.getDefaultCfg(), {
      type: 'tree',
      line: {
        lineWidth: 1,
        stroke: '#ddd'
      },
      lineSmooth: false,
      rootTitle: ''
    });
  }

  protected generateFacets(data: Datum[]): TreeData[] {
    const fields = this.cfg.fields;
    if (!fields.length) {
      throw new Error('Please specify for the fields for rootFacet!');
    }
    const rst = [];
    const rootFacet: TreeData = {
      type: this.cfg.type,
      data,
      region: null,
      rowValuesLength: this.getRows(),
      columnValuesLength: 1,
      rowIndex: 0,
      columnIndex: 0,
      rowField: '',
      columnField: '',
      rowValue: '',
      columnValue: this.cfg.rootTitle,
    };
    rst.push(rootFacet);
    rootFacet.children = this.getChildFacets(data, 1, rst);
    this.setRegion(rst);
    return rst;
  }

  private setRegion(facets: TreeData[]) {
    this.forceColIndex(facets);
    facets.forEach(facet => {
      // @ts-ignore 允许调整
      facet.region = this.getRegion(facet.rowValuesLength, facet.columnValuesLength,
        facet.columnIndex, facet.rowIndex);
    });
  }

  private forceColIndex(facets: TreeData[]) {
    const leafs: TreeData[] = [];
    let index = 0;
    facets.forEach(facet => {
      if (this.isLeaf(facet)) {
        leafs.push(facet);
        // @ts-ignore 允许调整
        facet.columnIndex = index;
        index++;
      }
    });

    leafs.forEach(facet => {
      // @ts-ignore
      facet.columnValuesLength = leafs.length;
    });
    const maxLevel = this.cfg.fields.length;
    for (let i = maxLevel - 1; i >= 0; i--) {
      const levelFacets = this.getFacetsByLevel(facets, i);
      // var yIndex = maxLevel - i;
      for (const facet of levelFacets) {
        if (!this.isLeaf(facet)) {
          facet.originColIndex = facet.columnIndex;
          // @ts-ignore
          facet.columnIndex = this.getRegionIndex(facet.children);
          // @ts-ignore
          facet.columnValuesLength = leafs.length;
        }
      }
    }
  }

  // get facet use level
  private getFacetsByLevel(facets: TreeData[], level: number) {
    const rst:TreeData[] = [];
    facets.forEach(facet => {
      if (facet.rowIndex === level) {
        rst.push(facet);
      }
    });
    return rst;
  }

  // if the facet has children , make it's column index in the middle of it's children
  private getRegionIndex(children: TreeData[]) {
    const first = children[0];
    const last = children[children.length - 1];
    return (last.columnIndex - first.columnIndex) / 2 + first.columnIndex;
  }

  // is  a leaf without children
  private isLeaf(facet: TreeData) {
    return !facet.children || !facet.children.length;
  }

  private getRows() {
    return this.cfg.fields.length + 1;
  }

  // get child
  private getChildFacets(data: Datum[], level: number, arr: TreeData[]) {
    // [ 'grade', 'class' ]
    const fields = this.cfg.fields;
    const length = fields.length;
    if (length < level) {
      return;
    }
    const rst = [];
    // get fist level except root node
    const field = fields[level - 1];
    // get field value
    const values = this.getFieldValues(data, field);
    values.forEach((value, index) => {
      const conditions = [
        { field, value, values } as Condition
      ];
      const subData = data.filter(this.getFacetDataFilter(conditions));
      if (subData.length) {
        const facet: TreeData = {
          type: this.cfg.type,
          data: subData,
          region: null,
          columnValue: value,
          rowValue: '',
          columnField: field,
          rowField: '',
          columnIndex: index,
          rowValuesLength: this.getRows(),
          columnValuesLength: 1,
          rowIndex: level,
          children: this.getChildFacets(subData, level + 1, arr)
        };
        rst.push(facet);
        arr.push(facet);
      }
    });
    return rst;
  }

  public render() {
    super.render();
    if (this.facets && this.cfg.line) {
      this.drawLines(this.facets);
    }
  }

  private drawLines(facets: TreeData[]) {
    facets.forEach(facet => {
      if (!this.isLeaf(facet)) {
        const children = facet.children;
        this.addFacetLines(facet, children);
      }
    });
  }

  // add lines with it's children
  private addFacetLines(facet: TreeData, children: TreeData[]) {
    const view = facet.view;
    // @ts-ignore
    const region = view.region;
    const start = {
      x: region.start.x + (region.end.x - region.start.x) / 2,
      y: region.start.y
    };

    children.forEach(subFacet => {
      // @ts-ignore
      const subRegion = subFacet.view.region;
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
      this.drawLine([ start, middle1, middle2, end ]);
    });
  }

  private getPath(points) {
    const path = [];
    const smooth = this.cfg.lineSmooth;
    if (smooth) {
      path.push([ 'M', points[0].x, points[0].y ]);
      path.push([ 'C', points[1].x, points[1].y, points[2].x, points[2].y, points[3].x, points[3].y ]);
    } else {
      points.forEach((point, index) => {
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
  private drawLine(points) {
    const path = this.getPath(points);
    const line = this.cfg.line;
    this.container.addShape('path', {
      attrs: _.assign({
        // @ts-ignore
        path
      }, line)
    });
  }

  protected getXAxisOption(x: string, axes: any, option: AxisCfg, facet: TreeData): object {
    // if (facet.rowIndex !== facet.rowValuesLength - 1) {
    //   axes[x].label = null;
    //   axes[x].title = null;
    // }
    return option;
  }

  protected getYAxisOption(y: string, axes: any, option: AxisCfg, facet: TreeData): object {
    // if (facet.originColIndex !== 0 && facet.columnIndex !== 0) {
    //   axes[y].title = null;
    //   axes[y].label = null;
    // }
    return option;
  }

}
