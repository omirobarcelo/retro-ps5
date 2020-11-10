<script lang="ts">
  import Nav from '../components/Nav.svelte';
  import GlobalStyle from '../components/GlobalStyle.svelte';

  export let segment: string;
</script>

<style lang="postcss">
  .main-content {
    @apply flex flex-col;
  }

  .ads {
    @apply flex-auto;
    min-width: 120px;
    min-height: 100px;
    max-width: 100%;
    max-height: 100px;
  }

  main {
    @apply flex-auto;
  }

  @screen sm {
    .main-content {
      @apply flex-row;
    }

    .ads {
      max-width: 320px;
      max-height: 100%;
    }
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
