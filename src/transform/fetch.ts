import { TransformComponent as TC } from '../runtime';
import { useAsyncMemoTransform } from './utils';

type FetchOptions = {
  url?: string;
};

/**
 * @todo Format like csv
 */
export const Fetch: TC<FetchOptions> = (options) => {
  const { url } = options;
  return useAsyncMemoTransform(async () => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }, [url]);
};

Fetch.props = {
  async: true,
};
