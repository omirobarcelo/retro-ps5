<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { fromEvent, Subscription } from 'rxjs';
  import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
  import { search } from '../stores/search.store';

  // TODO disable input if segment is contact, or move to list if segment is game
  export let segment: string;

  let searchElem: HTMLInputElement;

  const subscriptions = new Subscription();

  onMount(() => {
    subscriptions.add(
      fromEvent<InputEvent>(searchElem, 'input')
        .pipe(
          debounceTime(350),
          map(evt => (evt.target as HTMLInputElement).value),
          filter(val => val.length === 0 || val.length >= 3),
          distinctUntilChanged()
        )
        .subscribe(value => search.update(value))
    );
  });

  onDestroy(() => subscriptions.unsubscribe());
</script>

<style lang="postcss">
  .svg-black {
    stroke: black;
    fill: black;
  }
</style>

<nav class="flex items-center justify-between flex-wrap bg-orange-600 p-4">
  <div class="flex items-center flex-shrink-0 text-white mr-6">
    <a href="." aria-current={segment === undefined ? 'page' : undefined}>
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" class="h-8" height="108" viewBox="0 0 324 108">
        <use xlink:href="logo.svg#logo" class="svg-black" />
      </svg>
    </a>
  </div>
  <input
    bind:this={searchElem}
    class="appearance-none border w-1/2 py-1 px-2 text-gray-700 focus:outline-none focus:shadow-outline"
    id="search"
    type="search"
    placeholder="Search..."
  />
  <div class="flex-grow flex items-center w-auto ml-6">
    <div class="flex-grow">
      <a
        href="contact"
        aria-current={segment === 'contact' ? 'page' : undefined}
        class="inline-block mt-0 text-orange-200 hover:text-white mr-4"
      >
        Contact
      </a>
    </div>
  </div>
</nav>
