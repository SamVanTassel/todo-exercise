<script lang="ts">
	import { invalidateAll } from "$app/navigation";

  const { todo } = $props();

  const onToggle = () => {
    fetch('/api/toggle', {
      method: 'POST',
      body: JSON.stringify({ id: todo.id }),
    });
  }

  const onDelete = () => {
    fetch('/api/delete', {
      method: 'POST',
      body: JSON.stringify({ id: todo.id }),
    });
    invalidateAll();
  }
</script>

<div>
  <input type="checkbox" checked={todo.completed}
  onchange={onToggle}/>
{todo.text}
  <button onclick={onDelete}>🗑️</button>
</div>