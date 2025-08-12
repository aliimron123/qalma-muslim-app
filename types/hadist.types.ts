export interface HadithResponse {
	status: boolean;
	request: {
		path: string;
		id: number;
	};
	data: HadithData[];
}

export interface HadithDetailResponses {
	status: boolean;
	request: {
		path: string;
		id: number;
	};
	data: HadithData[];
}
// types/api.types.ts
export interface HadithSumberResponse {
	status: boolean;
	request: {
		path: string;
	};
	data: HadithCategory[];
}

export interface RandomHadithArbainResponses {
	status: boolean;
	request: {
		path: string;
		id: number;
	};
	data: HadithData;
}

export interface HadithData {
	arab: string;
	indo: string;
	judul: string;
	no: string;
}

export type HadithCategory =
	| 'quran'
	| 'hadits'
	| 'pilihan'
	| 'harian'
	| 'ibadah'
	| 'haji'
	| 'lainnya';
