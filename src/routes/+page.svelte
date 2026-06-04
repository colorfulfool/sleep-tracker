<script>
	import Graph from '$lib/graph.svelte';

	const rows = [
		['2026-01-01', '23', '9'],
		['2026-01-04', '02', '12'],
		['2026-01-05', '22', '10']
	];

	/**
	 * @param {Array<Array<string>>} rows
	 */
	function* generator(rows) {
		let currentDate;
		while (true) {
			const currentRow = rows.shift();

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

			yield currentRow;
		}
	}
</script>

<table>
	<tbody>
		{#each generator(rows) as row}
			<tr>
				<td>{row[0]}</td>
				<td>{row[1]}</td>
				<td>{row[2]}</td>
				{#if row[1] && row[2]}
					<td><Graph start={row[1]} end={row[2]} /></td>
				{/if}
			</tr>
		{/each}
	</tbody>
</table>

<style>
	table td {
		padding: 8px;
	}
</style>
