import * as React from 'react';
import {
	Dimensions,
	FlatList,
	Platform,
	StyleSheet,
	Text,
	View,
} from 'react-native';

import { Skeleton } from '@/components/module';
import { GetSurahListNew } from '@/services/api/get-surah.query';
import { SurahDataV2 } from '@/types/surah.types';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import SurahCard from './SurahCard';

// declare Props
type RenderSurahCardProps = {
	item: SurahDataV2;
};

// Ganti dengan konten asli kamu
const SuratRoute = () => {
	const { data: dataSurah, isLoading, isError, error } = GetSurahListNew();

	if (isLoading) {
		return (
			<View
				style={[styles.cardContainer, { flex: 1, marginVertical: 10, gap: 8 }]}>
				{Array.from({ length: 8 }).map((_, index) => (
					<Skeleton
						key={index}
						height={100}
					/>
				))}
			</View>
		);
	}

	if (isError) {
		return <Text>Error: {error.message}</Text>;
	}

	const RenderSurahCard = React.memo(({ item }: RenderSurahCardProps) => (
		<SurahCard
			no={item.nomor}
			surah_idn={item.namaLatin}
			surah_arabic={item.nama}
			arti={item.arti}
			total_ayah={String(item.jumlahAyat)}
			revealed_in={item.tempatTurun}
		/>
	));

	return (
		<View>
			<FlatList
				data={dataSurah}
				keyExtractor={(item) => String(item.nomor)}
				renderItem={({ item }) => <RenderSurahCard item={item} />}
				ItemSeparatorComponent={() => (
					<View
						style={{
							height: 1,
							marginVertical: 3,
						}}
					/>
				)}
				contentContainerStyle={{ paddingVertical: 10, paddingHorizontal: 8 }}
				showsVerticalScrollIndicator={false}
			/>
		</View>
	);
};

const TafsirRoute = () => {
	const { data: dataSurah, isLoading, isError, error } = GetSurahListNew();

	if (isLoading) {
		return (
			<View
				style={[styles.cardContainer, { flex: 1, marginVertical: 10, gap: 8 }]}>
				{Array.from({ length: 8 }).map((_, index) => (
					<Skeleton
						key={index}
						height={100}
					/>
				))}
			</View>
		);
	}

	if (isError) {
		return <Text>Error: {error.message}</Text>;
	}

	const RenderSurahCard = React.memo(({ item }: RenderSurahCardProps) => (
		<SurahCard
			no={item.nomor}
			surah_idn={item.namaLatin}
			surah_arabic={item.nama}
			arti={item.arti}
			total_ayah={String(item.jumlahAyat)}
			revealed_in={item.tempatTurun}
		/>
	));

	return (
		<View>
			<FlatList
				data={dataSurah}
				keyExtractor={(item) => String(item.nomor)}
				renderItem={({ item }) => <RenderSurahCard item={item} />}
				ItemSeparatorComponent={() => (
					<View
						style={{
							height: 1,
							marginVertical: 3,
						}}
					/>
				)}
				contentContainerStyle={{ paddingVertical: 10, paddingHorizontal: 8 }}
				showsVerticalScrollIndicator={false}
			/>
		</View>
	);
};

const TagRoute = () => (
	<View style={styles.scene}>
		<Text style={styles.text}>Konten Ayat</Text>
	</View>
);

export default function TabViewQuran() {
	const [index, setIndex] = React.useState(0);
	const [routes] = React.useState([
		{ key: 'surat', title: 'Surat' },
		{ key: 'tafsir', title: 'Tafsir' },
		{ key: 'tag', title: 'Bookmark' },
	]);

	const renderScene = SceneMap({
		surat: SuratRoute,
		tafsir: TafsirRoute,
		tag: TagRoute,
	});

	const renderTab = (props: any) => (
		<TabBar
			{...props}
			indicatorStyle={{
				backgroundColor: '#007AFF',
				height: 4,
				borderTopLeftRadius: 10,
				borderTopRightRadius: 10,
			}}
			style={{ backgroundColor: '#FFFFFF' }}
			tabStyle={{
				paddingVertical: Platform.OS === 'ios' ? 14 : 10,
			}}
			labelStyle={{
				fontSize: 16,
				fontWeight: 'bold',
				color: '#387478',
			}}
			activeColor='#007AFF'
			inactiveColor='#656565'
		/>
	);

	return (
		<TabView
			lazy
			navigationState={{ index, routes }}
			renderScene={renderScene}
			onIndexChange={setIndex}
			initialLayout={{ width: Dimensions.get('window').width }}
			renderTabBar={renderTab}
		/>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 12,
	},
	cardContainer: {
		paddingHorizontal: 8,
		paddingVertical: 4,
		flexDirection: 'column',
	},
	scene: {
		flex: 1,
		backgroundColor: '#fff',
		color: '#0000',
		justifyContent: 'center',
		alignItems: 'center',
	},
	text: {
		color: '#0A0A1F',
		fontFamily: 'PixelFont', // 👉 pastikan sudah load font-nya
		fontSize: 24,
	},
	containerLoading: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
