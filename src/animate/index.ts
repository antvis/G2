import { deepMix, get, isFunction } from '@antv/util';
import { Coordinate, IGroup, IShape } from '../dependents';
import { AnimateCfg, Data, Datum, Point } from '../interface';
import { getAnimation } from './animation';
import { AnimateCfg as ParsedAnimateCfg, AnimateExtraCfg } from './interface';

// 默认的动画参数配置
const DEFAULT_ANIMATE_CFG = {
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
        animation: coordinate.isRect
          ? coordinate.isTransposed
            ? 'scaleInX'
            : 'scaleInY'
          : coordinate.isPolar && coordinate.isTransposed
          ? 'fadeIn'
          : 'zoomIn',
      },
      update: {
        animation: coordinate.isPolar && coordinate.isTransposed ? 'sectorPathUpdate' : null,
      },
      leave: {
        animation: 'fadeOut',
      },
    };
  },
  line: {
    enter: {
      animation: 'fadeIn',
    },
    leave: {
      animation: 'fadeOut',
    },
  },
  path: {
    enter: {
      animation: 'fadeIn',
    },
    leave: {
      animation: 'fadeOut',
    },
  },
  point: {
    appear: {
      animation: 'zoomIn',
    },
    enter: {
      animation: 'zoomIn',
    },
    leave: {
      animation: 'zoomOut',
    },
  },
  area: {
    enter: {
      animation: 'fadeIn',
    },
    leave: {
      animation: 'fadeOut',
    },
  },
  polygon: {
    enter: {
      animation: 'fadeIn',
    },
    leave: {
      animation: 'fadeOut',
    },
  },
  schema: {
    enter: {
      animation: 'fadeIn',
    },
    leave: {
      animation: 'fadeOut',
    },
  },
  label: {
    appear: {
      animation: 'fadeIn',
      delay: 450,
    },
    enter: {
      animation: 'fadeIn',
    },
    update: {
      animation: 'textUpdate',
    },
    leave: {
      animation: 'fadeOut',
    },
  },
};

// 各个 Geometry 默认的群组出场动画
const GEOMETRY_GROUP_APPEAR_ANIMATION = {
  line: () => {
    return {
      animation: 'waveIn',
    };
  },
  area: () => {
    return {
      animation: 'waveIn',
    };
  },
  path: () => {
    return {
      animation: 'fadeIn',
    };
  },
  interval(coordinate: Coordinate) {
    let animation;

    if (coordinate.isRect) {
      animation = coordinate.isTransposed ? 'growInX' : 'growInY';
    } else {
      animation = 'growInXY';
      if (coordinate.isPolar && coordinate.isTransposed) {
        // pie chart
        animation = 'waveIn';
      }
    }
    return {
      animation,
    };
  },
  schema: (coordinate) => {
    let animation;
    if (coordinate.isRect) {
      animation = coordinate.isTransposed ? 'growInX' : 'growInY';
    } else {
      animation = 'growInXY';
    }
    return {
      animation,
    };
  },
  polygon: () => {
    return {
      animation: 'fadeIn',
      duration: 500,
    };
  },
};

// 解析用户的动画配置
function getAnimateConfig(animateCfg: AnimateCfg, data: Data | Datum): ParsedAnimateCfg {
  return {
    delay: isFunction(animateCfg.delay) ? animateCfg.delay(data) : animateCfg.delay,
    easing: isFunction(animateCfg.easing) ? animateCfg.easing(data) : animateCfg.easing,
    duration: isFunction(animateCfg.duration) ? animateCfg.duration(data) : animateCfg.duration,
    callback: animateCfg.callback,
  };
}

/**
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
 * 工具函数
 * 根据用户传入的配置为 shape 执行动画
 * @param shape 执行动画的图形元素
 * @param animateCfg 动画配置
 * @param cfg 额外的信息
 */
export function doAnimate(shape: IGroup | IShape, animateCfg: AnimateCfg, cfg: AnimateExtraCfg) {
  const { data } = shape.get('origin');
  const animation = animateCfg.animation; // 获取动画执行函数
  const parsedAnimateCfg = getAnimateConfig(animateCfg, data);
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
      animation(container, cfg, {
        coordinate,
        minYPoint,
      });
    }
  }
}
