import { ShareIcon } from '@/assets/icons';
import { ButtonIcon, Card } from '@/components/module'; // komponen yang tidak tahu-menahu soal gradient
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

function OneDayHadist() {
	return (
		<View style={{ gap: 10 }}>
			<View
				style={{
					justifyContent: 'space-between',
					flex: 1,
					flexDirection: 'row',
				}}>
				<Text className='text-2xl font-semibold'>Hadist Hari ini</Text>
				<ButtonIcon
					variant='none'
					size={30}
					icon={<ShareIcon color='#334372' />}
				/>
			</View>

			<LinearGradient
				colors={['#D77474', '#F59E0B']}
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 1 }}
				style={styles.card} // padding sedikit untuk inner shadow glow
			>
				<Card style={{ backgroundColor: 'transparent' }}>
					<Text style={{ color: 'white', fontSize: 16 }}>
						Semoga Allah membimbing di setiap langkah, sehingga apapun yang
						kulakukan menjadi berkah. Dan apapun yang kuusahakan berbuah indah.
					</Text>
				</Card>
			</LinearGradient>
		</View>
	);
}

const styles = StyleSheet.create({
	card: {
		borderRadius: 12,
		opacity: 0.9,
		// Shadow iOS
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 5,
	},
});

export default OneDayHadist;
