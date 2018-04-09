/**
 * @fileOverview line shapes
 * @author dxq613@gmail.com
 * @author sima.zhang1990@gmail.com
 * @author huangtonger@aliyun.com
 # @author liuye10@yahoo.com
 */

const Util = require('../../util');
const Shape = require('./shape');
const Global = require('../../global');

function getAttrs(cfg) {
  const defaultCfg = Global.shape.polygon;
  const shapeCfg = Util.mix({}, defaultCfg, {
    stroke: cfg.color,
    fill: cfg.color,
    fillOpacity: cfg.opacity
  }, cfg.style);
  return shapeCfg;
}

function getHollowAttrs(cfg) {
  const defaultCfg = Global.shape.hollowPolygon;
  const shapeCfg = Util.mix({}, defaultCfg, {
    stroke: cfg.color,
    strokeOpacity: cfg.opacity
  }, cfg.style);
  return shapeCfg;
}


function divideByRepeat(points){
    const ps = [];
    let flag = points[0];
    let i = 1;
    let start =0;
    let end = 0;
    while(i<points.length){
        const c = points[i];
        if( c.x==points[i+1].x && c.y==points[i+1].y ){
            if(start==i) start=i+1;
            i++;
        }else if(c[0] == flag[0] && c[1] == flag[1]){
            end = i;
            const arr = points.slice(start,end+1);
            ps.push(arr);
            flag = points[i+1];
            start = i+1;
            i++;
        }
        i++;
    }
    return ps;
}


function getPath(points){
  const pathStr='';
  for(let i=0; i<points.length; i++){
      const p='';
      const d=points[i];
      for(let n=0; n<d.length; n++){
         const header = (n==0)?'M':'L';
         p+=(header+d[n][1]+','+d[n][0])
      }
      p+='Z';
      pathStr+=p;
   }
   return pathStr;
}

// regist line geom
const Polygon = Shape.registerFactory('polygon', {
  defaultShapeType: 'polygon',
  getDefaultPoints(pointInfo) {
    const points = [];
    Util.each(pointInfo.x, function(subX, index) {
      const subY = pointInfo.y[index];
      points.push({
        x: subX,
        y: subY
      });
    });
    return points;
  },
  getActiveCfg(type, cfg) {
    const lineWidth = cfg.lineWidth || 1;
    if (type === 'hollow') {
      return {
        lineWidth: lineWidth + 1
      };
    }

    const opacity = cfg.fillOpacity || cfg.opacity || 1;
    return {
      // lineWidth,
      fillOpacity: opacity - 0.08
    };
  },
  getSelectedCfg(type, cfg) {
    if (cfg && cfg.style) {
      return cfg.style;
    }
    return this.getActiveCfg(type, cfg);
  }
});

Shape.registerShape('polygon', 'polygon', {
  draw(cfg, container) {
    if (!Util.isEmpty(cfg.points)) {
      const attrs = getAttrs(cfg);
      let path = getPath(cfg.points);
      path = this.parsePath(path);
      return container.addShape('path', {
        attrs: Util.mix(attrs, {
          path
        })
      });
    }
  },
  getMarkerCfg(cfg) {
    return Util.mix({
      symbol: 'square',
      radius: 4
    }, getAttrs(cfg));
  }
});

Shape.registerShape('polygon', 'hollow', {
  draw(cfg, container) {
    if (!Util.isEmpty(cfg.points)) {
      const attrs = getHollowAttrs(cfg);
      const ps = divideByRepeat(cfg.points);
      const path = getPath(ps);
      path = this.parsePath(path);

      return container.addShape('path', {
        attrs: Util.mix(attrs, {
          path
        })
      });
    }
  },
  getMarkerCfg(cfg) {
    return Util.mix({
      symbol: 'square',
      radius: 4
    }, getAttrs(cfg));
  }
});

module.exports = Polygon;