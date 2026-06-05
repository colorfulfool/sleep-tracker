<script module>
	import { readResponse, divideBy } from '$lib/helpers';
	import Table from '$lib/table.svelte';
</script>

<div style={`flex-direction: ${'column'}`}>
	{#await readResponse('/data.csv') then data}
		{#each divideBy(data, (row) => row.match(/-\d{2}-/)?.[0] ?? '') as monthData}
			<Table data={monthData} />
		{/each}
	{/await}
</div>

<style>
	div {
		display: flex;
		gap: 8px;
		align-items: start;
	}
</style>
