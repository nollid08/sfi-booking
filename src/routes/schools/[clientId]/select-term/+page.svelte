<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import type { Activity } from '$lib/models/activity';
	import type { Term } from '$lib/models/terms';
	import type { PageData } from './$types';

	export let data: PageData;

	const oldUrlSearchParams = $page.url.searchParams;
	const activities = data.activities;
	const selectedActivities = oldUrlSearchParams
		.getAll('activity')
		.map((id) => activities.find((activity) => activity.id === id)!);

	if (selectedActivities.length === 0) {
		goto('select-programmes', { replaceState: true });
	}

	const terms = data.terms;

	const termsWithSelection: { term: Term; selected: boolean }[] = terms.map(
		(term) => {
			return { term, selected: false };
		}
	);

	$: selectedTerms = termsWithSelection
		.filter((term) => term.selected)
		.map((term) => term.term);
	$: urlSearchParams = createSearchParams(selectedTerms, selectedActivities);

	const createSearchParams = (
		selectedTerms: Term[],
		selectedActivites: Activity[]
	) => {
		const searchParams = new URLSearchParams();
		selectedTerms.forEach((term) => {
			searchParams.append('term', term.id);
		});
		selectedActivites.forEach((activity) => {
			searchParams.append('activity', activity.id);
		});
		return searchParams;
	};

	$: nextDestination = `select-dates?${urlSearchParams}`;

	$: console.log(nextDestination);
</script>

<h1 class=" mb-5 text-center text-2xl font-extrabold">
	What Term Would You Like?
</h1>

<div class="grid grid-cols-2 gap-2">
	{#each termsWithSelection as selectableTerm}
		<div
			class="m-2 flex gap-3 rounded-sm border-2 border-blue-500 p-3 align-middle font-semibold"
		>
			<Checkbox
				id={selectableTerm.term.id}
				bind:checked={selectableTerm.selected}
				aria-labelledby="terms-label"
				class="size-6 border-blue-500"
			/>
			{#if selectableTerm}
				<label for={selectableTerm.term.id}>{selectableTerm.term.title}</label>
			{/if}
		</div>
	{/each}
</div>

<div class=" flex flex-row justify-between">
	<a href="confirm-details">
		<Button variant="outline" class="border-blue-950">Prev</Button>
	</a>
	<a href={nextDestination}>
		<Button variant="outline" class="border-blue-950">Next</Button></a
	>
</div>
