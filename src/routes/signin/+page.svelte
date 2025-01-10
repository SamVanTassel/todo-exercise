<script>
	import { signIn } from '@auth/sveltekit/client';
	import Google from '$lib/icon/google.svelte';
</script>

<div class="login">
  <h1>sign in</h1>
  <button onclick={() => signIn('google', { callbackUrl: '/' })}>
    <Google />sign in with google
  </button>
  <button onclick={() => signIn('github', { callbackUrl: '/' })}>
    sign in with github
  </button>
</div>

<style>
  .login {
    display: flex;
    flex-direction: column;
    margin: auto;
    width: 16rem;
  }

  button {
    display: flex;
    justify-content: center;
    background: none;
    border: solid 2px rgb(100, 100, 100);
    border-radius: 4px;
    font-weight: bold;
    padding: .5rem .5rem;
    cursor: pointer;
    user-select: none;
    margin-bottom: 1rem;
    vertical-align: middle;
    align-content: center;
    flex-wrap:wrap;
  }
</style>