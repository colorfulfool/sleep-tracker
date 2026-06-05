<script>
	import { linear } from './scaling-functions';
	import Time from './time';

	/** @type {{ startTime: string, endTime: string }} */
	let { startTime, endTime } = $props();

	let start = $derived(Time.fromString(startTime));
	let end = $derived(Time.fromString(endTime));

	const WIDTH_PX = 240;
	const WIDTH_MIN = 24 * 60;
	const SHIFT_MIN = 18 * 60;

	let left = $derived((WIDTH_PX / WIDTH_MIN) * (start.wrapped().toMinutes() - SHIFT_MIN));
	let right = $derived(
		WIDTH_PX - (WIDTH_PX / WIDTH_MIN) * (end.wrapped(true).toMinutes() - SHIFT_MIN)
	);

	const GAP = 8;

	let labelShift = $derived.by(() => {
		const filledWidth = WIDTH_PX - left - right;
		const missing = filledWidth - 27 * 2 - GAP;
		if (missing < 0) {
			return Math.abs(missing) / 2;
		}
		return 0;
	});

	const color = $derived.by(() => {
		const duration = (end.wrapped(true).toMinutes() - start.wrapped().toMinutes()) / 60;
		const hue = linear(duration, 8, 120, 6, 0);
		return `hsl(${hue} 70% 50%)`;
	});
</script>

<div class="container">
	<div
		data-duration={(end.wrapped(true).toMinutes() - start.wrapped().toMinutes()) / 60}
		data-color={color}
		class="duration"
		style={`left: ${left}px; right: ${right}px; background: ${color}; `}
	></div>
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
		background: #dfdfdf;
		position: relative;
	}

	.duration {
		position: absolute;
		top: 0px;
		bottom: 0px;
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
