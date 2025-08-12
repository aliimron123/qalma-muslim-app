import React from 'react';
import {
	GestureResponderEvent,
	StyleSheet,
	Text,
	TextStyle,
	TouchableOpacity,
	View,
	ViewStyle,
} from 'react-native';

interface CustomButtonProps {
	title: string;
	onPress?: (event: GestureResponderEvent) => void;
	icon?: React.ReactNode;
	iconPosition?: 'left' | 'right';
	style?: ViewStyle;
	textStyle?: TextStyle;
	disabled?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
	title,
	onPress,
	icon,
	iconPosition = 'left',
	style,
	textStyle,
	disabled = false,
}) => {
	return (
		<TouchableOpacity
			style={[styles.button, disabled && styles.disabled, style]}
			onPress={onPress}
			activeOpacity={0.7}
			disabled={disabled}>
			<View style={styles.content}>
				{icon && iconPosition === 'left' && (
					<View style={styles.icon}>{icon}</View>
				)}
				<Text style={[styles.title, textStyle]}>{title}</Text>
				{icon && iconPosition === 'right' && (
					<View style={styles.icon}>{icon}</View>
				)}
			</View>
		</TouchableOpacity>
	);
};

export default CustomButton;

const styles = StyleSheet.create({
	button: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#334372',
		paddingVertical: 12,
		paddingHorizontal: 16,
		borderRadius: 8,
		alignSelf: 'flex-start',
		width: 'auto',
	},
	disabled: {
		backgroundColor: '#999',
	},
	content: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
	},
	icon: {
		marginHorizontal: 6,
	},
	title: {
		color: '#fff',
		fontSize: 16,
		fontWeight: '600',
	},
});
