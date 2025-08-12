import { Card } from '@/components/module';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type DoaListProps = {
	arab: string;
	latin: string;
	title?: string;
	source?: string;
	sizeText?: number;
	shareButton?: boolean;
	handleOpen?: () => void;
};

const DoaList = ({
	arab,
	latin,
	title,
	source,
	sizeText,
	shareButton,
	handleOpen,
}: DoaListProps) => {
	return (
		<Card style={{ borderRadius: 12, marginVertical: 4 }}>
			<View style={styles.container}>
				<Text className='text-black text-2xl font-medium mb-6 text-center'>
					{title}
				</Text>

				{/* Arabic */}
				<View style={styles.arabicContainer}>
					<Text style={[styles.arabicText, { fontSize: sizeText || 32 }]}>
						{arab}
					</Text>
				</View>

				{/* Translation pakai Linear Gradient */}
				<LinearGradient
					colors={['#EDF2F7', '#D2DEE8']}
					start={{ x: 0, y: 0 }}
					end={{ x: 1, y: 1 }}
					style={styles.translationContainer}>
					<Text style={styles.translationText}>{latin}</Text>
				</LinearGradient>
			</View>
		</Card>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'column',
		gap: 8,
	},
	arabicContainer: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	arabicText: {
		color: '#222',
		textAlign: 'right',
		fontFamily: 'Amiri',
		lineHeight: 60,
	},
	translationContainer: {
		marginTop: 16,
		width: '100%',
		borderRadius: 14,
		padding: 12,
	},
	translationText: {
		fontSize: 16,
		color: '#2B4B6F',
		lineHeight: 24,
	},
});

export default DoaList;
