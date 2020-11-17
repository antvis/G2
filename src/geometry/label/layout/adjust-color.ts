import { IGroup, IShape } from '../../../dependents';
import { BBox } from '../../../util/bbox';
import { isContrastColorWhite } from '../../../util/color';
import Element from '../../element';
import { LabelItem } from '../interface';

export function adjustColor(items: LabelItem[], labels: IGroup[], shapes: IShape[] | IGroup[]) {
  if (shapes.length === 0) {
    return;
  }
  const element: Element = shapes[0].get('element');
  const theme = element.geometry.theme;
  const { fillColorLight, fillColorDark } = theme.labels || {};

  shapes.forEach((shape: IShape | IGroup, index: number) => {
    const label = labels[index];
    const textShape = label.find((el) => el.get('type') === 'text');
    const shapeBBox = BBox.fromObject(shape.getBBox());
    const textBBox = BBox.fromObject(textShape.getCanvasBBox());
    const overflow = !shapeBBox.contains(textBBox);

    const bgColor = shape.attr('fill');
    const fillWhite = isContrastColorWhite(bgColor);

    if (!overflow) {
      if (fillWhite) {
        if (fillColorLight) {
          textShape.attr('fill', fillColorLight);
        }
      } else {
        if (fillColorDark) {
          textShape.attr('fill', fillColorDark);
        }
      }
    } else {
      // 出现溢出直接应用 overflowLabel 样式
      textShape.attr(theme.overflowLabels.style);
    }
  });
}
