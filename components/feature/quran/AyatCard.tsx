import { BookmarkIcon, PlayIcon, ShareIcon } from '@/assets/icons';
import { ButtonIcon, Card } from '@/components/module';
import React from 'react';
import { Image, Platform, StyleSheet, Text, View } from 'react-native';

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
						<Text
							style={[styles.arabicText, { fontSize: sizeText || 32 }]}
							adjustsFontSizeToFit
							numberOfLines={12}>
							{ayah}
						</Text>
						{/* Number + Icon Frame */}
					</View>
				</View>

				{/* Info (Judul & Detail) */}
				<View style={styles.infoContainer}>
					<Text className='text-lg font-bold text-blue-900 flex-wrap'>
						{latin}
					</Text>
					<Text className='mt-4 text-lg flex-wrap leading-6'>{arti_id}</Text>
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
		marginTop: 8,
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
		paddingTop: 18,
		textAlign: 'right',
		writingDirection: 'rtl',
		includeFontPadding: false, // biar gak ada padding default
		fontFamily: 'Amiri', // bagus untuk Al-Quran
		lineHeight: 100,
		letterSpacing: -3, // jangan terlalu lebar (2 sering bikin tanda baca kepisah jauh)
		marginVertical: 4, // hindari pakai 'auto' (tidak didukung di RN)
		unicodeBidi: 'embed',
		textRendering: 'optimizeLegibility',
		fontFeatureSettings: "'rlig' 1, 'liga' 1, 'calt' 1, 'mark' 1, 'mkmk' 1",
		flexShrink: 1, // biar gak overflow
		flexWrap: 'wrap',
	},
	fallbackText: {
		fontFamily: Platform.select({
			ios: 'Times New Roman',
			android: 'serif',
			default: 'serif',
		}),
	},
});
