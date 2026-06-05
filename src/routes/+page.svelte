<script module>
	import Graph from '$lib/graph.svelte';
	import { onMount } from 'svelte';

	async function readResponse(url) {
		const resp = await fetch(url, { cache: 'no-store' });
		const text = await resp.text();
		return text.split('\n');
	}

	/**
	 * @param {Array<string>} rows
	 */
	function* generator(rows) {
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
	/** @type {string[] | undefined} */
	let data = $state(undefined);

	const fetchData = async () => {
		data = await readResponse('/data.csv');
	};

	const onVisible = () => {
		if (document.visibilityState === 'visible') fetchData();
	};

	onMount(() => {
		fetchData();
		document.addEventListener('visibilitychange', onVisible);
		window.addEventListener('focus', fetchData);
		return () => {
			document.removeEventListener('visibilitychange', onVisible);
			window.removeEventListener('focus', fetchData);
		};
	});
</script>

<table>
	<tbody>
		{#if data}
			{#each generator([...data]) as row}
				<tr>
					<td>{row[0]}</td>
					{#if row[1] && row[2]}
						<td><Graph startTime={row[1]} endTime={row[2]} /></td>
					{/if}
				</tr>
			{/each}
		{/if}
	</tbody>
</table>

<style>
	table td {
		padding: 8px;
		font-family: sans-serif;
	}
</style>
