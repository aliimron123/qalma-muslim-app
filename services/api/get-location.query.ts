// hooks/useLokasi.ts
import { queryFetch } from '@/scripts/api-services';
import {
	createLocationTable,
	getLokasi as getLocation,
	insertLocation,
} from '@/services/db/locationDb';
import { ApiError } from '@/types/api-services.types';
import { LocationsResponse } from '@/types/location.types';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import * as Network from 'expo-network'; // ✅ ganti ini

export const useAllLocations = (
	options?: UseQueryOptions<LocationsResponse, ApiError>,
) => {
	return useQuery<LocationsResponse, ApiError>({
		queryKey: ['semua-lokasi'],
		queryFn: async () => {
			// Pastikan tabel ada
			createLocationTable();

			// 1. Coba load dari SQLite
			const localData = await getLocation();
			if (localData.length > 0) {
				return {
					data: localData,
					status: true, // Add status
					request: {}, // Add request (can be an empty object if not applicable)
				};
			}

			// 2. Kalau kosong, cek internet
			const state = await Network.getNetworkStateAsync();
			if (!state.isConnected || !state.isInternetReachable) {
				throw new Error('Data not found or connection error');
			}

			// 3. Fetch dari API
			const url = `sholat/kota/semua`;
			const response = await queryFetch<LocationsResponse>({ url });

			// 4. Simpan ke SQLite
			insertLocation(response.data);

			return response;
		},
		...options,
	});
};
