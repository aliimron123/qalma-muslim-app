import { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';

export const useSizeDetection = () => {
	const [windowSize, setWindowSize] = useState(Dimensions.get('window'));
	const [screenSize, setScreenSize] = useState(Dimensions.get('screen'));

	useEffect(() => {
		const subscription = Dimensions.addEventListener(
			'change',
			({ window, screen }) => {
				setWindowSize(window);
				setScreenSize(screen);
			},
		);
		return () => subscription?.remove();
	}, []);

	return {
		width: windowSize.width,
		height: windowSize.height,
		scale: windowSize.scale,
		fontScale: windowSize.fontScale,
		window: windowSize,
		screen: screenSize,
	};
};
