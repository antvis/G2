export const exportDataToLocal = (data, fileName) => {
  const content = typeof data === 'string' ? data : JSON.stringify(data);
  const a = document.createElement('a');
  a.download = fileName;
  a.href = URL.createObjectURL(
    new Blob([content], { type: 'application/json' }),
  );
  a.click();
};
