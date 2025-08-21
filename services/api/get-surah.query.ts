import { queryFetch, queryFetchSurah } from '@/scripts/api-services';
import { syncSurahFromAPI } from '@/services/offline/syncSurah';
import { ApiError } from '@/types/api-services.types';
import {
	SurahDataV2,
	SurahResponse,
	SurahV2DetailResponse,
} from '@/types/surah.types';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import * as Network from 'expo-network';
import { getAllSurah } from '../db/surahDb';
//  show or get data list of surah and juz
export const GetSurahList = (
	options?: UseQueryOptions<SurahResponse, ApiError>,
) => {
	return useQuery<SurahResponse, ApiError>({
		queryKey: ['surah-list'],
		queryFn: async () => {
			const url = `quran/surat/semua`;
			// console.log(url, 'Api Hadis Arbain Responses');
			return await queryFetch({ url });
		},
		...options,
	});
};

export const GetSurahListNew = (
	options?: UseQueryOptions<SurahDataV2[], ApiError>,
) => {
	return useQuery<SurahDataV2[], ApiError>({
		queryKey: ['new-surah-list'],
		queryFn: async () => {
			const netState = await Network.getNetworkStateAsync();
			if (netState.isConnected) {
				// online → sync ke SQLite
				return await syncSurahFromAPI();
			} else {
				// offline → ambil dari SQLite
				return await getAllSurah();
			}
		},
		...options,
	});
};

export const GetSurahDetail = (
	id: string,
	options?: UseQueryOptions<SurahV2DetailResponse, ApiError>,
) => {
	return useQuery<SurahV2DetailResponse, ApiError>({
		queryKey: ['surah-detail', id],
		queryFn: async () => {
			const url = `surat/${id}`;
			// console.log(url, 'Api Hadis Arbain Responses');
			return await queryFetchSurah({ url });
		},
		enabled: !!id,
		...options,
	});
};
