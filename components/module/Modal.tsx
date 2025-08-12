import React, { ReactNode } from 'react';
import {
	Dimensions,
	Modal,
	StyleSheet,
	Text,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
	ViewStyle,
} from 'react-native';

interface CustomModalProps {
	visible: boolean;
	onClose: () => void;
	title?: string;
	children: ReactNode;
	position?: 'top' | 'center' | 'bottom';
}

const { width, height } = Dimensions.get('window');

const CustomModal: React.FC<CustomModalProps> = ({
	visible,
	onClose,
	title,
	children,
	position = 'center',
}) => {
	// Determine vertical alignment based on position
	const getPositionStyle = (): ViewStyle => {
		switch (position) {
			case 'top':
				return { justifyContent: 'flex-start', paddingTop: 50 };
			case 'bottom':
				return { justifyContent: 'flex-end', paddingBottom: 50 };
			default:
				return { justifyContent: 'center' };
		}
	};

	return (
		<Modal
			animationType='fade'
			transparent
			visible={visible}
			onRequestClose={onClose}>
			{/* Overlay clickable background */}
			<TouchableWithoutFeedback onPress={onClose}>
				<View style={[styles.overlay, getPositionStyle()]}>
					{/* Prevent modal content from closing on press */}
					<TouchableWithoutFeedback>
						<View style={[styles.modalContainer, { width: width * 0.9 }]}>
							{/* Title */}
							{title && <Text style={styles.title}>{title}</Text>}

							{/* Content */}
							<View style={styles.content}>{children}</View>

							{/* Close button */}
							<TouchableOpacity
								style={styles.closeButton}
								onPress={onClose}>
								<Text style={styles.closeText}>Tutup</Text>
							</TouchableOpacity>
						</View>
					</TouchableWithoutFeedback>
				</View>
			</TouchableWithoutFeedback>
		</Modal>
	);
};

export default CustomModal;

const styles = StyleSheet.create({
	overlay: {
		flex: 1,
		backgroundColor: 'rgba(0,0,0,0.5)',
		alignItems: 'center',
	},
	modalContainer: {
		backgroundColor: '#fff',
		borderRadius: 12,
		padding: 20,
		elevation: 999,
		maxHeight: height * 0.8,
		zIndex: 999,
	},
	title: {
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 10,
		textAlign: 'center',
	},
	content: {
		marginBottom: 15,
	},
	closeButton: {
		backgroundColor: '#007bff',
		padding: 10,
		marginTop: 24,
		borderRadius: 8,
		alignItems: 'center',
	},
	closeText: {
		color: '#fff',
		fontWeight: '600',
	},
});
