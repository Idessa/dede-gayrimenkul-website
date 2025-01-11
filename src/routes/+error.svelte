<script lang="ts">
	import { page } from '$app/state';
</script>

<svelte:head>
	<title>Hata | Dede Gayrimenkul</title>
</svelte:head>

<div class="flex h-screen w-full flex-col items-center justify-center gap-2">
	<div class="text-center text-6xl font-bold">{page.status}</div>
	<div class="text-center text-xl">{page.error.message}</div>
</div>
