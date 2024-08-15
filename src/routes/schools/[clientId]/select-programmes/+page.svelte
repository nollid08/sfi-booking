<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import type { Activity } from '$lib/models/activity';
	import type { PageData } from './$types';

	export let data: PageData;
	const client = data.school;
	const activities = data.activities;
	activities.forEach((activity) => {
		console.log(activity);
	});
	const activitiesWithSelection: { activity: Activity; selected: boolean }[] =
		activities.map((activity) => {
			return { activity, selected: false };
		});

	$: selectedActivities = activitiesWithSelection
		.filter((activity) => activity.selected)
		.map((activity) => activity.activity);
	$: UrlSearchParams = createSearchParams(selectedActivities);

	const createSearchParams = (selectedActivities: Activity[]) => {
		const searchParams = new URLSearchParams();
		selectedActivities.forEach((activity) => {
			searchParams.append('activity', activity.id);
		});
		return searchParams;
	};
</script>

<h1 class=" mb-5 text-center text-2xl font-extrabold">
	What Programme Would You Like?
</h1>
<div class="grid grid-cols-2 gap-2">
	{#each activitiesWithSelection as activitySelection}
		{#if activitySelection.activity.isComputerBookable}
			<div
				class="m-2 flex gap-3 rounded-sm border-2 border-blue-500 p-3 align-middle font-semibold"
			>
				<Checkbox
					id={activitySelection.activity.id}
					bind:checked={activitySelection.selected}
					aria-labelledby="terms-label"
					class="size-6 border-blue-500"
				/>
				<label for={activitySelection.activity.id}
					>{activitySelection.activity.name}</label
				>
			</div>
		{/if}
	{/each}
</div>
<div class=" flex flex-row justify-between">
	<a href="confirm-details">
		<Button variant="outline" class="border-blue-950">Prev</Button>
	</a>
	<a href="select-term?{UrlSearchParams}">
		<Button variant="outline" class="border-blue-950">Next</Button></a
	>
</div>
