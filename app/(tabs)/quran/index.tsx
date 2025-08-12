import { SearchIcon } from '@/assets/icons';
import TabViewQuran from '@/components/feature/quran/TabViewQuran';
import { ButtonIcon } from '@/components/module';
import CustomHeader from '@/components/ui/CustomHeader';
import React from 'react';
import { StyleSheet, View } from 'react-native';

function Quran(): React.JSX.Element {
	return (
		<View style={{ flex: 1 }}>
			<View style={{ backgroundColor: '#ffffff' }}>
				<CustomHeader
					variant='custom'
					title='Baca Quran'
					titleAlign='left'
					style={styles.bottomHeaderRound}
					rightComponent={
						<ButtonIcon
							style={{ borderRadius: 12 }}
							icon={<SearchIcon color='#ffffff' />}
							color='#ffffff'
							variant='blur'
						/>
					}
				/>
			</View>
			<TabViewQuran />
		</View>
	);
}

const styles = StyleSheet.create({
	cardContainer: {
		paddingHorizontal: 14,
		paddingVertical: 4,
		flexDirection: 'column',
	},
	bottomHeaderRound: {
		borderBottomLeftRadius: 20,
		borderBottomRightRadius: 20,
		paddingBottom: 14,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 12,
		},
		shadowOpacity: 0.5,
		shadowRadius: 8,
	},
});

export default Quran;
