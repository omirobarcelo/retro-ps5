<script lang="ts">
  import Nav from '../components/Nav.svelte';
  import GlobalStyle from '../components/GlobalStyle.svelte';

  export let segment: string;
</script>

<style lang="postcss">
  .main-content {
    display: flex;
  }

  .ads {
    @apply flex-auto;
    min-width: 110px;
  }

  main {
    @apply flex-auto;
    position: relative;
    max-width: 56em;
    background-color: white;
    padding: 2em;
    margin: 0 auto;
  }
</style>

<Nav {segment} />

<div class="main-content">
  <div class="ads" />
  <main>
    <GlobalStyle />
    <slot />
  </main>
  <div class="ads" />
</div>
