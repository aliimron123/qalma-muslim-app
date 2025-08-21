import { GearSettings } from '@/assets/icons';
import { ButtonIcon } from '@/components/module';
import { useModal } from '@/hooks/useModal';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useLocalSearchParams } from 'expo-router';
import { Image, StyleSheet, Text } from 'react-native';

export default function Layout() {
	const { name } = useLocalSearchParams();
	const { openModal } = useModal();
	return (
		<Stack>
			<Stack.Screen
				name='[id]'
				options={{
					title: name ? `${name}` : '-',
					headerTitle: (props) => (
						<Text
							style={{
								fontSize: 20,
								fontWeight: '600',
								color: '#fff',
								textTransform: 'capitalize',
							}}>
							{props.children}
						</Text>
					),
					headerTintColor: '#fff',
					headerBackground: () => (
						<LinearGradient
							colors={['#0F172A', '#1E293B']}
							start={{ x: 0, y: 0 }}
							end={{ x: 0, y: 1 }}
							style={StyleSheet.absoluteFill}>
							<Image
								source={require('@/assets/images/islamic-patt.png')}
								style={styles.headerImage}
								resizeMode='cover'
							/>
						</LinearGradient>
					),
					headerRight: () => (
						<ButtonIcon
							color='#ffffff'
							variant='blur'
							sizes={32}
							style={{ borderRadius: 12 }}
							icon={
								<GearSettings
									color='white'
									sizes={24}
								/>
							}
							onPress={openModal}
						/>
					),
				}}
			/>
		</Stack>
	);
}

const styles = StyleSheet.create({
	headerImage: {
		width: 300,
		height: 300,
		position: 'absolute',
		zIndex: 10,
		right: -100,
		bottom: 0,
		top: -10,
	},
});
