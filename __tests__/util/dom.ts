/**
 * 创建一个 div 节点，并放到 container，默认放到 body 上
 * @param container
 */
export function createDiv(container: HTMLElement = document.body): HTMLElement {
  const div = document.createElement('div');

  container.appendChild(div);

  return div;
}
