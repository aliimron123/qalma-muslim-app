import { ShareIcon } from '@/assets/icons';
import { ButtonIcon, Card, Skeleton } from '@/components/module';
import { HadithData } from '@/types/hadist.types';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Props {
	data: HadithData | undefined;
	isLoading: boolean;
	isError?: boolean;
	error?: string;
}

export default function OneDayHadist({
	data,
	isLoading,
	isError,
	error,
}: Props) {
	const [expanded, setExpanded] = useState(false);
	// const navigation = useNavigation();

	const handleViewMore = () => {
		setExpanded((expanded) => !expanded);
	};

	return (
		<View style={{ gap: 10 }}>
			<View style={styles.headerRow}>
				<Text style={styles.headerTitle}>Hadist Hari ini</Text>
				<ButtonIcon
					variant='none'
					size={30}
					icon={<ShareIcon color='#334372' />}
				/>
			</View>

			{isLoading ? (
				<Skeleton height={120} />
			) : (
				<>
					<LinearGradient
						colors={['#D77474', '#F59E0B']}
						start={{ x: 0, y: 0 }}
						end={{ x: 1, y: 1 }}
						style={styles.gradientCard}>
						<Card style={styles.innerCard}>
							<View
								style={
									expanded
										? styles.expandedContainer
										: styles.collapsedContainer
								}>
								<Text
									style={styles.latinText}
									numberOfLines={!expanded ? 8 : undefined}
									ellipsizeMode='tail'>
									{data?.indo}
								</Text>

								<TouchableOpacity
									onPress={handleViewMore}
									style={styles.viewMoreBtn}>
									{!expanded ? (
										<Text style={styles.viewMoreText}>Selengkapnya...</Text>
									) : (
										<Text style={styles.viewMoreText}>Lebih Sedikit..</Text>
									)}
								</TouchableOpacity>
							</View>
						</Card>
					</LinearGradient>
				</>
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
	collapsedContainer: {
		// Auto height untuk collapsed state
		position: 'relative',
	},
	expandedContainer: {
		// Auto height untuk expanded state
	},
	latinText: {
		color: 'white',
		fontSize: 16,
		fontFamily: 'Inter',
		fontWeight: '400',
		lineHeight: 20, // lebih rapat
		textAlign: 'justify',
		letterSpacing: 0.2, // opsional biar nggak dempet
	},

	viewMoreBtn: {
		backgroundColor: 'rgba(255, 255, 255, 0.2)', // Semi-transparent white
		paddingHorizontal: 16,
		paddingVertical: 8,
		borderRadius: 20, // Lebih rounded seperti di gambar
		borderWidth: 1,
		borderColor: 'rgba(255, 255, 255, 0.3)',
		alignSelf: 'flex-start',
		marginTop: 15, // Lebih banyak spacing
		marginLeft: 5,
	},
	viewMoreText: {
		color: 'white',
		fontWeight: '600', // Tidak terlalu bold
		fontSize: 16,
		textAlign: 'center',
	},
});
