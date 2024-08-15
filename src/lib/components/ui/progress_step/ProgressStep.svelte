<script lang="ts">
	import { Check, ChevronRight } from 'lucide-svelte';

	export let title: string;
	export let index: number;
	export let status: ProgressStepStatus;

	type ProgressStepStatus = 'active' | 'completed' | 'inactive';

	$: highlightColor =
		status === 'active'
			? 'border-white text-white '
			: status === 'completed'
				? 'border-green-200 text-green-200 line-through  '
				: 'border-gray-300 text-gray-300';
</script>

<div
	class="m-2 flex flex-row items-center justify-between border-2 px-3 py-2 text-xl font-bold shadow-xl {highlightColor}"
>
	<div class="gray flex flex-row items-center gap-3 text-2xl font-bold">
		<span class="text-3xl font-black">{index}.</span>
		<h2>{title}</h2>
	</div>
	{#if status === 'completed'}
		<Check class="my-1 -mr-2 ml-2" size="28" />
	{:else if status === 'active'}
		<ChevronRight class="my-1 -mr-2 ml-2" size="28" />
	{/if}
</div>

<!--


<div
				class=" m-2 flex flex-row items-center justify-between border-2 border-green-200 px-3 py-2 text-xl font-bold text-green-200 line-through shadow-xl"
			>
				<div class=" flex flex-row items-center gap-3 text-2xl font-bold">
					<span class="text-3xl font-black">1.</span>
					<h2>Confirm Details</h2>
				</div>
			</div>
			<div
				class=" m-2 flex flex-row items-center justify-between border-2 px-3 py-2 text-xl font-bold"
			>
				<div class=" flex flex-row items-center gap-3 text-2xl font-bold">
					<span class="text-3xl font-black">2.</span>
					<h2>Select Programmes</h2>
				</div>
			</div>
			<div
				class=" m-2 flex flex-row items-center justify-between border-2 border-sky-400 px-3 py-2 text-xl font-bold text-sky-400"
			>
				<div class=" flex flex-row items-center gap-3 text-2xl font-bold">
					<span class="text-3xl font-black">1.</span>
					<h2>Select Term</h2>
				</div>
			</div>
			<div
				class=" m-2 flex flex-row items-center justify-between border-2 px-3 py-2 text-xl font-bold"
			>
				<div class=" flex flex-row items-center gap-2 text-2xl font-bold">
					<span class="text-3xl font-black">1.</span>
					<h2>Select Dates</h2>
				</div>
			</div>
			<div
				class=" m-2 flex flex-row items-center justify-between border-2 px-3 py-2 text-xl font-bold"
			>
				<div class=" flex flex-row items-center gap-3 text-2xl font-bold">
					<span class="text-3xl font-black">1.</span>
					<h2>Confirm Order</h2>
				</div>
			</div>



-->
