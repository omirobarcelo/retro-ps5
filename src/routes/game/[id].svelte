<script context="module" lang="ts">
  export async function preload({ params }) {
    const res = await this.fetch(`game/${params.id}.json`);
    const data = await res.text();

    const dateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;
    const reviver = (key: string, value: unknown) =>
      typeof value === 'string' && dateRegex.test(value) ? new Date(value) : value;

    if (res.status === 200) {
      return { game: JSON.parse(data, reviver) };
    } else {
      this.error(res.status, data.message);
    }
  }
</script>

<script lang="ts">
  import type { GameDetail } from '../../data/interfaces/game-detail.interface';
  import { calcPercentage } from '../../utils';

  export let game: GameDetail;

  const PER_PAGE = 5;
  const numPages = Math.ceil(game.comments.length / PER_PAGE);
  let page = 0;
  $: start = page * PER_PAGE;
  $: end = Math.min(page * PER_PAGE + PER_PAGE, game.comments.length);
  $: comments = [...game.comments].sort((a, b) => b.date.getTime() - a.date.getTime()).slice(start, end);

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

  const changePage = (change: 'first' | 'prev' | 'next' | 'last') => {
    switch (change) {
      case 'first':
        page = 0;
        break;
      case 'prev':
        page = page > 0 ? page - 1 : 0;
        break;
      case 'next':
        page = page < numPages - 1 ? page + 1 : numPages - 1;
        break;
      case 'last':
        page = numPages - 1;
        break;
      default:
        break;
    }
  };
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

  .comments-area {
    @apply mt-4;
  }

  .comments-area .comment-box:not(:last-child) {
    @apply mb-2;
  }

  .comment-box {
    @apply border-2 px-2 py-1;
  }

  .positive-comment {
    @apply border-green-600 bg-green-300;
  }

  .negative-comment {
    @apply border-red-600 bg-red-300;
  }

  .comment-date {
    @apply text-right border-b;
  }

  .positive-comment .comment-date {
    @apply border-green-600;
  }

  .negative-comment .comment-date {
    @apply border-red-600;
  }

  .comment-text {
    @apply mt-1;
  }

  .pagination {
    @apply mt-2 border-t border-black pt-1 flex;
  }

  .num-comments {
    @apply text-sm;
  }

  .pagination .btn-group {
    @apply inline-flex;
    margin-left: auto;
  }

  .pagination .btn {
    @apply bg-transparent text-black font-semibold py-1 px-2 border border-black text-sm;
  }

  .pagination .btn:hover {
    @apply bg-orange-600 text-white border-transparent;
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

  <div class="comments-area">
    {#each comments as comment}
      <div
        class="comment-box"
        class:positive-comment={comment.kind === 'positive'}
        class:negative-comment={comment.kind === 'negative'}
      >
        <p class="comment-date">{new Intl.DateTimeFormat().format(comment.date)}</p>
        <p class="comment-text">{comment.text}</p>
      </div>
    {/each}
  </div>
  <div class="pagination">
    <span class="num-comments">
      <!-- Math.min needed in case there are 0 comments -->
      Showing {Math.min(start + 1, end)} to {end} of {game.comments.length} comments
    </span>
    <div class="btn-group space-x-1">
      <button class="btn rounded-l" on:click={() => changePage('first')}> First </button>
      <button class="btn" on:click={() => changePage('prev')}> Previous </button>
      <button class="btn" on:click={() => changePage('next')}> Next </button>
      <button class="btn rounded-r" on:click={() => changePage('last')}> Last </button>
    </div>
  </div>
</div>
