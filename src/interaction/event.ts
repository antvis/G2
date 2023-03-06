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

    // Click events.
    const click = bubblesEvent('click', view, emitter, (e) => e.detail === 1);
    const dblclick = bubblesEvent(
      'dblclick',
      view,
      emitter,
      (e) => e.detail === 2,
    );

    // Pointer events.
    const pointertap = bubblesEvent('pointertap', view, emitter);
    const pointerdown = bubblesEvent('pointerdown', view, emitter);
    const pointerup = bubblesEvent('pointerup', view, emitter);
    const pointerover = bubblesEvent('pointerover', view, emitter);
    const pointerout = bubblesEvent('pointerout', view, emitter);
    const pointermove = bubblesEvent('pointermove', view, emitter);
    const pointerenter = bubblesEvent('pointerenter', view, emitter);
    const pointerleave = bubblesEvent('pointerleave', view, emitter);
    const pointerupoutside = bubblesEvent('pointerupoutside', view, emitter);

    // Drag and drop events.
    const dragstart = bubblesEvent('dragstart', view, emitter);
    const drag = bubblesEvent('drag', view, emitter);
    const dragend = bubblesEvent('dragend', view, emitter);
    const dragenter = bubblesEvent('dragenter', view, emitter);
    const dragleave = bubblesEvent('dragleave', view, emitter);
    const dragover = bubblesEvent('dragover', view, emitter);
    const drop = bubblesEvent('drop', view, emitter);

    // For legacy usage.
    container.addEventListener('click', click);
    container.addEventListener('click', dblclick);

    // Recommend events.
    container.addEventListener('pointertap', pointertap);
    container.addEventListener('pointerdown', pointerdown);
    container.addEventListener('pointerup', pointerup);
    container.addEventListener('pointerover', pointerover);
    container.addEventListener('pointerout', pointerout);
    container.addEventListener('pointermove', pointermove);
    container.addEventListener('pointerenter', pointerenter);
    container.addEventListener('pointerleave', pointerleave);
    container.addEventListener('pointerupoutside', pointerupoutside);

    // Plugin events.
    container.addEventListener('dragstart', dragstart);
    container.addEventListener('drag', drag);
    container.addEventListener('dragend', dragend);
    container.addEventListener('dragenter', dragenter);
    container.addEventListener('dragleave', dragleave);
    container.addEventListener('dragover', dragover);
    container.addEventListener('drop', drop);

    return () => {
      container.removeEventListener('click', click);
      container.removeEventListener('click', dblclick);

      container.removeEventListener('pointertap', pointertap);
      container.removeEventListener('pointerdown', pointerdown);
      container.removeEventListener('pointerup', pointerup);
      container.removeEventListener('pointerover', pointerover);
      container.removeEventListener('pointerout', pointerout);
      container.removeEventListener('pointermove', pointermove);
      container.removeEventListener('pointerenter', pointerenter);
      container.removeEventListener('pointerleave', pointerleave);
      container.removeEventListener('pointerupoutside', pointerupoutside);

      container.removeEventListener('dragstart', dragstart);
      container.removeEventListener('drag', drag);
      container.removeEventListener('dragend', dragend);
      container.removeEventListener('dragenter', dragenter);
      container.removeEventListener('dragleave', dragleave);
      container.removeEventListener('dragover', dragover);
      container.removeEventListener('drop', drop);
    };
  };
}
