import { AyahRow, AyatData, SurahDataV2, SurahRow } from '@/types/surah.types';
import * as SQLite from 'expo-sqlite';

// buka atau buat database baru
const db = SQLite.openDatabaseSync('quran.db');

export const resetSurahTable = () => {
	db.execSync(`DROP TABLE IF EXISTS surah;`);
	db.execSync(`
    CREATE TABLE IF NOT EXISTS surah (
      nomor INTEGER PRIMARY KEY,
      nama TEXT,
      namaLatin TEXT,
      jumlahAyat INTEGER,
      tempatTurun TEXT,
      arti TEXT,
      deskripsi TEXT,
      audioFull TEXT -- kita simpan JSON string untuk audioFull
    );
  `);
};

// bikin table surah sesuai SurahDataV2
export const createSurahTable = () => {
	db.execSync(`
    CREATE TABLE IF NOT EXISTS surah (
      nomor INTEGER PRIMARY KEY,
      nama TEXT,
      namaLatin TEXT,
      jumlahAyat INTEGER,
      tempatTurun TEXT,
      arti TEXT,
      deskripsi TEXT,
      audioFull TEXT -- disimpan sebagai JSON string
    );
  `);
};

// detail surah
export const createAyahTable = () => {
	db.execSync(`
  CREATE TABLE IF NOT EXISTS ayah (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      surahNomor INTEGER,
      nomorAyat INTEGER,
      teksArab TEXT,
      teksLatin TEXT,
      teksIndonesia TEXT,
      audio TEXT,
      FOREIGN KEY (surahNomor) REFERENCES surah (nomor) ON DELETE CASCADE
    );
  `);
};

// fungsi insert data ke surah
export const insertSurah = (surah: SurahDataV2) => {
	db.runSync(
		`INSERT OR IGNORE INTO surah 
      (nomor, nama, namaLatin, jumlahAyat, tempatTurun, arti, deskripsi, audioFull)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
		[
			surah.nomor,
			surah.nama,
			surah.namaLatin,
			surah.jumlahAyat,
			surah.tempatTurun,
			surah.arti,
			surah.deskripsi,
			JSON.stringify(surah.audioFull), // simpan object jadi string
		],
	);
};

// fungsi insert data ayah

export const insertAyatBatch = (surahNomor: number, ayatList: AyatData[]) => {
	ayatList.forEach((ayat) => {
		db.runSync(
			`INSERT INTO ayat 
        (surahNomor, nomorAyat, teksArab, teksLatin, teksIndonesia, audio) 
       VALUES (?, ?, ?, ?, ?, ?)`,
			[
				surahNomor,
				ayat.nomorAyat,
				ayat.teksArab,
				ayat.teksLatin,
				ayat.teksIndonesia,
				JSON.stringify(ayat.audio),
			],
		);
	});
};

// fungsi get semua surah
export const getAllSurah = (): SurahDataV2[] => {
	const rows = db.getAllSync('SELECT * FROM surah ORDER BY nomor ASC');

	return rows.map((row: any) => ({
		...row,
		audioFull: row.audioFull ? JSON.parse(row.audioFull) : {}, // parse balik ke object
	})) as SurahDataV2[];
};

// get detail surah by id

export const getSurahDetail = (nomor: number): SurahDataV2 | null => {
	const surah = db.getFirstSync<SurahRow>(
		`SELECT * FROM surah WHERE nomor = ?`,
		[nomor],
	);
	if (!surah) return null;

	const ayatList = db
		.getAllSync<AyahRow>(
			`SELECT * FROM ayat WHERE surahNomor = ? ORDER BY nomorAyat ASC`,
			[nomor],
		)
		.map((row) => ({
			...row,
			audio: row.audio
				? JSON.parse(row.audio)
				: { '01': '', '02': '', '03': '', '04': '', '05': '' },
		}));

	return {
		...surah,
		audioFull: surah.audioFull
			? JSON.parse(surah.audioFull)
			: { '01': '', '02': '', '03': '', '04': '', '05': '' },
		ayat: ayatList,
	};
};
