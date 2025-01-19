<script lang="ts">
	interface Props {
		title: string;
		description: string;
	}

	let { title, description }: Props = $props();
</script>

<div class="background-photo relative py-16 text-white dark:text-gray-100">
	<div class="absolute inset-0 bg-black/50 dark:bg-black/60"></div>
	<div class="container relative mx-auto px-4 pt-16">
		<h1 class="mb-4 text-center text-4xl font-bold">{title}</h1>
		<p class="mx-auto max-w-2xl text-center text-lg text-white/90 dark:text-gray-200">
			{description}
		</p>
	</div>
</div>

<style lang="postcss">
	.background-photo {
		@apply min-h-[300px];
		background-image: url('/slide1.webp');
		background-size: cover;
		background-position: center bottom;
		background-repeat: no-repeat;
	}
</style>
