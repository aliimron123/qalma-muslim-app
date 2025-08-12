import '@/global.css';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { ModalProvider } from '@/context/ModalContext';
import { useColorScheme } from '@/hooks/useColorScheme';
import { queryClient } from '@/scripts/api-services';
import { QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';
export default function RootLayout() {
	const colorScheme = useColorScheme();
	const [loaded] = useFonts({
		SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
		Amiri: require('../assets/fonts/Amiri.ttf'),
		AmiriBold: require('../assets/fonts/AmiriBold.ttf'),
		Arabic: require('../assets/fonts/Arabic.ttf'),
		Inter: require('../assets/fonts/Inter-VariableFont_opsz,wght.ttf'),
	});

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
							<Stack.Screen name='+not-found' />
						</Stack>
						<StatusBar style='auto' />
					</ModalProvider>
				</SafeAreaProvider>
			</ThemeProvider>
		</QueryClientProvider>
	);
}
