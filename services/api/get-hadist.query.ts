import { queryFetch } from '@/scripts/api-services';
import { ApiError } from '@/types/api-services.types';
import { RandomHadithArbainResponses } from '@/types/hadist.types';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

//  show or get data list of surah and juz
export const GetRandomHadithArbain = ({
	options,
}: {
	options?: UseQueryOptions<RandomHadithArbainResponses, ApiError>;
}) => {
	return useQuery<RandomHadithArbainResponses, ApiError>({
		queryKey: ['random-hadist-arbain'],
		queryFn: async () => {
			const url = `hadits/arbain/acak`;
			// console.log(url, 'Api Hadis Arbain Responses');
			return await queryFetch({ url });
		},
		...options,
	});
};
