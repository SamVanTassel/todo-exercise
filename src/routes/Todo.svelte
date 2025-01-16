<script lang="ts">
	import { invalidate } from "$app/navigation";
	import { LocalTodos } from "$lib/localStorage.svelte";
	import { getContext } from "svelte";
	import { slide } from "svelte/transition";

  const { todo } = $props();
  let deleted = $state(false);
  let mouseOverTodo = $state(false);
  let isEditing = $state(false);
  let text = $state(todo.text);
  let textInput = $state<HTMLInputElement|null>(null);

  const user = getContext('user');
  const localTodos = getContext<LocalTodos>('localTodos');

  $effect(() => {
    textInput?.select();
    textInput?.addEventListener('blur', () => isEditing = false);
  });

  const onToggle = async () => {
    if (!user) {
      return localTodos.toggle(todo.id);
    }
    await fetch(`/api/toggle/${todo.id}`, { method: 'PATCH' });
    invalidate('todos-updated');
  }

  const onDelete = () => {
    if (!user) {
      return localTodos.delete(todo.id);
    }
    fetch(`/api/delete/${todo.id}`, { method: 'DELETE' });
    deleted = true;
  }

  const submitEdit = async () => {
    if (!user) {
      return localTodos.update(todo.id, text);
    }
    await fetch(`/api/update/${todo.id}`, {
      method: 'PATCH',
      body: JSON.stringify({ text }),
    });
    invalidate('todos-updated');
  }
</script>

<div
  class="todo-container"
  class:deleted
  transition:slide={{ axis: 'y' }}
  onmouseenter={() => mouseOverTodo = true}
  onmouseleave={() => mouseOverTodo = false}
  role="listitem"
>
  <input
    type="checkbox"
    checked={todo.completed}
    onchange={onToggle}
  />
  {#if !isEditing && !todo.completed}
    <button
      class="todo-text"
      onclick={() => isEditing = true}
    >{text}</button>
  {:else if !isEditing}
    <span class="completed">{text}</span>
  {:else}
    <form onsubmit={submitEdit}>
      <input
        type="text"
        bind:this={textInput}
        bind:value={text}
        autocomplete="off"
        spellcheck="false"
      />
    </form>
  {/if}
  {#if (mouseOverTodo && !todo.completed)}
    <div class="actions">
      <button onclick={onDelete}>✖</button>
    </div>
  {/if}
</div>

<style>
  .todo-container {
    width: 20rem;
    display: flex;
    align-items: center;
    min-height: 1.75rem;
  }

  .deleted {
    display: none;
  }

  .completed {
    cursor: default;
  }

  .todo-text {
    background: none;
    padding: none;
    border: none;
    cursor: text;
    margin-right: 1rem;
    text-align: left;
  }

  .todo-text:hover {
    border-bottom: 1px black dashed;
  }

  input[type="checkbox"] {
    margin-right: .5rem;
    cursor: pointer;
  }

  input[type="text"] {
    all: unset;
    width: 100%;
    border-bottom: 2px black solid;
    margin-left: .5rem;
  }

  ::selection {
    background-color: black;
    color: white;
  }

  .actions {
    margin-left: auto;
    position: relative;
    right: 0;
    z-index: 1;
  }

  button {
    background: none;
    border: none;
    font-size: large;
    border-radius: 2px;
  }
</style>