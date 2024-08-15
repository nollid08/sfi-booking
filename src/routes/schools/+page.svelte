<script lang="ts">
	import { collection, endAt, query, where } from 'firebase/firestore';
	import type { PageData } from '../schools/$types';
	import { firestore } from '$lib/firebase';
	import Search from 'lucide-svelte/icons/search';
	import MoveRight from 'lucide-svelte/icons/move-right';
	import Plus from 'lucide-svelte/icons/plus';
	import Loader from '$lib/components/ui/loader/loader.svelte';
	import { Input } from '$lib/components/ui/input';
	import { Client, clientConverter } from '$lib/models/client';
	import { Label } from '$lib/components/ui/label';
	import { Collection } from 'sveltefire';
	import { Card } from '$lib/components/ui/card';
	import { Separator } from '$lib/components/ui/separator';
	import { Button } from '$lib/components/ui/button';
	import roundedLogo from '$lib/assets/rounded-logo.png';

	export let data: PageData;

	let schoolIdentifier = '';

	$: schoolIdentifier = schoolIdentifier.toUpperCase();
</script>

<div class="mx-auto flex w-2/3 min-w-96 flex-col items-center">
	<img src={roundedLogo} alt="Rounded Logo" class="mt-5 w-16" />
	<h1 class="mt-16 text-6xl font-black">Who Are You?</h1>
	<div class=" relative mt-10 w-2/3">
		<Input
			type="email"
			id="email"
			bind:value={schoolIdentifier}
			placeholder="Enter Your Schools Eircode Or Roll Number"
			class="box-border overflow-ellipsis rounded-3xl  border-2 border-white bg-opacity-0 py-9 pt-8 text-3xl font-bold placeholder-[#e3f2ff]"
		></Input>
		<Search
			class="absolute right-3 top-[50%] h-8 w-8 translate-y-[-50%] text-muted-foreground"
		/>
	</div>

	<Collection
		ref={query(
			collection(firestore, 'clients'),
			where('type', 'in', ['primarySchool', 'secondarySchool'])
		).withConverter(clientConverter)}
		let:data
		let:count
	>
		{@const filteredSchools = data.filter(
			(school) =>
				school.eircode?.toUpperCase().includes(schoolIdentifier) ||
				school.rollNumber?.toUpperCase().includes(schoolIdentifier)
		)}
		{#if schoolIdentifier.length >= 3}
			{@const schoolOptions = filteredSchools.slice(0, 3)}
			<div
				class="mt-3 box-border w-2/3 overflow-ellipsis rounded-3xl border-2 border-white"
			>
				{#each schoolOptions as school}
					<a href="/schools/{school.id}/confirm-details">
						<div class="al group flex items-center justify-between p-7">
							<div
								class=" transform transition duration-500
                                group-hover:scale-110"
							>
								<h2 class="text-4xl font-bold">{school.name}</h2>
								<h5>
									{school.town ?? school.eircode}, {school.county ??
										school.rollNumber}
								</h5>
							</div>
							<MoveRight
								size="48"
								class="h-full transform  text-muted-foreground transition duration-500
                                group-hover:scale-x-[1.2] group-hover:scale-y-110"
							/>
						</div>
					</a>
					{#if schoolOptions.at(-1) != school}
						<Separator />
					{/if}
				{/each}
				{#if filteredSchools.length < 3}
					{#if filteredSchools.length != 0}
						<Separator />
					{/if}
					<div class="al group flex items-center justify-between p-7">
						<div
							class=" transform transition duration-500
                                group-hover:scale-110"
						>
							<h2 class="text-4xl font-bold">Don't See Your School?</h2>
							<h5>Let's Get You Set Up</h5>
						</div>
						<Plus
							size="48"
							class="h-full transform  text-muted-foreground transition duration-500
                                group-hover:scale-x-[1.2] group-hover:scale-y-110"
						/>
					</div>
				{/if}
			</div>
		{:else if schoolIdentifier.length <= 3 && schoolIdentifier.length > 0}
			<Loader />
		{/if}
	</Collection>
	<Button
		variant="outline"
		class="absolute bottom-0 right-0 z-10 m-6 border-2 border-white bg-transparent text-4xl"
		>Are You Not A School?</Button
	>
</div>
