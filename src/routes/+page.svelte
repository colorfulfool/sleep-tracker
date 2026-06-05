<script module>
	import { readResponse, divideBy } from '$lib/helpers';
	import Table from '$lib/table.svelte';

	let isSideBySide = $state(false);
</script>

<div style={`flex-direction: ${isSideBySide ? 'row' : 'column'}`}>
	{#await readResponse('/data.csv') then data}
		{#each divideBy(data, (row) => row.match(/-\d{2}-/)?.[0] ?? '') as monthData}
			<Table data={monthData} />
		{/each}
	{/await}
</div>

<div class="toolbar">
	<label>
		<input type="checkbox" bind:checked={isSideBySide} />
		side-by-side
	</label>
</div>

<style>
	div {
		display: flex;
		gap: 16px;
		align-items: start;
	}

	.toolbar {
		padding: 16px;
		font-family: sans-serif;
		border-top: 1px solid black;
	}
</style>
