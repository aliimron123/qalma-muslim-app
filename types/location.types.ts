export interface LocationsResponse {
	data: LocationData[];
	status?: boolean;
	request?: Record<string, any>;
}

export type LocationData = {
	data(data: any): unknown;
	id: string;
	lokasi: string;
};

export type TypeLocation = {
	id: string;
	lokasi: string;
};
