import AudioPlayer, {
	AudioPlayerRef,
} from '@/components/feature/quran/AudioPlayer';
import AyahCard from '@/components/feature/quran/AyatCard';
import { Button, Modal } from '@/components/module';
import { useModal } from '@/hooks/useModal';
import { GetSurahDetail } from '@/services/api/get-surah.query';
import { AyatData } from '@/types/surah.types';
import Slider from '@react-native-community/slider';
import { useLocalSearchParams } from 'expo-router';
import React, { useCallback, useRef, useState } from 'react';
import {
	Animated,
	Dimensions,
	FlatList,
	ListRenderItemInfo,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

function Ayat() {
	const inset = useSafeAreaInsets();
	const { isModalOpen, closeModal } = useModal();
	const { id } = useLocalSearchParams();

	// ✅ States
	const [sizeText, setSizeText] = useState(0);
	const [isPlaying, setIsPlaying] = useState(false);
	const [showCard, setShowCard] = useState(false);

	// ✅ Audio reference
	const audioRef = useRef<AudioPlayerRef>(null);

	// ✅ Animation for sliding card
	const cardTranslateY = useRef(
		new Animated.Value(deviceHeight * 0.15 + 40),
	).current;
	const CARD_HEIGHT = deviceHeight * 0.2;
	let scrollTimeout: ReturnType<typeof setTimeout> | null = null;

	// ✅ Track last scroll position
	const lastScrollY = useRef(0);

	// ✅ Open card and start audio
	const handleOpenAudio = (index: number) => {
		setShowCard(true);

		Animated.spring(cardTranslateY, {
			toValue: 0,
			useNativeDriver: true,
			damping: 15, // smoother stop
			stiffness: 150, // less stiff
			mass: 1,
		}).start();

		audioRef.current?.playAudio(index);
		setIsPlaying(true);
	};
	const handleScroll = (event: any) => {
		const yOffset = event.nativeEvent.contentOffset.y;

		// Clear previous timeout to debounce
		if (scrollTimeout) clearTimeout(scrollTimeout);

		scrollTimeout = setTimeout(() => {
			// Hide card when scrolling down
			if (yOffset > lastScrollY.current && showCard) {
				Animated.spring(cardTranslateY, {
					toValue: CARD_HEIGHT + 40, // completely off-screen
					useNativeDriver: true,
					damping: 20,
					stiffness: 200,
				}).start();
			}

			// Show card when scrolling up or at top
			if ((yOffset < lastScrollY.current || yOffset <= 0) && showCard) {
				Animated.spring(cardTranslateY, {
					toValue: 0,
					useNativeDriver: true,
					damping: 15,
					stiffness: 150,
				}).start();
			}

			lastScrollY.current = yOffset;
		}, 50); // debounce delay
	};
	// ✅ Render each Ayah

	const { data: dataSurahDetail } = GetSurahDetail(id as string);
	const renderData = dataSurahDetail?.data.ayat ?? [];

	const renderItem = useCallback(
		({ item }: ListRenderItemInfo<AyatData>) => (
			<AyahCard
				no={item.nomorAyat}
				ayah={item.teksArab}
				latin={item.teksLatin}
				sizeText={sizeText}
				arti_id={item.teksIndonesia}
				handleOpenAudio={() => handleOpenAudio(0)}
			/>
		),
		[sizeText],
	);

	return (
		<GestureHandlerRootView>
			<View style={{ flex: 1 }}>
				<FlatList
					keyExtractor={(item) => String(item.nomorAyat)}
					data={renderData}
					renderItem={renderItem}
					onScroll={handleScroll}
					scrollEventThrottle={16}
					contentContainerStyle={{
						paddingBottom: 8 + inset.bottom,
						paddingHorizontal: 8,
						paddingTop: 8,
					}}
				/>

				{/* 🔹 Modal slider for text size */}
				<Modal
					visible={isModalOpen}
					position='top'
					onClose={closeModal}>
					<Text style={{ textAlign: 'center', fontSize: 18 }}>{sizeText}</Text>
					<View style={styles.containerSlider}>
						<Text style={{ fontSize: 20, marginVertical: 'auto' }}>Aa</Text>
						<Slider
							style={{ width: deviceWidth * 0.65, marginVertical: 'auto' }}
							value={sizeText}
							step={1}
							minimumValue={28}
							maximumValue={42}
							onValueChange={setSizeText}
							minimumTrackTintColor='#334372'
							maximumTrackTintColor='#000000'
						/>
						<Text style={{ fontSize: 24, marginVertical: 'auto' }}>Aa</Text>
					</View>
					<View style={styles.containerButton}>
						<Button
							title='Kecil'
							style={styles.buttonStyle}
							textStyle={{ fontSize: 14 }}
							onPress={() => setSizeText(28)}
						/>
						<Button
							title='Normal'
							style={styles.buttonStyle}
							textStyle={{ fontSize: 14 }}
							onPress={() => setSizeText(32)}
						/>
						<Button
							title='Besar'
							style={styles.buttonStyle}
							textStyle={{ fontSize: 14 }}
							onPress={() => setSizeText(42)}
						/>
					</View>
				</Modal>

				{/* 🔹 Bottom Audio Card */}
				{showCard && (
					<Animated.View
						style={[
							styles.cardContainer,
							{
								height: CARD_HEIGHT,
								transform: [{ translateY: cardTranslateY }],
							},
						]}>
						<AudioPlayer
							ref={audioRef}
							isPlaying={isPlaying}
							setIsPlaying={setIsPlaying}
						/>
					</Animated.View>
				)}
			</View>
		</GestureHandlerRootView>
	);
}

const styles = StyleSheet.create({
	cardContainer: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		width: '100%',
		backgroundColor: '#fff',
		borderTopLeftRadius: 16,
		borderTopRightRadius: 16,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: -3 },
		shadowOpacity: 0.1,
		shadowRadius: 6,
		elevation: 6,
		padding: 16,
	},
	containerSlider: {
		alignSelf: 'center',
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'center',
		width: '100%',
		gap: 4,
	},
	containerButton: {
		width: deviceWidth * 0.5,
		alignSelf: 'center',
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'center',
		marginTop: 16,
		paddingHorizontal: 6,
		gap: 4,
	},
	buttonStyle: {
		alignSelf: 'flex-start',
		paddingVertical: 8.5,
		maxWidth: deviceWidth * 0.25,
		width: '100%',
	},
});

export default Ayat;
