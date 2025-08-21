import { Button } from '@/components/module';
import { useCurrentLocation } from '@/hooks/useCurrentLocation';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function AdzanView() {
	const { loading, location, errorMsg } = useCurrentLocation();

	if (errorMsg) {
		return <Text>{errorMsg}</Text>;
	}

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={styles.headContainer}>
				<Button
					title={location?.address as string}
					disabled={loading}
					icon={
						<Ionicons
							name='location'
							size={24}
							color={'#fff'}
						/>
					}
				/>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	headContainer: {
		paddingHorizontal: 12,
		paddingVertical: 8,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
});

export default AdzanView;
