<script lang="ts">
	import { enhance } from "$app/forms";
	import { afterNavigate } from "$app/navigation";
  let text = $state('');
  let disabled = $derived(!text.length);
  let input: HTMLInputElement|null = null;
  const focus = () => { if (input) input.focus() };
  $effect(() => {
    focus();
  });

  afterNavigate(({ type }) => {
    if (type === 'form') focus();
  });
</script>

<form method="POST" use:enhance>
  <input
    type="text"
    name="text"
    autocomplete="off"
    spellcheck="false"
    placeholder="what needs done?"
    bind:value={text}
    bind:this={input}
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