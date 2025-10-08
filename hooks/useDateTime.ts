import * as Localization from 'expo-localization';
import { useEffect, useState } from 'react';

export function useDateTime() {
	const [dateTime, setDateTime] = useState({
		time: '',
		date: '',
		year: '',
		locale: '',
	});

	useEffect(() => {
		const locales = Localization.getLocales();
		const localeInfo = locales[0] || { languageTag: 'en-US' };
		const deviceLocale = localeInfo.languageTag;
		const isIndo = deviceLocale.startsWith('id');

		const update = () => {
			const now = new Date();

			const timeOptions: Intl.DateTimeFormatOptions = {
				hour: '2-digit',
				minute: '2-digit',
				hour12: !isIndo,
			};

			const dateOptions: Intl.DateTimeFormatOptions = {
				day: '2-digit',
				month: 'long',
				year: 'numeric',
			};

			setDateTime({
				time: now
					.toLocaleTimeString(isIndo ? 'id-ID' : deviceLocale, timeOptions)
					.replace(/\./g, ':') // ubah titik jadi colon
					.replace(/:/g, ' : '),
				date: now.toLocaleDateString(
					isIndo ? 'id-ID' : deviceLocale,
					dateOptions,
				),
				year: now.getFullYear().toString(),
				locale: deviceLocale,
			});
		};

		update();
		const timer = setInterval(update, 1000);
		return () => clearInterval(timer);
	}, []);

	return dateTime;
}
