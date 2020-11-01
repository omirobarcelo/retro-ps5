<style lang="postcss">
  @font-face {
    font-family: 'Staatliches';
    src: url(/fonts/Staatliches-Regular.ttf), url(https://fonts.googleapis.com/css2?family=Staatliches&display=swap) format('truetype');
  }

  h1 {
    @apply text-5xl uppercase font-bold m-0 mb-4 text-orange-500;
    font-family: 'Staatliches';
  }

  h2,
  h3 {
    @apply font-bold tracking-tight text-gray-200;
  }

  h2 {
    @apply text-3xl;
  }

  h3 {
    @apply text-2xl;
  }

  .bg {
    background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(/main_bg.jpg);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    height: clamp(70vh, 90vh, 1080px);
  }
</style>

<div class="bg py-16 px-8">
  <h2>Welcome to</h2>
  <h1>Can I Play It On PS5</h1>
  <h3>Search the games from PS4 that you want to play on PS5!</h3>
</div>
