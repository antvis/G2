/**
 * Channels for all geometries.
 * The order is not important.
 */
export function baseChannels() {
  return [
    { name: 'color' },
    { name: 'shape' },
    { name: 'enterType' },
    { name: 'enterDelay' },
    { name: 'enterDuration' },
    { name: 'enterEasing' },
    { name: 'key', scale: 'identity' },
    { name: 'title', scale: 'identity' },
    { name: 'tooltip', scale: 'identity' },
  ];
}

/**
 * Inference for all geometries.
 * MaybeTuple should always be the first one,
 * because the following inference only accept nested channels.
 * MaybeKey should always be the second one to avoid redundant channel keys.
 */
export function baseInference() {
  return [
    { type: 'maybeTuple' },
    { type: 'maybeKey' },
    { type: 'maybeTitle' },
    { type: 'maybeTooltip' },
  ];
}
