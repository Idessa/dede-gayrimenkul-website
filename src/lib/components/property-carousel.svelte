<script lang="ts">
	import type { Property } from '$lib/types';

	let { properties } = $props<{ properties: Property[] }>();
	let currentIndex = $state(0);
	let touchStartX = $state(0);
	let touchEndX = $state(0);
	let interval: NodeJS.Timeout;

	const resetInterval = () => {
		clearInterval(interval);
		interval = setInterval(nextSlide, 5000);
	};

	const nextSlide = () => {
		currentIndex = (currentIndex + 1) % properties.length;
		resetInterval();
	};

	const prevSlide = () => {
		currentIndex = (currentIndex - 1 + properties.length) % properties.length;
		resetInterval();
	};

	const handleTouchStart = (e: TouchEvent) => {
		touchStartX = e.touches[0].clientX;
	};

	const handleTouchMove = (e: TouchEvent) => {
		touchEndX = e.touches[0].clientX;
	};

	const handleTouchEnd = () => {
		const swipeDistance = touchEndX - touchStartX;

		if (Math.abs(swipeDistance) > 50) {
			// minimum swipe mesafesi
			if (swipeDistance > 0) {
				prevSlide();
			} else {
				nextSlide();
			}
		}

		// Touch değerlerini sıfırla
		touchStartX = 0;
		touchEndX = 0;
	};

	$effect(() => {
		interval = setInterval(nextSlide, 5000);
		return () => clearInterval(interval);
	});

	const getDotClass = (index: number) => {
		return `w-3 h-3 rounded-full transition-colors ${
			currentIndex === index ? 'bg-white' : 'bg-white/50'
		}`;
	};

	console.log(properties);
</script>

<div
	class="relative h-[600px] w-full overflow-hidden bg-amber-50 dark:bg-gray-800"
	role="region"
	aria-label="Gayrimenkul Slayt Gösterisi"
	ontouchstart={handleTouchStart}
	ontouchmove={handleTouchMove}
	ontouchend={handleTouchEnd}
>
	<div
		class="relative flex h-full w-full transition-transform duration-500 ease-in-out"
		style="transform: translateX(-{currentIndex * 100}%)"
		role="list"
	>
		{#each properties as property, i}
			<div class="relative h-full min-w-full" role="listitem" aria-current={currentIndex === i}>
				<img
					src="https://energydnd.idesamedya.com/assets/{property.main_image}"
					alt={property.title}
					class="h-full w-full object-cover"
					loading={i === 0 ? 'eager' : 'lazy'}
					decoding="async"
					style="object-position: center; object-fit: cover;"
				/>

				<a
					class="absolute bottom-0 left-0 right-0 bg-black/50 p-6 text-white backdrop-blur-sm transition-colors hover:bg-black/60 dark:bg-black/70 dark:hover:bg-black/80"
					href="/gayrimenkul/{property.slug}"
				>
					<h2 class="text-2xl font-bold text-white">{property.title}</h2>
					<p class="text-xl text-white/90">{property.price.toLocaleString('tr-TR')} ₺</p>
					<div class="mt-2 flex gap-4 text-white/80">
						{property.city}, {property.district}, {property.neighborhood}
					</div>
				</a>
			</div>
		{/each}
	</div>

	<div class="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-2">
		{#each properties as _, i}
			<button
				onclick={() => {
					currentIndex = i;
					resetInterval();
				}}
				class={getDotClass(i)}
				aria-label={`${i + 1}. gayrimenkule git`}
				aria-current={currentIndex === i}
				tabindex="0"
			></button>
		{/each}
	</div>

	<button
		onclick={prevSlide}
		class="absolute left-4 top-1/2 hidden size-10 -translate-y-1/2 rounded-full bg-white/80 p-2 text-gray-900 shadow-lg transition-all hover:bg-white hover:shadow-xl dark:bg-gray-800/80 dark:text-white dark:hover:bg-gray-800 md:block"
		aria-label="Önceki gayrimenkul"
	>
		<iconify-icon icon="mdi:chevron-left" class="text-2xl text-gray-900 dark:text-white"
		></iconify-icon>
	</button>

	<button
		onclick={nextSlide}
		class="absolute right-4 top-1/2 hidden size-10 -translate-y-1/2 rounded-full bg-white/80 p-2 text-gray-900 shadow-lg transition-all hover:bg-white hover:shadow-xl dark:bg-gray-800/80 dark:text-white dark:hover:bg-gray-800 md:block"
		aria-label="Sonraki gayrimenkul"
	>
		<iconify-icon icon="mdi:chevron-right" class="text-2xl text-gray-900 dark:text-white"
		></iconify-icon>
	</button>
</div>
