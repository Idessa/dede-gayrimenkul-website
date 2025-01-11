export type PropertyType = 'all' | 'sale' | 'rent';

export interface Property {
	id: string;
	slug: string;
	status: string;
	sort?: number;
	user_created?: string;
	date_created?: string;
	type: string;
	title: string;
	price: number;
	description: string;
	image: {
		directus_files_id: string;
	}[];
	bedroom: number;
	bath: number;
	area: number;
	features: string[];
}

export interface Service {
	id: string;
	title: string;
	description: string;
	icon: string;
}
