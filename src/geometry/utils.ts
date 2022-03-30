import { G2Theme, MarkChannel } from 'runtime';

export function applyStyle(
  index: number,
  value: MarkChannel,
  style: Record<string, any>,
  theme: G2Theme,
  defaults = {
    color: (theme: G2Theme) => theme.defaultColor,
    size: (theme: G2Theme) => theme.defaultSize,
  },
): Record<string, any> {
  const { color: C, size: S } = value;
  const { color, size } = defaults;
  return {
    color: C?.[index] || color(theme),
    size: S?.[index] || size(theme),
    ...style,
  };
}
