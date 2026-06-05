<script module>
	/** @param {Array<string>} rows */
	function* everyDay(rows) {
		let currentDate;
		while (true) {
			const currentRow = rows.shift()?.split(',');

			if (!currentRow) {
				return;
			}

			if (!currentDate) {
				currentDate = new Date(currentRow[0]);
			}

			while (new Date(currentRow[0]).getTime() - currentDate.getTime() > 1000 * 60 * 60 * 24) {
				currentDate.setDate(currentDate.getDate() + 1);
				yield [currentDate.toISOString().split('T')[0], '', ''];
			}

			currentDate = new Date(currentRow[0]);
			yield currentRow;
		}
	}
</script>

<script>
	import Graph from './graph.svelte';

	/** @type {{ data: string[] }} */
	let { data } = $props();
</script>

<table>
	<tbody>
		{#each everyDay(data) as row}
			<tr>
				<td>{row[0]}</td>
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
