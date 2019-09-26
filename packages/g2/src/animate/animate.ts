/**
 * @fileOverview Default animation configuration for elements
 */

import * as _ from '@antv/util';
import Action from './action';
import { AnimateCFG } from './interface';

type AnimateCfgMap = {
  [k: string]: AnimateCFG,
};

const defaultAnimationCfg: AnimateCfgMap = {
  appear: {
    duration: 450,
    easing: 'easeQuadOut',
  }, // 初始入场动画配置
  update: {
    duration: 450,
    easing: 'easeQuadInOut',
  }, // 更新时发生变更的动画配置
  enter: {
    duration: 400,
    easing: 'easeQuadInOut',
    delay: 100,
  }, // 更新时新增元素的入场动画配置
  leave: {
    duration: 350,
    easing: 'easeQuadIn',
  }, // 更新时销毁动画配置
};

const Animate = <any > {
  line: {
    appear() {
      return Action.appear.groupWaveIn;
    },
    enter() {
      return Action.enter.clipIn;
    },
    leave() {
      return Action.leave.lineWidthOut;
    },
  },
  path: {
    appear() {
      return Action.appear.groupWaveIn;
    },
    enter() {
      return Action.enter.clipIn;
    },
    leave() {
      return Action.leave.lineWidthOut;
    },
  },
  area: {
    appear() {
      return Action.appear.groupWaveIn;
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
        easing: 'easeQuadOut',
      },
      update: {
        duration: 450,
        easing: 'easeQuadInOut',
      },
      enter: {
        duration: 600,
        delay: 150,
        easing: 'easeQuadInOut',
      },
      leave: {
        easing: 'easeQuadOut',
        duration: 350,
      },
    },
  },
  polygon: {
    appear() {
      return Action.appear.fadeIn;
    },
    enter() {
      return Action.enter.zoomIn;
    },
    leave() {
      return Action.leave.zoomOut;
    },
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
    },
  },
  interval: {
    appear(coord) {
      let result;
      if (coord.isPolar) { // polar coordinate
        result = Action.appear.groupScaleInXY;
        if (coord.isTransposed) { // pie chart
          result = Action.appear.groupWaveIn;
        }
      } else {
        result = coord.isTransposed ? Action.appear.groupScaleInX : Action.appear.groupScaleInY;
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
        return Action.update.fanIn; // TODO: G animate 接口支持 onFrame 属性之后可以改进饼图的更新动画
      }
    },
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
    },
  },
  text: {
    appear() {
      return Action.appear.zoomIn;
    },
    enter() {
      return Action.enter.zoomIn;
    },
    leave() {
      return Action.leave.zoomOut;
    },
  },
  kline: {
    appear() {
      return Action.appear.groupWaveIn;
    },
    enter() {
      return Action.enter.clipIn;
    },
    leave() {
      return Action.leave.lineWidthOut;
    },
  },
  box: {
    appear() {
      return Action.appear.groupWaveIn;
    },
    enter() {
      return Action.enter.clipIn;
    },
    leave() {
      return Action.leave.lineWidthOut;
    },
  },
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
        duration: 900,
      },
    },
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
    },
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
    },
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
    },
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
    },
  },
};

Animate.Action = Action;
Animate.defaultCfg = defaultAnimationCfg;

// 获取动画
Animate.getAnimation = function (elementType, coord, animationType) {
  const elementAnimateCfg = this[elementType];
  if (elementAnimateCfg) {
    const animation = elementAnimateCfg[animationType];
    if (_.isFunction(animation)) {
      return animation(coord);
    }
  }
  return false;
};

// 获取动画配置
Animate.getAnimateCfg = function (elementType, animationType) {
  const defaultCfg = defaultAnimationCfg[animationType];
  if (this[elementType] && this[elementType].cfg && this[elementType].cfg[animationType]) {
    return _.deepMix(
      {},
      defaultCfg,
      this[elementType].cfg[animationType],
    );
  }
  return defaultCfg;
};

// 注册动画
Animate.registerAnimation = function (animationType, animationName, animationFun) {
  if (!this.Action[animationType]) {
    this.Action[animationType] = {};
  }
  this.Action[animationType][animationName] = animationFun;
};

export default Animate;
