import { Card } from '@/components/module';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type JuzProps = {
	name: string; // Contoh: "Juz 1"
	name_start_id: string; // Contoh: "Al-Fatihah"
	name_end_id?: string; // Contoh: "Al-Baqarah"
	name_start_arab: string; // Contoh: "الفاتحة"
	name_end_arab?: string; // Contoh: "البقرة"
	number?: string; // Contoh: "1"
	surah_id_start?: string; // Contoh: "1"
	surah_id_end?: string; // Contoh: "2"
	verse_start: string; // Contoh: "1"
	verse_end?: string;
};

const JuzCard = ({
	name,
	name_start_id,
	name_end_id,
	name_start_arab,
	name_end_arab,
	number,
	surah_id_start,
	surah_id_end,
	verse_start,
	verse_end,
}: JuzProps) => {
	return (
		<Card
			style={{ borderRadius: 12 }}
			onPress={() =>
				router.navigate({
					pathname: '/read-quran/[id]',
					params: { id: '1', name: name },
				})
			}>
			<View style={styles.container}>
				{/* Info (Judul & Detail) */}
				<View style={styles.infoContainer}>
					<Text className='text-lg font-bold text-blue-900'>{name}</Text>
					<Text className='text-blue-800  mt-1'>
						Dimulai di Surat :{name_start_id} - Ayat {verse_start}
					</Text>
				</View>

				{/* Arabic */}
				<View style={styles.arabicContainer}>
					<Text
						className='text-black text-right'
						style={{ fontFamily: 'Arabic', fontSize: 24, fontWeight: '600' }}>
						{name_start_arab}
					</Text>
				</View>
			</View>
		</Card>
	);
};

export default JuzCard;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	numberContainer: {
		width: 40,
		height: 40,
		marginRight: 12,
		justifyContent: 'center',
		alignItems: 'center',
		position: 'relative',
	},
	icon: {
		width: 40,
		height: 40,
	},
	infoContainer: {
		flex: 1,
		justifyContent: 'center',
	},
	numberText: {
		position: 'absolute',
		color: '#1E3A8A', // Tailwind: text-blue-600
		fontWeight: 'bold',
		textAlign: 'center',
	},
	arabicContainer: {
		justifyContent: 'center',
		alignItems: 'flex-end',
	},
});
