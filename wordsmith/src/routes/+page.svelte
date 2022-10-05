<script lang="ts">
	import '@unocss/reset/tailwind.css';
	import 'uno.css';
	import Recordings from '$lib/components/recordings.svelte';
	import Keywords from '$lib/components/keywords.svelte';
	import Cases from '$lib/components/cases.svelte';
</script>

<div class="p-4 bg-gray-700">
	<div class="mt-4">
		<Keywords />
	</div>
	<div class="mt-4">
		<Cases />
	</div>
	<div class="mt-4">
		<Recordings />
	</div>
</div>
