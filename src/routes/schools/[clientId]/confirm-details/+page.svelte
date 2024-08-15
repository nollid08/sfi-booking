<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';

	import { formSchema, type FormSchema } from './schema';
	import {
		type SuperValidated,
		type Infer,
		superForm
	} from 'sveltekit-superforms';
	import {
		School,
		ScrollText,
		LocateFixed,
		Map,
		Backpack,
		Users
	} from 'lucide-svelte';
	import ProgressBar from '$lib/components/ui/progress_bar/progress_bar.svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import type { PageData } from './$types';
	import { zodClient } from 'sveltekit-superforms/adapters';
	let steps = ['Info', 'Address', 'Payment', 'Confirmation'],
		currentActive = 1,
		progressBar: ProgressBar;

	export let data: PageData;

	const school = data.school;

	const handleProgress = (stepIncrement: number) => {
		progressBar.handleProgress(stepIncrement);
	};

	const form = superForm(data.form, {
		validators: zodClient(formSchema)
	});

	const { form: formData, enhance } = form;
</script>

<div class="flex h-full w-full items-center justify-center">
	<form method="POST" class="flex w-full flex-col px-8 text-black" use:enhance>
		<h1 class=" mb-5 text-center text-2xl font-extrabold">
			Let's Check Some Details
		</h1>
		<div>
			<div class="flex items-center justify-between">
				<span class="center flex items-center gap-1 text-xl font-bold"
					><School class="mr-2" /> School Name:</span
				>
				<p class="font-medium">{school.name}</p>
			</div>
			<Separator class="my-4 bg-blue-950" />
		</div>
		<div>
			<div class="flex items-center justify-between">
				<span class="center flex items-center gap-1 text-xl font-bold"
					><ScrollText class="mr-2" /> Roll Number:</span
				>
				<p class="font-medium">{school.rollNumber}</p>
			</div>
			<Separator class="my-4 bg-blue-950" />
		</div>
		<div>
			<div class="flex items-center justify-between">
				<span class="center flex items-center gap-1 text-xl font-bold"
					><LocateFixed class="mr-2" /> Eircode:</span
				>
				<p class="font-medium">{school.eircode}</p>
			</div>
			<Separator class="my-4 bg-blue-950" />
		</div>
		<div>
			<div class="flex items-center justify-between">
				<span class="center flex items-center gap-1 text-xl font-bold"
					><Map class="mr-2" /> Address:</span
				>
				<div class="flex flex-col items-end">
					<p class="font-medium">{school.town},</p>
					<p class="font-medium">{school.county}</p>
				</div>
			</div>
			<Separator class="my-4 bg-blue-950" />
		</div>
		<div>
			<Form.Field {form} name="classrooms">
				<Form.Control let:attrs>
					<div class="flex flex-row items-center justify-between">
						<Form.Label>
							<span class="center flex items-center gap-1 text-xl font-bold"
								><Backpack class="mr-2" />Mainstream Classrooms:
							</span>
						</Form.Label>
						<Input
							{...attrs}
							bind:value={$formData.classrooms}
							class="max-w-14 border-blue-950"
						/>
					</div>
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Separator class="my-4 bg-blue-800" />
		</div>
		<div>
			<Form.Field {form} name="students">
				<Form.Control let:attrs>
					<div class="flex flex-row items-center justify-between">
						<Form.Label>
							<span
								class="center mr-2 flex items-center gap-1 text-xl font-bold"
								><Users class="mr-2" />Total No. Students:
							</span>
						</Form.Label>
						<Input
							{...attrs}
							bind:value={$formData.students}
							class="max-w-14 border-blue-950"
						/>
					</div>
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Separator class="my-4 bg-blue-800" />
		</div>
		<div class=" flex flex-row justify-between">
			<Button
				variant="outline"
				on:click={() => handleProgress(-1)}
				disabled={currentActive == 1}
				class="border-blue-950">Prev</Button
			>
			<Button
				variant="outline"
				on:click={() => {
					form.submit();
				}}
				disabled={currentActive == steps.length}
				class="border-blue-950">Next</Button
			>
		</div>
	</form>
</div>
