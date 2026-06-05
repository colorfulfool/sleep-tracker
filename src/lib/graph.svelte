<script>
	import Time from './time';

	/** @type {{ startTime: string, endTime: string }} */
	let { startTime, endTime } = $props();

	let start = $derived(Time.fromString(startTime));
	let end = $derived(Time.fromString(endTime));

	const WIDTH_PX = 240;
	const WIDTH_HR = 24;
	const SHIFT_HR = 18;

	let left = $derived((WIDTH_PX / WIDTH_HR) * (start.wrapped().toHours() - SHIFT_HR));
	let right = $derived(WIDTH_PX - (WIDTH_PX / WIDTH_HR) * (end.wrapped(true).toHours() - SHIFT_HR));

	const GAP = 8;

	let labelShift = $derived.by(() => {
		const filledWidth = WIDTH_PX - left - right;
		const missing = filledWidth - 27 * 2 - GAP;
		if (missing < 0) {
			return Math.abs(missing) / 2;
		}
		return 0;
	});
</script>

<div class="container">
	<div class="duration" style={`left: ${left}px; right: ${right}px;`}></div>
	<div class="midnight"></div>
	<div class="small" style={`left: ${left}px; transform: translateX(-${labelShift}px)`}>
		{start.toString()}
	</div>
	<div class="small" style={`right: ${right}px; transform: translateX(${labelShift}px)`}>
		{end.toString()}
	</div>
</div>

<style>
	.container {
		width: 240px;
		height: 16px;
		background: lightgray;
		position: relative;
	}

	.duration {
		position: absolute;
		top: 0px;
		bottom: 0px;
		background: darkgrey;
	}

	.midnight {
		position: absolute;
		background: black;
		top: -2px;
		bottom: -2px;
		left: 60px;
		right: 178px;
		z-index: 10;
	}

	.small {
		font-family: sans-serif;
		position: absolute;
		font-size: 11px;
		bottom: -14px;
	}
</style>
