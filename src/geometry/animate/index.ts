import * as _ from '@antv/util';
import { Coordinate, IGroup, IShape } from '../../dependents';
import { AnimateCfg, Data, Datum, ShapeDrawCFG } from '../../interface';
import * as Action from './action';

// 默认动画配置
const DEFAULT_ANIMATE_CFG = {
  interval: {
    enter(coordinate: Coordinate) {
      let animation;
      if (coordinate.isRect) {
        animation = coordinate.isTransposed ? 'scaleInX' : 'scaleInY';
      } else if (coordinate.isPolar) {
        animation = 'zoomIn';
        if (coordinate.isTransposed) {
          // pie chart
          animation = 'clipIn';
        }
      }
      return {
        animation,
        duration: 600,
        easing: 'easeQuadOut',
      };
    },
    update(coordinate: Coordinate) {
      if (coordinate.type === 'theta') {
        return {
          animation: 'pieChartUpdate',
          duration: 450,
          easing: 'easeQuadInOut',
        };
      }

      return {
        duration: 450,
        easing: 'easeQuadInOut',
      };
    },
    leave: {
      animation: 'fadeOut',
      duration: 400,
      easing: 'easeQuadIn',
    },
  },
  line: {
    enter: {
      animation: 'clipIn',
      duration: 600,
      easing: 'easeQuadOut',
    },
    update: {
      duration: 450,
      easing: 'easeQuadInOut',
    },
    leave: {
      animation: 'fadeOut',
      duration: 400,
      easing: 'easeQuadIn',
    },
  },
  path: {
    enter: {
      animation: 'clipIn',
      duration: 600,
      easing: 'easeQuadOut',
    },
    update: {
      duration: 450,
      easing: 'easeQuadInOut',
    },
    leave: {
      animation: 'fadeOut',
      duration: 400,
      easing: 'easeQuadIn',
    },
  },
  point: {
    enter: {
      animation: 'grow',
      duration: 600,
      easing: 'easeQuadOut',
    },
    update: {
      duration: 450,
      easing: 'easeQuadInOut',
    },
    leave: {
      animation: 'shrink',
      duration: 400,
      easing: 'easeQuadIn',
    },
  },
};

function getAnimateConfig(animateCfg: AnimateCfg, data: Data | Datum) {
  return {
    delay: _.isFunction(animateCfg.delay) ? animateCfg.delay(data) : animateCfg.delay,
    easing: _.isFunction(animateCfg.easing) ? animateCfg.easing(data) : animateCfg.easing,
    duration: _.isFunction(animateCfg.duration) ? animateCfg.duration(data) : animateCfg.duration,
    callback: animateCfg.callback,
  };
}

/**
 * 获取默认的动画配置
 * @param geometryType 几何标记类型
 * @param animateType 动画类型
 * @param coordinate 坐标系
 * @returns default animate cfg
 */
export function getDefaultAnimateCfg(geometryType: string, animateType: string, coordinate: Coordinate): AnimateCfg {
  const animateCfg = _.get(DEFAULT_ANIMATE_CFG, [geometryType, animateType], {});

  if (_.isFunction(animateCfg)) {
    return animateCfg(coordinate);
  }

  return animateCfg;
}

/**
 * 工具函数根据用户传入的配置为 shape 执行动画
 * @param shape 执行动画的图形元素
 * @param cfg 图形配置
 * @param [toAttrs] shape 最终状态的图形属性
 */
export function doAnimate(shape: IGroup | IShape, cfg: ShapeDrawCFG, coordinate: Coordinate, toAttrs?: object) {
  const { animate, data, origin } = cfg;
  const animation = animate.animation;
  const animateCfg = getAnimateConfig(animate, data);
  if (animation) {
    // 用户声明了动画执行函数
    const animateFunction = Action[animation];
    if (animateFunction) {
      animateFunction(shape, animateCfg, coordinate, origin, toAttrs);
    }
  } else {
    // 没有声明，则根据 toAttrs 做差值动画
    shape.animate(toAttrs, animateCfg);
  }
}
