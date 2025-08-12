export interface DoaResponses {
	status: boolean;
	request: {
		path: string;
		id: number;
	};
	data: DoaData[];
}
export interface DoaDetailResponses {
	status: boolean;
	request: {
		path: string;
		id: number;
	};
	data: DoaData[];
}
// types/api.types.ts
export interface DoaSumberResponse {
	status: boolean;
	request: {
		path: string;
	};
	data: DoaCategory[];
}

export interface RandomDoaResponses {
	status: boolean;
	request: {
		path: string;
		id: number;
	};
	data: DoaData;
}

export interface DoaData {
	arab: string;
	indo: string;
	judul: string;
	source: string;
}

export type DoaCategory =
	| 'quran'
	| 'hadits'
	| 'pilihan'
	| 'harian'
	| 'ibadah'
	| 'haji'
	| 'lainnya';
