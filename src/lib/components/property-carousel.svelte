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
	class="relative h-[600px] w-full overflow-hidden"
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
					class="absolute bottom-0 left-0 right-0 bg-black/50 p-6 text-white"
					href="/gayrimenkul/{property.slug}"
				>
					<h2 class="text-2xl font-bold">{property.title}</h2>
					<p class="text-xl">{property.price.toLocaleString('tr-TR')} ₺</p>
					<div class="mt-2 flex gap-4">
						{property.city}, {property.district}, {property.neighborhood}
					</div>
				</a>
			</div>
		{/each}
	</div>

	<!-- Kontrol butonları için keyboard navigation -->
	<div class="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-2 md:bottom-24">
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

	<!-- Masaüstü butonlar -->
	<button
		onclick={prevSlide}
		class="absolute left-4 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/80 p-2 hover:bg-white md:block"
		aria-label="Önceki gayrimenkul"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="h-6 w-6"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
		>
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
		</svg>
	</button>

	<button
		onclick={nextSlide}
		class="absolute right-4 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/80 p-2 hover:bg-white md:block"
		aria-label="Sonraki gayrimenkul"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="h-6 w-6"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
		>
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
		</svg>
	</button>
</div>
