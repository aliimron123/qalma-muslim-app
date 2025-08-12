import { NextIcon, PauseIcon, PlayIcon, PrevIcon } from '@/assets/icons';
import { ButtonIcon } from '@/components/module';
import Slider from '@react-native-community/slider';
import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';
import React, {
	forwardRef,
	useEffect,
	useImperativeHandle,
	useState,
} from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Track {
	id: number;
	url: string;
}

const tracks: Track[] = [
	{ id: 1, url: 'https://cdn.alquran.cloud/media/audio/ayah/ar.alafasy/6232' },
	{ id: 2, url: 'https://cdn.alquran.cloud/media/audio/ayah/ar.alafasy/6233' },
	{ id: 3, url: 'https://cdn.alquran.cloud/media/audio/ayah/ar.alafasy/6234' },
];

export interface AudioPlayerRef {
	playAudio(index: number): void;
}

interface Props {
	isPlaying: boolean;
	setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
}

const AudioPlayer = forwardRef<AudioPlayerRef, Props>(
	({ isPlaying, setIsPlaying }, ref) => {
		const [currentIndex, setCurrentIndex] = useState(0);
		const player = useAudioPlayer({ uri: tracks[currentIndex].url });
		const status = useAudioPlayerStatus(player);

		// Expose playAudio to parent
		useImperativeHandle(ref, () => ({
			playAudio: (idx: number) => {
				setCurrentIndex(idx);
				player.replace({ uri: tracks[idx].url });
				player.play();
			},
		}));

		// Sync play/pause with parent state
		useEffect(() => {
			// eslint-disable-next-line no-unused-expressions
			isPlaying ? player.play() : player.pause();
		}, [isPlaying]);

		// Auto-next track on end
		useEffect(() => {
			if (
				status.playbackState === 'ended' &&
				currentIndex < tracks.length - 1
			) {
				const next = currentIndex + 1;
				setCurrentIndex(next);
				player.replace({ uri: tracks[next].url });
				player.play();
			}
		}, [status.playbackState]);

		const handlePrev = () => {
			if (currentIndex > 0) {
				const prev = currentIndex - 1;
				setCurrentIndex(prev);
				player.replace({ uri: tracks[prev].url });
				player.play();
				setIsPlaying(true);
			}
		};

		const handleNext = () => {
			if (currentIndex < tracks.length - 1) {
				const next = currentIndex + 1;
				setCurrentIndex(next);
				player.replace({ uri: tracks[next].url });
				player.play();
				setIsPlaying(true);
			}
		};

		const handleSeek = (val: number) => {
			player.seekTo(val / 1000); // seekTo expects seconds
		};

		return (
			<View style={styles.container}>
				<Slider
					style={styles.slider}
					minimumValue={0}
					maximumValue={status.duration || 0}
					value={status.currentTime || 0}
					onSlidingComplete={handleSeek}
					minimumTrackTintColor='#334372'
					maximumTrackTintColor='#ccc'
					thumbTintColor='#334372'
				/>
				<Text style={styles.title}>Track {tracks[currentIndex].id}</Text>
				<View style={styles.buttonContainer}>
					<ButtonIcon
						variant='none'
						style={{ marginVertical: 'auto' }}
						icon={<PrevIcon />}
						onPress={handlePrev}
					/>
					<ButtonIcon
						icon={isPlaying ? <PauseIcon /> : <PlayIcon />}
						onPress={() => setIsPlaying((p) => !p)}
						style={styles.playButton}
						size={46}
					/>
					<ButtonIcon
						variant='none'
						style={{ marginVertical: 'auto' }}
						icon={<NextIcon />}
						onPress={handleNext}
					/>
				</View>
			</View>
		);
	},
);

export default AudioPlayer;

const styles = StyleSheet.create({
	container: { width: '100%' },
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignContent: 'center',
		alignSelf: 'center',
		gap: 16,
		marginTop: 10,
	},
	playButton: {
		borderRadius: 40,
		padding: 16,
		backgroundColor: 'rgba(0, 0, 0, 0.3)',
	},
	slider: {
		width: '100%',
		height: 20,
	},
	title: {
		textAlign: 'center',
		marginBottom: 8,
		fontSize: 16,
		fontWeight: 'bold',
	},
});
