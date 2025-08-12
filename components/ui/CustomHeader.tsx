import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
	Platform,
	StatusBar,
	StyleProp,
	StyleSheet,
	Text,
	View,
	ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface HeaderProps {
	variant?: 'default' | 'custom';
	titleAlign?: 'center' | 'left' | 'right';
	title?: string;
	style?: StyleProp<ViewStyle>;
	rightComponent?: React.ReactNode;
	leftComponent?: React.ReactNode;
	bottomComponent?: React.ReactNode;
}
const CustomHeader: React.FC<HeaderProps> = ({
	variant = 'default',
	title,
	titleAlign = 'center',
	style,
	rightComponent,
	leftComponent,
	bottomComponent,
}) => {
	const insets = useSafeAreaInsets();
	switch (variant) {
		case 'default':
			return (
				<>
					<StatusBar
						barStyle='light-content'
						backgroundColor='transparent'
						translucent
					/>

					<LinearGradient
						colors={['#0F172A', '#1E293B']}
						start={{ x: 0, y: 0 }}
						end={{ x: 0, y: 1 }}
						style={[styles.container, { paddingTop: insets.top }, style]}>
						<View style={styles.inner}>
							{leftComponent && (
								<View style={styles.side}>{leftComponent}</View>
							)}
							<View
								style={[
									styles.titleContainer,
									titleAlign === 'left' && { alignItems: 'flex-start' },
									titleAlign === 'center' && { alignItems: 'center' },
									titleAlign === 'right' && { alignItems: 'flex-end' },
								]}>
								<Text style={[styles.title]}>{title}</Text>
							</View>
							{rightComponent && (
								<View style={styles.side}>{rightComponent}</View>
							)}
							<View style={styles.side}>{rightComponent}</View>
						</View>
						{bottomComponent && (
							<View style={styles.bottom}>{bottomComponent}</View>
						)}
					</LinearGradient>
				</>
			);

		case 'custom':
			return (
				<>
					<StatusBar
						barStyle='light-content'
						backgroundColor='transparent'
						translucent
					/>

					<LinearGradient
						colors={['#0F172A', '#1E293B']}
						start={{ x: 0, y: 0 }}
						end={{ x: 0, y: 1 }}
						style={[styles.container, { paddingTop: insets.top }, style]}>
						<Image
							source={require('@/assets/images/islamic-patt.png')}
							contentFit='cover'
							style={styles.imageStyle}
						/>

						<View style={styles.inner}>
							{leftComponent && (
								<View style={styles.side}>{leftComponent}</View>
							)}

							<View
								style={[
									styles.titleContainer,
									titleAlign === 'left' && { alignItems: 'flex-start' },
									titleAlign === 'center' && { alignItems: 'center' },
									titleAlign === 'right' && { alignItems: 'flex-end' },
								]}>
								<Text style={styles.title}>{title}</Text>
							</View>
							{rightComponent && (
								<View style={styles.side}>{rightComponent}</View>
							)}
						</View>
						{bottomComponent && (
							<View style={styles.bottom}>{bottomComponent}</View>
						)}
					</LinearGradient>
				</>
			);
	}
};

export default CustomHeader;

const styles = StyleSheet.create({
	container: {
		paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
		borderBottomWidth: 1.5,
		borderBottomColor: '#fff',
		position: 'relative',
	},
	inner: {
		flexDirection: 'row',
		alignItems: 'center',
		height: Platform.OS === 'android' ? 56 : 64,
		paddingHorizontal: 14,
	},
	side: {
		width: 50,
		alignItems: 'center',
		justifyContent: 'center',
	},
	bottom: { paddingHorizontal: 16, marginBottom: 8 },
	imageStyle: {
		width: 300,
		height: 300,
		position: 'absolute',
		zIndex: 10,
		right: -100,
		bottom: 0,
		top: -10,
	},
	titleContainer: {
		flex: 1,
		padding: 14,
	},
	title: {
		fontSize: 20,
		fontWeight: '600',
		color: '#fff',
	},
});
