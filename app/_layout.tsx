import { ModalProvider } from '@/context/ModalContext';
import '@/global.css';
import { useColorScheme } from '@/hooks/useColorScheme';
import { queryClient } from '@/scripts/api-services';
import { initDb } from '@/services/db';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
export default function RootLayout() {
	const colorScheme = useColorScheme();
	const [loaded] = useFonts({
		SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
		Amiri: require('../assets/fonts/Amiri.ttf'),
		AmiriBold: require('../assets/fonts/AmiriBold.ttf'),
		Arabic: require('../assets/fonts/Arabic.ttf'),
		Inter: require('../assets/fonts/Inter-VariableFont_opsz,wght.ttf'),
	});

	useEffect(() => {
		initDb();
	}, []);

	useEffect(() => {
		if (loaded) {
			SplashScreen.hide();
		}
	}, [loaded]);

	if (!loaded) {
		// Async font loading only occurs in development.
		return null;
	}

	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider
				value={colorScheme === 'light' ? DefaultTheme : DefaultTheme}>
				<SafeAreaProvider>
					<ModalProvider>
						<Stack>
							<Stack.Screen
								name='(tabs)'
								options={{ headerShown: false, animation: 'ios_from_left' }}
							/>
							<Stack.Screen
								name='read-quran'
								options={{ headerShown: false, animation: 'flip' }}
							/>
							<Stack.Screen
								name='read-doa'
								options={{ headerShown: false, animation: 'flip' }}
							/>

							<Stack.Screen
								name='search/index'
								options={{ animation: 'flip' }}
							/>
							<Stack.Screen
								name='location/index'
								options={{
									animation: 'flip',
									title: 'Pilih Lokasi',
								}}
							/>
							<Stack.Screen name='+not-found' />
						</Stack>
						<StatusBar style='auto' />
					</ModalProvider>
				</SafeAreaProvider>
				<Toast />
			</ThemeProvider>
		</QueryClientProvider>
	);
}
