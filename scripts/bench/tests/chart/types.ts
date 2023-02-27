export type Chart = (
  data: any[],
  utils: { start: () => void; end: (node: HTMLElement) => void },
) => void;
