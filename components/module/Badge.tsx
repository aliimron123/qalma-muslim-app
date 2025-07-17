import { BlurView } from 'expo-blur';
import React from 'react';
import {
	Platform,
	StyleSheet,
	Text,
	TextStyle,
	TouchableOpacity,
	View,
	ViewStyle,
} from 'react-native';

interface BadgeProps {
	theme?: 'default' | 'primary' | 'secondary' | 'error' | 'warn' | 'success';
	size?: 'small' | 'medium' | 'large';
	variant?: 'solid' | 'transparent' | 'blur';
	style?: ViewStyle;
	textStyle?: TextStyle;
	children?: React.ReactNode;
	onPress?: () => void;
	icon?: React.ReactNode;
	iconPosition?: 'left' | 'right';
}

const THEME_COLORS = {
	default: { bg: '#E0E0E0', text: '#000' },
	primary: { bg: '#007bff', text: '#fff' },
	secondary: { bg: '#6c757d', text: '#fff' },
	error: { bg: '#dc3545', text: '#fff' },
	warn: { bg: '#ffc107', text: '#000' },
	success: { bg: '#28a745', text: '#fff' },
};

const SIZE_STYLES = {
	small: {
		height: 20,
		fontSize: 10,
		paddingHorizontal: 6,
		borderRadius: 10,
		iconSpacing: 4,
	},
	medium: {
		height: 28,
		fontSize: 13,
		paddingHorizontal: 10,
		borderRadius: 14,
		iconSpacing: 6,
	},
	large: {
		height: 36,
		fontSize: 16,
		paddingHorizontal: 14,
		borderRadius: 18,
		iconSpacing: 8,
	},
};

const Badge: React.FC<BadgeProps> = ({
	theme = 'default',
	size = 'medium',
	variant = 'solid',
	icon,
	iconPosition = 'left',
	style,
	textStyle,
	children,
	onPress,
	...props
}) => {
	const themeColors = THEME_COLORS[theme];
	const sizeStyle = SIZE_STYLES[size];

	// based style
	const baseStyle: ViewStyle = {
		height: sizeStyle.height,
		borderRadius: sizeStyle.borderRadius,
		paddingHorizontal: sizeStyle.paddingHorizontal,
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'flex-start',
		flexDirection: 'row',
		overflow: variant === 'blur' ? 'hidden' : 'visible',
	};

	// variant style
	const getBackgroundStyle = (): ViewStyle => {
		switch (variant) {
			case 'transparent':
				return {
					backgroundColor: themeColors.bg + '33', // 20% opacity
					borderColor: themeColors.bg,
				};
			case 'blur':
				return {
					backgroundColor:
						Platform.OS === 'android' ? themeColors.bg + 'AA' : 'transparent',
				};
			default:
				return {
					backgroundColor: themeColors.bg,
				};
		}
	};

	// color style based on variant
	const textColor =
		variant === 'transparent' ? themeColors.bg : themeColors.text;

	const badgeTextStyle: TextStyle = {
		color: textColor,
		fontSize: sizeStyle.fontSize,
		...textStyle,
	};

	const Wrapper = onPress ? TouchableOpacity : View;

	// icon setting
	const iconLeft = icon && iconPosition === 'left';
	const iconRight = icon && iconPosition === 'right';

	const renderIcon = (position: 'left' | 'right') => {
		if (!icon) return null;
		const marginStyle =
			position === 'left'
				? { marginRight: sizeStyle.iconSpacing }
				: { marginLeft: sizeStyle.iconSpacing };
		return <View style={[styles.icon, marginStyle]}>{icon}</View>;
	};

	const content = (
		<View style={styles.row}>
			{iconLeft && renderIcon('left')}
			<Text style={badgeTextStyle}>{children}</Text>
			{iconRight && renderIcon('right')}
		</View>
	);

	// all style
	const containerStyle = {
		...baseStyle,
		...getBackgroundStyle(),
		...style,
	};

	return (
		<Wrapper
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
			{content}
		</Wrapper>
	);
};

const styles = StyleSheet.create({
	row: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	icon: {
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default Badge;
