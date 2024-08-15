<script lang="ts">
	import type { LayoutData } from './$types';
	import { ChevronRight, Check } from 'lucide-svelte';
	import roundedLogo from '$lib/assets/rounded-logo.png';
	import ProgressStep from '$lib/components/ui/progress_step/ProgressStep.svelte';

	export let data: LayoutData;
</script>

<div class="flex h-full w-full flex-col items-center">
	<img src={roundedLogo} alt="Rounded Logo" class="mb-20 mt-5 w-16" />
	<main
		class="flex min-h-[70%] w-2/3 flex-row overflow-clip rounded-md shadow-md shadow-blue-950"
	>
		<div class=" h-full w-1/3 bg-gradient-to-tr from-blue-700 to-sky-600">
			<div class="mb-4 mt-3 flex flex-col items-center">
				<h1 class="mt-3 text-4xl font-bold">{data.school.name}</h1>
			</div>

			<ProgressStep title="Who Are You?" index={1} status="active" />
			<ProgressStep title="Select Programmes" index={2} status="inactive" />
			<ProgressStep title="Select Term" index={3} status="inactive" />
			<ProgressStep title="Select Dates" index={4} status="inactive" />
			<ProgressStep title="Confirm Order" index={5} status="inactive" />
		</div>
		<div class="flex-grow bg-white text-black">
			<slot />
		</div>
	</main>
</div>
