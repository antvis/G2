import { Linear } from '@antv/scale';
import { upperFirst } from '@antv/util';
import { geoPath, geoGraticule10 } from 'd3-geo';
import { maybeTooltip } from '../utils/mark';
import { CompositionComponent as CC } from '../runtime';
import { GeoViewComposition } from '../spec';

import * as d3Projection from './d3Projection';

/**
 * Get projection factory from d3-projection.
 */
function normalizeProjection(type: string) {
  if (typeof type === 'function') return type;
  const name = `geo${upperFirst(type)}`;
  const projection = d3Projection[name];
  if (!projection) throw new Error(`Unknown coordinate: ${type}`);
  return projection;
}

/**
 * @see https://github.com/mapbox/geojson-merge/blob/master/index.js
 */
function mergeGeoJSON(gjs) {
  return {
    type: 'FeatureCollection',
    features: gjs.flatMap((gj) => normalizeGeoJSON(gj).features),
  };
}

function normalizeGeoJSON(gj) {
  const types = {
    Point: 'geometry',
    MultiPoint: 'geometry',
    LineString: 'geometry',
    MultiLineString: 'geometry',
    Polygon: 'geometry',
    MultiPolygon: 'geometry',
    GeometryCollection: 'geometry',
    Feature: 'feature',
    FeatureCollection: 'featureCollection',
  };
  if (!gj || !gj.type) return null;
  const type = types[gj.type];
  if (!type) return null;
  if (type === 'geometry') {
    return {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {},
          geometry: gj,
        },
      ],
    };
  } else if (type === 'feature') {
    return {
      type: 'FeatureCollection',
      features: [gj],
    };
  } else if (type === 'featureCollection') {
    return gj;
  }
}

/**
 * Specify the options for d3 projection
 * @see https://github.com/d3/d3-geo#projections
 * @todo Specify key each by each.
 */
function setProjectionOptions(projection, options) {
  for (const [key, value] of Object.entries(options)) {
    projection[key]?.(value);
  }
}

function setProjectionSize(projection, nodes, layout, options) {
  const defaultOutline = () => {
    const geoNodes = nodes.filter(isGeoPath);
    // For geoPath with sphere mark, use it as outline.
    const sphere = geoNodes.find((d) => d.sphere);
    if (sphere) return { type: 'Sphere' };

    // Merge all GeoJSON as the outline.
    return mergeGeoJSON(
      geoNodes.filter((d) => !d.sphere).flatMap((d) => d.data.value),
    );
  };
  const { outline = defaultOutline() } = options;
  const { size = 'fitExtent' } = options;
  if (size === 'fitExtent') {
    return setFitExtent(projection, outline, layout);
  } else if (size === 'fitWidth') {
    return setFitWidth(projection, outline, layout);
  }
}

function setFitExtent(projection, object, layout) {
  const { x, y, width, height } = layout;
  projection.fitExtent(
    [
      [x, y],
      [width, height],
    ],
    object,
  );
}

function setFitWidth(projection, object, layout) {
  const { width, height } = layout;
  const [[x0, y0], [x1, y1]] = geoPath(
    projection.fitWidth(width, object),
  ).bounds(object);
  const dy = Math.ceil(y1 - y0);
  const l = Math.min(Math.ceil(x1 - x0), dy);
  const s = (projection.scale() * (l - 1)) / l;
  const [tx, ty] = projection.translate();
  const t = ty + (height - dy) / 2;
  projection.scale(s).translate([tx, t]).precision(0.2);
}

/**
 * @todo Remove this.
 */
function normalizeDataSource(node) {
  const { data } = node;
  if (Array.isArray(data)) return { ...node, data: { value: data } };
  const { type } = data;
  if (type === 'graticule10') {
    return { ...node, data: { value: [geoGraticule10()] } };
  } else if (type === 'sphere') {
    // Sphere is not a standard type of GeoJSON.
    // Mark this geoPath as sphere geoPath.
    return { ...node, sphere: true, data: { value: [{ type: 'Sphere' }] } };
  }
  return node;
}

function isGeoPath(d) {
  return d.type === 'geoPath';
}

export type GeoViewOptions = Omit<GeoViewComposition, 'type'>;

/**
 * A view with geo coordinate.
 */
export const GeoView: CC<GeoViewOptions> = () => {
  return (options) => {
    const { children, coordinate: projection = {} } = options;
    if (!Array.isArray(children)) return [];

    // Get projection factory.
    const { type = 'equalEarth', ...projectionOptions } = projection;
    const createProjection = normalizeProjection(type);
    const nodes = children.map(normalizeDataSource);

    // Set path generator lazily.
    let path;

    // A custom geo coordinate.
    function Geo() {
      return [
        [
          'custom',
          (x, y, width, height) => {
            // Create and set projection.
            const visual = createProjection();
            const layout = { x, y, width, height };
            setProjectionSize(visual, nodes, layout, projectionOptions);
            setProjectionOptions(visual, projectionOptions);

            // Create path generator.
            path = geoPath(visual);

            // Normalize projection and projection.invert,
            // which normalize projected points.
            const scaleX = new Linear({
              domain: [x, x + width],
            });
            const scaleY = new Linear({
              domain: [y, y + height],
            });
            const normalize = (point) => {
              const visualPoint = visual(point);
              if (!visualPoint) return [null, null];
              const [vx, vy] = visualPoint;
              return [scaleX.map(vx), scaleY.map(vy)];
            };
            const normalizeInvert = (point) => {
              if (!point) return null;
              const [px, py] = point;
              const visualPoint = [scaleX.invert(px), scaleY.invert(py)];
              return visual.invert(visualPoint);
            };
            return {
              transform: (point) => normalize(point),
              untransform: (point) => normalizeInvert(point),
            };
          },
        ],
      ];
    }

    function GeoPath(options) {
      const { style, tooltip = {} } = options;
      return {
        ...options,
        type: 'path',
        tooltip: maybeTooltip(tooltip, {
          title: 'id',
          items: [{ channel: 'color' }],
        }),
        style: {
          ...style,
          d: (d) => path(d) || [],
        },
      };
    }

    const t = (d) => (isGeoPath(d) ? GeoPath(d) : d);

    return [
      {
        ...options,
        type: 'view',
        scale: {
          x: { type: 'identity' },
          y: { type: 'identity' },
        },
        axis: false,
        coordinate: { type: Geo },
        children: nodes.flatMap(t),
      },
    ];
  };
};

GeoView.props = {};
