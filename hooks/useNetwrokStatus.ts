import * as Network from 'expo-network';
import { useEffect, useState } from 'react';

export function useNetworkStatus(interval: number = 5000) {
	const [status, setStatus] = useState<{
		isConnected: boolean;
		isInternetReachable: boolean;
		type: string;
	}>({
		isConnected: false,
		isInternetReachable: false,
		type: 'UNKNOWN',
	});

	useEffect(() => {
		let isMounted = true;

		const checkNetwork = async () => {
			try {
				const netState = await Network.getNetworkStateAsync();
				if (isMounted) {
					setStatus({
						isConnected: netState.isConnected ?? false,
						isInternetReachable: netState.isInternetReachable ?? false,
						type: netState.type ?? 'UNKNOWN',
					});
				}
			} catch (error) {
				console.log('Gagal cek network:', error);
			}
		};

		// cek pertama kali
		checkNetwork();

		// interval polling
		const id = setInterval(checkNetwork, interval);

		return () => {
			isMounted = false;
			clearInterval(id);
		};
	}, [interval]);

	return status;
}
