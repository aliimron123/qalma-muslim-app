import { Card } from '@/components/module';
import { router } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

type SurahCardProps = {
	no: number;
	surah_idn: string;
	surah_arabic: string;
	arti: string;
	total_ayah: string;
	revealed_in: string;
};

const SurahCard = ({
	no,
	surah_idn,
	surah_arabic,
	arti,
	total_ayah,
	revealed_in,
}: SurahCardProps) => {
	return (
		<Card
			style={{ borderRadius: 12 }}
			onPress={() =>
				router.navigate({
					pathname: '/read-quran/[id]',
					params: { id: '1' },
				})
			}>
			<View style={styles.container}>
				{/* Number + Icon Frame */}
				<View style={styles.numberContainer}>
					<Image
						source={require('../../../assets/images/sakath.png')} // Ganti dengan path ikon kamu
						style={styles.icon}
						width={48}
						height={48}
						resizeMode='contain'
					/>
					<Text
						style={[
							styles.numberText,
							no >= 100 ? { fontSize: 10 } : { fontSize: 12 },
						]}>
						{no}
					</Text>
				</View>

				{/* Info (Judul & Detail) */}
				<View style={styles.infoContainer}>
					<Text className='text-lg font-bold text-blue-900'>
						{surah_idn}
						<Text className='font-normal text-sm text-gray-700'> ({arti})</Text>
					</Text>
					<Text className='text-blue-800  mt-1'>
						{revealed_in} - {total_ayah} Ayat
					</Text>
				</View>

				{/* Arabic */}
				<View style={styles.arabicContainer}>
					<Text
						className=' text-black font-semibold text-right'
						style={{ fontFamily: 'Amiri', fontSize: 24 }}>
						{surah_arabic}
					</Text>
				</View>
			</View>
		</Card>
	);
};

export default SurahCard;

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
