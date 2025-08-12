import { BookmarkIcon, HomeIcon, PrayIcon, QuranIcon } from '@/assets/icons';
import Adzan from '@/assets/icons/AdzanIcon';
import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
	const colorScheme = useColorScheme();

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
				headerShown: false,
				tabBarButton: HapticTab,
				tabBarBackground: TabBarBackground,
				tabBarLabelStyle: {
					fontSize: 13,
					fontFamily: 'Inter, sans',
					fontWeight: 600,
				},
			}}>
			<Tabs.Screen
				name='index'
				options={{
					title: 'Home',
					tabBarIcon: ({ color }) => <HomeIcon color={color} />,
				}}
			/>

			<Tabs.Screen
				name='quran/index'
				options={{
					title: 'Quran',
					tabBarIcon: ({ color }) => <QuranIcon color={color} />,
				}}
			/>

			<Tabs.Screen
				name='adzan/index'
				options={{
					title: 'Adzan',
					tabBarIcon: ({ color }) => <Adzan color={color} />,
					headerShown: true,
				}}
			/>

			<Tabs.Screen
				name='doa/index'
				options={{
					title: 'Do`a',
					tabBarIcon: ({ color }) => <PrayIcon color={color} />,
					headerShown: true,
					animation: 'none',
				}}
			/>

			<Tabs.Screen
				name='bookmark/index'
				options={{
					title: 'Bookmark',
					tabBarIcon: ({ color }) => <BookmarkIcon color={color} />,
					headerShown: true,
					href: null,
				}}
			/>
		</Tabs>
	);
}
