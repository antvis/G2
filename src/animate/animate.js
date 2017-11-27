/**
 * @fileOverview Default animation configuration for geoms
 * @author sima.zhang
 */
const Util = require('../util');
const Action = require('./action');

const defaultAnimationCfg = {
  appear: {
    duration: 450,
    easing: 'easeQuadOut'
  }, // 初始入场动画配置
  update: {
    duration: 450,
    easing: 'easeQuadInOut'
  }, // 更新时发生变更的动画配置
  enter: {
    duration: 400,
    easing: 'easeQuadInOut',
    delay: 100
  }, // 更新时新增元素的入场动画配置
  leave: {
    duration: 350,
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
        duration: 500,
        easing: 'easeQuadOut'
      },
      update: {
        duration: 450,
        easing: 'easeQuadInOut'
      },
      enter: {
        duration: 600,
        delay: 150,
        easing: 'easeQuadInOut'
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
      } else {
        result = Action.appear.zoomIn;
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
  'axis-label': {
    enter() {
      return Action.appear.fadeIn;
    },
    leave() {
      return Action.leave.fadeOut;
    },
    update(coord) {
      if (coord.isPolar) {
        return Action.appear.fadeIn;
      }
    }
  },
  'axis-ticks': {
    enter() {
      return Action.appear.fadeIn;
    },
    leave() {
      return Action.leave.fadeOut;
    },
    update(coord) {
      if (coord.isPolar) {
        return Action.appear.fadeIn;
      }
    }
  },
  'axis-grid': {
    enter() {
      return Action.appear.fadeIn;
    },
    leave() {
      return Action.leave.fadeOut;
    },
    update(coord) {
      if (coord.isPolar) {
        return Action.appear.fadeIn;
      }
    }
  },
  'axis-grid-rect': {
    enter() {
      return Action.appear.fadeIn;
    },
    leave() {
      return Action.leave.fadeOut;
    },
    update() {
      return Action.leave.fadeIn;
    }
  },
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
Animate.defaultCfg = defaultAnimationCfg;

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
  const defaultCfg = defaultAnimationCfg[animationType];
  if (this[geomType] && this[geomType].cfg && this[geomType].cfg[animationType]) {
    return Util.deepMix({}, defaultCfg, this[geomType].cfg[animationType]);
  }
  return defaultCfg;
};

// 注册动画
Animate.registerAnimation = function(animationType, animationName, animationFun) {
  if (!this.Action[animationType]) {
    this.Action[animationType] = {};
  }
  this.Action[animationType][animationName] = animationFun;
};

module.exports = Animate;
