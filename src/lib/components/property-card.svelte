<script lang="ts">
	import type { Property } from '$lib/types';

	const { property } = $props<{
		property: Property;
	}>();

	let currentImageIndex = $state(0);
	let isAnimating = $state(false);
	let touchStartX = $state(0);
	let touchEndX = $state(0);

	// image array olarak geliyor
	const images = [
		`https://energydnd.idesamedya.com/assets/${property.main_image}?key=card-image`,
		...(property?.images?.map(
			(image: { directus_files_id: string }) =>
				`https://energydnd.idesamedya.com/assets/${image.directus_files_id}?key=card-image`
		) ?? [])
	];

	function nextImage() {
		if (!isAnimating) {
			isAnimating = true;
			currentImageIndex = (currentImageIndex + 1) % images.length;
			setTimeout(() => {
				isAnimating = false;
			}, 300);
		}
	}

	function prevImage() {
		if (!isAnimating) {
			isAnimating = true;
			currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
			setTimeout(() => {
				isAnimating = false;
			}, 300);
		}
	}

	function handleTouchStart(e: TouchEvent) {
		touchStartX = e.touches[0].clientX;
	}

	function handleTouchMove(e: TouchEvent) {
		touchEndX = e.touches[0].clientX;
	}

	function handleTouchEnd() {
		const swipeDistance = touchEndX - touchStartX;
		if (Math.abs(swipeDistance) > 50 && !isAnimating) {
			if (swipeDistance > 0) {
				prevImage();
			} else {
				nextImage();
			}
		}
	}
</script>

<div
	class="group row-span-3 grid h-full gap-0 overflow-hidden rounded-lg bg-amber-50 shadow-lg transition-transform md:hover:-translate-y-1"
	role="article"
>
	<!-- Carousel -->
	<div
		class="relative h-48 w-full overflow-hidden"
		ontouchstart={handleTouchStart}
		ontouchmove={handleTouchMove}
		ontouchend={handleTouchEnd}
	>
		<div
			class="relative flex h-full w-full transition-transform duration-300 ease-in-out"
			style="transform: translateX(-{currentImageIndex * 100}%)"
		>
			{#each images as image, i}
				<div class="relative h-full min-w-full">
					<img
						src={image}
						alt="{property.title} görseli {i + 1}"
						class="h-auto w-full object-cover"
						loading="lazy"
						decoding="async"
					/>
				</div>
			{/each}
		</div>

		<!-- Navigasyon Butonları - Hover'da görünür -->
		{#if images.length > 1}
			<div
				class="absolute inset-0 flex items-center justify-between md:opacity-0 md:transition-opacity md:group-hover:opacity-100"
			>
				<button
					class="ml-2 rounded-full bg-black/50 p-1.5 text-white transition-all hover:scale-110 hover:bg-black/70 disabled:opacity-50"
					onclick={prevImage}
					disabled={isAnimating}
				>
					<span class="sr-only">Önceki görsel</span>
					<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M15 19l-7-7 7-7"
						/>
					</svg>
				</button>
				<button
					class="mr-2 rounded-full bg-black/50 p-1.5 text-white transition-all hover:scale-110 hover:bg-black/70 disabled:opacity-50"
					onclick={nextImage}
					disabled={isAnimating}
				>
					<span class="sr-only">Sonraki görsel</span>
					<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 5l7 7-7 7"
						/>
					</svg>
				</button>
			</div>

			<!-- Görsel Sayacı -->
			<div
				class="absolute bottom-2 right-2 rounded-full bg-black/50 px-2 py-0.5 text-xs text-white md:opacity-0 md:transition-opacity md:group-hover:opacity-100"
			>
				{currentImageIndex + 1} / {images.length}
			</div>
		{/if}
	</div>

	<!-- Card İçeriği -->
	<div class="p-4 pb-2">
		<div class="mb-2">
			<span
				class="inline-block rounded-full px-2 py-1 text-xs font-semibold {property.status ===
				'Satılık'
					? 'bg-green-100 text-green-800'
					: 'bg-blue-100 text-blue-800'}"
			>
				{property.status}
			</span>
		</div>
		<h3 class="text-xl font-semibold text-amber-900">{property.title}</h3>
		<h3 class="text-base text-amber-700">
			{property.city}, {property.district}, {property.neighborhood}
		</h3>
	</div>
	<div class="flex flex-col justify-end p-4 pt-2">
		<div class="mt-4 flex items-baseline justify-between text-amber-600" role="list">
			<p class="mt-2 text-lg font-bold text-amber-800" role="listitem" aria-label="Fiyat">
				{property.price.toLocaleString('tr-TR')} ₺
			</p>
			<span role="listitem" aria-label="Alan">
				{property.area}m²
			</span>
		</div>
		<a
			href="/gayrimenkul/{property.slug}"
			class="mt-4 block w-full rounded-md bg-amber-800 px-4 py-2 text-center text-white transition-colors hover:bg-amber-900 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-offset-2"
			aria-label="{property.title} detaylarını incele"
		>
			Detayları İncele
		</a>
	</div>
</div>
