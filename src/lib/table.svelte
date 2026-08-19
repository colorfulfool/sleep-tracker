<script>
	import everyDay from './every-day';
	import Graph from './graph.svelte';

	/** @type {{ data: string[] }} */
	let { data } = $props();

	const MONTHS = {
		'03': 'Март',
		'04': 'Апрель',
		'05': 'Май',
		'06': 'Июнь',
		'07': 'Июль',
		'08': 'Август'
	};
</script>

<div>
	<h2>{MONTHS[data[0].split('-')[1]]}</h2>
	<table>
		<tbody>
			{#each everyDay([...data]) as row}
				<tr>
					<td style="white-space: nowrap;">{row[0]}</td>
					{#if row[1] && row[2]}
						<td><Graph startTime={row[1]} endTime={row[2]} /></td>
					{/if}
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style>
	h2 {
		font-family: sans-serif;
		border-bottom: 1px solid black;
		margin: 0px 0px 4px;
		padding: 4px 8px;
	}

	table td {
		padding: 8px;
		font-family: sans-serif;
	}
</style>
