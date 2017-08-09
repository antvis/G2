/**
 * @fileOverview Default animation configuration for geoms
 */
const Util = require('../util');
const Action = require('./action');

const defaultAnimationCfg = {
  appear: {
    duration: 450,
    easing: 'easeQuadOut'
  }, // 初始入场动画配置
  update: {
    duration: 600,
    easing: 'easeQuadInOut'
  }, // 更新时发生变更的动画配置
  enter: {
    duration: 620,
    easing: 'easeQuadInOut'
  }, // 更新时新增元素的入场动画配置
  leave: {
    duration: 300,
    easing: 'easeQuadIn'
  } // 更新时销毁动画配置
};

const Animate = {
  line: {
    appear() {
      return Action.appear.clipIn;
    },
    enter() {
      return Action.enter.clipIn;
    },
    leave() {
      return Action.leave.lineWidthOut;
    }
  },
  path: {
    appear() {
      return Action.appear.clipIn;
    },
    enter() {
      return Action.enter.clipIn;
    },
    leave() {
      return Action.leave.lineWidthOut;
    }
  },
  area: {
    appear() {
      return Action.appear.clipIn;
    },
    enter() {
      return Action.enter.fadeIn;
    },
    leave() {
      return Action.leave.fadeOut;
    },
    cfg: {
      appear: {
        duration: 600,
        easing: 'easeQuadInOut'
      },
      update: {
        duration: 600,
        delay: 300,
        easing: 'easeQuadInOut'
      },
      enter: {
        duration: 640,
        delay: 500,
        easing: 'easeQuadIn'
      },
      leave: {
        easing: 'easeQuadOut',
        duration: 350
      }
    }
  },
  polygon: {
    appear() {
      return Action.appear.zoomIn;
    },
    enter() {
      return Action.enter.zoomIn;
    },
    leave() {
      return Action.leave.zoomOut;
    }
  },
  edge: {
    appear() {
      return Action.appear.pathIn;
    },
    enter() {
      return Action.enter.pathIn;
    },
    leave() {
      return Action.leave.pathOut;
    }
  },
  interval: {
    appear(coord) {
      let result;
      if (coord.isPolar) {
        result = Action.appear.zoomIn;
        if (coord.isTransposed || coord.type === 'theta') {
          result = Action.appear.fanIn;
        }
      } else if (coord.isRect) {
        result = coord.isTransposed ? Action.appear.scaleInX : Action.appear.scaleInY;
      }
      return result;
    },
    enter(coord) {
      if (coord.isRect || coord.isTransposed || coord.type === 'theta') {
        return Action.enter.fadeIn;
      }
      return Action.enter.zoomIn;
    },
    leave() {
      return Action.leave.fadeOut;
    },
    update(coord) {
      if (coord.type === 'theta') {
        return Action.update.fanIn;
      }
    }
  },
  point: {
    appear() {
      return Action.appear.zoomIn;
    },
    enter() {
      return Action.enter.zoomIn;
    },
    leave() {
      return Action.leave.zoomOut;
    }
  },
  schema: {
    appear() {
      return Action.appear.clipIn;
    },
    enter() {
      return Action.enter.clipIn;
    },
    leave() {
      return Action.leave.lineWidthOut;
    }
  },
  contour: null,
  heatmap: null,
  label: {
    appear() {
      return Action.appear.fadeIn;
    },
    enter() {
      return Action.enter.fadeIn;
    },
    leave() {
      return Action.leave.fadeOut;
    },
    cfg: {
      appear: {
        duration: 900
      }
    }
  },
  axisLine: {},
  gridLine: {},
  labelLine: {
    appear() {
      return Action.appear.pathIn;
    },
    enter() {
      return Action.enter.pathIn;
    },
    leave() {
      return Action.leave.pathOut;
    }
  }
};

Animate.Action = Action;

// 获取动画
Animate.getAnimation = function(geomType, coord, animationType) {
  const geomAnimateCfg = this[geomType];
  if (geomAnimateCfg) {
    const animation = geomAnimateCfg[animationType];
    if (Util.isFunction(animation)) {
      return animation(coord);
    }
  }
  return false;
};


// 获取动画配置
Animate.getAnimateCfg = function(geomType, animationType) {
  let animateCfg = {};
  const defaultCfg = defaultAnimationCfg[animationType];
  animateCfg = Util.mix({}, defaultCfg, this[geomType] && this[geomType].cfg && this[geomType].cfg[animationType]);
  return animateCfg;
};

// 注册动画
Animate.registerAnimation = function(animationType, animationName, animationFun) {
  if (!this.animation[animationType]) {
    this.animation[animationType] = {};
  }
  this.animation[animationType][animationName] = animationFun;
};

module.exports = Animate;
