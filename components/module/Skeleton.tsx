import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

type SkeletonProps = {
	width?: number | string;
	height?: number;
	borderRadius?: number;
	style?: object;
};

export default function Skeleton({
	width = '100%',
	height = 20,
	borderRadius = 8,
	style,
}: SkeletonProps) {
	const shimmerAnim = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		Animated.loop(
			Animated.timing(shimmerAnim, {
				toValue: 1,
				duration: 1200,
				useNativeDriver: true,
			}),
		).start();
	}, [shimmerAnim]);

	const translateX = shimmerAnim.interpolate({
		inputRange: [0, 1],
		outputRange: [-200, 200], // Moves shimmer across
	});

	return (
		<View style={[styles.container, { width, height, borderRadius }, style]}>
			<Animated.View
				style={{
					...StyleSheet.absoluteFillObject,
					transform: [{ translateX }],
				}}>
				<LinearGradient
					colors={['transparent', 'rgba(255,255,255,0.2)', 'transparent']}
					start={{ x: 0, y: 0 }}
					end={{ x: 1, y: 0 }}
					style={StyleSheet.absoluteFill}
				/>
			</Animated.View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#E1E9EE',
		overflow: 'hidden',
	},
});
