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
	main_image: string;
	images: {
		directus_files_id: string;
	}[];
	properties: {
		property: string;
		property_type: string;
	}[];
	bedroom: number;
	bath: number;
	area: number;
	features: string[];
	city: string;
	district: string;
	neighborhood: string;
	location: {
		coordinates: [number, number];
	};
}

export interface Service {
	id: string;
	title: string;
	description: string;
	icon: string;
}
