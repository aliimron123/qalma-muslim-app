import { AlarmIcon, ChatIcon, QuranIcon, TasbihIcon } from '@/assets/icons';
import { ButtonIcon } from '@/components/module';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

interface MenuType {
	name: string;
	path: string;
	icon: React.ReactNode; // icon bisa berupa komponen
}

// Contoh data menu
const dataMenu: MenuType[] = [
	{ name: 'Adzan', path: '/adzan', icon: <AlarmIcon /> },
	{ name: 'Tasbih', path: '/tasbih', icon: <TasbihIcon /> },
	{ name: 'Hadist', path: '/hadist', icon: <QuranIcon color='#F59E0B' /> },
	{ name: 'Quotes', path: '/quotes', icon: <ChatIcon /> },
];

function Menu() {
	const TextColor = ['#064E3B', '#1E40AF', '#92400E', '#5B21B6'];
	const bgButton = ['#ECFDF5', '#EFF6FF', '#FFFBEB', '#F5F3FF'];
	return (
		<SafeAreaView className='flex flex-col pb-10 border-b border-slate-100 gap-4 w-full '>
			<Text className='text-2xl font-bold'>Semua Fitur</Text>
			<View style={styles.containerMenu}>
				{dataMenu.map((val, index) => (
					<View
						key={index}
						className='items-center flex flex-col gap-1'>
						<ButtonIcon
							style={{
								...styles.buttonMenu,
								backgroundColor: bgButton[index],
							}}
							size={60}
							icon={val.icon}
						/>
						<Text
							style={{
								color: TextColor[index],
								fontSize: 16,
								fontWeight: '700',
							}}>
							{val.name}
						</Text>
					</View>
				))}
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	containerMenu: {
		justifyContent: 'space-between',
		flexDirection: 'row',
		gap: 20,
		paddingHorizontal: 16,
	},
	buttonMenu: {
		padding: 20,
		alignItems: 'center',
		justifyContent: 'center',
		overflow: 'hidden',
		borderRadius: 12,
		// iOS Shadow
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 4, // Y-offset
		},
		shadowOpacity: 1,
		shadowRadius: 4, // blur

		// Android Shadow
		elevation: 4,
	},
});

export default Menu;
