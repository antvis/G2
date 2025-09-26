import { isOrdinalScale } from '../utils/scale';
import { isFalsyValue } from './utils';

/**
 * Runtime scale interface for adaptive filtering operations.
 * Represents the actual scale instance available at runtime.
 */
export interface RuntimeScale {
  getOptions(): {
    domain: unknown[];
    range?: [number, number];
    ratio?: number;
  };
  map(value: unknown): number;
  invert(value: number): unknown;
  getBandWidth?: (value?: unknown) => number;
  getStep?: (value?: unknown) => number;
}

/**
 * Adaptive filter mode configuration.
 */
export type AdaptiveFilterMode =
  | 'filter' // Enable adaptive filtering with data window filtering
  | false // Disable adaptive filtering
  | null; // Disable adaptive filtering

/**
 * Mark data structure for adaptive filtering.
 * Contains mark identifier and associated channel data.
 */
export interface MarkDataPair {
  markKey: string;
  channelData: { [key: string]: unknown[] };
}

/**
 * Scale information for single-axis adaptive filtering.
 */
export interface SingleAxisScaleInfo {
  currentScale: RuntimeScale;
  targetScale: RuntimeScale;
  isSourceDiscrete: boolean;
  isTargetDiscrete: boolean;
  shouldPreserveZeroBaseline: boolean;
}

/**
 * Scale information for multi-axis adaptive filtering.
 */
export interface MultiAxisScaleInfo {
  currentScale: RuntimeScale;
  targetScales: RuntimeScale[];
  isSourceDiscrete: boolean;
  isTargetDiscrete: boolean[];
  shouldPreserveZeroBaseline: boolean[];
  targetScaleKeys: string[];
}

/**
 * Parameters for single-axis adaptive filtering operations.
 */
export interface SingleAxisFilteringParams {
  markDataPairs: MarkDataPair[];
  domain: unknown[];
  scaleInfo: SingleAxisScaleInfo;
  adaptiveMode: AdaptiveFilterMode;
  shouldFilterXAxis?: boolean;
}

/**
 * Parameters for multi-axis adaptive filtering operations.
 */
export interface MultiAxisFilteringParams {
  markDataPairs: MarkDataPair[];
  domain: unknown[];
  scaleInfo: MultiAxisScaleInfo;
  markToScaleMap: Map<string, string>;
  adaptiveMode: AdaptiveFilterMode;
  isViewSlider: boolean;
  shouldFilterXAxis?: boolean;
}

/**
 * Options for calculating filtered domain values.
 */
interface CalculateFilteredDomainOptions {
  isTargetDiscrete: boolean;
  filteredValues: number[];
  shouldPreserveZeroBaseline: boolean;
}

/**
 * Extracts scale information for single-axis adaptive filtering.
 *
 * @param shouldFilterXAxis - Whether to adapt X-axis (true) or Y-axis (false)
 * @param scaleX - X-axis scale instance
 * @param scaleY - Y-axis scale instance
 * @returns Scale information required for single-axis filtering
 */
export function extractSingleAxisScaleInfo(
  shouldFilterXAxis: boolean,
  scaleX: RuntimeScale,
  scaleY: RuntimeScale,
): SingleAxisScaleInfo {
  const currentScale = shouldFilterXAxis ? scaleY : scaleX;
  const targetScale = shouldFilterXAxis ? scaleX : scaleY;
  const isSourceDiscrete = isOrdinalScale(currentScale);
  const isTargetDiscrete = isOrdinalScale(targetScale);

  const targetOriginalDomain = targetScale.getOptions().domain;
  const shouldPreserveZeroBaseline =
    !isTargetDiscrete &&
    targetOriginalDomain &&
    targetOriginalDomain.length >= 2 &&
    targetOriginalDomain[0] === 0;

  return {
    currentScale,
    targetScale,
    isSourceDiscrete,
    isTargetDiscrete,
    shouldPreserveZeroBaseline,
  };
}

/**
 * Extracts scale information for multi-axis adaptive filtering.
 * Handles scenarios where multiple independent scales exist (x1, x2, y1, y2, etc.).
 *
 * @param shouldFilterXAxis - Whether to adapt X-axis (true) or Y-axis (false)
 * @param scale - Record of all available scale instances
 * @param scaleX - Primary X-axis scale instance
 * @param scaleY - Primary Y-axis scale instance
 * @param channelDomain - Channel domain configuration
 * @returns Scale information required for multi-axis filtering
 */
export function extractMultiAxisScaleInfo(
  shouldFilterXAxis: boolean,
  scale: Record<string, RuntimeScale>,
  scaleX: RuntimeScale,
  scaleY: RuntimeScale,
  channelDomain: Record<string, unknown[]>,
): MultiAxisScaleInfo {
  const currentScale = shouldFilterXAxis ? scaleY : scaleX;

  /**
   * Retrieves scale domains for a specific axis type (x or y).
   * Supports both primary axes (x, y) and numbered variants (x1, x2, y1, y2).
   */
  const getAxisScaleDomains = (axisType: 'x' | 'y') => {
    const axisScales: Record<string, unknown[]> = {};
    Object.keys(channelDomain).forEach((key) => {
      if (key === axisType || key.match(new RegExp(`^${axisType}\\d+$`))) {
        axisScales[key] = channelDomain[key];
      }
    });
    return axisScales;
  };

  const targetScaleDomain = shouldFilterXAxis
    ? getAxisScaleDomains('x')
    : getAxisScaleDomains('y');
  const targetScaleKeys = Object.keys(targetScaleDomain);

  const targetScales = targetScaleKeys.map((item) => scale[item]);
  const isSourceDiscrete = isOrdinalScale(currentScale);
  const isTargetDiscrete = targetScales.map((targetScale) =>
    isOrdinalScale(targetScale),
  );

  const shouldPreserveZeroBaseline = targetScales.map((targetScale, index) => {
    const targetOriginalDomain = targetScale.getOptions().domain;
    const isDiscrete = isTargetDiscrete[index];
    return (
      !isDiscrete &&
      targetOriginalDomain &&
      targetOriginalDomain.length >= 2 &&
      targetOriginalDomain[0] === 0
    );
  });

  return {
    currentScale,
    targetScales,
    isSourceDiscrete,
    isTargetDiscrete,
    shouldPreserveZeroBaseline,
    targetScaleKeys,
  };
}

/**
 * Removes duplicate values from an array and returns sorted result.
 *
 * @param values - Array of numeric values
 * @returns Sorted array with unique values
 */
function getUniqueSortedValues(values: number[]): number[] {
  const uniqueValues = Array.from(new Set(values));
  return uniqueValues.sort((a, b) => a - b);
}

/**
 * Calculates the filtered domain based on target scale type and constraints.
 *
 * @param options - Configuration for domain calculation
 * @returns Calculated domain array
 */
function calculateFilteredDomain({
  isTargetDiscrete,
  filteredValues,
  shouldPreserveZeroBaseline,
}: CalculateFilteredDomainOptions): unknown[] {
  if (isTargetDiscrete) {
    return getUniqueSortedValues(filteredValues);
  } else {
    const min = Math.min(...filteredValues);
    const max = Math.max(...filteredValues);
    return shouldPreserveZeroBaseline ? [0, max] : [min, max];
  }
}

/**
 * Converts various value types to numeric for comparison.
 * Handles Date objects, strings, and numbers.
 */
function convertToNumeric(value: unknown): number {
  if (value instanceof Date) {
    return value.getTime();
  }
  if (typeof value === 'string') {
    return parseFloat(value);
  }
  return Number(value);
}

/**
 * Filters mark data based on domain constraints with bidirectional support.
 * Supports both discrete and continuous scales with proper domain calculation.
 *
 * @param markDataPairs - Array of mark data with channel information
 * @param domain - Domain values for filtering
 * @param isSourceDiscrete - Whether the source scale is discrete
 * @param isTargetDiscrete - Whether the target scale is discrete
 * @param shouldPreserveZeroBaseline - Whether to preserve zero baseline for continuous scales
 * @param adaptiveMode - Adaptive filtering mode configuration
 * @param shouldFilterXAxis - Whether to adapt X-axis (true) or Y-axis (false)
 * @returns Filtered domain array
 */
export function filterMarkDataByDomain(
  markDataPairs: MarkDataPair[],
  domain: unknown[],
  isSourceDiscrete: boolean,
  isTargetDiscrete: boolean,
  shouldPreserveZeroBaseline: boolean,
  adaptiveMode: AdaptiveFilterMode = 'filter',
  shouldFilterXAxis = false,
): unknown[] {
  if (isFalsyValue(adaptiveMode)) {
    return [];
  }

  const sourceChannel = shouldFilterXAxis ? 'y' : 'x';
  const targetChannel = shouldFilterXAxis ? 'x' : 'y';
  const allFilteredTargetValues: number[] = [];

  for (const markData of markDataPairs) {
    const { channelData } = markData;
    const sourceValues = channelData[sourceChannel] || [];
    const targetValues = channelData[targetChannel] || [];

    // Handle different data structures based on channel type:
    // X channel: one-dimensional array [x1, x2, x3, ...]
    // Y channel: two-dimensional array [[y1, y2, y3, ...]]

    // Normalize source values to one-dimensional array
    const normalizedSourceValues = Array.isArray(sourceValues[0])
      ? sourceValues[0] // If it's 2D array (Y channel), take first sub-array
      : sourceValues; // If it's 1D array (X channel), use as is

    // Handle target values based on their structure
    const isTargetArray2D = Array.isArray(targetValues[0]);

    if (normalizedSourceValues.length === 0) continue;

    const dataLength = normalizedSourceValues.length;

    for (let i = 0; i < dataLength; i++) {
      const sourceValue = normalizedSourceValues[i];
      let shouldInclude = false;

      if (isSourceDiscrete) {
        shouldInclude = domain.includes(sourceValue);
      } else {
        // Handle both numeric and Date domains
        if (domain.length >= 2) {
          const sourceTime = convertToNumeric(sourceValue);
          const domainStartTime = convertToNumeric(domain[0]);
          const domainEndTime = convertToNumeric(domain[domain.length - 1]);

          if (
            !isNaN(sourceTime) &&
            !isNaN(domainStartTime) &&
            !isNaN(domainEndTime)
          ) {
            shouldInclude =
              sourceTime >= domainStartTime && sourceTime <= domainEndTime;
          }
        }
      }

      if (adaptiveMode === 'filter' && shouldInclude) {
        // Collect target channel values for this data point
        if (isTargetArray2D) {
          // Target is 2D array (Y channel)
          const numChannels = targetValues.length;
          for (let channelIdx = 0; channelIdx < numChannels; channelIdx++) {
            const channelData = targetValues[channelIdx];
            if (Array.isArray(channelData) && i < channelData.length) {
              const targetValue = channelData[i];
              const numericValue = convertToNumeric(targetValue);
              if (!isNaN(numericValue)) {
                allFilteredTargetValues.push(numericValue);
              }
            }
          }
        } else {
          // Target is 1D array (X channel)
          if (i < targetValues.length) {
            const targetValue = targetValues[i];
            const numericValue = convertToNumeric(targetValue);
            if (!isNaN(numericValue)) {
              allFilteredTargetValues.push(numericValue);
            }
          }
        }
      }
    }
  }

  if (allFilteredTargetValues.length > 0) {
    return calculateFilteredDomain({
      isTargetDiscrete,
      filteredValues: allFilteredTargetValues,
      shouldPreserveZeroBaseline,
    });
  }

  return [];
}

/**
 * Processes adaptive filtering for single-axis scenarios.
 *
 * @param params - Single-axis filtering parameters
 * @returns Filtered domain array
 */
export function processSingleAxisFiltering({
  markDataPairs,
  domain,
  scaleInfo,
  adaptiveMode,
  shouldFilterXAxis = false,
}: SingleAxisFilteringParams): unknown[] {
  const { isSourceDiscrete, isTargetDiscrete, shouldPreserveZeroBaseline } =
    scaleInfo;

  return filterMarkDataByDomain(
    markDataPairs,
    domain,
    isSourceDiscrete,
    isTargetDiscrete,
    shouldPreserveZeroBaseline,
    adaptiveMode,
    shouldFilterXAxis,
  );
}

/**
 * Processes multi-axis filtering for view-level sliders.
 * Handles scenarios with independent scales across multiple marks.
 *
 * @param params - Multi-axis filtering parameters
 * @returns Map of scale keys to filtered domain arrays
 */
export function processMultiAxisViewFiltering({
  markDataPairs,
  domain,
  scaleInfo,
  markToScaleMap,
  adaptiveMode,
  shouldFilterXAxis = false,
}: MultiAxisFilteringParams): Map<string, unknown[]> {
  const filteredDomain = new Map<string, unknown[]>();
  const {
    isSourceDiscrete,
    isTargetDiscrete,
    shouldPreserveZeroBaseline,
    targetScaleKeys,
  } = scaleInfo;

  markDataPairs.forEach((markData) => {
    const scaleKey = markToScaleMap.get(markData.markKey);
    if (!scaleKey) return;

    const scaleIndex = targetScaleKeys.indexOf(scaleKey);
    if (scaleIndex === -1) return;

    const currentIsTargetDiscrete = isTargetDiscrete[scaleIndex];
    const currentShouldPreserveZeroBaseline =
      shouldPreserveZeroBaseline[scaleIndex];

    const markFilteredDomain = filterMarkDataByDomain(
      [markData],
      domain,
      isSourceDiscrete,
      currentIsTargetDiscrete,
      currentShouldPreserveZeroBaseline,
      adaptiveMode,
      shouldFilterXAxis,
    );

    filteredDomain.set(scaleKey, markFilteredDomain);
  });

  return filteredDomain;
}

/**
 * Processes multi-axis filtering for mark-level sliders.
 * Uses all marks that share the same target scale key instead of just the target mark.
 *
 * @param markDataPairs - Array of mark data pairs
 * @param domain - Domain values for filtering
 * @param scaleInfo - Single-axis scale information
 * @param targetMarkKey - Key of the target mark to filter
 * @param targetScaleKey - Key of the target scale to update
 * @param adaptiveMode - Adaptive filtering mode
 * @param shouldFilterXAxis - Whether to adapt X-axis (true) or Y-axis (false)
 * @param markToScaleMap - Map from mark keys to scale keys to identify shared axes
 * @returns Map of scale keys to filtered domain arrays
 */
export function processMultiAxisMarkFiltering(
  markDataPairs: MarkDataPair[],
  domain: unknown[],
  scaleInfo: SingleAxisScaleInfo,
  targetMarkKey: string,
  targetScaleKey: string,
  adaptiveMode: AdaptiveFilterMode,
  shouldFilterXAxis = false,
  markToScaleMap?: Map<string, string>,
): Map<string, unknown[]> {
  const filteredDomain = new Map<string, unknown[]>();

  // Early return if no data to process
  if (markDataPairs.length === 0 || domain.length === 0) {
    return filteredDomain;
  }

  const { isSourceDiscrete, isTargetDiscrete, shouldPreserveZeroBaseline } =
    scaleInfo;

  // Find all marks that share the same target scale key
  const relevantMarkData = markToScaleMap
    ? markDataPairs.filter((markData) => {
        const markScaleKey = markToScaleMap.get(markData.markKey);
        return markScaleKey === targetScaleKey;
      })
    : markDataPairs.filter((markData) => markData.markKey === targetMarkKey);

  // Early return if no relevant marks found
  if (relevantMarkData.length === 0) {
    return filteredDomain;
  }

  const markFilteredDomain = filterMarkDataByDomain(
    relevantMarkData,
    domain,
    isSourceDiscrete,
    isTargetDiscrete,
    shouldPreserveZeroBaseline,
    adaptiveMode,
    shouldFilterXAxis,
  );

  filteredDomain.set(targetScaleKey, markFilteredDomain);
  return filteredDomain;
}

/**
 * Updates channel domains with filtered results.
 * Supports both single-axis and multi-axis scenarios.
 *
 * @param channelDomain - Current channel domain configuration
 * @param filteredDomain - Filtered domain values (array for single-axis, Map for multi-axis)
 * @param shouldFilterXAxis - Whether X-axis is being filtered
 * @param isMultiAxis - Whether this is a multi-axis scenario
 */
export function updateChannelDomains(
  channelDomain: Record<string, unknown[]>,
  filteredDomain: unknown[] | Map<string, unknown[]>,
  shouldFilterXAxis: boolean,
  isMultiAxis: boolean,
): void {
  if (isMultiAxis && filteredDomain instanceof Map) {
    filteredDomain.forEach((domain, scaleKey) => {
      if (domain && Array.isArray(domain) && domain.length > 0) {
        channelDomain[scaleKey] = domain;
      }
    });
  } else if (!isMultiAxis && Array.isArray(filteredDomain)) {
    if (filteredDomain.length > 0) {
      channelDomain[shouldFilterXAxis ? 'x' : 'y'] = filteredDomain;
    }
  }
}
