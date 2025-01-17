<script lang="ts">
  import { signOut } from "@auth/sveltekit/client";
	import { setContext } from "svelte";
  import { showCompleted } from "$lib/state.svelte.js";

  const { children, data } = $props();
  const user = $derived(data.session?.user);
  const { routeId } = $derived(data);

  setContext('user', () => user);

  const handleSignOut = () => signOut();
  const appTitle = import.meta.env.VITE_LOCAL === 'TRUE' ?
    import.meta.env.VITE_APP_TITLE_LOCAL :
    import.meta.env.VITE_APP_TITLE;
</script>

<svelte:head>
  <title>{appTitle}</title>
</svelte:head>
<nav>
  {#if (routeId !== '/' && !!user)}
    <a href="/">todo</a>
  {:else if (routeId !== '/signin')}
    <div class="right-content">
      <div class="dropdown">
        {#if user}
          <img src={user.image} alt="user" />
        {:else}
          <img src="/blank.png" alt="no user">
        {/if}
          <div class="dropdown-content hidden">
          {#if user}
            <button onclick={handleSignOut}>sign out</button>
          {:else}
            <a href="/signin" class="right-content">sign in</a>
          {/if}
          <button onclick={() => showCompleted.toggle()}>{showCompleted.value ? 'hide' : 'show'} completed tasks</button>
        </div>
      </div>
    </div>
  {/if}
</nav>

{@render children?.()}

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
<link href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@100..900&display=swap" rel="stylesheet">

<style>
  :global body {
    font-family: "Roboto Slab", serif;
    font-optical-sizing: auto;
    font-weight: 400;
    font-style: normal;
    box-sizing: border-box;
  }

  nav {
    display: flex;
  }

  img {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    box-shadow:
      0 0 0 2px white,
      0 0 0 4px black;
    
  }

  .right-content {
    margin-left: auto;
  }

  .hidden {
    display: none;
  }

  .dropdown {
    position: relative;
  }

  .dropdown:hover .dropdown-content {
    display: flex;
    flex-direction: column;
    align-items: right;
  }

  .dropdown-content {
    top: 0;
    right: 0;
    position: absolute;
    padding-top:2.5rem;
    z-index: 1;
    width: 6rem;
    text-align: right;
  }

  a, button {
    all: unset;
    display: block;
    border: solid 2px rgb(100, 100, 100);
    border-radius: 4px;
    font-weight: bold;
    padding: .3rem .5rem;
    cursor: pointer;
    user-select: none;
    transition: linear 200ms;
    margin-bottom: .5rem;
  }
  a:hover, button:hover {
    background-color: black;
    color: white;
    transition: linear 200ms;
  }
</style>