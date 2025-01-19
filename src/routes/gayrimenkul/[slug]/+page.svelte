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
		...data.property.images.map((val: any) => val.directus_files_id)
	].map((val: any) => `https://energydnd.idesamedya.com/assets/${val}`);

	// Küçük görseller için ekstra değişkenler
	let currentThumbScroll = $state(0);
	const thumbsToShow = 5; // Bir seferde gösterilecek küçük resim sayısı

	function updateThumbScroll(direction: number) {
		const newScroll = currentThumbScroll + direction;
		if (newScroll >= 0 && newScroll <= images.length - thumbsToShow) {
			currentThumbScroll = newScroll;
		}
	}

	// Küçük görseller için scroll hesaplama
	$effect(() => {
		if (images.length > 3) {
			const container = document.querySelector('.thumbs-container');
			if (container) {
				const scrollAmount = currentImageIndex * 100 - container.clientWidth / 2 + 50;
				container.scrollTo({
					left: scrollAmount,
					behavior: 'smooth'
				});
			}
		}
	});

	// GroupBy yardımcı fonksiyonu
	function groupBy<T>(array: T[], key: (item: T) => string): Record<string, T[]> {
		return array.reduce(
			(groups, item) => {
				const groupKey = key(item);
				if (!groups[groupKey]) {
					groups[groupKey] = [];
				}
				groups[groupKey].push(item);
				return groups;
			},
			{} as Record<string, T[]>
		);
	}

	// Özellikleri grupla
	const groupedProperties = data.property.properties
		? groupBy(data.property.properties, (item: any) => item.property_type)
		: {};
</script>

<svelte:head>
	<title>{data.property.title} | Dede Gayrimenkul</title>
</svelte:head>

<main class="bg-gray-50 dark:bg-gray-900" in:fade>
	<div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
		<!-- Görsel Galerisi -->
		<div class="space-y-4">
			<!-- Ana Görsel -->
			<div
				class="relative h-[300px] overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-800 sm:h-[350px] lg:h-[400px]"
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
							class="rounded-full bg-black/50 p-2 text-white transition-all hover:scale-110 hover:bg-black/70 disabled:opacity-50 dark:bg-black/70 dark:hover:bg-black/90"
							onclick={prevImage}
							disabled={isAnimating}
						>
							<span class="sr-only">Önceki görsel</span>
							<iconify-icon icon="mdi:chevron-left" class="text-2xl"></iconify-icon>
						</button>
						<button
							class="rounded-full bg-black/50 p-2 text-white transition-all hover:scale-110 hover:bg-black/70 disabled:opacity-50 dark:bg-black/70 dark:hover:bg-black/90"
							onclick={nextImage}
							disabled={isAnimating}
						>
							<span class="sr-only">Sonraki görsel</span>
							<iconify-icon icon="mdi:chevron-right" class="text-2xl"></iconify-icon>
						</button>
					</div>
				{/if}

				<!-- Görsel Sayacı -->
				<div
					class="absolute bottom-4 right-4 rounded-full bg-black/50 px-3 py-1 text-sm text-white dark:bg-black/70"
				>
					{currentImageIndex + 1} / {images?.length ?? 0}
				</div>
			</div>

			<!-- Küçük Görseller -->
			{#if images.length > 1}
				<div class="relative mt-4">
					<div
						class="thumbs-container scrollbar-hide relative flex snap-x snap-mandatory overflow-x-auto"
					>
						<div class="flex">
							{#each images as image, index}
								<button
									onclick={() => goToImage(index)}
									disabled={isAnimating}
									class="mr-2 flex-shrink-0 snap-center transition-all duration-300 {currentImageIndex ===
									index
										? 'scale-105 ring-2 ring-amber-500 dark:ring-amber-400'
										: 'opacity-70 hover:opacity-100'} {isAnimating ? 'pointer-events-none' : ''}"
									style="width: 100px;"
								>
									<img
										src="{image}?key=small-image"
										alt="Görsel {index + 1}"
										class="h-[60px] w-[100px] rounded-lg object-cover transition-all duration-300 sm:h-[80px]"
										loading="lazy"
										decoding="async"
									/>
								</button>
							{/each}
						</div>
					</div>
				</div>
			{/if}
		</div>

		<!-- İçerik Grid -->
		<div class="mt-8 grid gap-8 lg:grid-cols-3">
			<!-- Sol Kolon - Ana Bilgiler -->
			<div class="lg:col-span-2">
				<h1 class="text-3xl font-bold text-gray-900 dark:text-white">{data.property.title}</h1>
				<p class="mt-2 text-xl text-amber-800 dark:text-amber-200">
					{formatPrice(data.property.price)}
				</p>
				<p class="mt-1 text-gray-600 dark:text-gray-300">
					{data.property.city}, {data.property.district}, {data.property.neighborhood}
				</p>

				<div class="mt-6">
					<h2 class="text-xl font-semibold text-gray-900 dark:text-white">Açıklama</h2>
					<p class="mt-2 text-gray-600 dark:text-gray-300">{@html data.property.description}</p>
				</div>

				<!-- Özellikler -->
				{#if data.property.properties && data.property.properties.length > 0}
					<div class="mt-8 flex flex-col gap-2">
						<h2 class="mb-1 text-2xl font-semibold text-gray-900 dark:text-white">Özellikler</h2>
						{#each Object.entries(groupedProperties) as [propertyTitle, propertyTexts]}
							{#if propertyTexts?.length > 1}
								<h3 class="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
									{propertyTitle}
								</h3>
								{#each propertyTexts as propertyText}
									<div class="flex items-center gap-2">
										<iconify-icon
											icon="mdi:information"
											class="text-xl text-amber-800 dark:text-amber-200"
										></iconify-icon>
										<span class="text-gray-600 dark:text-gray-300">{propertyText.property}</span>
									</div>
								{/each}
							{:else}
								<div class="sm flex gap-2 text-sm">
									<dt class="font-semibold text-gray-900 dark:text-white">
										{propertyTitle}:
									</dt>
									<dd class="text-gray-600 dark:text-gray-300">
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
			<h2 class="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
				Konum
				<a
					href="https://www.google.com/maps/@{data.property.location.coordinates[1]},{data.property
						.location.coordinates[0]},19z"
					class="text-base font-normal text-amber-800 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300"
					target="_blank"
				>
					(Google Haritalar'da aç)
				</a>
			</h2>
			<Map lands={[data.property]} />
		</div>
	</div>
</main>

<style>
	/* Scrollbar'ı gizle ama işlevselliğini koru */
	.scrollbar-hide {
		-ms-overflow-style: none; /* IE and Edge */
		scrollbar-width: none; /* Firefox */
	}
	.scrollbar-hide::-webkit-scrollbar {
		display: none; /* Chrome, Safari and Opera */
	}
</style>
