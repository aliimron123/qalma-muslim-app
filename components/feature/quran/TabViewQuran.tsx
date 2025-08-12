import { DummyData, DummyJuz } from '@/constants/data';
import * as React from 'react';
import {
	Dimensions,
	Platform,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from 'react-native';

import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import JuzCard from './JuzCard';
import SurahCard from './SurahCard';

// Ganti dengan konten asli kamu
const SuratRoute = () => (
	<ScrollView>
		<View style={{ paddingVertical: 8 }}>
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
		</View>
	</ScrollView>
);

const JuzRoute = () => (
	<ScrollView>
		<View style={{ paddingVertical: 8 }}>
			{DummyJuz.map((val) => (
				<View
					key={val.number}
					style={styles.cardContainer}>
					<JuzCard
						name={val.name}
						name_start_arab={val.name_start_arab}
						name_start_id={val.name_start_id}
						verse_start={val.verse_start}
					/>
				</View>
			))}
		</View>
	</ScrollView>
);

const AyatRoute = () => (
	<View style={styles.scene}>
		<Text style={styles.text}>Konten Ayat</Text>
	</View>
);

const TagRoute = () => (
	<View style={styles.scene}>
		<Text style={styles.text}>Konten Ayat</Text>
	</View>
);

export default function TabViewQuran() {
	const [index, setIndex] = React.useState(0);
	const [routes] = React.useState([
		{ key: 'surat', title: 'Surat' },
		{ key: 'juz', title: 'Juz' },
		{ key: 'ayat', title: 'Ayat' },
		{ key: 'tag', title: 'Bookmark' },
	]);

	const renderScene = SceneMap({
		surat: SuratRoute,
		juz: JuzRoute,
		ayat: AyatRoute,
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
});
