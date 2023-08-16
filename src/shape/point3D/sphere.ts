import {
  MeshPhongMaterial,
  SphereGeometry,
  DirectionalLight,
  Mesh,
} from '@antv/g-plugin-3d';
import { applyStyle, getOrigin, toOpacityKey } from '../utils';
import { ShapeComponent as SC } from '../../runtime';
import { select } from '../../utils/selection';

export type SphereOptions = Record<string, any>;

const GEOMETRY_SIZE = 5;

/**
 * @see https://g.antv.antgroup.com/api/3d/geometry#spheregeometry
 */
export const Sphere: SC<SphereOptions> = (options, context) => {
  // Render border only when colorAttribute is stroke.
  const { ...style } = options;

  // @ts-ignore
  if (!Sphere.props.geometry) {
    const renderer = context.canvas.getConfig().renderer;
    const plugin = renderer.getPlugin('device-renderer');
    const device = plugin.getDevice();
    // create a sphere geometry
    // @ts-ignore
    Sphere.props.geometry = new SphereGeometry(device, {
      radius: GEOMETRY_SIZE,
      latitudeBands: 32,
      longitudeBands: 32,
    });
    // create a material with Phong lighting model
    // @ts-ignore
    Sphere.props.material = new MeshPhongMaterial(device, {
      shininess: 30,
    });
  }

  return (points, value, defaults) => {
    const { color: defaultColor } = defaults;
    const { color = defaultColor, transform, opacity } = value;
    const [cx, cy, cz] = getOrigin(points);
    const r = value.size;
    const finalRadius = r || style.r || defaults.r;

    const sphere = new Mesh({
      style: {
        x: cx,
        y: cy,
        z: cz,
        // @ts-ignore
        geometry: Sphere.props.geometry,
        // @ts-ignore
        material: Sphere.props.material,
      },
    });
    sphere.setOrigin(0, 0, 0);
    const scaling = finalRadius / GEOMETRY_SIZE;
    sphere.scale(scaling);

    return select(sphere)
      .call(applyStyle, defaults)
      .style('fill', color)
      .style('transform', transform)
      .style(toOpacityKey(options), opacity)
      .call(applyStyle, style)
      .node();
  };
};

Sphere.props = {
  defaultMarker: 'sphere',
};
