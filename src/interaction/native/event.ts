function dataOf(element, view) {
  const { __data__: datum } = element;
  const { markKey, index, seriesIndex } = datum;
  const { markState } = view;
  const selectedMark: any = Array.from(markState.keys()).find(
    (mark) => (mark as any).key === markKey,
  );
  if (!selectedMark) return;
  if (seriesIndex) {
    return seriesIndex.map((i) => selectedMark.data[i]);
  }
  return selectedMark.data[index];
}

function clickEvent(view, emitter) {
  return (e) => {
    const { target } = e;
    const { classList } = target;
    const [elementType, markType] = classList;
    if (elementType === 'element') {
      const { data = {} } = e;
      data.data = dataOf(target, view);
      e.data = data;
      emitter.emit('element:click', e);
      emitter.emit(`${markType}:click`, e);
      return;
    }
    // @todo Handle click axis and legend.
    emitter.emit(`${elementType}:click`);
  };
}

// @todo More events such as mouseenter, mouseleave.
// @todo Provide more info for event.dataset.
export function Event() {
  return (context, _, emitter) => {
    const { container, view } = context;
    const click = clickEvent(view, emitter);
    container.addEventListener('click', click);
    return () => {
      container.removeEventListener('click', click);
    };
  };
}
