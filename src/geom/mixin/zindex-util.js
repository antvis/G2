module.exports = {
  toFront(shape) {
    const parent = shape.get('parent');
    const originIndex = parent.get('children').indexOf(shape);
    shape.set('_originIndex', originIndex);
    shape.toFront(); // 移动到最上面
  },
  resetZIndex(shape) {
    const parent = shape.get('parent');
    const originIndex = shape.get('_originIndex');
    const siblings = parent.get('children');
    const currentIndex = siblings.indexOf(shape);
    if (originIndex >= 0 && originIndex !== currentIndex) {
      siblings.splice(currentIndex, 1); // 从数组中移除
      siblings.splice(originIndex, 0, shape); // 重新加入数组，返回原先的位置
    }
  }
};
