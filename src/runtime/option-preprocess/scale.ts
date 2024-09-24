export function convertScale(columnWidthRatio: number) {
  return {
    padding: 1 - columnWidthRatio,
  };
}
