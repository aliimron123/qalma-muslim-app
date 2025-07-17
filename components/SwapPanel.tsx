import BottomSheet, {
	BottomSheetScrollView,
	BottomSheetView,
} from '@gorhom/bottom-sheet';
import React, { useMemo, useRef } from 'react';
import { StyleSheet, ViewStyle } from 'react-native';

interface Props {
	snapPoint?: (string | number)[];
	children: React.ReactNode;
	style?: ViewStyle;
	scrollable?: boolean;
}

const SwapPanel = ({
	snapPoint,
	children,
	style,
	scrollable = false,
}: Props) => {
	const sheetRef = useRef<BottomSheet>(null);
	const snapPoints = useMemo(() => snapPoint ?? ['25%'], [snapPoint]);

	return (
		<BottomSheet
			ref={sheetRef}
			index={0}
			snapPoints={snapPoints}
			enablePanDownToClose={false}
			enableOverDrag={true}
			android_keyboardInputMode='adjustResize'>
			{scrollable ? (
				<BottomSheetScrollView
					contentContainerStyle={style ?? styles.contentContainer}>
					{children}
				</BottomSheetScrollView>
			) : (
				<BottomSheetView style={style ?? styles.contentContainer}>
					{children}
				</BottomSheetView>
			)}
		</BottomSheet>
	);
};

const styles = StyleSheet.create({
	contentContainer: {
		paddingHorizontal: 8,
	},
});

export default SwapPanel;
