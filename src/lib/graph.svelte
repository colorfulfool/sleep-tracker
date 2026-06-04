<script module>
	function wrapped(hour) {
		const num = Number(hour);
		if (num > 18) return num;
		return 24 + num;
	}
</script>

<script>
	/** @type {{ start: string, end: string }} */
	let { start, end } = $props();
</script>

<div class="container">
	<div
		class="duration"
		style={`
      left: ${(240 / 24) * (wrapped(start) - 18)}px;
      right: ${240 - (240 / 24) * (Number(end) + 24 - 18)}px;
    `}
	></div>
	<div class="midnight"></div>
</div>

<style>
	.container {
		width: 240px;
		height: 18px;
		background: black;
		position: relative;
	}

	.duration {
		position: absolute;
		top: 0px;
		bottom: 0px;
		background: green;
	}

	.midnight {
		position: absolute;
		background: blue;
		top: -2px;
		bottom: -2px;
		left: 60px;
		right: 179px;
		z-index: 10;
	}
</style>
