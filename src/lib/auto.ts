import { Auto } from '../mark/auto';

export function autolib() {
  return {
    'mark.auto': Auto,
  } as const;
}
