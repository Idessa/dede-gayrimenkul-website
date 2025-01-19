<script lang="ts">
	import { fade } from 'svelte/transition';
	import type { Property } from '$lib/types';
	import PropertyCard from '$lib/components/property-card.svelte';
	import { page } from '$app/state';
	import type { PageServerData } from './$types';
	import { watch } from 'runed';
	import { flip } from 'svelte/animate';
	let { data } = $props<{ data: PageServerData }>();

	// URL'den type parametresini al
	watch(
		() => page.url.searchParams.get('type'),
		() => {
			const urlType = page.url.searchParams.get('type');
			if (urlType === 'sale' || urlType === 'rent') {
				selectedType = urlType === 'sale' ? 'Satılık' : 'Kiralık';
			} else {
				selectedType = 'all';
			}
		}
	);

	// Filtre seçenekleri
	let selectedType = $state('all');
	let minPrice = $state('');
	let maxPrice = $state('');
	let searchQuery = $state('');

	let filteredProperties = $derived<Property[]>(
		data.properties.filter((property: Property) => {
			// Tip filtresi (Satılık/Kiralık)
			if (selectedType !== 'all' && property.status !== selectedType) return false;

			// Fiyat filtresi
			if (minPrice && property.price < parseInt(minPrice)) return false;
			if (maxPrice && property.price > parseInt(maxPrice)) return false;

			// Arama filtresi
			if (searchQuery) {
				const query = searchQuery.toLowerCase();
				return `${property.title.toLowerCase()},
				${property.city.toLowerCase()},
				${property.district.toLowerCase()},
				${property.neighborhood.toLowerCase()}`.includes(query);
			}

			return true;
		})
	);
</script>

<svelte:head>
	<title>Gayrimenkuller | Dede Gayrimenkul</title>
</svelte:head>

<main class="bg-gray-50 py-12 dark:bg-gray-900" in:fade>
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<!-- Başlık -->
		<div class="text-center">
			<h1 class="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">Gayrimenkuller</h1>
			<p class="mt-3 text-lg text-gray-600 dark:text-gray-300">
				Hayalinizdeki eve bir adım daha yaklaşın
			</p>
		</div>

		<!-- Filtreler -->
		<div class="mt-8 rounded-lg bg-white p-6 shadow-md dark:bg-gray-800 dark:shadow-gray-900/10">
			<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				<!-- Tip Filtresi -->
				<div>
					<label for="type" class="block text-sm font-medium text-gray-700 dark:text-gray-200"
						>Durum</label
					>
					<select
						id="type"
						bind:value={selectedType}
						class="mt-1 block w-full rounded-md border-gray-300 bg-white shadow-sm focus:border-amber-500 focus:ring-amber-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-amber-400 dark:focus:ring-amber-400"
					>
						<option value="all">Tümü</option>
						<option value="Satılık">Satılık</option>
						<option value="Kiralık">Kiralık</option>
					</select>
				</div>

				<!-- Fiyat Aralığı -->
				<div>
					<label for="minPrice" class="block text-sm font-medium text-gray-700 dark:text-gray-200"
						>Min. Fiyat</label
					>
					<input
						type="number"
						id="minPrice"
						bind:value={minPrice}
						placeholder="Min TL"
						class="mt-1 block w-full rounded-md border-gray-300 bg-white shadow-sm focus:border-amber-500 focus:ring-amber-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-amber-400 dark:focus:ring-amber-400"
					/>
				</div>

				<div>
					<label for="maxPrice" class="block text-sm font-medium text-gray-700 dark:text-gray-200"
						>Max. Fiyat</label
					>
					<input
						type="number"
						id="maxPrice"
						bind:value={maxPrice}
						placeholder="Max TL"
						class="mt-1 block w-full rounded-md border-gray-300 bg-white shadow-sm focus:border-amber-500 focus:ring-amber-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-amber-400 dark:focus:ring-amber-400"
					/>
				</div>
			</div>

			<!-- Arama -->
			<div class="mt-4">
				<input
					type="text"
					bind:value={searchQuery}
					placeholder="Konum veya başlık ile arayın..."
					class="block w-full rounded-md border-gray-300 bg-white shadow-sm focus:border-amber-500 focus:ring-amber-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-amber-400 dark:focus:ring-amber-400"
				/>
			</div>
		</div>

		<!-- Gayrimenkul Listesi -->
		<div class="mt-12">
			{#if filteredProperties.length > 0}
				<div class="grid grid-rows-subgrid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{#each filteredProperties as property (property.id)}
						<div class="h-full w-full" animate:flip={{ duration: 300 }}>
							<PropertyCard {property} />
						</div>
					{/each}
				</div>
			{:else}
				<div class="text-center">
					<p class="text-lg text-gray-600 dark:text-gray-400">
						Seçilen kriterlere uygun gayrimenkul bulunamadı.
					</p>
				</div>
			{/if}
		</div>
	</div>
</main>

<style lang="postcss">
	input[type='number']::-webkit-inner-spin-button,
	input[type='number']::-webkit-outer-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
	input[type='number'] {
		-moz-appearance: textfield;
	}
</style>
