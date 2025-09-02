import { LocationsResponse } from '@/types/location.types';
import * as SQLite from 'expo-sqlite';

// Gunakan database async
const db = SQLite.openDatabaseSync('quran.db');

export const createLocationTable = async () => {
	await db.execAsync(`
    CREATE TABLE IF NOT EXISTS lokasi (
      id TEXT PRIMARY KEY NOT NULL, 
      lokasi TEXT
    );
  `);
};

export const insertLocation = async (data: LocationsResponse['data']) => {
	const stmt = await db.prepareAsync(
		`INSERT OR REPLACE INTO lokasi (id, lokasi) VALUES (?, ?);`,
	);

	await db.withTransactionAsync(async () => {
		for (const item of data) {
			await stmt.executeAsync([item.id, item.lokasi]);
		}
	});

	await stmt.finalizeAsync();
};

export const getLokasi = async (): Promise<LocationsResponse['data']> => {
	const rows = await db.getAllAsync<{ id: string; lokasi: string }>(
		'SELECT * FROM lokasi ORDER BY id ASC;',
	);
	return rows as LocationsResponse['data'];
};
