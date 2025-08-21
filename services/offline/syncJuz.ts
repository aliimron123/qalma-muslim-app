import { JuzData } from '@/types/juz.types';
import { getAllJuz, insertJuz } from '../db/juzDb';

const baseURL = process.env.EXPO_PUBLIC_API_URL;

export const syncJuzFromAPI = async () => {
	try {
		const res = await fetch(`${baseURL}quran/juz/semua`);
		const json = await res.json();
		console.log('🌐 Data dari API:', json?.data?.length);

		if (json?.data && Array.isArray(json.data)) {
			for (const item of json.data) {
				await insertJuz(item as JuzData);
			}
		}

		// ✅ Setelah sync, ambil dari DB
		const localData = await getAllJuz();
		return localData;
	} catch (error) {
		console.error('❌ Error sync juz:', error);
		return [];
	}
};
