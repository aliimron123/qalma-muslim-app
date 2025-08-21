// db/index.ts
import * as SQLite from 'expo-sqlite';

// Import fungsi create
import { createJuzTable } from './juzDb';
import { createAyahTable, createSurahTable } from './surahDb';

export const db = SQLite.openDatabaseSync('quran.db');

export const initDb = () => {
	createJuzTable();
	createSurahTable();
	createAyahTable();
};
