import { Text, Group, Circle, Path } from '@antv/g';
import { deepMix, isUndefined, find, get, filter } from '@antv/util';

import type { PathArray } from '@antv/util';
import type { CircleStyleProps, TextStyleProps, PathStyleProps } from '@antv/g';
import { selectPlotArea } from './utils';

// Get element.
const getElements = (plot) => {
  return plot.querySelectorAll('.element');
};

export type ElementPointMoveOptions = {
  selected?: number[];
  selectedChange?: (selected) => void;
  dataChange?: (newChangeData, newData) => void;
  labelStyle?: TextStyleProps;
  lineDashPathStyle?: PathStyleProps;
  pointStyle?: CircleStyleProps;
  precision?: number;
  [key: string]: any;
};

const DEFAULT_STYLE = {
  pointStyle: {
    r: 6,
    strokeWidth: 1,
    stroke: '#333',
    activeStroke: '#f5f5f5',
  } as CircleStyleProps,
  lineDashPathStyle: {
    stroke: '#888',
    lineDash: [3, 4],
  },
  labelStyle: {
    fontSize: 12,
    fill: '#888',
    stroke: '#fff',
    lineWidth: 1,
    y: -6,
    x: 2,
  } as TextStyleProps,
};

// point shape name.
const MOVE_POINT_NAME = 'movePoint';

// Element mouseenter change style.
const elementMouseenter = (e) => {
  const element = e.target;
  const { markType } = element;
  // Mark line.
  if (markType === 'line') {
    element.attr('_lineWidth', element.attr('lineWidth') || 1);
    element.attr('lineWidth', element.attr('_lineWidth') + 3);
  }
  // Mark interval.
  if (markType === 'interval') {
    element.attr('_opacity', element.attr('opacity') || 1);
    element.attr('opacity', 0.7 * element.attr('_opacity'));
  }
};

// Element mouseleave change style.
const elementMouseleave = (e) => {
  const element = e.target;
  const { markType } = element;
  // Mark line.
  if (markType === 'line') {
    element.attr('lineWidth', element.attr('_lineWidth'));
  }
  // Mark interval.
  if (markType === 'interval') {
    element.attr('opacity', element.attr('_opacity'));
  }
};

// Points create path.
const getPointsPath = (points: number[][], isClose = false) => {
  const path = filter(points, (d) => !!d).map((d, i) => {
    return [i === 0 ? 'M' : 'L', ...d];
  }) as PathArray;

  if (isClose) {
    path.push(['Z']);
  }
  return path;
};

// Get the latest overall data based on the individual data changes.
const getNewData = (newChangeData, data, encode) => {
  return data.map((d) => {
    if (encode.x && d[encode.x] === newChangeData[encode.x]) {
      if (encode.color) {
        return d[encode.color] === newChangeData[encode.color]
          ? newChangeData
          : d;
      } else {
        return newChangeData;
      }
    }

    return d;
  });
};

// Find origin element data.
const getElementDataRatioTransformFn = (element) => {
  const v = get(element, ['__data__', 'items', '0', 'value']);
  const {
    __data__: { data, encode, transform },
    childNodes,
  } = element.parentNode;
  const isNormalizeY = find(transform, ({ type }) => type === 'normalizeY');
  const yField = get(encode, ['y', 'field']);
  const value = data[childNodes.indexOf(element)][yField];

  return (newValue) => {
    if (isNormalizeY) {
      return (newValue / (1 - newValue) / (v / (1 - v))) * value;
    }

    return newValue;
  };
};

// Point shape select change style.
const selectedPointsStyle = (pointsShape, selected, defaultStyle) => {
  pointsShape.forEach((shape, index) => {
    shape.attr(
      'stroke',
      selected[1] === index
        ? defaultStyle['activeStroke']
        : defaultStyle['stroke'],
    );
  });
};

// Create help show message shape.
const createHelpShape = (
  group,
  circle,
  pathStyle,
  labelStyle,
): [Path, Text] => {
  const pathShape = new Path({
    style: pathStyle,
  });

  const labelShape = new Text({
    style: labelStyle,
  });

  circle.appendChild(labelShape);
  group.appendChild(pathShape);
  return [pathShape, labelShape];
};

// Get color scale type.
const getColorType = (scaleColor, color) => {
  const indexOf = get(scaleColor, ['options', 'range', 'indexOf']);
  if (!indexOf) return;
  const i = scaleColor.options.range.indexOf(color);
  return scaleColor.sortedDomain[i];
};

/**
 * ElementPointMove interaction.
 */
export function ElementPointMove(
  elementPointMoveOptions: ElementPointMoveOptions = {},
) {
  const {
    pointStyle = {},
    lineDashPathStyle = {},
    labelStyle = {},
    selected = [0],
    selectedChange = () => {},
    dataChange = () => {},
    precision = 2,
  } = elementPointMoveOptions;

  // Shape default style.
  const pathDefaultStyle = {
    ...DEFAULT_STYLE.lineDashPathStyle,
    ...lineDashPathStyle,
  };

  const labelDefaultStyle = {
    ...DEFAULT_STYLE.labelStyle,
    ...labelStyle,
  };

  const pointDefaultStyle = {
    ...DEFAULT_STYLE.pointStyle,
    ...pointStyle,
  };

  return (context) => {
    const {
      update,
      setState,
      container,
      view,
      options: { marks, coordinate: coordinateOptions },
    } = context;
    const plotArea = selectPlotArea(container);
    const elements = getElements(plotArea);
    let newState;
    let newSelected = selected;

    const { transform = [] } = coordinateOptions;
    const isTranspose = !!find(transform, ({ type }) => type === 'transpose');

    // Create points
    const pointsGroup = new Group({
      style: {
        // Tooltip point need down.
        zIndex: 2,
      },
    });
    plotArea.appendChild(pointsGroup);

    // Element click change style.
    const elementClick = (e) => {
      const element = e.target;
      newSelected = [element.parentNode.childNodes.indexOf(element)];
      selectedChange(newSelected);
      createPoints(element);
    };

    // Create select element points.
    const createPoints = (element) => {
      const { attributes, markType, __data__: data } = element;
      const { stroke: fill } = attributes;
      const { points, seriesTitle, color, title } = data;

      // Transpose Currently only do mark interval;
      if (isTranspose && markType !== 'interval') return;

      pointsGroup.removeChildren();
      let downPointHeight = 0;

      const updateView = async (x, y, color, markType) => {
        setState('elementPointMove', (viewOptions) => {
          // Update marks.
          const newMarks = (newState?.options?.marks || marks).map((mark) => {
            if (mark.type !== markType) return mark;
            const { data, encode } = mark;
            const encodeKeys = Object.keys(encode);

            // Get change new one element data.
            const newChangeData = encodeKeys.reduce((value, key) => {
              const dataKey = encode[key];
              if (key === 'x') {
                value[dataKey] = x;
              }
              if (key === 'y') {
                value[dataKey] = y;
              }
              if (key === 'color') {
                value[dataKey] = color;
              }
              return value;
            }, {} as any);

            // Get change new all data.
            const newData = getNewData(newChangeData, data, encode);
            dataChange(newChangeData, newData);

            return deepMix({}, mark, {
              data: newData,
              // No need animate
              animate: false,
            });
          });

          return { ...viewOptions, marks: newMarks };
        });

        return await update('elementPointMove');
      };

      if (markType === 'line') {
        points.forEach((p, index) => {
          const circle = new Circle({
            name: MOVE_POINT_NAME,
            style: {
              cx: p[0],
              cy: p[1],
              fill,
              ...pointDefaultStyle,
            },
          });

          circle.addEventListener('mousedown', (e) => {
            const { scale, coordinate } = newState?.view || view;
            const { color: scaleColor, y: scaleY } = scale;

            container.attr('cursor', 'move');

            newSelected[1] = index;
            selectedPointsStyle(
              pointsGroup.childNodes,
              newSelected,
              pointDefaultStyle,
            );
            selectedChange(newSelected);

            const [pathShape, labelShape] = createHelpShape(
              pointsGroup,
              circle,
              pathDefaultStyle,
              labelDefaultStyle,
            );

            // Point move change text
            const pointMousemove = (e) => {
              const newCy = p[1] + e.clientY - downPointHeight;
              const [, y] = coordinate.invert([p[0], newCy]);
              const newPath = getPointsPath([
                points[index - 1],
                [p[0], newCy],
                points[index + 1],
              ]);
              labelShape.attr('text', scaleY.invert(y).toFixed(precision));
              pathShape.attr('path', newPath);
              circle.attr('cy', newCy);
            };

            downPointHeight = e.clientY;
            window.addEventListener('mousemove', pointMousemove);

            const mouseupFn = async () => {
              container.attr('cursor', 'default');
              window.removeEventListener('mousemove', pointMousemove);
              container.removeEventListener('mouseup', mouseupFn);

              if (isUndefined(labelShape.attr('text'))) return;

              const x = seriesTitle[index];
              const y = Number(labelShape.attr('text'));
              const colorType = getColorType(scaleColor, color);

              newState = await updateView(x, y, colorType, 'line');

              labelShape.remove();
              pathShape.remove();
              createPoints(element);
            };

            container.addEventListener('mouseup', mouseupFn);
          });

          pointsGroup.appendChild(circle);
        });

        selectedPointsStyle(
          pointsGroup.childNodes,
          newSelected,
          pointDefaultStyle,
        );
      } else if (markType === 'interval') {
        const circlePoint = isTranspose
          ? [points[0][0], (points[0][1] + points[1][1]) / 2]
          : [(points[0][0] + points[1][0]) / 2, points[0][1]];
        const ratioTransform = getElementDataRatioTransformFn(element);

        const circle = new Circle({
          name: MOVE_POINT_NAME,
          style: {
            cx: circlePoint[0],
            cy: circlePoint[1],
            fill,
            ...pointDefaultStyle,
            stroke: pointDefaultStyle['activeStroke'],
          },
        });

        circle.addEventListener('mousedown', (e) => {
          const { scale, coordinate } = newState?.view || view;
          const { color: scaleColor, y: scaleY } = scale;
          container.attr('cursor', 'move');

          const colorType = getColorType(scaleColor, color);

          const [pathShape, labelShape] = createHelpShape(
            pointsGroup,
            circle,
            pathDefaultStyle,
            labelDefaultStyle,
          );

          // Point move change text
          const pointMousemove = (e) => {
            if (isTranspose) {
              const newCx = circlePoint[0] + e.clientX - downPointHeight;
              const [initX] = coordinate.output([
                scaleY.output(0),
                scaleY.output(0),
              ]);

              const [, x] = coordinate.invert([
                initX + (newCx - points[2][0]),
                circlePoint[1],
              ]);
              const newPath = getPointsPath(
                [
                  [newCx, points[0][1]],
                  [newCx, points[1][1]],
                  points[2],
                  points[3],
                ],
                true,
              );

              labelShape.attr(
                'text',
                ratioTransform(scaleY.invert(x)).toFixed(precision),
              );
              pathShape.attr('path', newPath);
              circle.attr('cx', newCx);
            } else {
              const newCy = circlePoint[1] + e.clientY - downPointHeight;
              const [, initY] = coordinate.output([1, scaleY.output(0)]);

              const [, y] = coordinate.invert([
                circlePoint[0],
                initY - (points[2][1] - newCy),
              ]);
              const newPath = getPointsPath(
                [
                  [points[0][0], newCy],
                  [points[1][0], newCy],
                  points[2],
                  points[3],
                ],
                true,
              );

              labelShape.attr(
                'text',
                ratioTransform(scaleY.invert(y)).toFixed(precision),
              );
              pathShape.attr('path', newPath);
              circle.attr('cy', newCy);
            }
          };

          downPointHeight = isTranspose ? e.clientX : e.clientY;
          window.addEventListener('mousemove', pointMousemove);

          // Change mosueup change data and update 、clear shape.
          const mouseupFn = async () => {
            container.attr('cursor', 'default');
            container.removeEventListener('mouseup', mouseupFn);
            window.removeEventListener('mousemove', pointMousemove);

            if (isUndefined(labelShape.attr('text'))) return;

            const y = Number(labelShape.attr('text'));

            newState = await updateView(title, y, colorType, 'interval');

            labelShape.remove();
            pathShape.remove();
            createPoints(element);
          };

          container.addEventListener('mouseup', mouseupFn);
        });

        pointsGroup.appendChild(circle);
      }
    };

    // Add EventListener.
    elements.forEach((element, index) => {
      if (index === newSelected[0]) {
        createPoints(element);
      }
      element.addEventListener('click', elementClick);
      element.addEventListener('mouseenter', elementMouseenter);
      element.addEventListener('mouseleave', elementMouseleave);
    });

    const rootClick = (e) => {
      const element = e.target;
      if (element.name !== MOVE_POINT_NAME && !elements.includes(element)) {
        newSelected[1] = null;
        pointsGroup.removeChildren();
      }
    };

    container.addEventListener('mousedown', rootClick);

    // Remove EventListener.
    return () => {
      pointsGroup.remove();
      container.removeEventListener('mousedown', rootClick);
      elements.forEach((element) => {
        element.removeEventListener('click', elementClick);
        element.removeEventListener('mouseenter', elementMouseenter);
        element.removeEventListener('mouseleave', elementMouseleave);
      });
    };
  };
}
