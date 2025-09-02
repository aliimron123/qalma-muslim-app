import {
	HalfMoonIcon,
	MoonCloudIcon,
	SunCloudIcon,
	SunLineIcon,
	TimeIcon,
} from '@/assets/icons';
import SunFog from '@/assets/icons/SunFog';
import { Button, ButtonIcon } from '@/components/module';
import { BlurView } from 'expo-blur';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

function PrayerSchedule() {
	const [isShow, setIsShow] = React.useState(false);

	const dataPrayer = [
		{ title: 'Imsak', time: '04:25', icon: <TimeIcon color='white' /> },
		{ title: 'Subuh', time: '04:35', icon: <MoonCloudIcon color='white' /> },
		{ title: 'Dzuhur', time: '12:05', icon: <SunLineIcon color='white' /> },
		{ title: 'Ashar', time: '15:15', icon: <SunCloudIcon color='white' /> },
		{ title: 'Maghrib', time: '18:05', icon: <SunFog color='white' /> },
		{ title: 'Isya', time: '19:15', icon: <HalfMoonIcon color='white' /> },
	];

	if (isShow) {
		return (
			<View style={styles.container}>
				<BlurView
					intensity={50}
					tint='light'
					style={styles.glass}>
					<Text style={styles.text}>Test</Text>
					<Button
						title='Aktifkan Sekarang'
						onPress={() => {}}
					/>
				</BlurView>
			</View>
		);
	}

	return (
		<View className='flex gap-5 flex-row items-center justify-center'>
			{dataPrayer.map((val, index) => (
				<View
					key={index}
					className='flex flex-col items-center text-center gap-1.5'>
					<ButtonIcon
						variant='none'
						icon={val.icon}
						style={{ marginVertical: 'auto' }}
					/>
					<Text className='text-white text-center'>{val.title}</Text>
					<Text className='text-white font-semibold text-center'>
						{val.time}
					</Text>
				</View>
			))}
		</View>
	);
}
const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 60,
	},
	glass: {
		borderRadius: 40,
		alignItems: 'center',
		padding: 10,
	},
	text: {
		color: '#fff',
		fontSize: 16,
	},
});

export default PrayerSchedule;
