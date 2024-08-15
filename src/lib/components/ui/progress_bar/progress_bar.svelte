<script lang="ts">
	export let steps: string[] = [],
		currentActive = 1;
	let circles: any, progress: HTMLDivElement;

	export const handleProgress = (stepIncrement: number) => {
		circles = document.querySelectorAll('.circle');
		if (stepIncrement == 1) {
			currentActive++;

			if (currentActive > circles.length) {
				currentActive = circles.length;
			}
		} else {
			currentActive--;

			if (currentActive < 1) {
				currentActive = 1;
			}
		}

		update();
	};

	function update() {
		circles.forEach((circle: any, idx: any) => {
			if (idx < currentActive) {
				circle.classList.add('active');
			} else {
				circle.classList.remove('active');
			}
		});

		const actives = document.querySelectorAll('.active');

		progress.style.width =
			((actives.length - 1) / (circles.length - 1)) * 100 + '%';
	}
</script>

<div class={$$restProps.class || ''}>
	<div class="progress-container" bind:this={circles}>
		<div class="progress" bind:this={progress}></div>
		{#each steps as step, i}
			<div
				class="circle {i == 0 ? 'active' : ''} font-semibold"
				data-title={step}
			>
				{i + 1}
			</div>
		{/each}
	</div>
</div>

<style>
	:root {
		--progress-bg-color: #e0e0e0;
		--circle-bg-color: #fff;
		--circle-border-color: #aad9b4;
		--circle-text-color: #89bf84;
		--circle-active-color: #48d938;
	}

	.progress-container {
		display: flex;
		justify-content: space-between;
		position: relative;
		margin-bottom: 30px;
		max-width: 100%;
		width: 350px;
	}

	.progress-container::before {
		content: '';
		background-color: var(--progress-bg-color);
		position: absolute;
		top: 50%;
		left: 0;
		transform: translateY(-50%);
		height: 4px;
		width: 100%;
		z-index: -1;
	}

	.progress {
		background-color: var(--circle-active-color);
		position: absolute;
		top: 50%;
		left: 0;
		transform: translateY(-50%);
		height: 4px;
		width: 0%;
		z-index: -1;
		transition: 0.4s ease;
	}

	.circle {
		background-color: var(--circle-bg-color);
		color: var(--circle-text-color);
		border-radius: 50%;
		height: 30px;
		width: 30px;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 3px solid var(--circle-border-color);
		transition: 0.4s ease;
		cursor: pointer;
	}

	.circle::after {
		content: attr(data-title) ' ';
		position: absolute;
		bottom: 35px;
		color: var(--circle-text-color);
		transition: 0.4s ease;
	}

	.circle.active::after {
		color: var(--circle-active-color);
	}

	.circle.active {
		border-color: var(--circle-active-color);
	}
</style>
