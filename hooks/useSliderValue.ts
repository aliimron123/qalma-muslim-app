import { useEffect, useState } from 'react';
import { MMKV } from 'react-native-mmkv';

const storage = new MMKV();

export function useFontSizeSlider(
	min: number = 24,
	max: number = 42,
	defaultValue: number = 32,
) {
	const [sizeText, setSizeText] = useState(defaultValue);
	const [tempValue, setTempValue] = useState(defaultValue);

	// Load saved value on mount
	useEffect(() => {
		const saved = storage.getNumber('fontSize');
		if (saved) {
			setSizeText(saved);
			setTempValue(saved);
		}
	}, []);

	// Save value whenever it changes
	const commitValue = (val: number) => {
		setSizeText(val);
		storage.set('fontSize', val);
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
