import { LocationIcon, SearchIcon } from '@/assets/icons';
import LastRead from '@/components/feature/home/LastRead';
import Menu from '@/components/feature/home/Menu';
import OneDayDoa from '@/components/feature/home/OneDayDoa';
import OneDayHadis from '@/components/feature/home/OneDayHadist';
import PrayerSchedule from '@/components/feature/home/PrayerSchedule';
import QuotesOfTheDay from '@/components/feature/home/QuotesOfTheDay';
import { Badge, ButtonIcon } from '@/components/module';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import {
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	useWindowDimensions,
	View,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';

export default function HomeScreen() {
	const { height: screenHeight } = useWindowDimensions();
	const headerHeight = screenHeight * 0.45;

	const components = [Menu, QuotesOfTheDay, LastRead, OneDayHadis, OneDayDoa];

	return (
		<GestureHandlerRootView style={styles.container}>
			<SafeAreaView style={[styles.container]}>
				<ScrollView
					contentContainerStyle={{ paddingBottom: 32 }}
					showsVerticalScrollIndicator={false}>
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
									style={{ marginVertical: 'auto' }}
									variant='transparent'
									icon={<LocationIcon color='#fff' />}>
									Kebayoran Lama, Jakarta Selatan
								</Badge>
								<ButtonIcon
									variant='none'
									size={40}
									icon={
										<SearchIcon
											color='#fff'
											width={40}
											height={40}
										/>
									}
								/>
							</View>

							<View style={styles.centerTime}>
								<Text style={styles.time}>12:30</Text>
								<Text style={styles.hijri}>04 Muharram 1446 H</Text>
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
						{components.map((Component, index) => (
							<Component key={index} />
						))}
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
		paddingTop: 20,
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
		fontSize: RFValue(32),
		fontWeight: 'bold',
		textAlign: 'center',
		color: '#fff',
	},
	hijri: {
		fontSize: RFValue(14),
		fontWeight: '500',
		textAlign: 'center',
		color: '#fff',
	},
	quote: {
		fontSize: RFValue(12),
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
		paddingHorizontal: 16,
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
