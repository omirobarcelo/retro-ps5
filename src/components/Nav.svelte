<script lang="ts">
	import { goto } from '@sapper/app';
  import { onMount, onDestroy } from 'svelte';
  import { fromEvent, Subscription } from 'rxjs';
  import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
  import { search } from '../stores/search.store';

  export let segment: string;
  $: if (segment === 'create') {
    search.update('');
    // If navigating directly to create, this executes before the onMount
    if (searchElem) {
      searchElem.value = '';
    }
  }

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

  async function onSearchBarClick() {
    await goto('/');
    searchElem.focus();
  }
</script>

<style lang="postcss">
  nav {
    @apply w-full flex items-center justify-between flex-wrap bg-orange-600 p-4;
  }

  .logo-container {
    @apply flex items-center flex-shrink-0 text-white mr-6;
    order: 0;
  }

  input[type="search"] {
    @apply appearance-none border w-full py-1 px-2 text-gray-700 mt-3;
    order: 1;
  }

  input[type="search"]:focus {
    @apply outline-none shadow-outline;
  }

  .links-container {
    @apply flex-grow flex items-center w-auto ml-6;
    order: 0;
  }

  .svg-black {
    stroke: black;
    fill: black;
  }

  @screen sm {
    input[type="search"] {
      @apply w-1/2 mt-0;
      order: 0;
    }
  }
</style>

<nav>
  <div class="logo-container">
    <a href="." aria-current={segment === undefined ? 'page' : undefined}>
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" class="h-8" height="108" viewBox="0 0 324 108">
        <use xlink:href="logo.svg#logo" class="svg-black" />
      </svg>
    </a>
  </div>
  <input
    bind:this={searchElem}
    on:click={onSearchBarClick}
    id="search"
    type="search"
    placeholder="Search..."
    disabled={segment === 'create'}
  />
  <div class="links-container">
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
