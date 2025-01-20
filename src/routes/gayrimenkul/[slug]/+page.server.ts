import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getDirectusInstance } from '$lib/directus';
import { readItems } from '@directus/sdk';

export const load = (async ({ params, fetch }) => {
	try {
		const directus = getDirectusInstance(fetch);

		// Önce normal ilanları kontrol et
		const regularProperties = await directus.request(
			readItems('real_estate', {
				filter: {
					slug: {
						_eq: params.slug
					}
				},
				fields: ['*', 'images.directus_files_id']
			})
		);

		// Eğer normal ilanlarda bulunduysa onu döndür
		if (regularProperties?.length) {
			return { property: regularProperties[0] };
		}

		// Normal ilanlarda bulunamadıysa sahibinden.com ilanlarını kontrol et
		const sahibindenProperties = await directus.request(
			readItems('acil_arazi_lands', {
				filter: {
					slug: {
						_eq: params.slug
					},
					sahibinden_id: {
						_nnull: true
					},
					archive: {
						_eq: false
					}
				},
				fields: ['*']
			})
		);

		if (!sahibindenProperties?.length) {
			return error(404, 'Gayrimenkul bulunamadı');
		}

		// Sahibinden.com ilanını uygun formata dönüştür
		const property = {
			...sahibindenProperties[0],
			images: sahibindenProperties[0].image ? [sahibindenProperties[0].image] : [],
			status: 'Satılık',
			source: 'sahibinden'
		};

		return { property };
	} catch (err) {
		console.error('Gayrimenkul detayları yüklenirken hata oluştu:', err);

		if (err && typeof err === 'object' && 'status' in err) {
			const directusError = err as { status?: number; message?: string };
			if (directusError.status === 404) {
				return error(404, 'Gayrimenkul bulunamadı');
			}
		}

		return error(500, 'Gayrimenkul detayları yüklenirken bir hata oluştu');
	}
}) satisfies PageServerLoad;
