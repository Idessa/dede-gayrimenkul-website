import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getDirectusInstance } from '$lib/directus';
import { readItems } from '@directus/sdk';

interface DirectusError {
	status?: number;
	message?: string;
}

export const load = (async ({ params, fetch }) => {
	try {
		const directus = getDirectusInstance(fetch);

		const properties = await directus.request(
			readItems('real_estate', {
				filter: {
					slug: {
						_eq: params.slug
					}
				},
				fields: ['*', 'images.directus_files_id']
			})
		);

		if (!properties?.length) {
			return error(404, 'Gayrimenkul bulunamadı');
		}

		const rawProperty = properties[0];

		return { property: rawProperty };
	} catch (err) {
		console.error('Gayrimenkul detayları yüklenirken hata oluştu:', err);

		if (err && typeof err === 'object' && 'status' in err) {
			const directusError = err as DirectusError;
			if (directusError.status === 404) {
				return error(404, 'Gayrimenkul bulunamadı');
			}
		}

		return error(500, 'Gayrimenkul detayları yüklenirken bir hata oluştu');
	}
}) satisfies PageServerLoad;
