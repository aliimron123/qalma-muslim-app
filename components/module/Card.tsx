import React from 'react';
import {
	GestureResponderEvent,
	StyleProp,
	StyleSheet,
	TouchableOpacity,
	View,
	ViewStyle,
} from 'react-native';

interface CardProps {
	style?: StyleProp<ViewStyle>;
	className?: string; // untuk NativeWind support
	children: React.ReactNode;
	onPress?: (event: GestureResponderEvent) => void;
}

const Card: React.FC<CardProps> = ({ style, className, children, onPress }) => {
	const Wrapper = onPress ? TouchableOpacity : View;

	return (
		<Wrapper
			style={[styles.card, style]}
			className={className}
			onPress={onPress}>
			{children}
		</Wrapper>
	);
};

const styles = StyleSheet.create({
	card: {
		backgroundColor: '#fff',
		borderRadius: 12,
		padding: 16,

		// Shadow iOS
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.1,
		shadowRadius: 4,
	},
});

export default Card;
