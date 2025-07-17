import React, { useState } from 'react';
import { ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const StatusBarBlurOverlay = ({ children }: { children: React.ReactNode }) => {
	const [isLightStatusBar, setIsLightStatusBar] = useState(true);
	const insets = useSafeAreaInsets();

	const handleScroll = (event: any) => {
		const offsetY = event.nativeEvent.contentOffset.y;
		// Adjust the threshold (e.g., 100) as needed for your design
		const isLight = offsetY < 100;
		setIsLightStatusBar(isLight);
	};

	return (
		<View style={styles.container}>
			<StatusBar
				animated={true}
				backgroundColor='#61dafb'
				barStyle={isLightStatusBar ? 'light-content' : 'dark-content'}
				showHideTransition={'slide'}
			/>
			<ScrollView
				style={[styles.scrollView, { marginTop: insets.top }]}
				contentContainerStyle={styles.contentContainer}
				onScroll={handleScroll}
				scrollEventThrottle={16} // Adjust for performance
				// other ScrollView props
			>
				{children}
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	scrollView: {
		flex: 1,
	},
	contentContainer: {
		paddingHorizontal: 20,
		paddingBottom: 20,
	},
	sectionTitle: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 10,
	},
	section: {
		marginBottom: 20,
	},
});

export default StatusBarBlurOverlay;
