import { writable } from 'svelte/store';

function createSearch() {
  const { subscribe, set } = writable('');

  return {
    subscribe,
    update: (term: string) => set(term)
  };
}

export const search = createSearch();
