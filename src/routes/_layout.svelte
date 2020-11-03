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
    min-width: 120px;
    max-width: 250px;
  }

  main {
    @apply flex-auto;
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
