<script lang="ts">
  let name: string = '';
  let altNames: string[] = [];
  let image: string = '';
  let vote: 'positive' | 'negative';
  let comment: string;

  let IMG_PLACEHOLDER = 'https://via.placeholder.com/290x380.png?text=Add+A+Cover';

  $: disabled = !(name && vote);

  function imageError() {
    IMG_PLACEHOLDER = 'https://via.placeholder.com/290x380.png?text=URL+Not+Valid';
    image = '';
  }

  async function createGame() {
    console.log(name);
    console.log(altNames);
    console.log(image);
    console.log(vote);
    console.log(comment);
  }
</script>

<style lang="postcss">
  .create-container {
    @apply py-6 flex flex-col items-center;
  }

  form {
    @apply w-full pt-6 pb-8 mb-4;
    max-width: 768px;
  }

  .img-title-area {
    @apply flex;
  }

  .img-area {
    @apply flex-none;
  }

  .title-area {
    @apply flex-auto;
  }

  label {
    @apply block text-gray-700 text-sm font-bold mb-2;
  }

  input {
    @apply block appearance-none w-full py-2 px-3 text-gray-700 leading-tight border-b-2 transition-colors duration-300 ease-out;
  }

  input:focus {
    @apply outline-none border-orange-500;
  }

  .btn-add {
    @apply ml-4 font-semibold text-lg border rounded px-2;
  }

  .btn-add:hover {
    @apply bg-orange-200;
  }

  button[type='submit'] {
    @apply bg-orange-500 text-white font-bold py-2 px-4;
  }

  button[type='submit']:hover {
    @apply bg-orange-700;
  }

  button[type='submit']:disabled {
    @apply bg-gray-500 text-gray-100 cursor-not-allowed;
  }

  button:focus {
    @apply outline-none shadow-outline;
  }

  .vote-area {
    @apply w-3/5 mt-4;
    margin-left: auto;
    margin-right: auto;
  }

  .vote-area .btn-group {
    @apply flex justify-center;
  }

  .vote-area .btn {
    @apply border-4 px-6 py-1 text-lg;
  }

  .vote-area .btn:hover {
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

  .vote-area textarea {
    @apply mt-2 p-1 block w-full border-2 border-gray-300 transition duration-150 ease-in-out;
    resize: none;
  }

  .vote-area textarea:focus {
    @apply outline-none border-orange-500;
  }
</style>

<svelte:head>
  <title>Create Entry</title>
</svelte:head>

<div class="create-container">
  <form on:submit|preventDefault={createGame}>
    <div class="img-title-area space-x-6">
      <div class="img-area">
        <img src={image ? image : IMG_PLACEHOLDER} alt="Cover" on:error={imageError} />
        <input id="image" type="url" placeholder="Cover URL" bind:value={image} />
      </div>
      <div class="title-area">
        <div class="mb-4">
          <label for="title"> Title </label>
          <input id="title" type="text" placeholder="Title" bind:value={name} required />
        </div>
        <div>
          <div class="inline-flex items-baseline">
            <label for="alt-title"> Alternative Titles </label>
            <button type="button" class="btn-add" on:click={() => (altNames = [...altNames, ''])}>+</button>
          </div>
          {#each altNames as altName, idx}
            <input id={`alt-name-${idx}`} type="text" placeholder="Alternative Title" bind:value={altNames[idx]} />
          {/each}
        </div>
      </div>
    </div>
    <div class="vote-area">
      <div class="btn-group space-x-8">
        <div class="btn positive" class:selected={vote === 'positive'} on:click={() => (vote = 'positive')}>Yes</div>
        <div class="btn negative" class:selected={vote === 'negative'} on:click={() => (vote = 'negative')}>No</div>
      </div>
      <textarea rows="5" placeholder="(Optional) Can you specify how it or it doesn't work?" bind:value={comment} />
    </div>
    <div class="flex items-center justify-between"><button type="submit" {disabled}> Create </button></div>
  </form>
</div>
