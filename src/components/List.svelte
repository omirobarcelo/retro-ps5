<script lang="ts">
  import type { GameListItem } from '../data/interfaces/game-list.interface';
  import { search } from '../stores/search.store';
  import GameCard from './GameCard.svelte';

  let games: GameListItem[] = [];

  $: fetch(`game/list?query=${$search}`)
    .then((r: { json: () => any }) => r.json())
    .then((data: GameListItem[]) => (games = data));
</script>

<div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 px-2 py-4">
  {#each games as game (game._id)}
    <GameCard {game} />
  {/each}
</div>
