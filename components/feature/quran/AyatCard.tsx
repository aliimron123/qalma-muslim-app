import { BookmarkIcon, PlayIcon, ShareIcon } from '@/assets/icons';
import { ButtonIcon, Card } from '@/components/module';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

type AyahCardProps = {
	no: number;
	ayah: string;
	latin: string;
	arti_id: string;
	sizeText?: number;
	shareButton?: boolean;
	handleOpenAudio?: () => void;
};

const AyahCard = ({
	no,
	ayah,
	latin,
	arti_id,
	sizeText,
	shareButton,
	handleOpenAudio,
}: AyahCardProps) => {
	return (
		<Card style={{ borderRadius: 12, marginVertical: 4 }}>
			<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
				<View style={styles.numberContainer}>
					<Image
						source={require('../../../assets/images/sakath.png')} // Ganti dengan path ikon kamu
						style={styles.icon}
						width={48}
						height={48}
						resizeMode='contain'
					/>
					<Text
						style={[
							styles.numberText,
							no >= 100 ? { fontSize: 10 } : { fontSize: 12 },
						]}>
						{no}
					</Text>
				</View>
				<View style={styles.actionContainer}>
					{shareButton && (
						<ButtonIcon
							icon={
								<ShareIcon
									sizes={32}
									color='#656565'
								/>
							}
							variant='none'
						/>
					)}
					<ButtonIcon
						icon={
							<PlayIcon
								color='#656565'
								sizes={28}
							/>
						}
						onPress={handleOpenAudio}
						size={36}
						variant='none'
					/>
					<ButtonIcon
						icon={
							<BookmarkIcon
								color='#656565'
								sizes={28}
							/>
						}
						onPress={handleOpenAudio}
						size={36}
						variant='none'
					/>
				</View>
			</View>

			<View style={styles.container}>
				<View>
					{/* Arabic */}
					<View style={styles.arabicContainer}>
						<Text style={[styles.arabicText, { fontSize: sizeText || 32 }]}>
							{ayah}
						</Text>
						{/* Number + Icon Frame */}
					</View>
				</View>

				{/* Info (Judul & Detail) */}
				<View style={styles.infoContainer}>
					<Text className='text-lg font-bold text-blue-900'>{latin}</Text>
					<Text className='text-blue-800  mt-1'>{arti_id}</Text>
				</View>
			</View>
		</Card>
	);
};

export default AyahCard;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'column',
		gap: 8,
	},
	actionContainer: {
		flexDirection: 'row',
		gap: 8,
		justifyContent: 'flex-end',
		marginBottom: 12,
	},
	numberContainer: {
		width: 40,
		height: 40,
		justifyContent: 'center',
		alignItems: 'center',
		position: 'relative',
		left: 5,
		top: 0,
	},
	icon: {
		width: 40,
		height: 40,
	},
	infoContainer: {
		flex: 1,
		marginTop: 16,
		justifyContent: 'center',
	},
	numberText: {
		position: 'absolute',
		color: '#1E3A8A', // Tailwind: text-blue-600
		fontWeight: 'bold',
		textAlign: 'center',
	},

	arabicContainer: {
		justifyContent: 'space-between',
		flexDirection: 'row-reverse',
		alignItems: 'flex-end',
	},
	arabicText: {
		color: '#000',
		fontWeight: '600', // font-semibold
		textAlign: 'right',
		maxWidth: 320, // kira-kira 'max-w-xs'
		marginVertical: 'auto',
		fontFamily: 'Amiri', // ✅ Custom Font
	},
});
