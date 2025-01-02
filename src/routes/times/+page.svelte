<script>
  const { data } = $props();
  const { dbDate, serverDate } = data.data;
</script>

<h1>times</h1>
<h2>time from database</h2>
<p>{dbDate}</p>
<h2>time from database</h2>
<p>{serverDate}</p>
<h2>time from client</h2>
<p>{new Date().toString()}</p>
