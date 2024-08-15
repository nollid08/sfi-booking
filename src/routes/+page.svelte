<script lang="ts">
	import Book from 'lucide-svelte/icons/book';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Card } from '$lib/components/ui/card/index.js';
</script>

<div
	class="min-w-screen flex min-h-screen flex-row items-center justify-center"
>
	<div class="flex h-full flex-col items-center justify-center">
		<img src="/logo.png" alt="SFI Logo" class="mb-14 h-72" />
		<h1
			class="scroll-m-20 p-5 text-9xl font-extrabold tracking-tight text-white lg:text-5xl"
		>
			Book A Programme
		</h1>
		<Button class="p-8 text-2xl">
			<Book class="mr-2 h-8 font-black" />
			<a rel="external" href="/schools">Book Here</a>
		</Button>
	</div>
</div>
<video
	autoplay
	muted
	loop
	id="myVideo"
	class="fixed bottom-0 right-0 -z-10 min-h-full min-w-full bg-cover object-cover brightness-[.3]"
>
	<source src="/background.mp4" type="video/mp4" />
	Your browser does not support HTML5 video.
</video>
