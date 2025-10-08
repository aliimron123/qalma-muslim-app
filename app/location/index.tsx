import { useLocationStorage } from '@/context/storageLocation';
import { useAllLocations } from '@/services/api/get-location.query';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import {
	Alert,
	FlatList,
	ListRenderItemInfo,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';

type TypeLocation = {
	id: string;
	lokasi: string;
};

export const lokasiData: TypeLocation[] = [];

export default function LocationScreen() {
	const navigation = useNavigation();
	const { setLocation, history, location } = useLocationStorage();
	const [search, setSearch] = useState('');
	const [selectedLocation, setSelectedLocation] = useState<TypeLocation | null>(
		null,
	);
	const currentLoc = JSON.parse(location || '{}');

	const { data, isLoading } = useAllLocations();
	const dataLocation = data?.data || [];

	const filterData = dataLocation.filter((item: TypeLocation) =>
		item.lokasi.toLowerCase().includes(search.toLowerCase()),
	);

	// pasang search bar bawaan native stack
	useEffect(() => {
		navigation.setOptions({
			headerSearchBarOptions: {
				placeholder: 'Cari Kabupaten/Kota...',
				onChangeText: (event: any) => {
					setSearch(event.nativeEvent.text);
				},
			},
		});
	}, [navigation]);

	const handleSelect = async (item: TypeLocation) => {
		const locationSaveData = {
			id: item.id,
			lokasi: item.lokasi,
		};
		await setLocation(JSON.stringify(locationSaveData));
	};

	const renderItem = useCallback(
		({ item }: ListRenderItemInfo<TypeLocation>) => (
			<View style={styles.containerLocation}>
				<View style={styles.rowContainer}>
					<Ionicons
						name='location-outline'
						size={24}
						color='black'
					/>
					<Text style={styles.textLocation}>{item.lokasi}</Text>
				</View>
				<TouchableOpacity style={styles.rowContainer}>
					<Text style={{ marginVertical: 'auto' }}>Setel lokasi</Text>
					<Ionicons
						name='add'
						size={24}
						color='black'
					/>
				</TouchableOpacity>
			</View>
		),
		[],
	);

	const handleDialogSetLocation = (item: TypeLocation) => {
		Alert.alert('Peringatan', 'Setel lokasi ini sebagai lokasi adzan?', [
			{
				text: 'Batal',
				onPress: () => console.log('Cancel Pressed'),
				style: 'cancel',
			},
			{ text: 'Setel Lokasi', onPress: () => handleSelect(item) },
		]);
	};

	if (isLoading) {
		return (
			<View style={styles.center}>
				<Text>Loading...</Text>
			</View>
		);
	}

	return (
		<View style={{ backgroundColor: '#fff', flex: 1 }}>
			<View>
				{search.length > 0 &&
					(filterData.length > 0 ? (
						filterData.map((val) => (
							<TouchableOpacity
								key={val.id}
								onPress={() => handleDialogSetLocation(val)}
								style={[
									styles.itemBox,
									selectedLocation?.id === val.id && styles.itemSelected,
								]}>
								<Text style={styles.itemText}>
									{val.id} - {val.lokasi}
								</Text>
							</TouchableOpacity>
						))
					) : (
						<View style={styles.containerNotfound}>
							<Text style={styles.empty}>Lokasi tidak ditemukan</Text>
						</View>
					))}
			</View>

			<View
				style={[
					styles.rowContainer,
					styles.historyHeader,
					{ marginBottom: 16 },
				]}>
				<Ionicons
					name='time-outline'
					size={28}
					color='black'
				/>
				<Text style={styles.historyTitle}>Lokasi Disetel</Text>
			</View>

			<View style={[styles.itemBox]}>
				<Text style={styles.itemText}>
					{currentLoc.id} - {currentLoc.lokasi}
				</Text>
			</View>

			<View>
				<View style={[styles.rowContainer, styles.historyHeader]}>
					<Ionicons
						name='time-outline'
						size={28}
						color='black'
					/>
					<Text style={styles.historyTitle}>Riwayat Terakhir</Text>
				</View>

				<FlatList
					keyExtractor={(item) => String(item.id)}
					data={history.map((item) => JSON.parse(item)) as TypeLocation[]}
					renderItem={renderItem}
					scrollEventThrottle={16}
					contentContainerStyle={styles.listContent}
					ListEmptyComponent={
						<View style={styles.containerNotfound}>
							<Text style={styles.empty}>Belum ada riwayat</Text>
						</View>
					}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {},
	center: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},

	itemBox: {
		padding: 12,
		marginBottom: 8,
		borderWidth: 1,
		borderColor: '#ddd',
		borderRadius: 6,
	},
	itemSelected: {
		backgroundColor: '#e0f0ff',
		borderColor: '#007bff',
	},
	itemText: {
		fontSize: 16,
	},
	empty: {
		color: 'gray',
		marginTop: 10,
		textAlign: 'center',
	},

	containerLocation: {
		justifyContent: 'space-between',
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
		paddingVertical: 8,
		paddingHorizontal: 6,
		borderColor: '#ddd',
		borderRadius: 6,
	},
	containerNotfound: {
		paddingVertical: 28,
	},

	textLocation: {
		fontSize: 16,
		fontWeight: '600',
	},

	rowContainer: {
		flexDirection: 'row',
		gap: 3,
	},

	historyHeader: {
		gap: 4,
		padding: 4,
		marginVertical: 6,
		paddingHorizontal: 6,
		borderColor: '#ddd',
		borderRadius: 6,
	},

	historyTitle: {
		marginVertical: 'auto',
		fontSize: 20,
		fontWeight: '600',
	},

	listContent: {
		paddingBottom: 8,
		gap: 8,
		paddingHorizontal: 4,
		paddingTop: 8,
	},
});
