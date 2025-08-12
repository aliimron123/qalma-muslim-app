import { ShareIcon } from '@/assets/icons';
import { ButtonIcon, Card, Skeleton } from '@/components/module';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export type DoaType = {
	arab: string;
	indo: string;
};
interface Props {
	data: DoaType | undefined;
	isLoading: boolean;
	isError?: boolean;
	error?: string;
}

function OneDayDoa({ data, isLoading, isError, error }: Props) {
	return (
		<View style={{ gap: 12 }}>
			{/* Header Row */}
			<View style={styles.headerRow}>
				<Text style={styles.headerTitle}>Do`a Untuk Hari Ini</Text>
				<ButtonIcon
					variant='none'
					size={30}
					icon={<ShareIcon color='#334372' />}
				/>
			</View>

			{isLoading ? (
				<Skeleton height={180} />
			) : (
				<LinearGradient
					colors={['#4C1D95', '#3730A3']}
					start={{ x: 0, y: 0 }}
					end={{ x: 1, y: 1 }}
					style={styles.gradientCard}>
					<Card style={styles.innerCard}>
						{/* Arabic Text */}
						<Text style={styles.arabicText}>{data?.arab}</Text>

						{/* Translation */}
						<View style={styles.translationWrapper}>
							<Text style={styles.titleText}>Artinya :</Text>
							<Text style={styles.latinText}>&#34;{data?.indo}&#34;</Text>
						</View>
					</Card>
				</LinearGradient>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	headerRow: {
		justifyContent: 'space-between',
		flexDirection: 'row',
		alignItems: 'center',
	},
	headerTitle: {
		fontSize: 20,
		fontWeight: '600',
		color: '#1E1E2D',
	},
	gradientCard: {
		borderRadius: 16,
		overflow: 'hidden',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.12,
		shadowRadius: 6,
		elevation: 6,
	},
	innerCard: {
		backgroundColor: 'transparent',
		paddingVertical: 18,
		paddingHorizontal: 14,
	},
	arabicText: {
		color: 'white',
		fontSize: 30,
		fontFamily: 'Arabic',
		textAlign: 'right',
		lineHeight: 52,
		marginBottom: 12,
	},
	translationWrapper: {
		marginTop: 8,
	},
	titleText: {
		color: '#E0E0FF',
		fontFamily: 'Inter',
		fontWeight: '500',
		fontSize: 16,
		marginBottom: 4,
	},
	latinText: {
		color: 'white',
		fontSize: 16,
		fontFamily: 'Inter',
		fontWeight: '400',
		lineHeight: 24,
		textAlign: 'justify',
	},
});

export default OneDayDoa;
