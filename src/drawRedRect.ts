export function drawRedRect(): SVGSVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', '400');
  svg.setAttribute('height', '400');
  svg.setAttribute('viewBox', '0, 0, 400, 400');

  const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  rect.setAttribute('x', '0');
  rect.setAttribute('y', '0');
  rect.setAttribute('fill', 'red');
  rect.setAttribute('width', '100');
  rect.setAttribute('height', '100');
  svg.appendChild(rect);

  return svg;
}
