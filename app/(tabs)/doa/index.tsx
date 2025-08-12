import GradientCard from '@/components/feature/doa/GradientCard';
import { router } from 'expo-router';
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

const data = [
	{
		title: 'Quran',
		image: require('@/assets/images/quran-1.png'),
		color: ['#30B981', '#127353'],
		link: 'quran',
	},
	{
		title: 'Hadist',
		image: require('@/assets/images/islamic-lantern.png'),
		color: ['#3B82F6', '#2D579C'],
		link: 'hadist',
	},
	{
		title: 'Pilihan',
		image: require('@/assets/images/praying.png'),
		color: ['#6366F1', '#818CF8'],
		link: 'pilihan',
	},
	{
		title: 'Harian',
		image: require('@/assets/images/ramadan-day.png'),
		color: ['#F59E0B', '#FBBF24'],
		link: 'harian',
	},
	{
		title: 'Ibadah',
		image: require('@/assets/images/Drum.png'),
		color: ['#EC4899', '#862957'],
		link: 'ibadah',
	},
	{
		title: 'Haji',
		image: require('@/assets/images/macca-1.png'),
		color: ['#22D3EE', '#137988'],
		link: 'haji',
	},
	{
		title: 'Lainnya',
		image: require('@/assets/images/mosque.png'),
		color: ['#D87030', '#723B19'],
		link: 'lainnya',
	},
];

export default function MenuGrid() {
	return (
		<View style={styles.container}>
			<FlatList
				data={data}
				keyExtractor={(item) => item.title}
				contentContainerStyle={{
					padding: 10,
					rowGap: 10,
				}}
				columnWrapperStyle={{ justifyContent: 'space-between' }}
				numColumns={2}
				renderItem={({ item }) => (
					<GradientCard
						title={item.title}
						colorGradient={item.color}
						image={item.image}
						link={() =>
							router.navigate({
								pathname: '/read-doa/[id]',
								params: { id: item.link },
							})
						}
					/>
				)}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
