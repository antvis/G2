export const commonProps = {
  encode: { type: 'object' },
  scale: { type: 'object' },
  data: { type: 'value' },
  transform: { type: 'array' },
  style: { type: 'object' },
  animate: { type: 'object' },
  coordinate: { type: 'object' },
  interaction: { type: 'object' },
  label: { type: 'array', key: 'labels' },
  axis: { type: 'object' },
  legend: { type: 'object' },
  slider: { type: 'object' },
  scrollbar: { type: 'object' },
  state: { type: 'object' },
  layout: { type: 'object' },
  theme: { type: 'object' },
  title: { type: 'value' },
} as const;

export const markProps = {
  ...commonProps,
  tooltip: { type: 'mix' },
  viewStyle: { type: 'object' },
} as const;

export const compositionProps = {
  ...commonProps,
  labelTransform: { type: 'array' },
} as const;
