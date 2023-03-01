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

function updateData(event, target, view) {
  const { data = {} } = event;
  data.data = dataOf(target, view);
  event.data = data;
}

function bubblesEvent(eventType, view, emitter, predicate = (event) => true) {
  return (e) => {
    if (!predicate(e)) return;
    const { target } = e;
    const { classList } = target;
    const [elementType, markType] = classList;
    if (elementType === 'element') {
      updateData(e, target, view);
      emitter.emit(`element:${eventType}`, e);
      emitter.emit(`${markType}:${eventType}`, e);
      return;
    }
    // @todo Handle click axis and legend.
    emitter.emit(`${elementType}:click`);
  };
}

// @todo Provide more info for event.dataset.
export function Event() {
  return (context, _, emitter) => {
    const { container, view } = context;
    const click = bubblesEvent('click', view, emitter, (e) => e.detail === 1);
    const dblclick = bubblesEvent(
      'dblclick',
      view,
      emitter,
      (e) => e.detail === 2,
    );
    const pointerdown = bubblesEvent('pointerdown', view, emitter);
    const pointerup = bubblesEvent('pointerup', view, emitter);
    const pointerover = bubblesEvent('pointerover', view, emitter);
    const pointerout = bubblesEvent('pointerout', view, emitter);
    const rightdown = bubblesEvent('rightdown', view, emitter);
    const rightup = bubblesEvent('rightup', view, emitter);
    const dragstart = bubblesEvent('dragstart', view, emitter);
    const drag = bubblesEvent('drag', view, emitter);
    const dragend = bubblesEvent('dragend', view, emitter);
    container.addEventListener('click', click);
    container.addEventListener('click', dblclick);
    container.addEventListener('pointerdown', pointerdown);
    container.addEventListener('pointerup', pointerup);
    container.addEventListener('pointerover', pointerover);
    container.addEventListener('pointerout', pointerout);
    container.addEventListener('rightdown', rightdown);
    container.addEventListener('rightup', rightup);
    container.addEventListener('dragstart', dragstart);
    container.addEventListener('drag', drag);
    container.addEventListener('dragend', dragend);
    return () => {
      container.removeEventListener('click', click);
      container.removeEventListener('click', dblclick);
      container.removeEventListener('pointerdown', pointerdown);
      container.removeEventListener('pointerup', pointerup);
      container.removeEventListener('pointerover', pointerover);
      container.removeEventListener('pointerout', pointerout);
      container.removeEventListener('rightdown', rightdown);
      container.removeEventListener('rightup', rightup);
      container.removeEventListener('dragstart', dragstart);
      container.removeEventListener('drag', drag);
      container.removeEventListener('dragend', dragend);
    };
  };
}
