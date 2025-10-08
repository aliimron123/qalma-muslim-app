import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

type StorageContextType = {
	location: string | null;
	history: string[];
	setLocation: (loc: string) => Promise<void>;
	clearLocation: () => Promise<void>;
	clearHistory: () => Promise<void>;
	reloadLocation: () => Promise<void>;
};

const StorageContext = createContext<StorageContextType>({
	location: null,
	history: [],
	setLocation: async () => {},
	clearLocation: async () => {},
	clearHistory: async () => {},
	reloadLocation: async () => {},
});

export const StorageLocationProvider: React.FC<{
	children: React.ReactNode;
}> = ({ children }) => {
	const [location, setLocationState] = useState<string | null>(null);
	const [history, setHistory] = useState<string[]>([]);

	const reloadLocation = async () => {
		const saved = await AsyncStorage.getItem('user_location');
		const savedHistory = await AsyncStorage.getItem('location_history');

		if (saved) setLocationState(saved);
		else setLocationState(null);

		if (savedHistory) setHistory(JSON.parse(savedHistory));
		else setHistory([]);
	};

	useEffect(() => {
		reloadLocation();
	}, []);

	const setLocation = async (loc: string) => {
		// Simpan current
		await AsyncStorage.setItem('user_location', loc);
		setLocationState(loc);

		// Simpan ke history (tidak duplicate)
		let newHistory = [...history];
		if (!newHistory.includes(loc)) {
			newHistory.unshift(loc); // tambah ke depan
		}

		await AsyncStorage.setItem('location_history', JSON.stringify(newHistory));
		setHistory(newHistory);
	};

	const clearLocation = async () => {
		await AsyncStorage.removeItem('user_location');
		setLocationState(null);
	};

	const clearHistory = async () => {
		await AsyncStorage.removeItem('location_history');
		setHistory([]);
	};

	return (
		<StorageContext.Provider
			value={{
				location,
				history,
				setLocation,
				clearLocation,
				clearHistory,
				reloadLocation,
			}}>
			{children}
		</StorageContext.Provider>
	);
};

export const useLocationStorage = () => useContext(StorageContext);
