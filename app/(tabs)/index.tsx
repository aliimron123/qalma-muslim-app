import { LocationIcon } from '@/assets/icons';
import LastRead from '@/components/feature/home/LastRead';
import OneDayDoa from '@/components/feature/home/OneDayDoa';
import OneDayHadis from '@/components/feature/home/OneDayHadist';
import PrayerSchedule from '@/components/feature/home/PrayerSchedule';
import { Badge } from '@/components/module';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { useCurrentLocation } from '@/hooks/useCurrentLocation';
import { useDateTime } from '@/hooks/useDateTime';
import { scaleFont } from '@/hooks/useScaleFont';
import { GetRandomDoa } from '@/services/api/get-doa.query';
import { GetRandomHadithArbain } from '@/services/api/get-hadist.query';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import {
	RefreshControl,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	useWindowDimensions,
	View,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
export default function HomeScreen() {
	const { height: screenHeight } = useWindowDimensions();
	const headerHeight = screenHeight * 0.45;
	const { location, errorMsg } = useCurrentLocation();
	const { time, date } = useDateTime();

	const {
		data: doaData,
		isFetching: isFetchingDoa,
		refetch: refetchDoa,
	} = GetRandomDoa();

	const {
		data: dataHadith,
		isFetching: isFetchingHadits,
		refetch: refetchHadits,
	} = GetRandomHadithArbain();

	const DataDoa = doaData?.data;

	const [refreshing, setRefreshing] = useState(false);

	useEffect(() => {
		refetchDoa();
		refetchHadits();
	}, []);

	useEffect(() => {
		if (errorMsg) {
			Toast.show({
				type: 'error',
				text1: 'Location Error',
				text2: errorMsg, // tampilkan pesan asli dari hook
			});
		}
	}, [errorMsg]);

	const onRefresh = useCallback(() => {
		setRefreshing(true);

		// Simulate data fetching
		setTimeout(() => {
			// Here you could re-fetch data, e.g., call your API again
			setRefreshing(false);
		}, 1500);
	}, []);

	return (
		<GestureHandlerRootView style={styles.container}>
			<SafeAreaView style={[styles.container]}>
				<ScrollView
					contentContainerStyle={{ paddingBottom: 32 }}
					showsVerticalScrollIndicator={false}
					refreshControl={
						<RefreshControl
							refreshing={refreshing}
							onRefresh={onRefresh}
						/>
					}>
					{/* Hero Section */}
					<View style={{ height: headerHeight }}>
						<ParallaxScrollView
							headerStyle={styles.header}
							headerHeight={headerHeight}
							headerBackgroundElement={
								<LinearGradient
									colors={['#0F172A', '#1E293B']}
									start={{ x: 0.5, y: 0 }}
									end={{ x: 0.5, y: 1 }}
									style={StyleSheet.absoluteFill}
								/>
							}
							headerImage={
								<Image
									source={require('@/assets/images/mosque-partial.png')}
									style={styles.reactLogo}
									contentFit='cover'
									blurRadius={2}
									transition={100}
								/>
							}
						/>

						{/* Hero Content */}
						<View style={[styles.heroOverlay, { height: headerHeight }]}>
							<View style={styles.topRow}>
								<Badge
									variant='transparent'
									onPress={() => {
										router.push('/location');
									}}
									icon={<LocationIcon color='#fff' />}>
									{location?.address}
								</Badge>
							</View>

							<View style={styles.centerTime}>
								<Text style={styles.time}>{time}</Text>
								<Text style={styles.hijri}>{date}</Text>
								<Text style={styles.quote}>
									Call upon Me, I will respond to you.
								</Text>
							</View>

							<View style={styles.scheduleWrapper}>
								<PrayerSchedule />
							</View>
						</View>
					</View>

					{/* Content Below */}
					<View style={styles.panelContent}>
						<LastRead />
						<OneDayHadis
							data={dataHadith?.data}
							isLoading={isFetchingHadits}
						/>
						<OneDayDoa
							data={DataDoa}
							isLoading={isFetchingDoa}
						/>
					</View>
				</ScrollView>
			</SafeAreaView>
		</GestureHandlerRootView>
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	reactLogo: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		width: '100%',
		height: '100%',
		opacity: 0.65,
	},
	header: {
		overflow: 'hidden',
		borderBottomRightRadius: 28,
		borderBottomLeftRadius: 28,
	},
	heroOverlay: {
		position: 'absolute',
		justifyContent: 'space-between',
		paddingTop: 24,
		width: '100%',
	},
	topRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: 16,
		paddingTop: 18,
	},
	centerTime: {
		alignItems: 'center',
		paddingHorizontal: 16,
		paddingVertical: 4,
		gap: 4,
		maxHeight: 120,
		flexShrink: 1,
	},
	time: {
		fontSize: scaleFont(48),
		fontWeight: 'bold',
		textAlign: 'center',
		color: '#fff',
	},
	hijri: {
		fontSize: scaleFont(16),
		fontWeight: '500',
		textAlign: 'center',
		color: '#fff',
	},
	quote: {
		fontSize: scaleFont(14),
		fontWeight: '400',
		textAlign: 'center',
		color: '#94A3B8',
		fontStyle: 'italic',
	},
	scheduleWrapper: {
		width: '100%',
		paddingHorizontal: 16,
		paddingBottom: 20,
	},
	panelContent: {
		backgroundColor: '#fff',
		paddingHorizontal: 12,
		paddingVertical: 20,
		height: '100%',
		gap: 16,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.1,
		shadowRadius: 6,
		elevation: 4, // Android shadow
	},
});
