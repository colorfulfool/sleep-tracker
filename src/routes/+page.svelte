<script module>
	import Table from '$lib/table.svelte';

	/** @param {string} url */
	async function readResponse(url) {
		const resp = await fetch(url, { cache: 'no-store' });
		const text = await resp.text();
		return text.split('\n');
	}
</script>

<div style={`flex-direction: ${'column'}`}>
	{#await readResponse('/data.csv') then data}
		<Table {data} />
	{/await}
</div>

<style>
	div {
		display: flex;
		gap: 8px;
		align-items: start;
	}
</style>
