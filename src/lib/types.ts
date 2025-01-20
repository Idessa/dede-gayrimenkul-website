export type PropertyType = 'all' | 'sale' | 'rent';

export interface Property {
	id: string;
	title: string;
	description: string;
	price: number;
	status: 'Satılık' | 'Kiralık';
	city: string;
	district: string;
	neighborhood: string;
	location: {
		coordinates: [number, number];
	};
	images: string[];
	main_image?: string;
	slug: string;
	area?: number;
	source?: 'regular' | 'sahibinden'; // İlanın kaynağını belirtmek için
	sahibinden_id?: string;
	sahibinden_url?: string;
	sort?: number;
	user_created?: string;
	date_created?: string;
	type: string;
	bedroom: number;
	bath: number;
	features: string[];
	properties: {
		property: string;
		property_type: string;
	}[];
}

export interface Service {
	id: string;
	title: string;
	description: string;
	icon: string;
}
