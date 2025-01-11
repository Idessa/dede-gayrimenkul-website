import type { StyleSpecification } from 'svelte-maplibre';

export const style: StyleSpecification = {
	version: 8,
	sources: {
		osm: {
			type: 'raster',
			tiles: ['https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'],
			tileSize: 256,
			attribution:
				'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>\'e katkıda bulunanlar',
			maxzoom: 19
		}
	},
	layers: [
		{
			id: 'osm',
			type: 'raster',
			source: 'osm'
		}
	]
};

export const locale = {
	'AttributionControl.ToggleAttribution': 'Atıfları göster/gizle',
	'AttributionControl.MapFeedback': 'Harita geri bildirimi',
	'FullscreenControl.Enter': 'Tam ekrana geç',
	'FullscreenControl.Exit': 'Tam ekrandan çık',
	'GeolocateControl.FindMyLocation': 'Konumumu bul',
	'GeolocateControl.LocationNotAvailable': 'Konum kullanılamıyor',
	'LogoControl.Title': 'MapLibre logosu',
	'Map.Title': 'Harita',
	'Marker.Title': 'Harita işaretçisi',
	'NavigationControl.ResetBearing': 'Kuzeye döndür',
	'NavigationControl.ZoomIn': 'Yakınlaştır',
	'NavigationControl.ZoomOut': 'Uzaklaştır',
	'Popup.Close': 'Pencereyi kapat',
	'ScaleControl.Feet': 'ft',
	'ScaleControl.Meters': 'm',
	'ScaleControl.Kilometers': 'km',
	'ScaleControl.Miles': 'mil',
	'ScaleControl.NauticalMiles': 'deniz mili',
	'GlobeControl.Enable': 'Küreyi etkinleştir',
	'GlobeControl.Disable': 'Küreyi devre dışı bırak',
	'TerrainControl.Enable': 'Araziyi etkinleştir',
	'TerrainControl.Disable': 'Araziyi devre dışı bırak',
	'CooperativeGesturesHandler.WindowsHelpText':
		'Haritayı yakınlaştırmak için Ctrl + kaydırma kullanın',
	'CooperativeGesturesHandler.MacHelpText': 'Haritayı yakınlaştırmak için ⌘ + kaydırma kullanın',
	'CooperativeGesturesHandler.MobileHelpText':
		'Haritayı hareket ettirmek için iki parmağınızı kullanın'
};
