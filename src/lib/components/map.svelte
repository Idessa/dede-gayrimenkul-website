<script lang="ts">
	import { DefaultMarker, MapLibre, Popup } from 'svelte-maplibre';
	import { style, locale } from './map';
	import ml from 'maplibre-gl';
	import { watch } from 'runed';

	let {
		lands
	}: {
		lands: any;
	} = $props();

	let markers: { lngLat: ml.LngLat; land }[] = $state([]);

	watch(
		() => lands,
		() => {
			markers = [];
			lands.forEach((land) => {
				markers.push({
					lngLat: new ml.LngLat(land.location.coordinates[0], land.location.coordinates[1]),
					land
				});
			});
		}
	);
</script>

{#if markers.length > 0}
	<MapLibre
		center={markers[0].lngLat}
		zoom={16}
		class="size-full"
		standardControls
		{locale}
		{style}
	>
		{#each markers as marker}
			<DefaultMarker lngLat={marker.lngLat}>
				{#if marker.land}
					<Popup popupClass="max-w-[10.5rem] sm:max-w-72">
						<a href="/gayrimenkul/{marker.land.slug}" class="flex max-w-72 flex-col justify-center">
							<div class="rounded-lg p-2">
								<img
									src="https://energydnd.idesamedya.com/assets/{marker.land.main_image}"
									alt="Arsa görseli"
									class="aspect-[1.4] h-auto w-64 rounded-lg object-cover"
								/>
							</div>
							<h3 class="line-clamp-2 break-words text-lg font-bold">
								{marker.land.title}
							</h3>
							<p class="text-sm text-gray-700">
								{marker.land.price} ₺
							</p>
						</a>
					</Popup>
				{/if}
			</DefaultMarker>
		{/each}
	</MapLibre>
{/if}

<style lang="postcss">
	:global {
		.maplibregl-popup-anchor-left .maplibregl-popup-tip {
			@apply border-r-white;
		}
		.maplibregl-popup-anchor-bottom-left .maplibregl-popup-tip {
			@apply border-t-white;
		}
		.maplibregl-popup-anchor-bottom-right .maplibregl-popup-tip {
			@apply border-t-white;
		}
		.maplibregl-popup-anchor-top-left .maplibregl-popup-tip {
			@apply border-b-white;
		}
		.maplibregl-popup-anchor-top-right .maplibregl-popup-tip {
			@apply border-b-white;
		}
		.maplibregl-popup-anchor-right .maplibregl-popup-tip {
			@apply border-l-white;
		}
		.maplibregl-popup-anchor-bottom .maplibregl-popup-tip {
			@apply border-t-white;
		}
		.maplibregl-popup-anchor-top .maplibregl-popup-tip {
			@apply border-b-white;
		}
		.maplibregl-popup-content {
			@apply rounded-lg bg-white;
		}
	}
</style>
