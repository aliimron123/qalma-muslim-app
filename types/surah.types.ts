export interface SurahResponse {
	status: boolean;
	request: {
		path: string;
	};
	data: SurahData[];
}

export interface SurahV2Response {
	code: number;
	message: string;
	data: SurahDataV2[];
}

export interface SurahV2DetailResponse {
	code: number;
	message: string;
	data: SurahDataV2;
}

export type SurahData = {
	audio_url: string;
	name_en: string;
	name_id: string;
	name_long: string;
	name_short: string;
	number: string; // kalau pasti angka, bisa ubah ke number
	number_of_verses: string; // sama, bisa number
	revelation: string;
	revelation_en: string;
	revelation_id: string;
	sequence: string; // bisa number
	tafsir: string;
	translation_en: string;
	translation_id: string;
};

export type SurahDataV2 = {
	nomor: number;
	nama: string;
	namaLatin: string;
	jumlahAyat: number;
	tempatTurun: string;
	arti: string;
	deskripsi: string;
	audioFull: {
		'01': string;
		'02': string;
		'03': string;
		'04': string;
		'05': string;
	};
	ayat: AyatData[];
};

export type AyatData = {
	nomorAyat: number;
	teksArab: string;
	teksLatin: string;
	teksIndonesia: string;
	audio: {
		'01': string;
		'02': string;
		'03': string;
		'04': string;
		'05': string;
	};
};

export type SurahRow = {
	nomor: number;
	nama: string;
	namaLatin: string;
	jumlahAyat: number;
	tempatTurun: string;
	arti: string;
	deskripsi: string;
	audioFull: string | null; // di DB masih string
};

export type AyahRow = {
	nomorAyat: number;
	teksArab: string;
	teksLatin: string;
	teksIndonesia: string;
	audio: string | null; // masih string
};
