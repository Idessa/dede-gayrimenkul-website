import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getDirectusInstance } from '$lib/directus';
import { readItems } from '@directus/sdk';
import type { Property } from '$lib/types';

export const load: PageServerLoad = async ({ fetch }) => {
	try {
		const directus = getDirectusInstance(fetch);

		// Normal ilanları çek
		const regularProperties = (await directus.request(
			readItems('real_estate', {
				fields: ['*', 'images.directus_files_id']
			})
		)) as Property[];

		// Sahibinden.com ilanlarını çek
		const sahibindenProperties = (await directus.request(
			readItems('acil_arazi_lands', {
				fields: ['*'],
				filter: {
					sahibinden_id: {
						_nnull: true
					},
					archive: {
						_eq: false
					}
				}
			})
		)) as Property[];

		// İki veri setini birleştir
		const allProperties = [
			...regularProperties,
			...sahibindenProperties.map((property) => ({
				...property,
				// Sahibinden.com ilanları için gerekli alan dönüşümlerini yap
				images: property.image ? [property.image] : [], // Tek bir image alanını array'e çevir
				status: 'Satılık', // Varsayılan durum
				source: 'sahibinden' // İlanın kaynağını belirt
			}))
		];

		return {
			properties: allProperties
		};
	} catch (err) {
		console.error('Veriler yüklenirken hata oluştu:', err);
		throw error(500, 'Veriler yüklenirken bir hata oluştu');
	}
};
