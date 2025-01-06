<script lang="ts">
  const { children } = $props();
</script>

<nav>
  <a href="/">home</a>
  <a href="/todo">todo</a>
  <a href="/times">times</a>
</nav>

{@render children()}

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
<link href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@100..900&display=swap" rel="stylesheet">

<style>
  :global body {
    font-family: "Roboto Slab", serif;
    font-optical-sizing: auto;
    font-weight: 400;
    font-style: normal;
  }
</style>