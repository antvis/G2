
import { LabelType, ShapeType } from '../../interface';

export default (labels: LabelType[], shapes: ShapeType[]) => {
  let labelBBox;
  let shapeBBox;
  const toBeRemoved = [];
  for (let i = 0; i < labels.length; i++) {
    labelBBox = labels[i].getBBox();
    shapeBBox = shapes[i].getBBox();
    if (labelBBox.width > shapeBBox.width || labelBBox.height > shapeBBox.height) {
      toBeRemoved.push(labels[i]);
    }
    // FIXME this is not going to be true
    // } else if (labelBBox.width * labelBBox.height > shapeBBox.width * shapeBBox.height) {
    //   toBeRemoved.push(labels[i]);
    // }
  }
  for (let i = 0; i < toBeRemoved.length; i++) {
    toBeRemoved[i].remove();
  }
};
