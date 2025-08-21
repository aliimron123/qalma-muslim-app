import DoaList from '@/components/feature/doa/DoaList';
import { Button, Input, Modal } from '@/components/module';
import { useModal } from '@/hooks/useModal';
import { GetDoaByKeyword } from '@/services/api/get-doa.query';
import Slider from '@react-native-community/slider';
import { useLocalSearchParams } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import LottieView from 'lottie-react-native';

const { width: deviceWidth } = Dimensions.get('window');

function Doa() {
	const { id } = useLocalSearchParams();
	const [search, setSearch] = useState('');

	const { data, isFetching } = GetDoaByKeyword({
		keyword: id as string,
		options: { queryKey: ['doa-keyword', id], enabled: !!id },
	});

	const inset = useSafeAreaInsets();
	const { isModalOpen, closeModal } = useModal();
	const [sizeText, setSizeText] = useState(0);

	const renderItem = useCallback(
		({ item }: any) => (
			<DoaList
				arab={item.arab}
				title={item.judul}
				latin={item.indo}
				sizeText={sizeText}
			/>
		),
		[sizeText],
	);

	const filteredData = (data?.data ?? []).filter(
		(item: any) =>
			item.judul?.toLowerCase().includes(search.toLowerCase()) ||
			item.arab?.toLowerCase().includes(search.toLowerCase()) ||
			item.indo?.toLowerCase().includes(search.toLowerCase()),
	);
	return (
		<View style={{ flex: 1 }}>
			{isFetching ? (
				<Text>Loading...</Text>
			) : (
				<>
					<View style={{ padding: 8 }}>
						<Input
							containerStyle={styles.searchInput}
							placeholder='Cari Doa...'
							placeholderTextColor='#9CA3AF'
							value={search}
							onChangeText={setSearch}
							iconName='search'
							iconPosition='right'
						/>
					</View>

					<FlatList
						keyExtractor={(_, index) => String(index)}
						data={filteredData}
						renderItem={renderItem}
						scrollEventThrottle={16}
						ListEmptyComponent={
							<View style={styles.emptyContainer}>
								<LottieView
									source={require('@/assets/animation/notFound.json')}
									loop
									autoPlay
									style={{ width: 200, height: 200 }}
								/>
								<Text style={{ fontSize: 18 }}>Data Tidak Ditemukan</Text>
							</View>
						}
						contentContainerStyle={
							(data?.data?.length ?? 0) === 0
								? [styles.centerEmptySet, { paddingHorizontal: 8 }]
								: {
										paddingBottom: 8 + inset.bottom,
										paddingHorizontal: 8,
									}
						}
					/>
				</>
			)}

			{/* 🔹 Modal slider for text size */}
			<Modal
				visible={isModalOpen}
				position='top'
				onClose={closeModal}>
				<Text style={{ textAlign: 'center', fontSize: 18 }}>{sizeText}</Text>
				<View style={styles.containerSlider}>
					<Text style={{ fontSize: 20, marginVertical: 'auto' }}>Aa</Text>
					<Slider
						style={{ width: deviceWidth * 0.65, marginVertical: 'auto' }}
						value={sizeText}
						step={1}
						minimumValue={28}
						maximumValue={48}
						onValueChange={setSizeText}
						minimumTrackTintColor='#334372'
						maximumTrackTintColor='#000000'
					/>
					<Text style={{ fontSize: 24, marginVertical: 'auto' }}>Aa</Text>
				</View>
				<View style={styles.containerButton}>
					<Button
						title='Kecil'
						style={styles.buttonStyle}
						textStyle={{ fontSize: 14 }}
						onPress={() => setSizeText(28)}
					/>
					<Button
						title='Normal'
						style={styles.buttonStyle}
						textStyle={{ fontSize: 14 }}
						onPress={() => setSizeText(32)}
					/>
					<Button
						title='Besar'
						style={styles.buttonStyle}
						textStyle={{ fontSize: 14 }}
						onPress={() => setSizeText(42)}
					/>
				</View>
			</Modal>
		</View>
	);
}

const styles = StyleSheet.create({
	cardContainer: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		width: '100%',
		backgroundColor: '#fff',
		borderTopLeftRadius: 6,
		borderTopRightRadius: 6,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: -3 },
		shadowOpacity: 0.1,
		shadowRadius: 6,
		elevation: 6,
		padding: 16,
	},
	containerSlider: {
		alignSelf: 'center',
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'center',
		width: '100%',
		gap: 4,
	},
	containerButton: {
		width: deviceWidth * 0.5,
		alignSelf: 'center',
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'center',
		marginTop: 16,
		paddingHorizontal: 6,
		gap: 4,
	},
	buttonStyle: {
		alignSelf: 'flex-start',
		paddingVertical: 8.5,
		maxWidth: deviceWidth * 0.25,
		width: '100%',
	},
	emptyContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	emptyText: {
		fontSize: 16,
		color: 'black',
	},
	centerEmptySet: {
		flexGrow: 1, // important for FlatList to stretch when empty
		justifyContent: 'center',
		alignItems: 'center',
	},
	searchInput: {
		borderColor: '#334372',
		borderWidth: 1,
		borderRadius: 8,
		backgroundColor: '#fff',
		fontSize: 16,
	},
});

export default Doa;
