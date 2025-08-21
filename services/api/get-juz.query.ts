import { ApiError } from '@/types/api-services.types';
import { JuzData } from '@/types/juz.types';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import * as Network from 'expo-network';
import { getAllJuz } from '../db/juzDb';
import { syncJuzFromAPI } from '../offline/syncJuz';

export const GetJuzList = (options?: UseQueryOptions<JuzData[], ApiError>) => {
	return useQuery<JuzData[], ApiError>({
		queryKey: ['juz-list'],
		queryFn: async () => {
			const netState = await Network.getNetworkStateAsync();
			if (netState.isConnected) {
				// online → sync ke SQLite
				return await syncJuzFromAPI();
			} else {
				// offline → ambil dari SQLite
				return await getAllJuz();
			}
		},
		...options,
	});
};
