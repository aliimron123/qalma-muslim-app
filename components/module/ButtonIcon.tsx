import { BlurView } from 'expo-blur';
import React from 'react';
import {
	GestureResponderEvent,
	Platform,
	StyleSheet,
	TouchableOpacity,
	ViewStyle,
} from 'react-native';

interface IconButtonProps {
	icon: React.ReactNode;
	onPress?: (event: GestureResponderEvent) => void;
	shape?: 'rectangle' | 'rounded';
	variant?: 'solid' | 'none' | 'blur';
	color?: string; // Background color (for solid)
	size?: number; // Width/Height in px
	style?: ViewStyle;
	[key: string]: any;
}

const IconButton: React.FC<IconButtonProps> = ({
	icon,
	onPress,
	shape = 'rectangle',
	variant = 'solid',
	color = '#007bff',
	size = 32,
	style,
	...props
}) => {
	const borderRadius = shape === 'rounded' ? size / 2 : 6;

	const baseStyle: ViewStyle = {
		width: size,
		height: size,
		borderRadius,
		alignItems: 'center',
		justifyContent: 'center',
		overflow: 'hidden',
	};

	const getBackgroundStyle = (): ViewStyle => {
		switch (variant) {
			case 'none':
				return { backgroundColor: 'transparent' };
			case 'blur':
				return {
					backgroundColor:
						Platform.OS === 'android' ? color + '55' : 'transparent',
				};
			default:
				return { backgroundColor: color };
		}
	};

	const containerStyle = {
		...baseStyle,
		...getBackgroundStyle(),
		...style,
	};

	return (
		<TouchableOpacity
			style={containerStyle}
			onPress={onPress}
			{...props}>
			{variant === 'blur' && Platform.OS !== 'android' ? (
				<BlurView
					intensity={30}
					tint='light'
					style={StyleSheet.absoluteFill}
				/>
			) : null}
			{icon}
		</TouchableOpacity>
	);
};

export default IconButton;
