import React from 'react';
import { Text, View } from 'react-native';

function PrayerSchedule() {
	const dataPrayer = [
		{ title: 'Imsak', time: '04:25' },
		{ title: 'Subuh', time: '04:35' },
		{ title: 'Dzuhur', time: '12:05' },
		{ title: 'Ashar', time: '15:15' },
		{ title: 'Maghrib', time: '18:05' },
		{ title: 'Isya', time: '19:15' },
	];

	return (
		<View className='flex gap-5 flex-row items-center justify-center'>
			{dataPrayer.map((val, index) => (
				<View key={index}>
					<Text className='text-white'>{val.title}</Text>
					<Text className='text-white font-semibold'>{val.time}</Text>
				</View>
			))}
		</View>
	);
}

export default PrayerSchedule;
