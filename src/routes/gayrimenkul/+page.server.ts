import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getDirectusInstance } from '$lib/directus';
import { readItems } from '@directus/sdk';
import type { Property } from '$lib/types';

export const load: PageServerLoad = async ({ fetch }) => {
	try {
		const directus = getDirectusInstance(fetch);

		const rawProperties = await directus.request(
			readItems('real_estate', { fields: ['*', 'images.directus_files_id'] })
		);

		return {
			properties: rawProperties
		};
	} catch (err) {
		console.error('Veriler yüklenirken hata oluştu:', err);
		throw error(500, 'Veriler yüklenirken bir hata oluştu');
	}
};
