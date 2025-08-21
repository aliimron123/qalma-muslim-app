import { SurahDataV2 } from '@/types/surah.types';
import { getAllSurah, insertSurah } from '../db/surahDb';

const baseURL = process.env.EXPO_PUBLIC_API_URL_SURAH;

export const syncSurahFromAPI = async () => {
	try {
		const res = await fetch(`${baseURL}surat`);
		const json = await res.json();
		console.log('🌐 Data dari API:', json?.data?.length);

		if (json?.data && Array.isArray(json.data)) {
			for (const item of json.data) {
				await insertSurah(item as SurahDataV2);
			}
		}

		// ✅ Setelah sync, ambil dari DB
		const localData = await getAllSurah();
		return localData;
	} catch (error) {
		console.error('❌ Error sync surah:', error);
		return [];
	}
};
