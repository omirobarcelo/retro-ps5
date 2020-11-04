<script context="module" lang="ts">
  export async function preload({ params }) {
    const res = await this.fetch(`game/${params.id}.json`);
    const data = await res.json();

    if (res.status === 200) {
      return { game: data };
    } else {
      this.error(res.status, data.message);
    }
  }
</script>

<script lang="ts">
  import type { GameDetail } from '../../data/interfaces/game-detail.interface';

  export let game: GameDetail;
</script>

<style lang="postcss">
</style>

<svelte:head>
  <title>{game.name}</title>
</svelte:head>

<h1>{game.name}</h1>

<div>{game.altNames}</div>
