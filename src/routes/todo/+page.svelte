<script lang="ts">
	import AddTodo from "./AddTodo.svelte";
	import Todo from "./Todo.svelte";

  const { data } = $props();
</script>

<h1>todo</h1>

<AddTodo/>

<ul>
  {#each data.data as todo}
    <li>
      <Todo {todo} />
    </li>
  {/each}
</ul>

<style>
  ul {
    padding: 0;
  }
  li {
    list-style-type: none;
  }
</style>
