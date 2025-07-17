import { Card } from '@/components/module'; // komponen yang tidak tahu-menahu soal gradient
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

function LastRead() {
	return (
		<View style={{ gap: 20 }}>
			<Text className='text-2xl font-semibold'>Terakhir Di Baca</Text>

			<LinearGradient
				colors={['#2563EB', '#1E3A8A']}
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 1 }}
				style={styles.cardGradient} // padding sedikit untuk inner shadow glow
			>
				<Card style={styles.cardContainer}>
					<View>
						<Text style={{ color: 'white', fontSize: 20, fontWeight: 700 }}>
							Surah Alfatihah
						</Text>
						<Text style={{ color: 'white', fontSize: 16 }}>
							Ayat : 1 Juz :1
						</Text>
						<Text style={{ color: 'white', fontSize: 16, marginTop: 8 }}>
							Lanjutkan Bacaan
						</Text>
					</View>
					<Image
						source={require('@/assets/images/quran.png')}
						style={styles.imageStyle}
					/>
				</Card>
			</LinearGradient>
		</View>
	);
}

const styles = StyleSheet.create({
	cardGradient: {
		borderRadius: 12,
		opacity: 0.9,
		// Shadow iOS
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 5,
	},
	cardContainer: {
		backgroundColor: 'transparent',
		justifyContent: 'space-between',
		flexDirection: 'row',
	},
	imageStyle: {
		marginVertical: 'auto',
	},
});

export default LastRead;
