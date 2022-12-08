import { G2View } from '../runtime';

type Size = {
  width: number;
  height: number;
};

const parseInt10 = (d: string) => (d ? parseInt(d) : 0);

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
    parseInt10(style.paddingTop) + parseInt10(style.paddingBottom);

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
export function getBBoxSize(options: G2View): Size {
  const {
    height,
    width,
    padding = 0,
    paddingLeft = padding,
    paddingRight = padding,
    paddingTop = padding,
    paddingBottom = padding,
    margin = 0,
    marginLeft = margin,
    marginRight = margin,
    marginTop = margin,
    marginBottom = margin,
    inset = 0,
    insetLeft = inset,
    insetRight = inset,
    insetTop = inset,
    insetBottom = inset,
  } = options;
  const finalWidth =
    width -
    paddingLeft -
    paddingRight -
    marginLeft -
    marginRight -
    insetLeft -
    insetRight;
  const finalHeight =
    height -
    paddingTop -
    paddingBottom -
    marginTop -
    marginBottom -
    insetTop -
    insetBottom;
  return { width: finalWidth, height: finalHeight };
}
