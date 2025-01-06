<script lang="ts">
	import { invalidate } from "$app/navigation";
	import { slide } from "svelte/transition";

  const { todo } = $props();
  let deleted = $state(false);

  const onToggle = async () => {
    await fetch('/api/toggle', {
      method: 'PATCH',
      body: JSON.stringify({ id: todo.id }),
    });
    invalidate('todos-updated');
  }

  const onDelete = () => {
    fetch('/api/delete', {
      method: 'DELETE',
      body: JSON.stringify({ id: todo.id }),
    });
    deleted = true;
  }
</script>

<div class:deleted transition:slide>
  <input type="checkbox" checked={todo.completed}
  onchange={onToggle}/>
{todo.text}
  <button onclick={onDelete}>🗑️</button>
</div>

<style>
  .deleted {
    display: none;
  }

  div {
    width: 16rem;
    display: flex;
    align-items: center;
  }

  input[type="checkbox"] {
    margin-right: .5rem;
  }

  button {
    margin-left: auto;
  }
</style>