<script lang="ts">
	import type { Property } from '$lib/types';
	import PropertyCard from './property-card.svelte';

	let { properties } = $props<{ properties: Property[] }>();
	let currentIndex = $state(0);
	let isDragging = $state(false);
	let startX = $state(0);
	let currentTranslate = $state(0);
	let prevTranslate = $state(0);

	const handleDragStart = (e: MouseEvent | TouchEvent) => {
		isDragging = true;
		startX = 'touches' in e ? e.touches[0].clientX : e.clientX;
		prevTranslate = currentTranslate;
	};

	const handleDragMove = (e: MouseEvent | TouchEvent) => {
		if (!isDragging) return;

		const currentX = 'touches' in e ? e.touches[0].clientX : e.clientX;
		const diff = currentX - startX;
		currentTranslate = prevTranslate + diff;
	};

	const handleDragEnd = () => {
		isDragging = false;
		const movedBy = currentTranslate - prevTranslate;

		// Minimum kaydırma mesafesi
		if (Math.abs(movedBy) > 100) {
			if (movedBy > 0) {
				prev();
			} else {
				next();
			}
		}

		// Pozisyonu sıfırla
		currentTranslate = -(currentIndex * 100);
		prevTranslate = currentTranslate;
	};

	const next = () => {
		if (currentIndex < properties.length - 1) {
			currentIndex++;
			currentTranslate = -(currentIndex * 100);
			prevTranslate = currentTranslate;
		}
	};

	const prev = () => {
		if (currentIndex > 0) {
			currentIndex--;
			currentTranslate = -(currentIndex * 100);
			prevTranslate = currentTranslate;
		}
	};

	// Sürükleme sırasında text seçimini engelle
	$effect(() => {
		if (isDragging) {
			document.body.style.userSelect = 'none';
		} else {
			document.body.style.userSelect = '';
		}
	});
</script>

<section class="relative w-full overflow-hidden" aria-label="Gayrimenkul Kartları Slayt Gösterisi">
	<div
		role="button"
		tabindex="0"
		class="relative w-full"
		onmousedown={handleDragStart}
		onmousemove={handleDragMove}
		onmouseup={handleDragEnd}
		onmouseleave={handleDragEnd}
		ontouchstart={handleDragStart}
		ontouchmove={handleDragMove}
		ontouchend={handleDragEnd}
		onkeydown={(e) => {
			if (e.key === 'ArrowLeft') prev();
			if (e.key === 'ArrowRight') next();
		}}
		aria-label="Sürüklenebilir alan"
	>
		<div
			class="flex transition-transform duration-300 ease-in-out {isDragging
				? 'transition-none'
				: ''}"
			style="transform: translateX({currentTranslate}%)"
			role="list"
		>
			{#each properties as property (property.id)}
				<div
					class="w-full flex-shrink-0 px-4 {isDragging ? 'cursor-grabbing' : 'cursor-grab'}"
					role="listitem"
				>
					<PropertyCard {property} />
				</div>
			{/each}
		</div>
	</div>

	<!-- Carousel Kontrolleri -->
	<!-- <button
		class="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-lg transition-colors hover:bg-white"
		onclick={prev}
		aria-label="Önceki gayrimenkul"
		disabled={currentIndex === 0}
	>
		<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
		</svg>
	</button>

	<button
		class="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-lg transition-colors hover:bg-white"
		onclick={next}
		aria-label="Sonraki gayrimenkul"
		disabled={currentIndex === properties.length - 1}
	>
		<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
		</svg>
	</button> -->

	<!-- Nokta Göstergeleri -->
	<div class="absolute bottom-1 left-1/2 flex -translate-x-1/2 gap-2">
		{#each properties as _, i}
			<button
				class="h-2 w-2 rounded-full transition-colors {currentIndex === i
					? 'bg-amber-800'
					: 'bg-amber-300'}"
				onclick={() => {
					currentIndex = i;
					currentTranslate = -(i * 100);
					prevTranslate = currentTranslate;
				}}
				aria-label="{i + 1}. gayrimenkule git"
				aria-current={currentIndex === i}
			></button>
		{/each}
	</div>
</section>
