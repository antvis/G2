import * as G from '@antv/g';
import * as _ from '@antv/util';

const dir_mapper = {
  right: 90 * Math.PI / 180,
  left: (360 - 90) * Math.PI / 180,
  up: 0,
  down: 180 * Math.PI / 180,
};

interface ArrowCfg {
  width?: number;
  height?: number;
  direction?: string;
  x:number;
  y: number;
  attrs?: any;
}

export default class Arrow {
  width:number = 10;
  height:number = 10;
  direction: string = 'right';
  x: number;
  y: number;
  attrs: {};
  shape: any;
  constructor(cfg:ArrowCfg) {
    _.assign(this, cfg);
    this._init();
  }

  private _init() {
    const centerX = this.width / 2;
    const centerY = this.height / 2;
    const points = [
            { x: 0, y: -centerY },
            { x: -centerX, y: centerY },
            { x: centerX, y: centerY },
    ];

    this.shape = new G.Path({
      attrs:_.deepMix({
        path: [
                    [ 'M', points[0].x, points[0].y ],
                    [ 'L', points[1].x, points[1].y ],
                    [ 'L', points[2].x, points[2].y ],
                    [ 'Z' ],
        ],
      },              this.attrs),
    });

    const transformMatrix = [];
        /** rotate */
    transformMatrix.push([ 'r', dir_mapper[this.direction] ]);
        /** transform */
    transformMatrix.push([ 't', this.x, this.y ]);

    this.shape.transform(transformMatrix);
  }
}
