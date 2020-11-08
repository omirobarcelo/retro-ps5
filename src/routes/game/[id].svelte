<script context="module" lang="ts">
  import { reviver } from '../../utils';

  export async function preload({ params }) {
    const res = await this.fetch(`game/${params.id}.json`);
    const data = await res.text();

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

  let selected: 'positive' | 'negative';
  let comment: string = '';

  const PER_PAGE = 5;
  $: numPages = Math.ceil(game.comments.length / PER_PAGE);
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

  $: positivePercent = calcPercent(game.positiveVotes, game.positiveVotes + game.negativeVotes);
  $: positivePath = generatePath(
    getCoordinatesForPercent(0),
    getCoordinatesForPercent(positivePercent),
    isLargeArcPath(positivePercent)
  );

  $: negativePercent = calcPercent(game.negativeVotes, game.positiveVotes + game.negativeVotes);
  $: negativePath = generatePath(
    getCoordinatesForPercent(positivePercent),
    getCoordinatesForPercent(100),
    isLargeArcPath(negativePercent)
  );

  $: textPositivePercent = calcPercentage(game, 'positive');
  $: textNegativePercent = calcPercentage(game, 'negative');

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

  function sendVote() {
    fetch(`game/${game._id}.json`, {
      method: 'PATCH',
      body: JSON.stringify({ vote: selected, comment }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
      .then(res => res.text())
      .then(text => (game = JSON.parse(text, reviver)));
  }
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

  .vote-area {
    @apply w-3/5 mt-4;
    margin-left: auto;
    margin-right: auto;
  }

  .vote-area .btn-group {
    @apply flex;
  }

  .vote-area .btn {
    @apply border-4 px-8 py-2 text-xl;
  }

  .vote-area .btn:hover {
    @apply border-4 px-8 py-2 text-xl;
    cursor: pointer;
  }

  .vote-area .btn.positive {
    @apply border-green-800 bg-green-300 text-green-800;
  }

  .vote-area .btn.positive:hover,
  .vote-area .btn.positive.selected {
    @apply bg-green-500;
  }

  .vote-area .btn.negative {
    @apply border-red-800 bg-red-300 text-red-800;
  }

  .vote-area .btn.negative:hover,
  .vote-area .btn.negative.selected {
    @apply bg-red-500;
  }

  .vote-area .btn-vote {
    /* margin-top is used to push down the button in the btn-group,
      vertical padding is applied automatically */
    @apply px-4 border border-black bg-white text-lg mt-3;
    margin-left: auto;
  }

  .vote-area .btn-vote:hover {
    @apply bg-orange-600 text-white;
  }

  .vote-area .btn-vote[disabled] {
    @apply bg-gray-400 text-black cursor-not-allowed;
  }

  .vote-area textarea {
    @apply mt-2 p-1 block w-full transition duration-150 ease-in-out;
    resize: none;
  }

  .vote-area textarea:focus {
    @apply outline-none shadow-outline;
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
      src={game.image ? game.image : 'https://via.placeholder.com/290x380.png?text=Cover+Not+Found'}
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

  {#if !game.locked}
    <div class="vote-area">
      <div class="btn-group space-x-8">
        <div class="btn positive" class:selected={selected === 'positive'} on:click={() => (selected = 'positive')}>
          Yes
        </div>
        <div class="btn negative" class:selected={selected === 'negative'} on:click={() => (selected = 'negative')}>
          No
        </div>
        <button class="btn-vote" disabled={!selected} on:click={sendVote}>Vote</button>
      </div>
      <textarea rows="5" placeholder="(Optional) Can you specify how it or it doesn't work?" bind:value={comment} />
    </div>
  {/if}

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
    <!-- Math.min needed in case there are 0 comments -->
    <span class="num-comments">
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
