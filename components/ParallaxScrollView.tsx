import type { PropsWithChildren, ReactElement } from 'react';
import { Dimensions, StyleSheet, ViewStyle } from 'react-native';
import Animated, {
	interpolate,
	useAnimatedRef,
	useAnimatedStyle,
	useScrollViewOffset,
} from 'react-native-reanimated';

import { ThemedView } from '@/components/ThemedView';
import { useBottomTabOverflow } from '@/components/ui/TabBarBackground';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useMemo } from 'react';

type Props = PropsWithChildren<{
	headerHeight?: number | string; // optional: more specific type
	headerImage?: ReactElement;
	headerBackgroundColor?: { dark: string; light: string };
	headerBackgroundElement?: ReactElement;
	headerContent?: ReactElement;
	headerStyle?: ViewStyle;
}>;

export default function ParallaxScrollView({
	headerHeight,
	headerImage,
	headerBackgroundColor,
	headerBackgroundElement,
	headerContent,
	headerStyle,
}: Props) {
	const colorScheme = useColorScheme() ?? 'light';
	const scrollRef = useAnimatedRef<Animated.ScrollView>();
	const scrollOffset = useScrollViewOffset(scrollRef);
	const bottom = useBottomTabOverflow();

	const screenHeight = Dimensions.get('window').height;
	const HEADER_HEIGHT = useMemo<number>(() => {
		if (typeof headerHeight === 'string' && headerHeight.endsWith('%')) {
			const percent = parseFloat(headerHeight) / 100;
			return screenHeight * percent;
		}
		return typeof headerHeight === 'number' ? headerHeight : 350;
	}, [headerHeight]);

	const headerAnimatedStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{
					translateY: interpolate(
						scrollOffset.value,
						[-HEADER_HEIGHT, 0, HEADER_HEIGHT],
						[-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75],
					),
				},
				{
					scale: interpolate(
						scrollOffset.value,
						[-HEADER_HEIGHT, 0, HEADER_HEIGHT],
						[2, 1, 1],
					),
				},
			],
		};
	});

	return (
		<ThemedView style={styles.container}>
			<Animated.ScrollView
				ref={scrollRef}
				scrollEventThrottle={16}
				scrollIndicatorInsets={{ bottom }}
				contentContainerStyle={{ paddingBottom: bottom }}>
				<Animated.View
					style={[
						{ height: HEADER_HEIGHT },
						styles.header,
						headerAnimatedStyle,
						headerStyle,
					]}>
					{headerBackgroundElement ?? (
						<ThemedView
							style={[
								StyleSheet.absoluteFill,
								{ backgroundColor: headerBackgroundColor?.[colorScheme] },
							]}
						/>
					)}

					{headerImage}

					{headerContent && (
						<ThemedView style={styles.heroContent}>{headerContent}</ThemedView>
					)}
				</Animated.View>

				{/* Children can go here if you want */}
			</Animated.ScrollView>
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'transparent',
	},
	header: {
		overflow: 'hidden',
	},
	heroContent: {
		aspectRatio: 1.5,
		position: 'absolute',
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		padding: 16,
		justifyContent: 'space-between',
	},
});
