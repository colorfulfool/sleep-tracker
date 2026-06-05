<script>
	import everyDay from './every-day';
	import Graph from './graph.svelte';

	/** @type {{ data: string[] }} */
	let { data } = $props();
</script>

<table>
	<tbody>
		{#each everyDay(data) as row}
			<tr>
				<td style="white-space: nowrap;">{row[0]}</td>
				{#if row[1] && row[2]}
					<td><Graph startTime={row[1]} endTime={row[2]} /></td>
				{/if}
			</tr>
		{/each}
	</tbody>
</table>

<style>
	table td {
		padding: 8px;
		font-family: sans-serif;
	}
</style>
