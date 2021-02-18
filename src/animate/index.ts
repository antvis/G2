import { deepMix, get, isFunction } from '@antv/util';
import { FIELD_ORIGIN } from '../constant';
import { Coordinate, IGroup, IShape } from '../dependents';
import { AnimateCfg, Data, Datum, GAnimateCfg, Point } from '../interface';
import { AnimateExtraCfg } from './interface';

import { getAnimation } from './animation';

// 默认的动画参数配置
export const DEFAULT_ANIMATE_CFG = {
  appear: {
    duration: 450,
    easing: 'easeQuadOut',
  }, // 初始入场动画配置
  update: {
    duration: 400,
    easing: 'easeQuadInOut',
  }, // 更新时发生变更的动画配置
  enter: {
    duration: 400,
    easing: 'easeQuadInOut',
  }, // 更新时新增元素的入场动画配置
  leave: {
    duration: 350,
    easing: 'easeQuadIn',
  }, // 更新时销毁动画配置
};

// 各个 Geometry 默认的动画执行函数
const GEOMETRY_ANIMATE_CFG = {
  interval: (coordinate: Coordinate) => {
    return {
      enter: {
        animation: coordinate.isRect ? (coordinate.isTransposed ? 'scale-in-x' : 'scale-in-y') : 'fade-in',
      },
      update: {
        animation: coordinate.isPolar && coordinate.isTransposed ? 'sector-path-update' : null,
      },
      leave: {
        animation: 'fade-out',
      },
    };
  },
  line: {
    enter: {
      animation: 'fade-in',
    },
    leave: {
      animation: 'fade-out',
    },
  },
  path: {
    enter: {
      animation: 'fade-in',
    },
    leave: {
      animation: 'fade-out',
    },
  },
  point: {
    appear: {
      animation: 'zoom-in',
    },
    enter: {
      animation: 'zoom-in',
    },
    leave: {
      animation: 'zoom-out',
    },
  },
  area: {
    enter: {
      animation: 'fade-in',
    },
    leave: {
      animation: 'fade-out',
    },
  },
  polygon: {
    enter: {
      animation: 'fade-in',
    },
    leave: {
      animation: 'fade-out',
    },
  },
  schema: {
    enter: {
      animation: 'fade-in',
    },
    leave: {
      animation: 'fade-out',
    },
  },
  edge: {
    enter: {
      animation: 'fade-in',
    },
    leave: {
      animation: 'fade-out',
    },
  },
  label: {
    appear: {
      animation: 'fade-in',
      delay: 450,
    },
    enter: {
      animation: 'fade-in',
    },
    update: {
      animation: 'position-update',
    },
    leave: {
      animation: 'fade-out',
    },
  },
};

// 各个 Geometry 默认的群组出场动画
const GEOMETRY_GROUP_APPEAR_ANIMATION = {
  line: () => {
    return {
      animation: 'wave-in',
    };
  },
  area: () => {
    return {
      animation: 'wave-in',
    };
  },
  path: () => {
    return {
      animation: 'fade-in',
    };
  },
  interval(coordinate: Coordinate) {
    let animation;

    if (coordinate.isRect) {
      animation = coordinate.isTransposed ? 'grow-in-x' : 'grow-in-y';
    } else {
      animation = 'grow-in-xy';
      if (coordinate.isPolar && coordinate.isTransposed) {
        // pie chart
        animation = 'wave-in';
      }
    }
    return {
      animation,
    };
  },
  schema: (coordinate) => {
    let animation;
    if (coordinate.isRect) {
      animation = coordinate.isTransposed ? 'grow-in-x' : 'grow-in-y';
    } else {
      animation = 'grow-in-xy';
    }
    return {
      animation,
    };
  },
  polygon: () => {
    return {
      animation: 'fade-in',
      duration: 500,
    };
  },
  edge: () => {
    return {
      animation: 'fade-in',
    };
  },
};

// 解析用户的动画配置
function parseAnimateConfig(animateCfg: AnimateCfg, data: Data | Datum): GAnimateCfg {
  return {
    delay: isFunction(animateCfg.delay) ? animateCfg.delay(data) : animateCfg.delay,
    easing: isFunction(animateCfg.easing) ? animateCfg.easing(data) : animateCfg.easing,
    duration: isFunction(animateCfg.duration) ? animateCfg.duration(data) : animateCfg.duration,
    callback: animateCfg.callback,
    repeat: animateCfg.repeat,
  };
}

/**
 * @ignore
 * 获取 elementName 对应的动画配置，当声明了 `animateType`，则返回 `animateType` 对应的动画配置
 * @param elementName 元素名称
 * @param coordinate 做表弟类型
 * @param animateType 可选，动画类型
 */
export function getDefaultAnimateCfg(elementName: string, coordinate: Coordinate, animateType?: string) {
  let animateCfg = GEOMETRY_ANIMATE_CFG[elementName];

  if (animateCfg) {
    if (isFunction(animateCfg)) {
      animateCfg = animateCfg(coordinate);
    }
    animateCfg = deepMix({}, DEFAULT_ANIMATE_CFG, animateCfg);

    if (animateType) {
      return animateCfg[animateType];
    }
  }
  return animateCfg;
}

/**
 * @ignore
 * 工具函数
 * 根据用户传入的配置为 shape 执行动画
 * @param shape 执行动画的图形元素
 * @param animateCfg 动画配置
 * @param cfg 额外的信息
 */
export function doAnimate(shape: IGroup | IShape, animateCfg: AnimateCfg, cfg: AnimateExtraCfg) {
  const data = get(shape.get('origin'), 'data', FIELD_ORIGIN);
  const animation = animateCfg.animation; // 获取动画执行函数
  const parsedAnimateCfg = parseAnimateConfig(animateCfg, data);
  if (animation) {
    // 用户声明了动画执行函数
    const animateFunction = getAnimation(animation);
    if (animateFunction) {
      animateFunction(shape, parsedAnimateCfg, cfg);
    }
  } else {
    // 没有声明，则根据 toAttrs 做差值动画
    shape.animate(cfg.toAttrs, parsedAnimateCfg);
  }
}

/**
 * @ignore
 * 执行 Geometry 群组入场动画
 * @param container 执行群组动画的图形元素
 * @param animateCfg 动画配置
 * @param geometryType geometry 类型
 * @param coordinate 坐标系对象
 * @param minYPoint y 轴最小值对应的画布坐标点
 */
export function doGroupAppearAnimate(
  container: IGroup,
  animateCfg: AnimateCfg,
  geometryType: string,
  coordinate: Coordinate,
  minYPoint: Point
) {
  if (GEOMETRY_GROUP_APPEAR_ANIMATION[geometryType]) {
    const defaultCfg = GEOMETRY_GROUP_APPEAR_ANIMATION[geometryType](coordinate);
    const animation = getAnimation(get(defaultCfg, 'animation', ''));
    if (animation) {
      const cfg = {
        ...DEFAULT_ANIMATE_CFG.appear,
        ...defaultCfg,
        ...animateCfg,
      };
      container.stopAnimate(); // 先结束当前 container 动画
      animation(container, cfg, {
        coordinate,
        minYPoint,
        toAttrs: null,
      });
    }
  }
}
