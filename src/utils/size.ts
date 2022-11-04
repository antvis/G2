import { G2ViewTree } from '../runtime';

type Size = {
  width: number;
  height: number;
};

const parseInt10 = (d: string) => parseInt(d);

/**
 * @description Get the element's bounding size.
 * @param container dom element.
 * @returns the element width and height
 */
export function getContainerSize(container: HTMLElement): Size {
  // size = width/height - padding.

  const style = getComputedStyle(container);

  const wrapperWidth = container.clientWidth || parseInt10(style.width);
  const wrapperHeight = container.clientHeight || parseInt10(style.height);

  const widthPadding =
    parseInt10(style.paddingLeft) + parseInt10(style.paddingRight);
  const heightPadding =
    parseInt10(style.paddingLeft) + parseInt10(style.paddingRight);

  return {
    width: wrapperWidth - widthPadding,
    height: wrapperHeight - heightPadding,
  };
}

/**
 *
 * @description Calculate the chart size.
 * @param container DOM container element.
 * @param autoFit Should auto fit.
 * @param width Chart width which is set by user.
 * @param height Chart height which is set by user.
 * @returns chart width and height.
 */
export function getChartSize(
  container: HTMLElement,
  autoFit: boolean,
  width: number,
  height: number,
): Size {
  if (!autoFit) {
    return {
      width,
      height,
    };
  }

  // Get size from wrapper container.
  const size = getContainerSize(container);

  return {
    width: size.width,
    height: size.height,
  };
}

/**
 * @description Calculate the real canvas size by view options.
 */
export function getBBoxSize(options: G2ViewTree): Size {
  const {
    height,
    width,
    paddingLeft = 0,
    paddingRight = 0,
    paddingTop = 0,
    paddingBottom = 0,
    marginLeft = 0,
    marginRight = 0,
    marginTop = 0,
    marginBottom = 0,
  } = options;
  const finalWidth =
    width - paddingLeft - paddingRight - marginLeft - marginRight;
  const finalHeight =
    height - paddingTop - paddingBottom - marginTop - marginBottom;
  return { width: finalWidth, height: finalHeight };
}
