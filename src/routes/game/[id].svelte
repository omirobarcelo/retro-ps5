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
  import { calcPercentage } from '../../utils';

  export let game: GameDetail;

  const calcPercent = (value: number, total: number): number => value / total;

  const getCoordinatesForPercent = (percent: number): [number, number] => {
    const x = Math.cos(2 * Math.PI * percent);
    const y = Math.sin(2 * Math.PI * percent);
    return [x, y];
  };

  const isLargeArcPath = (percent: number): number => (percent > 0.5 ? 1 : 0);

  const generatePath = (start: [number, number], end: [number, number], largeArcFlag: number): string =>
    `M ${start[0]} ${start[1]} A 1 1 0 ${largeArcFlag} 1 ${end[0]} ${end[1]} L 0 0`;

  const positivePercent = calcPercent(game.positiveVotes, game.positiveVotes + game.negativeVotes);
  const positivePath = generatePath(
    getCoordinatesForPercent(0),
    getCoordinatesForPercent(positivePercent),
    isLargeArcPath(positivePercent)
  );

  const negativePercent = calcPercent(game.negativeVotes, game.positiveVotes + game.negativeVotes);
  const negativePath = generatePath(
    getCoordinatesForPercent(positivePercent),
    getCoordinatesForPercent(100),
    isLargeArcPath(negativePercent)
  );

  const textPositivePercent = calcPercentage(game, 'positive');
  const textNegativePercent = calcPercentage(game, 'negative');
</script>

<style lang="postcss">
  .container {
    @apply bg-orange-300 my-4 p-6;
  }

  .title {
    @apply text-3xl font-bold;
  }

  .main-data {
    @apply mt-4 flex;
  }

  .cover-img {
    @apply flex-none w-2/5;
  }

  .info-area {
    @apply flex-auto ml-8;
  }

  .alt-titles {
    @apply text-lg font-medium;
  }

  .legend {
    @apply flex;
  }

  .legend-positive,
  .legend-negative {
    @apply w-8 h-6;
  }

  .legend-positive {
    @apply bg-green-600;
  }

  .legend-negative {
    @apply bg-red-600;
  }

  .legend-text {
    @apply ml-2;
  }

  svg {
    @apply w-3/5 mt-4;
  }

  .pos-path {
    fill: theme('colors.green.600');
  }

  .neg-path {
    fill: theme('colors.red.600');
  }
</style>

<svelte:head>
  <title>{game.name}</title>
</svelte:head>

<div class="container">
  <h1 class="title">{game.name}</h1>

  <div class="main-data">
    <img
      src={game.image ? game.image : 'https://via.placeholder.com/145x190.png?text=Cover+Not+Found'}
      alt={`${game.name} cover`}
      class="cover-img"
    />
    <div class="info-area">
      <p class="alt-titles">{game.altNames.join(', ')}</p>
      <div class="mt-4">
        <div class="legend">
          <div class="legend-positive" />
          <span class="legend-text">{textPositivePercent}</span>
        </div>
        <div class="mt-2 legend">
          <div class="legend-negative" />
          <span class="legend-text">{textNegativePercent}</span>
        </div>
        <svg viewBox="-1 -1 2 2" style="transform: rotate(-90deg);">
          <path class="pos-path" d={positivePath} />
          <path class="neg-path" d={negativePath} />
        </svg>
      </div>
    </div>
  </div>

  <div>Vote area</div>

  <div>
    {#each game.comments as comment}
      <div>{comment.text}</div>
    {/each}
  </div>
</div>
