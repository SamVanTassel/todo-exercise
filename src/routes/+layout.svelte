<script lang="ts">
  import { signOut } from "@auth/sveltekit/client";
	import { setContext } from "svelte";

  const { children, data } = $props();
  const user = $derived(data.session?.user);
  const { routeId } = $derived(data);

  $effect(() => {
    setContext('user', user);
  });

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
      {#if user}
      <div class="dropdown">
        <img src={user.image} alt="user" />
        <div class="dropdown-content hidden">
          <button onclick={handleSignOut}>sign out</button>
        </div>
      </div>
      {:else}
        <a href="/signin" class="right-content">sign in</a>
      {/if}
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

  a {
    padding-right: 1rem;
    color: black;
    text-decoration: none;
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
    display: block;
  }

  .dropdown-content {
    top: 0;
    right: -1rem;
    position: absolute;
    padding-top:2.5rem;
    z-index: 1;
    width: 6rem;
  }

  button {
    all: unset;
    border: solid 2px rgb(100, 100, 100);
    border-radius: 4px;
    font-weight: bold;
    padding: .3rem .5rem;
    cursor: pointer;
    user-select: none;
    transition: linear 200ms;
  }
  button:hover {
    background-color: black;
    color: white;
    transition: linear 200ms;
  }
</style>