import { isFunction } from '@antv/util';

class MyWorker {
  queue: any[] = [];
  worker: Worker;

  constructor(url) {
    this.worker = new Worker(url);
    this.worker.onmessage = (e: MessageEvent) => {
      this.queue.shift()?.resolve(e);
    };
    this.worker.onmessageerror = (e: MessageEvent) => {
      console.warn('[AntV G2] Web worker is not available');
      this.queue.shift()?.reject(e);
    };
  }

  post(params, onError?: () => any): Promise<MessageEvent> {
    return new Promise((resolve, reject) => {
      this.queue.push({ resolve, reject });
      try {
        this.worker.postMessage(params);
      } catch (e) {
        console.warn('[AntV G2] Web worker is not available');
        isFunction(onError) && onError();
      }
    });
  }

  destroy() {
    this.worker.terminate();
  }
}

export function createWorker(f: any) {
  if (typeof window === 'undefined') return;

  let blob;
  try {
    blob = new Blob([f.toString()], { type: 'application/javascript' });
  } catch (e) {
    // @ts-ignore
    blob = new window.BlobBuilder();
    blob.append(f.toString());
    blob = blob.getBlob();
  }

  return new MyWorker(URL.createObjectURL(blob));
}
