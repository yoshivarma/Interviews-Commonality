<script lang="ts">
	import { page } from '$app/stores';
	import Keywords from '$lib/components/keywords.svelte';
	import Recordings from '$lib/components/recordings.svelte';
</script>

<div class="h-screen bg-gray-700 items-center justify-center">
	<a href="/"
		><button type="button" class="m-2 px-8 py-3 font-semibold rounded text-gray-100 bg-gray-800"
			>Back</button
		></a
	>
	<div class="items-center justify-center">
		<h1 class="p-2 text-gray-100">Case {$page.url.toString().split('/').at(-1)} Keywords</h1>

		<div class="items-center justify-between flex p-2">
			{#each ['keyword 1', 'keyword 2', 'keyword 3', 'keyword 4'] as word}
				<div class="">
					<Keywords {word} />
				</div>
			{/each}
		</div>
		<div class="mt-4 p-4">
			<Recordings />
		</div>
		<div class="mt-4 items-center justify-center flex">
			<button class="px-8 py-3 font-semibold rounded bg-gray-800 text-gray-100"
				>Find Keywords</button
			>
		</div>
	</div>
</div>
