import { ChartEvent } from '../utils/event';

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
    const { className: elementType, markType } = target;
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
    const click = bubblesEvent(
      ChartEvent.CLICK,
      view,
      emitter,
      (e) => e.detail === 1,
    );
    const dblclick = bubblesEvent(
      ChartEvent.DBLCLICK,
      view,
      emitter,
      (e) => e.detail === 2,
    );

    // Pointer events.
    const pointertap = bubblesEvent(ChartEvent.POINTER_TAP, view, emitter);
    const pointerdown = bubblesEvent(ChartEvent.POINTER_DOWN, view, emitter);
    const pointerup = bubblesEvent(ChartEvent.POINTER_UP, view, emitter);
    const pointerover = bubblesEvent(ChartEvent.POINTER_OVER, view, emitter);
    const pointerout = bubblesEvent(ChartEvent.POINTER_OUT, view, emitter);
    const pointermove = bubblesEvent(ChartEvent.POINTER_MOVE, view, emitter);
    const pointerenter = bubblesEvent(ChartEvent.POINTER_ENTER, view, emitter);
    const pointerleave = bubblesEvent(ChartEvent.POINTER_LEAVE, view, emitter);
    const pointerupoutside = bubblesEvent(
      ChartEvent.POINTER_UPOUTSIDE,
      view,
      emitter,
    );

    // Drag and drop events.
    const dragstart = bubblesEvent(ChartEvent.DRAG_START, view, emitter);
    const drag = bubblesEvent(ChartEvent.DRAG, view, emitter);
    const dragend = bubblesEvent(ChartEvent.DRAG_END, view, emitter);
    const dragenter = bubblesEvent(ChartEvent.DRAG_ENTER, view, emitter);
    const dragleave = bubblesEvent(ChartEvent.DRAG_LEAVE, view, emitter);
    const dragover = bubblesEvent(ChartEvent.DRAG_OVER, view, emitter);
    const drop = bubblesEvent(ChartEvent.DROP, view, emitter);

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
