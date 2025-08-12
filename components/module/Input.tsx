import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
	Pressable,
	StyleSheet,
	TextInput,
	TextInputProps,
	View,
} from 'react-native';

type IconPosition = 'left' | 'right';

interface AppInputProps extends TextInputProps {
	iconName?: keyof typeof Ionicons.glyphMap;
	iconPosition?: IconPosition;
	onIconPress?: () => void;
	containerStyle?: object;
	inputStyle?: object;
}

export default function AppInput({
	iconName,
	iconPosition = 'left',
	onIconPress,
	containerStyle,
	inputStyle,
	...textInputProps
}: AppInputProps) {
	const [isFocused, setIsFocused] = useState(false);

	return (
		<View style={[styles.container, containerStyle]}>
			{iconName && iconPosition === 'left' && (
				<Pressable
					onPress={onIconPress}
					style={styles.iconWrapper}>
					<Ionicons
						name={iconName}
						size={20}
						color={isFocused ? '#334372' : '#9CA3AF'}
					/>
				</Pressable>
			)}

			<TextInput
				style={[
					styles.input,
					iconName && iconPosition === 'left' && { paddingLeft: 36 },
					iconName && iconPosition === 'right' && { paddingRight: 36 },
					inputStyle,
				]}
				onFocus={() => setIsFocused(true)}
				onBlur={() => setIsFocused(false)}
				{...textInputProps}
			/>

			{iconName && iconPosition === 'right' && (
				<Pressable
					onPress={onIconPress}
					style={[styles.iconWrapper, { right: 8, left: 'auto' }]}>
					<Ionicons
						name={iconName}
						size={20}
						color={isFocused ? '#334372' : '#9CA3AF'}
					/>
				</Pressable>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		backgroundColor: '#F1F5F9',
		borderRadius: 8,
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 8,
		position: 'relative',
	},
	input: {
		flex: 1,
		paddingVertical: 10,
		fontSize: 16,
		color: '#111827',
	},
	iconWrapper: {
		position: 'absolute',
		left: 8,
		top: '50%',
		marginTop: -10,
		zIndex: 1,
	},
});
