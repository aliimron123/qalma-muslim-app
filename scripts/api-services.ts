import { QueryClient } from '@tanstack/react-query';
import axios from 'axios';

import { ApiError, QueryFetchOptions } from '@/types/api-services.types';

export const client = axios.create({
	baseURL: process.env.EXPO_PUBLIC_API_URL,
	headers: {
		Accept: 'application/json',
	},
});

export const surahClient = axios.create({
	baseURL: process.env.EXPO_PUBLIC_API_URL_SURAH,
	headers: {
		Accept: 'application/json',
	},
});

export async function queryFetch<T>({
	url,
	inputParams,
}: QueryFetchOptions): Promise<T> {
	let params = '';

	if (inputParams) {
		params = JSON.stringify(inputParams);
	}

	return new Promise(async (resolve, reject) => {
		try {
			let fetchUrl = url;

			if (params) {
				fetchUrl += '?' + params;
			}

			const res = await client.get(fetchUrl);
			const json = await res.data;

			resolve(json);
		} catch (error: any) {
			reject((error.response?.data as ApiError) ?? error);
		}
	});
}

export async function queryFetchSurah<T>({
	url,
	inputParams,
}: QueryFetchOptions): Promise<T> {
	let params = '';

	if (inputParams) {
		params = JSON.stringify(inputParams);
	}

	return new Promise(async (resolve, reject) => {
		try {
			let fetchUrl = url;

			if (params) {
				fetchUrl += '?' + params;
			}

			const res = await surahClient.get(fetchUrl);
			const json = await res.data;

			resolve(json);
		} catch (error: any) {
			reject((error.response?.data as ApiError) ?? error);
		}
	});
}

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
			staleTime: 10 * 60 * 1000,
		},
	},
});
