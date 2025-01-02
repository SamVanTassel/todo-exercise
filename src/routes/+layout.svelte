<script lang="ts">
  const { children } = $props();
</script>

<nav>
  <a href="/">home</a>
  <a href="/todo">todo</a>
  <a href="/times">times</a>
</nav>

{@render children()}
