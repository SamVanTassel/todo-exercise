<script lang="ts">
	import { enhance } from "$app/forms";
</script>

<form method="POST" use:enhance>
  <label>
    <input type="text" name="text" autocomplete="off"/>
  </label>
  <button type="submit">add todo</button>
</form>

<style>
  form {
    display: flex;
    justify-content: space-between;
  }
  input {
    width: 100%;
  }
</style>