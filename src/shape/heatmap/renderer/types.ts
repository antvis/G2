export type HeatmapGradientArray = Array<[number, string]>;
export type HeatmapGradient = string | HeatmapGradientArray;

export type HeatmapRendererOptions = {
  /**
   * An gradient string that represents the gradient (syntax: number string [0,1] : color string).
   */
  gradient?: HeatmapGradient;
  /**
   * A global opacity for the whole heatmap, default = 0.6.
   * This overrides maxOpacity and minOpacity if set!
   */
  opacity?: number;
  /**
   * The maximal opacity the highest value in the heatmap will have. (will be overridden if opacity set).
   */
  maxOpacity?: number;
  /**
   * The minimum opacity the lowest value in the heatmap will have (will be overridden if opacity set).
   */
  minOpacity?: number;
  /**
   * The blur factor that will be applied to all datapoints, default = 0.85.
   * The higher the blur factor is, the smoother the gradients will be.
   */
  blur?: number;
  /**
   * Use gradient opacity.
   */
  useGradientOpacity?: boolean;
};

export type HeatmapRendererData = {
  x: number;
  y: number;
  value: number;
  radius: number;
};
