<script lang="ts">
	import { enhance } from "$app/forms";
</script>

<form method="POST" use:enhance>
  <label>
    <input type="text" name="text" autocomplete="off"/>
  </label>
  <button type="submit">add todo</button>
</form>