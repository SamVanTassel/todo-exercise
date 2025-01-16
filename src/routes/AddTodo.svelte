<script lang="ts">
	import { enhance } from "$app/forms";
	import { LocalTodos } from "$lib/localStorage.svelte";
	import { getContext } from "svelte";
  let text = $state('');
  let disabled = $derived(!text.length);
  const localTodos = getContext<LocalTodos>('localTodos');
  const user = getContext('user');
</script>

<form method="POST" use:enhance={({ formData, cancel, formElement }) => {
  if (!user) {
    localTodos.add(formData.get('text') as string);
    formElement.reset();
    cancel();
    return;
  }
}}>
  <!-- svelte-ignore a11y_autofocus -->
  <input
    type="text"
    name="text"
    autocomplete="off"
    spellcheck="false"
    placeholder="what needs done?"
    bind:value={text}
    autofocus
  />
  <button type="submit" {disabled}>add todo</button>
</form>

<style>
  form {
    display: flex;
    justify-content: space-between;
  }

  button {
    margin-left: 2rem;
    background: none;
    border: solid 2px rgb(100, 100, 100);
    border-radius: 4px;
    font-weight: bold;
    padding: .3rem .5rem;
    cursor: pointer;
    user-select: none;
  }

  button:disabled {
    color: lightgrey;
    border: 2px solid white;
    cursor: default;
  }

  input[type="text"] {
    width: 100%;
    margin: 0;
    all: unset;
    cursor: text;
    border-bottom: 2px black solid;
  }

  ::selection {
    background-color: black;
    color: white;
  }
</style>