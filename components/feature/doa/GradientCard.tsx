import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
	ColorValue,
	Dimensions,
	Image,
	ImageSourcePropType,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';

const screenWidth = Dimensions.get('window').width;
const cardMargin = 8;
const cardWidth = screenWidth / 2 - cardMargin * 2;

interface GradientCardProps {
	title?: string;
	colorGradient?: string[];
	image?: ImageSourcePropType;
	link?: () => void;
}

const GradientCard: React.FC<GradientCardProps> = ({
	title,
	colorGradient,
	image,
	link,
}) => {
	return (
		<View>
			<TouchableOpacity
				onPress={link}
				activeOpacity={0.8}>
				<View>
					<LinearGradient
						colors={
							(colorGradient || ['#4facfe', '#00f2fe']) as [
								ColorValue,
								ColorValue,
								...ColorValue[],
							]
						}
						start={{ x: 0, y: 0 }}
						end={{ x: 1, y: 1 }}
						style={styles.cardContainer}>
						<View style={styles.imageContainer}>
							<Image
								source={image}
								style={styles.image}
								resizeMode='contain'
							/>
						</View>
						<Text style={styles.title}>{title}</Text>
					</LinearGradient>
				</View>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	cardContainer: {
		width: cardWidth,
		height: 200,
		borderRadius: 14,
		justifyContent: 'center',
		alignItems: 'center',
	},
	imageContainer: {
		width: 100,
		height: 100,
		marginBottom: 12,
	},
	image: {
		width: '100%',
		height: '100%',
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		color: '#fff',
		textAlign: 'center',
	},
});

export default GradientCard;
