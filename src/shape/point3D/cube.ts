import {
  MeshPhongMaterial,
  CubeGeometry,
  DirectionalLight,
  Mesh,
} from '@antv/g-plugin-3d';
import { applyStyle, getOrigin, toOpacityKey } from '../utils';
import { ShapeComponent as SC } from '../../runtime';
import { select } from '../../utils/selection';

const GEOMETRY_SIZE = 5;

export type CubeOptions = Record<string, any>;

/**
 * @see https://g.antv.antgroup.com/api/3d/geometry#cubegeometry
 */
export const Cube: SC<CubeOptions> = (options, context) => {
  // Render border only when colorAttribute is stroke.
  const { ...style } = options;

  // @ts-ignore
  if (!Cube.props.geometry) {
    const renderer = context.canvas.getConfig().renderer;
    const plugin = renderer.getPlugin('device-renderer');
    const device = plugin.getDevice();
    // create a sphere geometry
    // @ts-ignore
    Cube.props.geometry = new CubeGeometry(device, {
      width: GEOMETRY_SIZE,
      height: GEOMETRY_SIZE,
      depth: GEOMETRY_SIZE,
    });
    // create a material with Phong lighting model
    // @ts-ignore
    Cube.props.material = new MeshPhongMaterial(device, {
      shininess: 30,
    });
  }

  return (points, value, defaults) => {
    const { color: defaultColor } = defaults;
    const { color = defaultColor, transform, opacity } = value;
    const [cx, cy, cz] = getOrigin(points);
    const r = value.size;
    const finalRadius = r || style.r || defaults.r;

    const cube = new Mesh({
      style: {
        x: cx,
        y: cy,
        z: cz,
        // @ts-ignore
        geometry: Cube.props.geometry,
        // @ts-ignore
        material: Cube.props.material,
      },
    });
    cube.setOrigin(0, 0, 0);
    const scaling = finalRadius / GEOMETRY_SIZE;
    cube.scale(scaling);

    return select(cube)
      .call(applyStyle, defaults)
      .style('fill', color)
      .style('transform', transform)
      .style(toOpacityKey(options), opacity)
      .call(applyStyle, style)
      .node();
  };
};

Cube.props = {
  defaultMarker: 'cube',
};
