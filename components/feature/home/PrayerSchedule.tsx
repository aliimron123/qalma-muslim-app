import {
	HalfMoonIcon,
	MoonCloudIcon,
	SunCloudIcon,
	SunLineIcon,
	TimeIcon,
} from '@/assets/icons';
import SunFog from '@/assets/icons/SunFog';
import { Button, ButtonIcon } from '@/components/module';
import { useLocationStorage } from '@/context/storageLocation';
import { GetAdzanByDay } from '@/services/api/get-adzan-time.query';
import { BlurView } from 'expo-blur';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

function PrayerSchedule() {
	const { location } = useLocationStorage();
	const [isShow, setIsShow] = React.useState(false);

	const currentLoc = JSON.parse(location || '{}');
	const getCity = currentLoc.id;
	const getDate = new Date().toISOString().split('T')[0];

	// get data schedule from api
	const { data, isFetching } = GetAdzanByDay({
		date: getDate as string,
		city: getCity as string,
	});

	const schedulePrayerData = data?.data;
	const schedule = schedulePrayerData?.jadwal;

	const dataPrayer = [
		{ title: 'Imsak', time: schedule?.imsak, icon: <TimeIcon color='white' /> },
		{
			title: 'Subuh',
			time: schedule?.subuh,
			icon: <MoonCloudIcon color='white' />,
		},
		{
			title: 'Dzuhur',
			time: schedule?.dzuhur,
			icon: <SunLineIcon color='white' />,
		},
		{
			title: 'Ashar',
			time: schedule?.ashar,
			icon: <SunCloudIcon color='white' />,
		},
		{
			title: 'Maghrib',
			time: schedule?.maghrib,
			icon: <SunFog color='white' />,
		},
		{
			title: 'Isya',
			time: schedule?.isya,
			icon: <HalfMoonIcon color='white' />,
		},
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
			{isFetching ? (
				<Text>Loading...</Text>
			) : (
				<React.Fragment>
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
				</React.Fragment>
			)}
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
