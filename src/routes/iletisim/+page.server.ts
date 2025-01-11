import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';
import { createItem } from '@directus/sdk';
import getDirectusInstance from '$lib/directus';
import { DIRECTUS_TOKEN } from '$env/static/private';

export const actions = {
	create: async ({ request }) => {
		try {
			const formData = Object.fromEntries(await request.formData());
			const { name, email, phone, subject, message } = formData;

			const directus = getDirectusInstance(undefined, DIRECTUS_TOKEN);

			const response = await directus.request(
				createItem('dede_contact', {
					name,
					e_mail: email,
					phone,
					message
				})
			);

			if (!response) {
				return fail(400, {
					success: false,
					message: 'Mesaj gönderilemedi'
				});
			}

			return {
				success: true,
				message: 'Mesajınız başarıyla gönderildi'
			};
		} catch (error) {
			console.error('Form gönderimi sırasında hata:', error);
			return fail(500, {
				success: false,
				message: 'Bir hata oluştu'
			});
		}
	}
} satisfies Actions;
