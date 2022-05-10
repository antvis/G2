export function createWorker(f: any) {
  if (typeof window === "undefined") return;

  let blob;
  try {
    blob = new Blob([f.toString()], { type: 'application/javascript' });
  } catch (e) {
    // @ts-ignore
    blob = new window.BlobBuilder();
    blob.append(f.toString());
    blob = blob.getBlob();
  }

  return new Worker(URL.createObjectURL(blob));
}
