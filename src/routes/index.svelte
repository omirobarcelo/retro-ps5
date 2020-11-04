<script lang="ts">
  import Cover from '../components/Cover.svelte';
  import List from '../components/List.svelte';
  import { search } from '../stores/search.store';
</script>

<svelte:head>
  <title>Can I Play It On PS5</title>
  <style>
    body {
      background-color: #f9f9f9;
    }
  </style>
</svelte:head>

{#if $search.length === 0}
  <Cover />
{:else}
  <List />
{/if}
