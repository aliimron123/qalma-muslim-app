// useCurrentLocation.ts
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';

type LocationData = {
	latitude: number;
	longitude: number;
	address?: string; // alamat hasil geocode
};

export function useCurrentLocation() {
	const [location, setLocation] = useState<LocationData | null>(null);
	const [errorMsg, setErrorMsg] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		let isMounted = true;

		(async () => {
			try {
				setLoading(true);

				// Minta izin lokasi
				const { status } = await Location.requestForegroundPermissionsAsync();
				if (status !== 'granted') {
					setErrorMsg('Permission to access location was denied');
					setLoading(false);
					return;
				}

				// Ambil koordinat
				const loc = await Location.getCurrentPositionAsync({
					accuracy: Location.Accuracy.High,
				});

				// Reverse geocoding → alamat
				const geocode = await Location.reverseGeocodeAsync({
					latitude: loc.coords.latitude,
					longitude: loc.coords.longitude,
				});

				let addressString = '';
				if (geocode.length > 0) {
					const { city, region } = geocode[0];
					addressString = [city, region].filter(Boolean).join(', ');
				}

				if (isMounted) {
					setLocation({
						latitude: loc.coords.latitude,
						longitude: loc.coords.longitude,
						address: addressString || 'Unknown location',
					});
				}
			} catch (error) {
				setErrorMsg((error as Error).message);
			} finally {
				if (isMounted) setLoading(false);
			}
		})();

		return () => {
			isMounted = false;
		};
	}, []);

	return { location, loading, errorMsg };
}
