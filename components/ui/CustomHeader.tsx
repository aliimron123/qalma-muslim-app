import React from 'react';
import {
	Platform,
	StyleProp,
	StyleSheet,
	Text,
	View,
	ViewStyle,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface HeaderProps {
	title?: string;
	style?: StyleProp<ViewStyle>;
	rightComponent?: React.ReactNode;
	leftComponent?: React.ReactNode;
}

const CustomHeader: React.FC<HeaderProps> = ({
	title,
	style,
	rightComponent,
	leftComponent,
}) => {
	return (
		<SafeAreaView style={[styles.container, style]}>
			<View style={styles.inner}>
				{/* Left component (e.g. back button) */}
				<View style={styles.side}>{leftComponent}</View>

				{/* Center title */}
				<View style={styles.titleContainer}>
					<Text style={styles.title}>{title}</Text>
				</View>

				{/* Right component (e.g. settings icon) */}
				<View style={styles.side}>{rightComponent}</View>
			</View>
		</SafeAreaView>
	);
};

export default CustomHeader;

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		borderBottomWidth: 1.5,
		borderBottomColor: '#fff',
		paddingTop: Platform.OS === 'android' ? 8 : 0, // Android sometimes needs a bit of extra padding
		...Platform.select({
			ios: {
				shadowColor: '#000',
				shadowOffset: { width: 0, height: 1 },
				shadowOpacity: 0.08,
				shadowRadius: 4,
			},
			android: {
				elevation: 3,
			},
		}),
	},
	inner: {
		flexDirection: 'row',
		alignItems: 'center',
		height: Platform.OS === 'android' ? 56 : 64, // iOS header usually taller
		paddingHorizontal: 16,
	},
	side: {
		width: 50,
		alignItems: 'center',
		justifyContent: 'center',
		marginVertical: 'auto',
	},
	titleContainer: {
		flex: 1,
		alignItems: 'center',
		marginVertical: 'auto',
	},
	title: {
		fontSize: 18,
		fontWeight: '600',
		color: '#111827',
	},
});
