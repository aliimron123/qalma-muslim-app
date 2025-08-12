import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

export function useFontSizeSlider(
	min: number = 24,
	max: number = 36,
	defaultValue: number = 24,
) {
	const [sizeText, setSizeText] = useState(defaultValue); // final committed value
	const [tempValue, setTempValue] = useState(defaultValue); // temporary slider value

	// Load saved value on mount
	useEffect(() => {
		(async () => {
			try {
				const saved = await AsyncStorage.getItem('fontSize');
				if (saved) {
					setSizeText(Number(saved));
					setTempValue(Number(saved));
				}
			} catch (error) {
				console.log('Failed to load font size:', error);
			}
		})();
	}, []);

	// Save value whenever it changes
	const commitValue = async (val: number) => {
		setSizeText(val);
		try {
			await AsyncStorage.setItem('fontSize', val.toString());
		} catch (error) {
			console.log('Failed to save font size:', error);
		}
	};

	return {
		tempValue,
		sizeText,
		min,
		max,
		setTempValue,
		commitValue,
	};
}
