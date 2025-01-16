<script lang="ts">
	import { slide } from "svelte/transition";
	import AddTodo from "./AddTodo.svelte";
	import Todo from "./Todo.svelte";
	import { LocalTodos } from "$lib/localStorage.svelte";
	import { setContext } from "svelte";

  const localTodos = new LocalTodos();
  setContext('localTodos', localTodos);

  const { data } = $props();
  let todos = $derived(data.todos || localTodos.getAll());

  const uncompleted = $derived(todos.filter(td => !td.completed));
  const completed = $derived(todos.filter(td => td.completed));
</script>

<div class="todopage">
<h1>todo</h1>

<AddTodo />
  {#if uncompleted.length}
  <ul transition:slide>
    {#each uncompleted as todo (todo.id)}
      <li>
        <Todo {todo} />
      </li>
    {/each}
  </ul>
  {/if}

  {#if completed.length}
  <ul class="completed" transition:slide>
    {#each completed as todo (todo.id)}
      <li>
        <Todo {todo} />
      </li>
    {/each}
  </ul>
  {/if}
</div>

<style>
  .todopage {
    display: flex;
    flex-direction: column;
    margin: auto;
    width: 20rem;
  }
  ul {
    padding: 0;
  }
  li {
    list-style-type: none;
  }
  .completed {
    opacity: 50%;
  }
</style>
