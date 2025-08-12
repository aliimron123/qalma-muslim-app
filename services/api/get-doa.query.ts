import { queryFetch } from '@/scripts/api-services';
import { ApiError } from '@/types/api-services.types';
import { DoaSumberResponse, RandomDoaResponses } from '@/types/doa.types';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

//  show or get data list of surah and juz

export const GetDoaByKeyword = ({
	keyword,
	options,
}: {
	keyword: string;
	options?: UseQueryOptions<DoaSumberResponse, ApiError>;
}) => {
	return useQuery<DoaSumberResponse, ApiError>({
		queryKey: ['doa-sumber'],
		queryFn: async () => {
			const url = `doa/sumber/${keyword}`;
			// console.log(url, 'Api Doa Responses');
			return await queryFetch({ url });
		},
		...options,
	});
};

export const GetRandomDoa = (
	options?: UseQueryOptions<RandomDoaResponses, ApiError>,
) => {
	return useQuery<RandomDoaResponses, ApiError>({
		queryKey: ['random-doa-acak'],
		queryFn: async () => {
			const url = 'doa/acak';
			// console.log(url, 'Api Doa Responses');
			return await queryFetch({ url });
		},
		...options,
	});
};
