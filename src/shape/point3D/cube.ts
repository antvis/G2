import {
  MeshPhongMaterial,
  CubeGeometry,
  DirectionalLight,
  Mesh,
} from '@antv/g-plugin-3d';
import { applyStyle, getOrigin, toOpacityKey } from '../utils';
import { ShapeComponent as SC } from '../../runtime';
import { select } from '../../utils/selection';

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
      width: 5,
      height: 5,
      depth: 5,
    });
    // create a material with Phong lighting model
    // @ts-ignore
    Cube.props.material = new MeshPhongMaterial(device, {
      shininess: 30,
    });
    // add a directional light into scene
    const light = new DirectionalLight({
      style: {
        intensity: 3,
        fill: 'white',
        direction: [-1, 0, 1],
      },
    });
    context.canvas.appendChild(light);
  }

  return (points, value, defaults) => {
    const { color: defaultColor } = defaults;
    const { color = defaultColor, transform, opacity } = value;
    const [cx, cy, cz] = getOrigin(points);
    const r = value.size;
    // TODO: scale
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
