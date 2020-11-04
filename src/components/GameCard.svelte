<script lang="ts">
  import type { GameListItem } from '../data/interfaces/game-list-item.interface';

  export let game: GameListItem;

  const calcPercentage = (game: GameListItem, type: 'positive' | 'negative'): string => {
    const votes = type === 'positive' ? game.positiveVotes : game.negativeVotes;
    const perc = (votes * 100) / (game.positiveVotes + game.negativeVotes);
    return `${perc.toFixed(2)}%`;
  };

  const positivePercent = calcPercentage(game, 'positive');
  const negativePercent = calcPercentage(game, 'negative');
</script>

<style lang="postcss">
  .card {
    @apply flex bg-black bg-opacity-75 p-2 transition-transform transform;
    min-width: 300px;
    height: 200px;
  }

  .card:hover {
    @apply -translate-y-2;
  }

  .card-img {
    @apply flex-none;
    width: 145px;
    max-height: 190px;
  }

  .card-info {
    @apply ml-2 w-full flex-initial;
  }

  .title {
    @apply text-xl font-bold text-white leading-tight mb-2;
  }

  .alt-titles {
    @apply text-white tracking-tight leading-none;
  }

  .pos-votes,
  .neg-votes {
    @apply pl-2;
  }

  .pos-votes {
    @apply bg-green-600 text-green-200;
  }

  .neg-votes {
    @apply bg-red-600 text-red-200;
  }
</style>

<a href=".">
  <div class="card">
    <img
      class="card-img"
      src={game.image ? game.image : 'https://via.placeholder.com/145x190.png?text=Cover+Not+Found'}
      alt={`${game.name} cover`}
    />
    <div class="card-info">
      <p class="title">{game.name}</p>
      <p class="alt-titles">{game.altNames.join(', ')}</p>
      <div class="mt-4">
        <p class="pos-votes" style="width: {positivePercent};">{positivePercent}</p>
        <p class="mt-2 neg-votes" style="width: {negativePercent};">{negativePercent}</p>
      </div>
    </div>
  </div>
</a>
