<script lang="ts">
	import MobileCarousel from '$lib/components/mobile-carousel.svelte';
	import PropertyCarousel from '$lib/components/property-carousel.svelte';
	import PropertyCard from '$lib/components/property-card.svelte';
	import type { Property, PropertyType } from '$lib/types';
	import type { PageServerData } from './$types';
	import { flip } from 'svelte/animate';

	let { data } = $props<{ data: PageServerData }>();

	let selectedType: PropertyType = $state('all');

	const filteredProperties = $derived(
		data.properties.filter((property: Property) =>
			selectedType === 'all' ? true : property.status === selectedType
		)
	);
	const propertyTypes = $derived([
		{
			value: 'all',
			label: 'Tümü',
			count: data.properties.length
		},
		{
			value: 'Satılık',
			label: 'Satılık',
			count: data.properties.filter((p: Property) => p.status === 'Satılık').length
		},
		{
			value: 'Kiralık',
			label: 'Kiralık',
			count: data.properties.filter((p: Property) => p.status === 'Kiralık').length
		}
	]);

	// Masaüstünde gösterilecek maksimum gayrimenkul sayısı
	const MAX_VISIBLE_PROPERTIES = 6;

	// Görüntülenecek gayrimenkulleri sınırla
	const visibleProperties = $derived(filteredProperties.slice(0, MAX_VISIBLE_PROPERTIES));

	// Daha fazla gayrimenkul var mı?
	const hasMoreProperties = $derived(filteredProperties.length > MAX_VISIBLE_PROPERTIES);
</script>

<svelte:head>
	<title>Ana Sayfa | Dede Gayrimenkul</title>
</svelte:head>

<main class="bg-white dark:bg-gray-900">
	<h1 class="sr-only">Gayrimenkul Ana Sayfa</h1>

	<PropertyCarousel properties={data.properties} />

	<section class="mx-auto max-w-7xl px-4 py-12" aria-labelledby="featured-properties">
		<div class="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
			<h2 id="featured-properties" class="text-3xl font-bold text-gray-900 dark:text-white">
				Öne Çıkan Gayrimenkuller
			</h2>

			<div class="flex gap-2" role="group" aria-label="Gayrimenkul filtreleme">
				{#each propertyTypes as type}
					<button
						onclick={() => (selectedType = type.value)}
						class="rounded-md px-4 py-2 transition-colors {selectedType === type.value
							? 'bg-amber-800 text-white'
							: 'bg-amber-100 text-amber-900 hover:bg-amber-200 dark:bg-amber-900/10 dark:text-amber-100 dark:hover:bg-amber-900/20'}"
						aria-pressed={selectedType === type.value}
						aria-label={`${type.label} gayrimenkulleri göster`}
					>
						{type.label}
						{#if type.count !== undefined}
							<span class="ml-1 text-sm opacity-75">({type.count})</span>
						{/if}
					</button>
				{/each}
			</div>
		</div>

		<!-- Mobil Görünüm -->
		<div class="md:hidden">
			<MobileCarousel properties={visibleProperties} />
		</div>

		<!-- Masaüstü Görünüm (Grid) -->
		<div
			class="hidden grid-cols-1 grid-rows-subgrid gap-6 sm:grid-cols-2 md:grid lg:grid-cols-3"
			role="list"
			aria-label="Gayrimenkul listesi"
		>
			{#each visibleProperties as property (property.id)}
				<div class="h-full w-full" animate:flip={{ duration: 300 }}>
					<PropertyCard {property} />
				</div>
			{/each}
		</div>

		{#if filteredProperties.length === 0}
			<p class="mt-8 text-center text-gray-500 dark:text-gray-400" role="alert">
				Bu kategoride gayrimenkul bulunamadı.
			</p>
		{/if}

		<!-- Daha Fazla Butonu -->
		{#if hasMoreProperties}
			<div class="mt-8 text-center">
				<a
					href="/gayrimenkul"
					class="inline-block rounded-md bg-amber-800 px-6 py-3 text-white transition-colors hover:bg-amber-900 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-offset-2 dark:bg-amber-700 dark:hover:bg-amber-800 dark:focus:ring-amber-500"
				>
					Tüm Gayrimenkulleri Görüntüle
					<span class="sr-only"
						>({filteredProperties.length - MAX_VISIBLE_PROPERTIES} adet daha)</span
					>
				</a>
			</div>
		{/if}
	</section>

	<!-- Hizmetlerimiz Bölümü -->
	<section class="bg-gray-50 py-16 dark:bg-gray-800">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="text-center">
				<h2 class="text-3xl font-bold text-gray-900 dark:text-white">Hizmetlerimiz</h2>
				<p class="mt-4 text-lg text-gray-600 dark:text-gray-300">
					Gayrimenkul sektöründe 20 yılı aşkın tecrübemizle sizlere hizmet veriyoruz
				</p>
			</div>

			<div class="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
				{#each data.services as service}
					<div
						class="rounded-lg bg-white p-6 shadow-md transition-transform hover:scale-105 dark:bg-gray-700"
					>
						<div
							class="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/20"
						>
							<iconify-icon icon={service.icon} class="text-3xl text-amber-800 dark:text-amber-200"
							></iconify-icon>
						</div>
						<h3 class="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
							{service.title}
						</h3>
						<p class="text-gray-600 dark:text-gray-300">{service.description}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>
</main>
