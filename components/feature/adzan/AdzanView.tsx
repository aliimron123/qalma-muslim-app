import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef, useState } from 'react';
import {
	ColorValue,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import Animated, {
	cancelAnimation,
	Easing,
	runOnJS,
	useAnimatedReaction,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';

type ColorTuple = [ColorValue, ColorValue];

const ClockComponent = () => {
	const [currentTime, setCurrentTime] = useState(new Date());
	const [selectedHour, setSelectedHour] = useState<number | null>(null);

	// Timeout ID
	const selectionTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

	// Shared values (initial colors)
	const prevColors = useSharedValue<ColorTuple>(['#1A1A2E', '#16213E']);
	const nextColors = useSharedValue<ColorTuple>(['#1A1A2E', '#16213E']);

	// State untuk dipakai di render (hindari baca .value saat render)
	const [prevColorsState, setPrevColorsState] = useState<ColorTuple>([
		'#1A1A2E',
		'#16213E',
	]);
	const [nextColorsState, setNextColorsState] = useState<ColorTuple>([
		'#1A1A2E',
		'#16213E',
	]);

	// Sinkronisasi dari shared value ke state
	useAnimatedReaction(
		() => prevColors.value,
		(newVal) => {
			runOnJS(setPrevColorsState)([...newVal]);
		},
	);

	useAnimatedReaction(
		() => nextColors.value,
		(newVal) => {
			runOnJS(setNextColorsState)([...newVal]);
		},
	);

	// Overlay opacity
	const overlayOpacity = useSharedValue(0);

	// Update waktu tiap detik
	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentTime(new Date());
		}, 1000);
		return () => clearInterval(timer);
	}, []);

	// Tentukan warna berdasarkan jam
	const getBackgroundGradient = (hour: number) => {
		if (hour >= 5 && hour < 12)
			return { colors: ['#87CEEB', '#FFE4B5'], name: 'Pagi' };
		if (hour >= 12 && hour < 17)
			return { colors: ['#4A90E2', '#E6F3FF'], name: 'Siang' };
		if (hour >= 17 && hour < 20)
			return { colors: ['#FF8C42', '#6A4C93'], name: 'Sore' };
		return { colors: ['#1A1A2E', '#16213E'], name: 'Malam' };
	};

	const timeZones = [
		{ name: 'Jakarta', offset: 7, location: 'WIB' },
		{ name: 'London', offset: 0, location: 'GMT' },
		{ name: 'New York', offset: -5, location: 'EST' },
		{ name: 'Tokyo', offset: 9, location: 'JST' },
		{ name: 'Sydney', offset: 10, location: 'AEST' },
		{ name: 'Dubai', offset: 4, location: 'GST' },
	];

	const getTimeForZone = (offset: number) => {
		const utc = new Date(
			currentTime.getTime() + currentTime.getTimezoneOffset() * 60000,
		);
		return new Date(utc.getTime() + offset * 3600000);
	};

	const formatTime = (date: Date) =>
		date.toLocaleTimeString('id-ID', {
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
		});

	const activeHour = selectedHour ?? currentTime.getHours();
	const backgroundInfo = getBackgroundGradient(activeHour);

	// Animasi perubahan warna
	const animationId = useRef(0);
	useEffect(() => {
		const newColors = backgroundInfo.colors;

		if (
			nextColors.value[0] !== newColors[0] ||
			nextColors.value[1] !== newColors[1]
		) {
			cancelAnimation(overlayOpacity);
			const currentId = ++animationId.current;

			nextColors.value = [...newColors] as [string, string];
			overlayOpacity.value = 0;

			overlayOpacity.value = withTiming(
				1,
				{
					duration: 1500,
					easing: Easing.inOut(Easing.ease),
				},
				(finished) => {
					if (finished && currentId === animationId.current) {
						prevColors.value = [...nextColors.value] as [string, string];
						overlayOpacity.value = 0;
					}
				},
			);
		}
	}, [backgroundInfo.colors]);

	// Animated style overlay
	const animatedOverlayStyle = useAnimatedStyle(() => ({
		opacity: overlayOpacity.value,
	}));

	return (
		<View style={{ flex: 1 }}>
			{/* Background lama */}
			<LinearGradient
				colors={prevColorsState}
				style={StyleSheet.absoluteFillObject}
			/>

			{/* Overlay animasi warna baru */}
			<Animated.View
				style={[StyleSheet.absoluteFillObject, animatedOverlayStyle]}>
				<LinearGradient
					colors={nextColorsState}
					style={StyleSheet.absoluteFillObject}
				/>
			</Animated.View>

			{/* Content */}
			<View style={styles.container}>
				{/* Header */}
				<View style={styles.header}>
					<Text style={styles.headerTitle}>World Clock</Text>
					<Text style={styles.headerSubtitle}>Waktu {backgroundInfo.name}</Text>
				</View>

				{/* Hero */}
				<View style={styles.hero}>
					<Text style={styles.heroLocation}>Jakarta, Indonesia</Text>
					<Text style={styles.heroTime}>{formatTime(getTimeForZone(7))}</Text>
					<Text style={styles.heroDate}>
						{currentTime.toLocaleDateString('id-ID', {
							weekday: 'long',
							year: 'numeric',
							month: 'long',
							day: 'numeric',
						})}
					</Text>
					<Text style={styles.heroTimezone}>WIB (UTC+7)</Text>
				</View>
			</View>

			{/* List zona waktu */}
			<ScrollView
				style={styles.cardContainer}
				showsVerticalScrollIndicator={false}>
				<Text style={styles.cardListTitle}>Zona Waktu Lainnya</Text>
				{timeZones.map((zone, index) => {
					const zoneTime = getTimeForZone(zone.offset);
					const zoneHour = zoneTime.getHours();
					const isSelected = selectedHour === zoneHour;

					return (
						<TouchableOpacity
							key={index}
							style={[styles.timeCard, isSelected && styles.selectedCard]}
							onPress={() => {
								if (selectionTimeout.current)
									clearTimeout(selectionTimeout.current);
								setSelectedHour(zoneHour);
								selectionTimeout.current = setTimeout(() => {
									setSelectedHour(null);
								}, 10000);
							}}>
							<View style={styles.cardContent}>
								<View>
									<Text
										style={[
											styles.cardLocation,
											isSelected && styles.selectedCardText,
										]}>
										{zone.name}
									</Text>
									<Text
										style={[
											styles.cardTimezone,
											isSelected && styles.selectedCardText,
										]}>
										{zone.location}
									</Text>
								</View>
								<View style={styles.cardTimeContainer}>
									<Text
										style={[
											styles.cardTime,
											isSelected && styles.selectedCardText,
										]}>
										{formatTime(zoneTime)}
									</Text>
									<Text
										style={[
											styles.cardPeriod,
											isSelected && styles.selectedCardPeriodText,
										]}>
										{getBackgroundGradient(zoneHour).name}
									</Text>
								</View>
							</View>
						</TouchableOpacity>
					);
				})}
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},
	header: {
		alignItems: 'center',
		marginBottom: 30,
		paddingTop: 40,
	},
	headerTitle: {
		fontSize: 28,
		fontWeight: 'bold',
		color: 'white',
		textShadowColor: 'rgba(0, 0, 0, 0.3)',
		textShadowOffset: { width: 1, height: 1 },
		textShadowRadius: 3,
	},
	headerSubtitle: {
		fontSize: 16,
		color: 'rgba(255,255,255,0.9)',
		marginTop: 5,
		textShadowColor: 'rgba(0, 0, 0, 0.3)',
		textShadowOffset: { width: 1, height: 1 },
		textShadowRadius: 2,
	},
	hero: {
		alignItems: 'center',
		marginBottom: 40,
		backgroundColor: 'rgba(255,255,255,0.1)',
		borderRadius: 20,
		padding: 30,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	heroLocation: {
		fontSize: 18,
		color: 'rgba(255,255,255,0.9)',
		marginBottom: 10,
	},
	heroTime: {
		fontSize: 48,
		fontWeight: 'bold',
		color: 'white',
		marginBottom: 10,
		textShadowColor: 'rgba(0, 0, 0, 0.3)',
		textShadowOffset: { width: 2, height: 2 },
		textShadowRadius: 4,
	},
	heroDate: {
		fontSize: 16,
		color: 'rgba(255,255,255,0.8)',
		marginBottom: 5,
	},
	heroTimezone: {
		fontSize: 14,
		color: 'rgba(255,255,255,0.7)',
	},
	cardContainer: {
		flex: 1,
		padding: 8,
		backgroundColor: 'rgba(255, 255, 255, 0.95)',
		marginTop: 10,
		borderTopLeftRadius: 25,
		borderTopRightRadius: 25,
	},
	cardListTitle: {
		fontSize: 20,
		fontWeight: 'bold',
		color: '#333',
		marginBottom: 15,
		marginTop: 10,
		paddingHorizontal: 10,
	},
	timeCard: {
		backgroundColor: '#ffffff',
		borderRadius: 15,
		padding: 20,
		marginBottom: 15,
		marginHorizontal: 5,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.1,
		shadowRadius: 3.84,
		elevation: 5,
		borderWidth: 1,
		borderColor: 'rgba(0,0,0,0.05)',
	},
	selectedCard: {
		backgroundColor: '#f0f8ff',
		borderColor: '#4A90E2',
		borderWidth: 2,
		transform: [{ scale: 1.02 }],
	},
	cardContent: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	cardLocation: {
		fontSize: 18,
		fontWeight: '600',
		color: '#333',
		marginBottom: 2,
	},
	cardTimezone: {
		fontSize: 12,
		color: '#666',
	},
	cardTimeContainer: {
		alignItems: 'flex-end',
	},
	cardTime: {
		fontSize: 20,
		fontWeight: 'bold',
		color: '#333',
	},
	cardPeriod: {
		fontSize: 12,
		color: '#666',
		marginTop: 2,
	},
	selectedCardText: {
		color: '#4A90E2',
	},
	selectedCardPeriodText: {
		color: '#4A90E2',
		fontWeight: '600',
	},
});

export default ClockComponent;
