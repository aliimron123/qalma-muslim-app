import { CaretLeftIcon, SettingIcon } from '@/assets/icons';
import SurahCard from '@/components/feature/quran/SurahCard';
import { ButtonIcon } from '@/components/module';
import CustomHeader from '@/components/ui/CustomHeader';
import { DummyData } from '@/constants/data';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

function Quran(): React.JSX.Element {
	return (
		<SafeAreaProvider className='flex-1'>
			<View>
				<CustomHeader
					title='Baca Quran'
					leftComponent={
						<ButtonIcon
							style={{ borderRadius: 12 }}
							icon={<CaretLeftIcon />}
							variant='blur'
						/>
					}
					rightComponent={
						<ButtonIcon
							style={{ borderRadius: 12 }}
							icon={<SettingIcon />}
							variant='blur'
						/>
					}
				/>
			</View>

			<ScrollView style={{ paddingTop: 8, marginBottom: 8 }}>
				{DummyData.map((val) => (
					<View
						key={val.no}
						style={styles.cardContainer}>
						<SurahCard
							no={val.no}
							arti={val.arti}
							surah_arabic={val.surah_arabic}
							surah_idn={val.surah_idn}
							total_ayah={val.total_ayah}
							revealed_in={val.revealed_in}
						/>
					</View>
				))}
			</ScrollView>
		</SafeAreaProvider>
	);
}

const styles = StyleSheet.create({
	cardContainer: {
		paddingHorizontal: 14,
		paddingVertical: 4,
		flexDirection: 'column',
	},
});

export default Quran;
