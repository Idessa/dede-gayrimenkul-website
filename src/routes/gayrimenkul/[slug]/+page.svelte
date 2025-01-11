<script lang="ts">
	import { fade } from 'svelte/transition';
	import type { PageServerData } from './$types';
	import Map from '$lib/components/map.svelte';
	// Örnek veri - Gerçek uygulamada API'den gelecek
	let { data } = $props<{ data: PageServerData }>();

	let currentImageIndex = $state(0);
	let isAnimating = $state(false);

	function nextImage() {
		if (images && !isAnimating) {
			isAnimating = true;
			currentImageIndex = (currentImageIndex + 1) % images.length;
			setTimeout(() => {
				isAnimating = false;
			}, 500); // Animasyon süresiyle eşleşmeli (duration-500)
		}
	}

	function prevImage() {
		if (images && !isAnimating) {
			isAnimating = true;
			currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
			setTimeout(() => {
				isAnimating = false;
			}, 500); // Animasyon süresiyle eşleşmeli (duration-500)
		}
	}
	function goToImage(index: number) {
		if (!isAnimating && index !== currentImageIndex) {
			isAnimating = true;
			currentImageIndex = index;
			setTimeout(() => {
				isAnimating = false;
			}, 500);
		}
	}
	console.log(data.property.features);
	// Touch olayları için
	let touchStartX = $state(0);
	let touchEndX = $state(0);

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

	function formatPrice(price: number): string {
		return new Intl.NumberFormat('tr-TR', {
			style: 'currency',
			currency: 'TRY',
			maximumFractionDigits: 0
		}).format(price);
	}

	const images = [
		data.property.main_image,
		...data.property.images.map((val) => val.directus_files_id)
	].map((val) => `https://energydnd.idesamedya.com/assets/${val}`);
</script>

<svelte:head>
	<title>{data.property.title} | Dede Gayrimenkul</title>
</svelte:head>

<main class="bg-gray-50" in:fade>
	<div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
		<!-- Görsel Galerisi -->
		<div class="space-y-4">
			<!-- Ana Görsel -->
			<div
				class="relative h-[300px] overflow-hidden rounded-lg bg-gray-200 sm:h-[350px] lg:h-[400px]"
				ontouchstart={handleTouchStart}
				ontouchmove={handleTouchMove}
				ontouchend={handleTouchEnd}
			>
				<div
					class="relative flex h-full w-full transition-transform duration-500 ease-in-out"
					style="transform: translateX(-{currentImageIndex * 100}%)"
				>
					{#each images as photo, i}
						<div class="relative h-full min-w-full">
							<img
								src={photo}
								alt="Görsel {i + 1}"
								class="h-full w-full object-cover"
								loading={i === 0 ? 'eager' : 'lazy'}
								decoding="async"
							/>
						</div>
					{/each}
				</div>

				<!-- Navigasyon Butonları -->
				{#if images.length > 1}
					<div class="absolute inset-0 flex items-center justify-between p-4">
						<button
							class="rounded-full bg-black/50 p-2 text-white transition-all hover:scale-110 hover:bg-black/70 disabled:opacity-50"
							onclick={prevImage}
							disabled={isAnimating}
						>
							<span class="sr-only">Önceki görsel</span>
							<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M15 19l-7-7 7-7"
								/>
							</svg>
						</button>
						<button
							class="rounded-full bg-black/50 p-2 text-white transition-all hover:scale-110 hover:bg-black/70 disabled:opacity-50"
							onclick={nextImage}
							disabled={isAnimating}
						>
							<span class="sr-only">Sonraki görsel</span>
							<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M9 5l7 7-7 7"
								/>
							</svg>
						</button>
					</div>
				{/if}

				<!-- Görsel Sayacı -->
				<div
					class="absolute bottom-4 right-4 rounded-full bg-black/50 px-3 py-1 text-sm text-white"
				>
					{currentImageIndex + 1} / {images?.length ?? 0}
				</div>
			</div>

			<!-- Küçük Görseller -->
			{#if images.length > 1}
				<div class="flex flex-wrap gap-2">
					{#each images as image, index}
						<button
							onclick={() => goToImage(index)}
							disabled={isAnimating}
							class="relative h-[60px] overflow-hidden rounded-lg sm:h-[80px] {currentImageIndex ===
							index
								? 'ring-2 ring-amber-500'
								: ''} {isAnimating ? 'pointer-events-none' : ''}"
						>
							<img
								src="{image}?key=small-image"
								alt="Görsel {index + 1}"
								class="aspect-[1.4] h-full w-full object-cover transition-opacity duration-300"
								in:fade
							/>
						</button>
					{/each}
				</div>
			{/if}
		</div>

		<!-- İçerik Grid -->
		<div class="mt-8 grid gap-8 lg:grid-cols-3">
			<!-- Sol Kolon - Ana Bilgiler -->
			<div class="lg:col-span-2">
				<h1 class="text-3xl font-bold text-gray-900">{data.property.title}</h1>
				<p class="mt-2 text-xl text-amber-800">{formatPrice(data.property.price)}</p>
				<p class="mt-1 text-gray-600">
					{data.property.city}, {data.property.district}, {data.property.neighborhood}
				</p>

				<div class="mt-6">
					<h2 class="text-xl font-semibold text-gray-900">Açıklama</h2>
					<p class="mt-2 text-gray-600">{@html data.property.description}</p>
				</div>

				<!-- Özellikler -->
				{#if data.property.properties && data.property.properties.length > 0}
					<div class="mt-8 flex flex-col gap-2">
						<h2 class="mb-1 text-2xl font-semibold text-gray-900">Özellikler</h2>
						{#each Object.entries(Object.groupBy(data.property.properties, (data) => data.property_type)) as [propertyTitle, propertyTexts]}
							{#if propertyTexts?.length > 1}
								<h3 class="mt-1 text-lg font-semibold text-gray-900">{propertyTitle}</h3>
								{#each propertyTexts as propertyText}
									<div class="flex items-center gap-2">
										<svg
											class="h-5 w-5 text-amber-800"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
											/>
										</svg>
										<span>{propertyText.property}</span>
									</div>
								{/each}
							{:else}
								<div class="mt-1 flex">
									<dt class="font-semibold text-gray-900">
										{propertyTitle}:
									</dt>
									<dd>
										{propertyTexts[0].property}
									</dd>
								</div>
							{/if}
						{/each}
					</div>
				{/if}
			</div>
		</div>

		<div class="mt-12 h-[calc(100vh-200px)]">
			<h2 class="mb-2 text-xl font-semibold text-gray-900">
				Konum <a
					href="https://www.google.com/maps/@{data.property.location.coordinates[1]},{data.property
						.location.coordinates[0]},19z"
					class="text-base font-normal"
					target="_blank"
				>
					(Google Haritalar'da aç)
				</a>
			</h2>
			<Map lands={[data.property]} />
		</div>
	</div>
</main>
