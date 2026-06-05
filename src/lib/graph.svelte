<script module>
	/** @param {number} num */
	function pad(num) {
		const str = num.toString();
		return Array.from({ length: 2 - str.length }, () => '0').join() + str;
	}

	class Time {
		/** @param {string} time */
		static fromString(time) {
			const [hours, minutes] = time.split(':').map(Number);
			return new Time(hours, minutes);
		}

		/**
		 * @param {number} hours
		 * @param {number} minutes
		 */
		constructor(hours, minutes) {
			this.hours = hours;
			this.minutes = minutes;
		}

		wrapped(sure = false) {
			const num = this.hours;
			if (num > 18 && !sure) return new Time(this.hours, this.minutes);
			return new Time(24 + this.hours, this.minutes);
		}

		toHours() {
			return this.hours;
		}

		toMinutes() {
			return this.hours * 60 + this.minutes;
		}

		toString() {
			return `${pad(this.hours)}:${pad(this.minutes)}`;
		}
	}
</script>

<script>
	/** @type {{ startTime: string, endTime: string }} */
	let { startTime, endTime } = $props();

	let start = $derived(Time.fromString(startTime));
	let end = $derived(Time.fromString(endTime));

	const WIDTH_PX = 240;
	const WIDTH_HR = 24;
	const SHIFT_HR = 18;

	let left = $derived((WIDTH_PX / WIDTH_HR) * (start.wrapped().toHours() - SHIFT_HR));
	let right = $derived(WIDTH_PX - (WIDTH_PX / WIDTH_HR) * (end.wrapped(true).toHours() - SHIFT_HR));
</script>

<div class="container">
	<div class="duration" style={`left: ${left}px; right: ${right}px;`}></div>
	<div class="midnight"></div>
	<div class="small" style={`left: ${left}px`}>{start.toString()}</div>
	<div class="small" style={`right: ${right}px`}>{end.toString()}</div>
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
