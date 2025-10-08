import { queryFetch } from '@/scripts/api-services';
import { ApiError } from '@/types/api-services.types';
import { ScheduleResponse } from '@/types/schedule.types';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

//  show or get data list of surah and juz

export const GetAdzanByDay = ({
	city,
	date,
	options,
}: {
	city: string;
	date: string;
	options?: UseQueryOptions<ScheduleResponse, ApiError>;
}) => {
	return useQuery<ScheduleResponse, ApiError>({
		queryKey: ['adzan', city, date],
		queryFn: async () => {
			const url = `sholat/jadwal/${city}/${date}`;
			// console.log(url, 'Api Doa Responses');
			return await queryFetch({ url });
		},
		enabled: !!city && !!date,
		...options,
	});
};
