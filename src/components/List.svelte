<script lang="ts">
  import type { GameListItem } from '../data/interfaces/game-list-item.interface';
  import { search } from '../stores/search.store';
  import GameCard from './GameCard.svelte';

  let games: GameListItem[] = [];

  $: fetch(`game/list?query=${$search}`)
    .then((r: { json: () => any }) => r.json())
    .then((data: GameListItem[]) => (games = data));
</script>

<style lang="postcss">
  .no-game {
    @apply flex flex-col items-center text-center pt-20;
  }

  .no-game p {
    @apply text-2xl font-semibold;
  }

  .no-game p a {
    @apply underline;
  }
</style>

<div class="px-2 py-4">
  <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
    {#each games as game (game._id)}
      <GameCard {game} />
    {/each}
  </div>
  {#if $search.length > 0 && games.length === 0}
    <div class="no-game">
      <p>We don't have saved any games related to <span class="font-bold">"{$search}"</span>.</p>
      <p>Do you want to <a href="create">create</a> a new entry?</p>
    </div>
  {/if}
</div>
