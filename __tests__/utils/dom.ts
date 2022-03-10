export function createDiv(id = 'chart'): HTMLDivElement {
  const div = document.createElement('div');
  const container = createContainer(id);
  container.appendChild(div);
  return div;
}

export function mount(parent: HTMLElement, child: HTMLElement): void {
  if (parent) {
    parent.appendChild(child);
  }
}

export function unmountAll(id = 'chart'): void {
  const container = createContainer(id);
  container.innerHTML = '';
}

function createContainer(id: string): HTMLElement {
  const container = document.getElementById(id);
  if (container) return container;
  const newContainer = document.createElement('div');
  newContainer.setAttribute('id', id);
  document.body.appendChild(newContainer);
  return newContainer;
}
