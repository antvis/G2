import { Linear } from '@antv/scale';
import { deepMix, upperFirst } from '@antv/util';
import { geoPath } from 'd3-geo';
import { CompositionComponent as CC } from '../runtime';
import { GeoViewComposition } from '../spec';
import { defined, subObject } from '../utils/helper';
import * as d3Projection from './d3-projection';

type Encode = 'string' | ((d: any) => any);

/**
 * @todo Export from runtime?
 */
function field(encode: Encode): (d: any) => any {
  return typeof encode === 'function' ? encode : (d) => d[encode];
}

/**
 * @todo Export from runtime?
 */
function valueof(data: Record<string, any>[], encode: Encode): any[] {
  return Array.from(data, field(encode));
}

/**
 * Convert a GeoJSON to FeatureCollection.
 */
function normalizeFeatureCollection(
  object: Record<string, any>,
): Record<string, any> {
  return object.type === 'FeatureCollection'
    ? object
    : { type: 'FeatureCollection', features: [object] };
}

/**
 * Merge two GeoJSON to a single FeatureCollection.
 */
function mergeGeoJSON(
  source: Record<string, any>,
  target: Record<string, any>,
): Record<string, any> {
  const fs = normalizeFeatureCollection(source);
  const ft = normalizeFeatureCollection(target);
  return {
    type: 'FeatureCollection',
    features: [...fs.features, ...ft.features],
  };
}

/**
 * Get projection factory from d3-projection.
 */
function normalizeProjection(type: string) {
  if (typeof type === 'function') return type;
  const name = `geo${upperFirst(type)}`;
  const projection = d3Projection[name];
  if (!name) throw new Error(`Unknown project: ${type}`);
  return projection;
}

/**
 * Specify the options for d3 projection
 * @see https://github.com/d3/d3-geo#projections
 * @todo Specify key each by each.
 */
function setProjection(projection, options) {
  for (const [key, value] of Object.entries(options)) {
    projection[key]?.(value);
  }
}

export type GeoViewOptions = Omit<GeoViewComposition, 'type'>;

/**
 * A view with geo coordinate.
 */
export const GeoView: CC<GeoViewOptions> = () => {
  return (options) => {
    const { children, projection } = options;
    if (!Array.isArray(children)) return [];

    // Get projection factory.
    const { type: projectionType, ...projectionOptions } = projection;
    const createProjection = normalizeProjection(projectionType);

    // Transform choropleth to path.
    const isChoropleth = (d) => d.type === 'choropleth';

    // The order of key is equal to render order of path.
    const keys = ['feature', 'border', 'outline'];

    // Merge all features to compute bbox.
    const features = children
      .filter(isChoropleth)
      .flatMap((d) =>
        Object.entries(d.data.value)
          .filter(([key, value]) => keys.includes(key) && defined(value))
          .map(([, value]) => value),
      )
      .filter(defined)
      .reduce((total, value) => mergeGeoJSON(total, value), {
        type: 'FeatureCollection',
        features: [],
      });

    // Set path generator lazily.
    let path;

    // A custom geo coordinate.
    function Geo() {
      return [
        [
          'custom',
          (x, y, width, height) => {
            // Create project and path generator.
            const visual = createProjection().fitExtent(
              [
                [x, y],
                [width, height],
              ],
              features,
            );
            setProjection(visual, projectionOptions);
            path = geoPath(visual);

            // Normalize projection and projection.invert,
            // which normalize projected points.
            const scaleX = new Linear({
              domain: [x, x + width],
            });
            const scaleY = new Linear({
              domain: [y, y + height],
            });
            const abstract = (point) => {
              const visualPoint = visual(point);
              if (!visualPoint) return null;
              const [vx, vy] = visualPoint;
              return [scaleX.map(vx), scaleY.map(vy)];
            };
            const abstractInvert = (point) => {
              if (!point) return null;
              const [px, py] = point;
              const visualPoint = [scaleX.invert(px), scaleY.invert(py)];
              return visual.invert(visualPoint);
            };

            return {
              transform: (point) => abstract(point),
              untransform: (point) => abstractInvert(point),
            };
          },
        ],
      ];
    }

    // A composite geo mark which contains there single parts:
    // 1. feature: main path
    // 2. borders: border path to avoid masking intricate
    //    features such as islands and inlets
    // 3. outline: background path
    function Choropleth(options) {
      const DEFAULT = {
        outline: {
          style: {
            fill: 'none',
            stroke: '#000',
          },
        },
        feature: {},
        border: {
          style: {
            fill: 'none',
            stroke: '#fff',
          },
        },
        unknown: '#ccc',
      };

      const {
        data,
        key: markKey,
        style = {},
        encode = {},
        animate = {},
        scale,
      } = options;

      const { value, lookupKey = (d) => d.id, ...restEncode } = encode;

      // Get color encode for existed encode.
      const colorEncode = {
        border() {
          return null;
        },
        outline() {
          return null;
        },
        feature(encode) {
          // Lookup value from lookup data for color value.
          const { key: featureKey } = encode;
          const { lookup } = data.value;
          if (!lookup) return null;
          const N = valueof(lookup, lookupKey);
          const V = valueof(lookup, value).map((d) => (d == null ? NaN : +d));
          const idIndex = new Map(N.map((id, index) => [id, index]));
          const fk = field(featureKey);
          return (d) => V[idIndex.get(fk(d))];
        },
      };

      return keys
        .filter((key) => data.value[key])
        .map((key) => {
          const value = data.value[key];
          const { features } = normalizeFeatureCollection(value);
          const subStyle = subObject(style, key);
          const subAnimate = subObject(animate, key);
          const { key: ek = (d, i) => d.id || i, ...subEncode } = subObject(
            restEncode,
            key,
          );
          const color = colorEncode[key]({ key: ek, ...subEncode });
          const defaults = DEFAULT[key];
          return {
            type: 'path',
            key: `${markKey}-${key}`,
            data: features,
            encode: {
              key: ek,
              ...(color && { color }),
              ...subEncode,
            },
            scale: deepMix(
              {
                color: {
                  unknown: DEFAULT.unknown,
                },
              },
              scale,
            ),
            animate: subAnimate,
            style: {
              ...defaults.style,
              ...subStyle,
              d: (d) => path(d),
            },
          };
        });
    }

    const t = (d) => (isChoropleth(d) ? Choropleth(d) : d);
    return [
      {
        ...options,
        type: 'view',
        scale: {
          x: { type: 'identity' },
          y: { type: 'identity' },
        },
        axis: false,
        coordinate: [{ type: Geo }],
        children: children.flatMap(t),
      },
    ];
  };
};

GeoView.props = {};
