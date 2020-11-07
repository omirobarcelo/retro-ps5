<script lang="ts">
  let title: string = '';
  let description: string = '';

  async function sendForm() {
    console.log(title);
    console.log(description);
  }
</script>

<style lang="postcss">
  .contact-container {
    @apply py-6 flex flex-col items-center;
  }

  h1 {
    @apply text-3xl font-bold;
  }

  h1,
  form {
    @apply w-full;
    max-width: 768px;
  }

  label {
    @apply block text-gray-700 text-sm font-bold mb-2;
  }

  input {
    @apply appearance-none w-full py-2 px-3 text-gray-700 leading-tight border-b-2 transition-colors duration-300 ease-out;
  }

  input:focus {
    @apply outline-none border-orange-500;
  }

  textarea {
    @apply mt-2 p-1 block w-full border-2 border-gray-300 transition duration-150 ease-in-out;
    resize: none;
  }

  textarea:focus {
    @apply outline-none border-orange-500;
  }

  button {
    @apply bg-orange-500 text-white font-bold py-2 px-4;
  }

  button:hover {
    @apply bg-orange-700;
  }

  button:focus {
    @apply outline-none shadow-outline;
  }

  button:disabled {
    @apply bg-gray-500 text-gray-100 cursor-not-allowed;
  }
</style>

<svelte:head>
  <title>Contact</title>
</svelte:head>

<div class="contact-container">
  <h1>Contact Form</h1>

  <form class="pt-6 pb-8 mb-4" on:submit|preventDefault={sendForm}>
    <div class="mb-4">
      <label for="title"> Title </label>
      <input id="title" type="text" placeholder="Title" bind:value={title} />
    </div>
    <div class="mb-6">
      <label for="description"> Description </label>
      <textarea
        id="description"
        rows="10"
        placeholder="Describe your comment, suggestion, or issue"
        bind:value={description}
      />
    </div>
    <div class="flex items-center justify-between">
      <button type="submit" disabled={!(title && description)}> Send </button>
    </div>
  </form>
</div>
