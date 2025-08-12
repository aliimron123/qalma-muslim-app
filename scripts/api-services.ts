import { QueryClient } from '@tanstack/react-query';
import axios from 'axios';

import {
	ApiError,
	MutationFetchOptions,
	QueryFetchOptions,
} from '@/types/api-services.types';

export const client = axios.create({
	baseURL: process.env.EXPO_PUBLIC_API_URL,
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

export async function mutationFetch<T>({
	url,
	method,
	body,
	baseURL,
}: MutationFetchOptions): Promise<T> {
	return new Promise(async (resolve, reject) => {
		try {
			const res = await client.request({
				...(!!baseURL && { baseURL }),
				url,
				method,
				headers: {
					'Content-Type': 'application/json',
				},
				data: body,
			});

			const json = await res.data;

			resolve(json);
		} catch (error: any) {
			reject((error.response?.data as ApiError) ?? error);
		}
	});
}

export async function mutationFormData<T>({
	url,
	body,
	method,
}: MutationFetchOptions): Promise<T> {
	return new Promise(async (resolve, reject) => {
		console.log(body);
		try {
			const form = new FormData();

			// Helper untuk handle nested object/array
			const appendFormData = (key: string, value: any) => {
				if (value instanceof File || value instanceof Blob) {
					form.append(key, value);
				} else if (Array.isArray(value)) {
					// Handle array: contoh "items[0][name]"
					value.forEach((item, index) => {
						if (typeof item === 'object') {
							Object.keys(item).forEach((subKey) => {
								appendFormData(`${key}[${index}][${subKey}]`, item[subKey]);
							});
						} else {
							form.append(`${key}[]`, item);
						}
					});
				} else if (typeof value === 'object' && value !== null) {
					// Handle object: contoh "user[profile][name]"
					Object.keys(value).forEach((subKey) => {
						appendFormData(`${key}[${subKey}]`, value[subKey]);
					});
				} else {
					form.append(key, value);
				}
			};

			Object.keys(body).forEach((key) => {
				const value = body[key as keyof typeof body];
				if (typeof value !== 'undefined') {
					appendFormData(key, value);
				}
			});

			if (method === 'PUT') {
				form.append('_method', 'PUT');
			}

			const res = await client.post(url, form);
			const json = await res.data;

			resolve(json);
		} catch (error: any) {
			reject((error.response?.data as ApiError) ?? error);
		}
	});
}

export async function queryFetchServer<T>({
	url,
	inputParams,
	token,
}: QueryFetchOptions) {
	let data!: T;
	let isError: boolean = false;
	let error: null | ApiError = null;
	let endpoint = url;
	let params = '';

	if (inputParams) {
		params = JSON.stringify(inputParams);
	}

	if (params) {
		endpoint += '?' + params;
	}

	try {
		const response = await client.get(endpoint, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		const json = response.data as T;
		data = json;
	} catch (err: any) {
		console.log(err);

		data = {} as T;
		isError = true;
		error = err.response?.data ?? err;
	}

	return { data, isError, error };
}

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
			staleTime: 10 * 60 * 1000,
		},
	},
});
