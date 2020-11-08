<script lang="ts">
  export let type: 'success' | 'error';
  export let message: string;

  const CHECK = 'M0.5,8 L4,11.5 L11.5,3';
  const CROSS = 'M0.5,0.5 L11.5,11.5 M11.5,0.5 L0.5,11.5';
</script>

<style lang="postcss">
  .alert {
    @apply flex items-center text-white text-sm font-bold px-4 py-3;
  }

  .alert.success {
    @apply bg-green-500;
  }

  .alert.error {
    @apply bg-red-500;
  }

  .alert svg {
    @apply w-4 h-4 mr-2;
  }
</style>

<div class="alert {type}" role="alert">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12">
    <path stroke-width="2" stroke="white" fill="none" d={type === 'success' ? CHECK : CROSS} />
  </svg>
  <p>{message}</p>
</div>
