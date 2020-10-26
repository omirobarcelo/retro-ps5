<script lang="ts">
  type Options = 'op1' | 'op2';

  let opt: Options = 'op2';
</script>

<svelte:head>
  <title>About</title>
</svelte:head>

<h1>About this site</h1>

<p>This is the 'about' page. There's not much here.</p>

<p class:m-8={ opt === 'op2' }>{opt}</p>
