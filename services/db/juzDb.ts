import { JuzData } from '@/types/juz.types';
import * as SQLite from 'expo-sqlite';

// Pakai sync
const db = SQLite.openDatabaseSync('quran.db');

// Buat tabel Juz
export const createJuzTable = () => {
	db.execAsync(`
    CREATE TABLE IF NOT EXISTS juz (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      number INTEGER UNIQUE,
      name TEXT,
      ayat_arab TEXT,
      ayat_indo TEXT,
      ayat_latin TEXT,
      name_start_arab TEXT,
      name_start_id TEXT,
      name_end_arab TEXT,
      name_end_id TEXT,
      surah_id_start INTEGER,
      verse_start INTEGER,
      surah_id_end INTEGER,
      verse_end INTEGER
    );
  `);
};

// Insert data Juz
export const insertJuz = async (juz: JuzData) => {
	try {
		await db.runAsync(
			`INSERT OR IGNORE INTO juz
        (number, name, ayat_arab, ayat_indo, ayat_latin, name_start_arab, name_start_id, name_end_arab, name_end_id, surah_id_start, verse_start, surah_id_end, verse_end) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
			[
				juz.number,
				juz.name,
				juz.ayat_arab,
				juz.ayat_indo,
				juz.ayat_latin,
				juz.name_start_arab,
				juz.name_start_id,
				juz.name_end_arab,
				juz.name_end_id,
				juz.surah_id_start,
				juz.verse_start,
				juz.surah_id_end,
				juz.verse_end,
			],
		);
		console.log('✅ Juz inserted:', juz.number);
	} catch (err) {
		console.error('❌ Error insert juz:', err);
	}
};

// Ambil semua data Juz
export const getAllJuz = async (): Promise<JuzData[]> => {
	try {
		const result = await db.getAllAsync<JuzData>(
			'SELECT * FROM juz ORDER BY number ASC',
		);
		return result;
	} catch (err) {
		console.error('❌ Error getAllJuz:', err);
		return [];
	}
};
